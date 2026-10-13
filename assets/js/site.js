// Menú móvil: abre y cierra la navegación en pantallas pequeñas.
(function () {
  var header = document.querySelector('.site-header');
  var button = document.querySelector('.menu-toggle');
  var nav = document.getElementById('site-nav');
  if (!header || !button || !nav) return;

  function setOpen(open) {
    header.classList.toggle('is-open', open);
    button.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  button.addEventListener('click', function () {
    setOpen(!header.classList.contains('is-open'));
  });
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && header.classList.contains('is-open')) {
      setOpen(false);
      button.focus();
    }
  });
})();

// Perfiles del equipo: abre cada ficha en una ventana (dialog).
(function () {
  if (typeof HTMLDialogElement === 'undefined') return;
  document.querySelectorAll('[data-dialog]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var dlg = document.getElementById(btn.getAttribute('data-dialog'));
      if (dlg) dlg.showModal();
    });
  });
  document.querySelectorAll('dialog.profile').forEach(function (dlg) {
    dlg.querySelector('[data-close]').addEventListener('click', function () { dlg.close(); });
    // Cerrar al hacer clic fuera de la ficha
    dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
  });
})();
