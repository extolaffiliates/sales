/* EffectivePoint value stack: isometric layers that drop in, carry a signal upward,
   press together into one stack, then loop. Labels come from the <li> items in
   .stack-legend, so the wording lives in the HTML. */
(function () {
  var NS = 'http://www.w3.org/2000/svg';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function el(name, attrs, parent) {
    var e = document.createElementNS(NS, name);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }
  function clamp(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
  function ease(x) { x = clamp(x); return x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; }
  function back(x) { x = clamp(x); var c = 1.4; return 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2); }

  // geometry: isometric rhombus centred on (0,0); (s,t) in [0,1] across its face
  var W = 270, H = 156, CX = 550, BASE = 650, GAP_OPEN = 112, GAP_SHUT = 30;
  function P(s, t) { return [(s - t) * W, -H + (s + t) * H]; }
  function pts(list) { return list.map(function (p) { return p[0].toFixed(1) + ',' + p[1].toFixed(1); }).join(' '); }
  function quad(s, t, ds, dt) { return pts([P(s, t), P(s + ds, t), P(s + ds, t + dt), P(s, t + dt)]); }

  var STYLE = [
    { fill: '#12261b', op: .97, edge: 'rgba(123,221,99,.28)' },
    { fill: '#0d4a2e', op: .92, edge: 'rgba(123,221,99,.3)' },
    { fill: '#0b7443', op: .86, edge: 'rgba(255,255,255,.22)' },
    { fill: '#36a867', op: .74, edge: 'rgba(255,255,255,.35)' },
    { fill: '#f3f1ec', op: .97, edge: 'rgba(255,255,255,.9)' }
  ];

  function texture(i, g) {
    if (i === 0) { // data: a quiet grid
      for (var k = 1; k < 6; k++) {
        el('line', { x1: P(k / 6, 0)[0], y1: P(k / 6, 0)[1], x2: P(k / 6, 1)[0], y2: P(k / 6, 1)[1], class: 'tx-grid' }, g);
        el('line', { x1: P(0, k / 6)[0], y1: P(0, k / 6)[1], x2: P(1, k / 6)[0], y2: P(1, k / 6)[1], class: 'tx-grid' }, g);
      }
      el('polygon', { points: quad(.58, .62, .26, .07), class: 'mark' }, g);
    } else if (i === 1) { // ERP: modules
      [[.14, .18, .22, .14], [.42, .18, .22, .14], [.14, .45, .5, .12], [.70, .18, .14, .39]].forEach(function (m) {
        el('polygon', { points: quad(m[0], m[1], m[2], m[3]), class: 'tx-module' }, g);
      });
      el('polygon', { points: quad(.2, .72, .3, .07), class: 'mark' }, g);
    } else if (i === 2) { // operating model: a process flow
      var nodes = [[.16, .3], [.4, .52], [.62, .3], [.82, .62]];
      el('polyline', { points: pts(nodes.map(function (n) { return P(n[0], n[1]); })), class: 'tx-flow' }, g);
      nodes.forEach(function (n) { var p = P(n[0], n[1]); el('circle', { cx: p[0], cy: p[1], r: 6, class: 'tx-node' }, g); });
      el('polygon', { points: quad(.18, .7, .28, .07), class: 'mark' }, g);
    } else if (i === 3) { // AI: points that flicker on
      [[.2, .25], [.33, .62], [.5, .35], [.62, .7], [.75, .22], [.82, .5], [.45, .85]].forEach(function (n, j) {
        var p = P(n[0], n[1]); el('circle', { cx: p[0], cy: p[1], r: 4.5, class: 'tx-dot', style: 'animation-delay:' + (j * .37).toFixed(2) + 's' }, g);
      });
      el('polygon', { points: quad(.56, .12, .28, .07), class: 'mark' }, g);
    } else { // value: a rising line
      var line = [[.1, .78], [.28, .7], [.42, .74], [.58, .5], [.72, .44], [.9, .2]];
      var chart = el('polyline', { points: pts(line.map(function (n) { return P(n[0], n[1]); })), class: 'tx-chart' }, g);
      var end = P(.9, .2); el('circle', { cx: end[0], cy: end[1], r: 7, class: 'tx-chart-end' }, g);
      el('polygon', { points: quad(.16, .14, .3, .07), class: 'mark' }, g);
      return chart;
    }
  }

  function init(fig) {
    var items = Array.prototype.slice.call(fig.querySelectorAll('.stack-legend li'));
    var n = items.length;
    var svg = el('svg', { viewBox: '-50 -40 1200 900', 'aria-hidden': 'true', focusable: 'false' });
    fig.insertBefore(svg, fig.firstChild);
    var defs = el('defs', {}, svg);
    var f = el('filter', { id: 'stack-glow', x: '-50%', y: '-50%', width: '200%', height: '200%' }, defs);
    el('feGaussianBlur', { stdDeviation: 6, result: 'b' }, f);
    var m = el('feMerge', {}, f); el('feMergeNode', { in: 'b' }, m); el('feMergeNode', { in: 'SourceGraphic' }, m);

    var spine = el('line', { x1: CX, x2: CX, class: 'spine' }, svg);
    var layers = [], labels = [];
    var labelLayer = el('g', { class: 'labels' });
    for (var i = 0; i < n; i++) {
      var s = STYLE[Math.min(i, STYLE.length - 1)];
      var g = el('g', { class: 'layer' + (i === n - 1 ? ' top' : '') }, svg);
      el('polygon', { points: quad(0, 0, 1, 1), fill: s.fill, 'fill-opacity': s.op, stroke: s.edge, 'stroke-width': 1.2, class: 'face' }, g);
      var chart = texture(i === n - 1 ? 4 : i, g);
      layers.push({ g: g, chart: chart });

      var right = (i % 2 === 1) || i === n - 1;
      var lg = el('g', { class: 'label' + (i === n - 1 ? ' label-top' : '') }, labelLayer);
      var x0 = right ? CX + W + 10 : CX - W - 10, x1 = right ? x0 + 46 : x0 - 46, tx = right ? x1 + 12 : x1 - 12;
      var ld = el('line', { x1: x0, y1: 0, x2: x1, y2: 0, class: 'leader' }, lg);
      var t1 = el('text', { x: tx, y: -4, class: 'lbl-t', 'text-anchor': right ? 'start' : 'end' }, lg);
      t1.textContent = items[i].getAttribute('data-title');
      var t2 = el('text', { x: tx, y: 17, class: 'lbl-s', 'text-anchor': right ? 'start' : 'end' }, lg);
      t2.textContent = items[i].getAttribute('data-sub');
      labels.push({ g: lg, leader: ld });
    }
    svg.appendChild(labelLayer);
    var dot = el('circle', { r: 7, cx: CX, class: 'signal', filter: 'url(#stack-glow)' }, svg);

    var T = 12.5;
    function frame(t) {
      var shut = ease((t - 5.9) / 1.1);               // 0 open -> 1 pressed together
      var gap = GAP_OPEN + (GAP_SHUT - GAP_OPEN) * shut;
      var fade = 1 - ease((t - 11.0) / .9);             // whole-scene fade before the loop restarts
      var baseShift = shut * ((n - 1) * (GAP_OPEN - GAP_SHUT)) / 2; // keep the pressed stack centred
      var ys = [];
      for (var i = 0; i < n; i++) {
        var start = .25 + i * .5, p = back((t - start) / .95), land = clamp((t - start) / .95);
        var bob = (1 - shut) * Math.sin(t * 1.3 + i * .8) * 3;
        var y = BASE - i * gap - (1 - p) * 170 + bob - baseShift;
        ys.push(y);
        var L = layers[i];
        L.g.setAttribute('transform', 'translate(' + CX + ',' + y.toFixed(2) + ')');
        L.g.style.opacity = (ease(land * 1.6) * fade).toFixed(3);
        var lit = t > 3.2 + i * .45 && t < 11;
        L.g.classList.toggle('lit', lit);
        var top = i === n - 1;
        var lab = clamp((t - start - .7) / .45) * (top ? 1 : 1 - shut) * fade;
        labels[i].g.setAttribute('transform', 'translate(0,' + y.toFixed(2) + ')');
        labels[i].g.style.opacity = lab.toFixed(3);
        labels[i].leader.style.strokeDashoffset = (46 * (1 - clamp((t - start - .6) / .4))).toFixed(1);
        items[i].classList.toggle('on', lab > .5 || (top && shut > .5 && fade > .5));
        if (L.chart) L.chart.style.strokeDashoffset = (520 * (1 - ease((t - 6.6) / 1.3))).toFixed(1);
      }
      fig.classList.toggle('pressed', shut > .5 && fade > .2);
      spine.setAttribute('y1', ys[0]); spine.setAttribute('y2', ys[n - 1]);
      spine.style.opacity = (clamp((t - 2.6) / .5) * (1 - shut) * .9 * fade).toFixed(3);
      var sp = clamp((t - 3.2) / (.45 * (n - 1) + .2));  // signal climbs layer by layer
      var sy = ys[0] + (ys[n - 1] - ys[0]) * sp;
      dot.setAttribute('cy', sy.toFixed(2));
      dot.style.opacity = (t > 3.1 && t < 6.0 ? Math.min(1, (t - 3.1) * 4, (6.0 - t) * 3) : 0).toFixed(3);
    }

    function size() { fig.classList.toggle('compact', fig.clientWidth < 700); }
    size(); window.addEventListener('resize', size);

    if (reduce) { frame(7.9); return; }           // still image: pressed stack, value drawn
    var t0 = null, running = false, raf = 0, offset = 0;
    function loop(now) {
      if (t0 === null) t0 = now - offset * 1000;
      var t = ((now - t0) / 1000) % T;
      offset = t; frame(t);
      raf = requestAnimationFrame(loop);
    }
    function start() { if (!running) { running = true; t0 = null; raf = requestAnimationFrame(loop); } }
    function stop() { running = false; cancelAnimationFrame(raf); }
    frame(0);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) { es[0].isIntersecting ? start() : stop(); }, { threshold: .15 }).observe(fig);
    } else start();
    document.addEventListener('visibilitychange', function () { document.hidden ? stop() : start(); });
  }

  document.querySelectorAll('[data-stack]').forEach(init);
})();
