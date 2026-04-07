(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  var SPEED_PX_PER_SEC = 28;
  var active = false;
  var rafId = 0;
  var lastT = 0;

  var wrap = document.createElement('div');
  wrap.className = 'autoscroll-wrap';
  wrap.setAttribute('aria-live', 'polite');

  var btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'autoscroll-btn';
  btn.setAttribute('aria-pressed', 'false');
  btn.title = 'Slowly scroll the page. Click again or press Escape to stop.';
  btn.textContent = 'Auto-scroll';

  function atBottom() {
    var doc = document.documentElement;
    var maxScroll = doc.scrollHeight - window.innerHeight;
    return maxScroll <= 0 || window.scrollY >= maxScroll - 2;
  }

  function stop() {
    active = false;
    lastT = 0;
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = 0;
    }
    btn.setAttribute('aria-pressed', 'false');
    btn.textContent = 'Auto-scroll';
  }

  function loop(t) {
    if (!active) return;
    if (!lastT) {
      lastT = t;
      rafId = requestAnimationFrame(loop);
      return;
    }
    var dt = Math.min((t - lastT) / 1000, 0.1);
    lastT = t;
    window.scrollBy(0, SPEED_PX_PER_SEC * dt);
    if (atBottom()) {
      stop();
      return;
    }
    rafId = requestAnimationFrame(loop);
  }

  function start() {
    if (atBottom()) {
      window.scrollTo(0, 0);
    }
    active = true;
    lastT = 0;
    btn.setAttribute('aria-pressed', 'true');
    btn.textContent = 'Stop';
    rafId = requestAnimationFrame(loop);
  }

  btn.addEventListener('click', function () {
    if (active) {
      stop();
    } else {
      start();
    }
  });

  window.addEventListener(
    'keydown',
    function (e) {
      if (e.key === 'Escape' && active) {
        stop();
      }
    },
    true
  );

  wrap.appendChild(btn);
  document.body.appendChild(wrap);
})();
