import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { homedir } from "node:os";

export interface SkoolConfig {
  cookies: string;
  defaultCommunity: string;
  baseUrl: string;
}

const CONFIG_PATH = join(homedir(), ".config", "skool-mcp", "config.json");
const BASE_URL = "https://www.skool.com";

let cached: SkoolConfig | null = null;

/** Accepts either a bare JWT or a full "auth_token=..." cookie string. */
function normaliseCookies(value: string): string {
  const v = value.trim();
  if (!v) return "";
  return v.includes("=") ? v : `auth_token=${v}`;
}

/**
 * Environment variables win (cloud sessions have no home-directory config):
 *   SKOOL_COOKIES            the auth_token cookie (required for anything private)
 *   SKOOL_DEFAULT_COMMUNITY  community slug used when a tool call omits one
 * Falls back to ~/.config/skool-mcp/config.json for local use.
 * baseUrl is fixed: letting config redirect it would send the cookie elsewhere.
 */
export async function loadConfig(): Promise<SkoolConfig> {
  if (cached) return cached;

  let file: Partial<SkoolConfig> = {};
  try {
    file = JSON.parse(await readFile(CONFIG_PATH, "utf-8")) as Partial<SkoolConfig>;
  } catch {
    // no config file: env vars only
  }

  cached = {
    cookies: normaliseCookies(process.env.SKOOL_COOKIES ?? file.cookies ?? ""),
    defaultCommunity: process.env.SKOOL_DEFAULT_COMMUNITY ?? file.defaultCommunity ?? "",
    baseUrl: BASE_URL,
  };
  return cached;
}

/** Write tools (post, comment, approve, reject, non-GET raw requests) are off unless this is "1". */
export function writesEnabled(): boolean {
  return process.env.SKOOL_ALLOW_WRITES === "1";
}
