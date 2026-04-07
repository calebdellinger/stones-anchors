(function () {
  const flipper = document.getElementById('flipper');
  if (!flipper) return;

  document.querySelectorAll('[data-flip="to-back"]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      flipper.classList.add('flipped');
    });
  });

  document.querySelectorAll('[data-flip="to-front"]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      flipper.classList.remove('flipped');
    });
  });
})();
