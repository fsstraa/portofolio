(function () {
  'use strict';
  var GH = { owner: 'fsstraa', repo: 'portofolio', branch: 'main', file: 'pfdata.json' };
  var PFL = null;
  try { PFL = JSON.parse(localStorage.getItem('pfData') || 'null') || null; } catch (e) { PFL = null; }
  function apply() {
    if (!PFL) return;
    document.querySelectorAll('[data-pf]').forEach(function (el) {
      var k = el.getAttribute('data-pf'), v = PFL[k];
      if (v != null && String(v).trim() !== '') el.textContent = String(v);
    });
    document.querySelectorAll('[data-pf-num]').forEach(function (el) {
      var k = el.getAttribute('data-pf-num'), v = parseInt(PFL[k], 10);
      if (!isNaN(v)) el.textContent = v + (el.dataset.suf || '+');
    });
  }
  apply();
  try {
    fetch('https://raw.githubusercontent.com/' + GH.owner + '/' + GH.repo + '/' + GH.branch + '/' + GH.file + '?t=' + Date.now(), { cache: 'no-store' })
      .then(function (r) { if (!r.ok) throw 0; return r.json(); })
      .then(function (j) {
        if (!j || typeof j !== 'object') return;
        PFL = j;
        try { localStorage.setItem('pfData', JSON.stringify(PFL)); } catch (e) {}
        apply();
      })
      .catch(function () {});
  } catch (e) {}
})();