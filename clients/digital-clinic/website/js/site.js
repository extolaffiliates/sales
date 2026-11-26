(function () {
  'use strict';

  /* Hero background loop: attach the video only on wider screens, with motion allowed and
     data saver off. Everyone else keeps the still poster. */
  var film = document.querySelector('.film-video');
  if (film) {
    var conn = navigator.connection || {};
    var wide = window.matchMedia('(min-width: 861px)').matches;
    var still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (wide && !still && !conn.saveData) {
      [['webm', 'video/webm'], ['mp4', 'video/mp4']].forEach(function (t) {
        var s = document.createElement('source');
        s.src = film.getAttribute('data-' + t[0]); s.type = t[1];
        film.appendChild(s);
      });
      film.addEventListener('playing', function () { film.classList.add('on'); }, { once: true });
      film.load();
      var play = function () { var p = film.play(); if (p && p.catch) p.catch(function () {}); };
      play();
      /* pause when the hero is off screen, to save battery */
      if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (es) {
          if (es[0].isIntersecting) play(); else film.pause();
        }).observe(film.parentNode);
      }
    }
  }

  /* Mobile menu */
  var nav = document.getElementById('nav');
  var toggle = nav && nav.querySelector('.nav-toggle');
  if (toggle) {
    var setOpen = function (open) {
      nav.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) { setOpen(false); toggle.focus(); }
    });
  }

  /* Copy the email address */
  var btn = document.getElementById('copy-email');
  var el = document.getElementById('email');
  if (btn && el) {
    btn.addEventListener('click', function () {
      var done = function () {
        btn.textContent = 'Copied';
        setTimeout(function () { btn.textContent = 'Copy address'; }, 1800);
      };
      var fallback = function () {
        var r = document.createRange(); r.selectNodeContents(el);
        var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
        btn.textContent = 'Selected, press copy';
      };
      try { navigator.clipboard.writeText(el.textContent.trim()).then(done, fallback); } catch (e) { fallback(); }
    });
  }

  /* Contact form: no backend. Builds a mailto link with subject and body and opens the
     visitor's email app. */
  var form = document.getElementById('contact-form');
  if (form) {
    var status = document.getElementById('form-status');
    var msg = form.querySelector('#f-message');
    var to = form.getAttribute('data-to');

    document.querySelectorAll('[data-topic]').forEach(function (a) {
      a.addEventListener('click', function () {
        if (!msg.value) msg.value = 'I would like to hear more about ' + a.getAttribute('data-topic') + '.\n\n';
      });
    });

    var check = function (input) {
      var ok = input.checkValidity();
      input.setAttribute('aria-invalid', ok ? 'false' : 'true');
      return ok;
    };
    form.querySelectorAll('input, textarea').forEach(function (input) {
      input.addEventListener('blur', function () { if (input.value) check(input); });
      input.addEventListener('input', function () { if (input.getAttribute('aria-invalid') === 'true') check(input); });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var fields = ['f-name', 'f-email', 'f-message'].map(function (id) { return document.getElementById(id); });
      var bad = fields.filter(function (f) { return !check(f); });
      if (bad.length) {
        var names = { 'f-name': 'your name', 'f-email': 'a valid email address', 'f-message': 'a few lines about the company' };
        status.textContent = 'Please add ' + bad.map(function (f) { return names[f.id]; }).join(', ') + '.';
        bad[0].focus();
        return;
      }
      var name = form.elements.namedItem('name').value.trim();
      var company = form.elements.namedItem('company').value.trim();
      var email = form.elements.namedItem('email').value.trim();
      var subject = 'Consultation enquiry' + (company ? ': ' + company : ': ' + name);
      var body = msg.value.trim() + '\n\n' + name + (company ? '\n' + company : '') + '\n' + email;
      window.location.href = 'mailto:' + to + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      status.textContent = 'Your email app should now be open with the message ready to send. If nothing opened, email ' + to + ' directly.';
    });
  }
})();
