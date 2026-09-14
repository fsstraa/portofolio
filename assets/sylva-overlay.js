(function () {
  'use strict';
  var overlay = document.getElementById('pageOverlay');
  var frame = document.getElementById('pageFrame');
  var closeBtn = document.getElementById('overlayClose');
  var tag = document.getElementById('overlayTag');
  var labels = {};
  document.querySelectorAll('[data-open]').forEach(function (el) {
    var file = el.getAttribute('data-open');
    var label = (el.getAttribute('data-open-label') || '').trim()
      || el.closest('[data-dock]') && el.querySelector('span:last-child') && el.querySelector('span:last-child').textContent.trim()
      || file.replace('.html', '');
    if (!labels[file]) labels[file] = label;
  });
  document.querySelectorAll('.dock-item').forEach(function (el) {
    var file = el.getAttribute('data-open');
    if (file && !labels[file]) {
      var sp = el.querySelector('span:last-child');
      labels[file] = sp ? sp.textContent.trim() : file.replace('.html', '');
    }
  });
  function openPage(file) {
    if (!overlay || !frame) return;
    var title = labels[file] ? labels[file] : file.replace('.html', '');
    tag.textContent = title.charAt(0).toUpperCase() + title.slice(1);
    frame.setAttribute('src', file);
    frame.addEventListener('load', function onLoad() {
      frame.removeEventListener('load', onLoad);
      try {
        var doc = frame.contentDocument;
        if (doc && doc.body) doc.body.classList.add('sylva-frame');
      } catch (e) {}
    });
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    try {
      if (window.__sylvaPause) window.__sylvaPause(true);
    } catch (e) {}
  }
  function closePage() {
    if (!overlay || !frame) return;
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    setTimeout(function () { frame.setAttribute('src', 'about:blank'); }, 450);
    try {
      if (window.__sylvaPause) window.__sylvaPause(false);
    } catch (e) {}
  }
  window.openPage = openPage;
  window.closePage = closePage;
  closeBtn.addEventListener('click', closePage);
  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-open]');
    if (!el) return;
    e.preventDefault();
    if (el.closest('.dock')) return;
    openPage(el.getAttribute('data-open'));
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay && overlay.classList.contains('is-open')) {
      closePage();
    }
  });
  var mark = document.querySelector('.dock-mark');
  if (mark) {
    mark.addEventListener('click', function (e) {
      if (overlay && overlay.classList.contains('is-open')) {
        e.preventDefault();
        closePage();
      }
    });
  }
})();