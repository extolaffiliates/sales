#!/usr/bin/env python3
"""Lint cold emails against the measurable rules in cold-email/playbook.md (sections 2 and 9).

Input format (file or stdin). Separate multiple emails (a sequence) with a line containing only `===`:

    Subject: hiring 4 sdrs

    Hi Dana,
    ...body...

    Best,
    Sam

The first email is checked as a first touch (strict). Later emails are follow-ups: a subject is optional,
a shorter body is expected, and links/images are allowed.

Usage:
    python cold-email/lint_email.py drafts/acme.txt
    python cold-email/lint_email.py --json < draft.txt
Exit code is 1 if any email has an ERROR, so it can gate automation.
"""

import argparse
import json
import re
import sys

BANNED_PHRASES = [
    "hope this email finds you", "hope this finds you", "hope you're doing well", "hope you are doing well",
    "hope you're well", "hope all is well", "my name is", "i wanted to reach out", "i'm reaching out",
    "i am reaching out", "reaching out because", "i came across your", "just following up", "just checking in",
    "just bumping", "bumping this", "circling back", "touch base", "touching base", "as per my last email",
    "let me know if you're interested", "let me know if you are interested", "i'd love to", "i would love to",
    "i was impressed by", "i love what you", "i'm impressed", "your commitment to", "as a leader in",
    "quick question", "thought this might be useful", "don't hesitate", "do not hesitate", "feel free to",
    "at your earliest convenience", "i hope you", "in today's fast-paced", "dear sir", "dear madam",
    "to whom it may concern", "i know you're busy", "sorry to bother",
]

BUZZWORDS = [
    "ai-powered", "cutting-edge", "cutting edge", "state-of-the-art", "game-changer", "game changer",
    "revolutionize", "revolutionise", "revolutionary", "synergy", "synergies", "leverage", "streamline",
    "seamless", "seamlessly", "best-in-class", "world-class", "innovative", "disrupt", "holistic", "robust",
    "end-to-end", "one-stop", "unlock", "supercharge", "skyrocket", "10x", "turnkey", "next-generation",
    "solution", "solutions", "platform", "empower",
]

MEETING_ASK = re.compile(
    r"\b(\d+\s?-?\s?min(ute)?s?\b(?!\s*(video|loom|read|breakdown|walkthrough|teardown))|book a (call|meeting|time|demo)|schedule a|calendly|"
    r"hop on a call|jump on a call|free (on|this|next)|demo|my calendar|calendar link)\b",
    re.I,
)
SIGNOFF = re.compile(r"^(best|thanks|thank you|cheers|regards|kind regards|best regards|warmly|talk soon|--)[,!.]?\s*$", re.I)
PLACEHOLDER = re.compile(r"\{\{?[^}]*\}?\}|\[[A-Z][^\]]*\]|<[a-z_ ]+>")
LINK = re.compile(r"https?://|www\.|\.(com|io|ai|co)/", re.I)


def syllables(word):
    word = word.lower().strip(".,!?;:'\"()")
    if not word:
        return 0
    if len(word) <= 3:
        return 1
    word = re.sub(r"(?:[^laeiouy]es|ed|[^laeiouy]e)$", "", word)
    word = re.sub(r"^y", "", word)
    return max(1, len(re.findall(r"[aeiouy]{1,2}", word)))


def split_sentences(text):
    return [s for s in re.split(r"(?<=[.!?])\s+|\n+", text) if re.search(r"[A-Za-z]", s)]


def fk_grade(text):
    words = re.findall(r"[A-Za-z']+", text)
    sentences = split_sentences(text)
    if not words or not sentences:
        return 0.0
    syl = sum(syllables(w) for w in words)
    return round(0.39 * len(words) / len(sentences) + 11.8 * syl / len(words) - 15.59, 1)


def parse(raw):
    lines = raw.strip("\n").splitlines()
    subject = None
    if lines and lines[0].lower().startswith("subject:"):
        subject = lines[0].split(":", 1)[1].strip()
        lines = lines[1:]
    body_lines = []
    for line in lines:
        if SIGNOFF.match(line.strip()):
            break
        body_lines.append(line)
    body = "\n".join(body_lines).strip()
    # Drop a greeting line like "Hi Dana," from the word count.
    body_no_greeting = re.sub(r"^(hi|hey|hello|dear)\b[^\n]*\n", "", body, flags=re.I).strip()
    return subject, body, body_no_greeting


