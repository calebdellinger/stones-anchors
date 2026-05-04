/**
 * slide-scale.js
 * Scales .slide-container to fill the iframe viewport using
 * transform:scale(), which works reliably across all browsers
 * and inside iframes regardless of how the parent sizes the frame.
 *
 * Artboard: 1280 × 720px
 * The scale factor is min(viewportW/1280, viewportH/720) × 0.97
 * (the 0.97 gives a tiny inset so corner decorations are never clipped).
 */
(function () {
  var ARTBOARD_W = 1280;
  var ARTBOARD_H = 720;
  var INSET = 0.97;

  function scale() {
    var container = document.querySelector('.slide-container');
    if (!container) return;
    var vw = window.innerWidth;
    var vh = window.innerHeight;
    var factor = Math.min(vw / ARTBOARD_W, vh / ARTBOARD_H) * INSET;
    container.style.transform = 'scale(' + factor + ')';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scale);
  } else {
    scale();
  }
  window.addEventListener('resize', scale);
})();