def lint(raw, step):
    subject, body, core = parse(raw)
    issues = []

    def add(level, rule, msg):
        issues.append({"level": level, "rule": rule, "message": msg})

    first = step == 1
    low = (subject or "").lower() + "\n" + body.lower()

    # Subject
    if subject is None or not subject.strip():
        if first:
            add("ERROR", "subject", "Missing subject line (empty subjects: +opens, -12% replies).")
    else:
        n = len(subject.split())
        if n > 4:
            add("ERROR" if first else "WARN", "subject", f"Subject is {n} words; keep it 1-4.")
        if "?" in subject or "!" in subject:
            add("ERROR", "subject", "No ? or ! in the subject line.")
        if re.match(r"^\s*(re|fwd?)\s*:", subject, re.I):
            add("ERROR", "subject", "Fake Re:/Fwd: subject is deceptive and tanks replies.")
        if subject.isupper() and len(subject) > 3:
            add("ERROR", "subject", "ALL CAPS subject.")

    # Length and clarity
    words = len(re.findall(r"[A-Za-z0-9'$%]+", core))
    lo, hi, cap = (40, 90, 120) if first else (10, 70, 100)
    if words > cap:
        add("ERROR", "length", f"Body is {words} words; hard max {cap}.")
    elif words > hi:
        add("WARN", "length", f"Body is {words} words; target {lo}-{hi}.")
    elif words < lo and first:
        add("WARN", "length", f"Body is {words} words; may be too thin to carry why-you-why-now + proof.")

    grade = fk_grade(core)
    if grade > 9:
        add("ERROR", "clarity", f"Reading grade {grade}; target 3-7.")
    elif grade > 7:
        add("WARN", "clarity", f"Reading grade {grade}; target 3-7.")
    for s in split_sentences(core):
        if len(s.split()) > 20:
            add("WARN", "clarity", f"Long sentence ({len(s.split())} words): \"{s.strip()[:70]}...\"")

    # Questions / CTA
    q = core.count("?")
    if q == 0:
        add("WARN", "cta", "No question mark; is there a clear yes/no CTA?")
    elif q > 1:
        add("WARN", "cta", f"{q} questions; use one (the CTA).")
    if first and MEETING_ASK.search(core):
        add("WARN", "cta", "Looks like a meeting/time ask in email 1; interest CTAs book 2x more (Gong).")

    # Banned language
    for p in BANNED_PHRASES:
        if p in low:
            add("ERROR", "filler", f"Banned phrase: \"{p}\".")
    for b in BUZZWORDS:
        if re.search(rf"\b{re.escape(b)}\b", low):
            add("WARN", "buzzword", f"Buzzword: \"{b}\"; describe the outcome instead.")
    if "!" in core:
        add("WARN", "tone", "Exclamation mark; reads as marketing.")

    # Format
    if first and LINK.search(core):
        add("ERROR", "format", "Link in email 1; hurts deliverability and looks like marketing.")
    if PLACEHOLDER.search(raw):
        add("ERROR", "placeholder", f"Unfilled placeholder: {PLACEHOLDER.search(raw).group(0)}")

    # Them over me
    you = len(re.findall(r"\b(you|your|you're|yours)\b", core, re.I))
    me = len(re.findall(r"\b(i|i'm|i've|we|we're|we've|our|us|my|me)\b", core, re.I))
    if me > you:
        add("WARN", "focus", f"Sender-focused: I/we/our={me} vs you/your={you}.")
    first_line = core.split("\n", 1)[0].strip().lower()
    if first and re.match(r"^(i|i'm|we|we're|my|our)\b", first_line):
        add("WARN", "focus", "Opens with I/we; open on them.")

    errors = sum(i["level"] == "ERROR" for i in issues)
    return {
        "step": step, "subject": subject, "words": words, "grade": grade, "questions": q,
        "you_vs_me": f"{you}:{me}", "errors": errors, "warnings": len(issues) - errors,
        "verdict": "FAIL" if errors else ("REVIEW" if issues else "PASS"), "issues": issues,
    }


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("file", nargs="?", help="Draft file (default: stdin)")
    ap.add_argument("--json", action="store_true", help="Machine-readable output")
    args = ap.parse_args()
    raw = open(args.file, encoding="utf-8").read() if args.file else sys.stdin.read()
    emails = [e for e in re.split(r"^===\s*$", raw, flags=re.M) if e.strip()]
    results = [lint(e, i + 1) for i, e in enumerate(emails)]

    if args.json:
        print(json.dumps(results, indent=2))
    else:
        for r in results:
            print(f"Email {r['step']}: {r['verdict']}  | subject: {r['subject']!r} | {r['words']} words | "
                  f"grade {r['grade']} | {r['questions']} question(s) | you:me {r['you_vs_me']}")
            for i in r["issues"]:
                print(f"  [{i['level']}] {i['rule']}: {i['message']}")
    return 1 if any(r["errors"] for r in results) else 0


if __name__ == "__main__":
    sys.exit(main())
