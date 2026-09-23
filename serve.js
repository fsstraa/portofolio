/* ============================================================
   serve.js — dev server live-reload + auto-sync
   ------------------------------------------------------------
   Jalankan:  node serve.js          (default port 8123)
   Buka:      http://localhost:8123

   Setiap kamu simpan file di VS Code:
     1. Browser auto-refresh (live reload via SSE).
     2. Versi cache (?v=) di semua halaman otomatis naik.
     3. Perubahan otomatis di-commit + di-push ke GitHub
        (GitHub Pages ikut update) -> tersimpan permanen.

   Opsional:
     AUTO_PUSH=0 node serve.js   -> matikan auto git push
     node serve.js 9000          -> ganti port
   ============================================================ */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const ROOT = __dirname;
const PORT = Number(process.argv[2]) || 8123;
const AUTO_PUSH = String(process.env.AUTO_PUSH || '1') !== '0';

const MIME = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.gif': 'image/gif', '.webp': 'image/webp', '.ico': 'image/x-icon',
  '.woff2': 'font/woff2', '.woff': 'font/woff', '.ttf': 'font/ttf',
  '.json': 'application/json', '.txt': 'text/plain; charset=utf-8',
  '.pdf': 'application/pdf'
};

const PAGES = ['index.html','biodata.html','keahlian.html','kegiatan.html','proyek.html','pencapaian.html','kontak.html'];
const GIT_FILES = PAGES.concat(['assets', 'serve.js']);
const IGNORE = /(^|[\\/])\.git([\\/]|$)|^serve\.js$|serve\.log|jawaban|diskusi|^npm-debug|chrome-profile/i;

const clients = new Set();
const selfMap = {};

/* ---------- token ?v= dipompa tiap ada perubahan ---------- */
function bumpAll() {
  let any = false;
  for (const f of PAGES) {
    const p = path.join(ROOT, f);
    try {
      const t = fs.readFileSync(p, 'utf8');
      const t2 = t.replace(/v=\d+/g, m => 'v=' + (Number(m.slice(2)) + 1));
      if (t2 !== t) { fs.writeFileSync(p, t2, 'utf8'); selfMap[path.basename(f)] = Date.now(); any = true; }
    } catch (e) { /* skip */ }
  }
  return any;
}

/* ---------- auto commit + push ---------- */
function gitSync() {
  if (!AUTO_PUSH) return;
  const G = 'git -c user.name=fsstraa -c user.email=fsstraa@users.noreply.github.com';
  const list = GIT_FILES.join(' ');
  exec(G + ' add -- ' + list, { cwd: ROOT }, (e1) => {
    if (e1) return console.error('[sync] add gagal:', e1.message);
    exec(G + ' commit -m "auto: sync site (live edit)"', { cwd: ROOT }, (e2, so) => {
      if (e2) { if (!/nothing to commit/.test(so + ' ' + e2.message)) console.error('[sync] commit:', so, e2.message); return; }
      exec('git push origin main', { cwd: ROOT }, (e3) => {
        console.log(e3 ? '[sync] push gagal: ' + e3.message : '[sync] tersimpan permanen di GitHub Pages ✔');
      });
    });
  });
}

/* ---------- schedule live reload ---------- */
let timer = null;
let suppressUntil = 0;
function schedule(file) {
  if (!file || IGNORE.test(file)) return;
  if (Date.now() < suppressUntil) return;
  const base = path.basename(file);
  if (selfMap[base] && Date.now() - selfMap[base] < 900) return;
  clearTimeout(timer);
  timer = setTimeout(() => {
    console.log('[reload] ->', file);
    bumpAll();
    for (const c of clients) { try { c.write('data: go\n\n'); } catch (e) { clients.delete(c); } }
    suppressUntil = Date.now() + 1500;
    gitSync();
  }, 900);
}

/* ---------- watcher ---------- */
try {
  fs.watch(ROOT, { recursive: true }, (_evt, name) => schedule(name));
  console.log('[watch] memantau ' + ROOT);
} catch (e) {
  console.error('[watch] gagal, auto-reload nonaktif:', e.message);
}

/* ---------- server ---------- */
http.createServer((req, res) => {
  const url = req.url.split('?')[0];

  if (url === '/__reload') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    });
    res.write('retry: 2000\n\n');
    clients.add(res);
    req.on('close', () => clients.delete(res));
    return;
  }

  let p;
  try { p = path.resolve(ROOT, '.' + decodeURIComponent(url)); } catch (e) { res.writeHead(400); res.end('bad request'); return; }
  if (p !== ROOT && !p.startsWith(ROOT + path.sep)) { res.writeHead(403); res.end('forbidden'); return; }

  fs.stat(p, (err, st) => {
    if (!err && st.isDirectory()) p = path.join(p, 'index.html');
    fs.readFile(p, (err2, buf) => {
      if (err2) { res.writeHead(404); res.end('404'); return; }
      const ext = path.extname(p).toLowerCase();
      const isHtml = ext === '.html';
      res.writeHead(200, {
        'Content-Type': MIME[ext] || 'application/octet-stream',
        'Cache-Control': 'no-store'
      });
      if (isHtml) {
        let t = buf.toString('utf8');
        t = t.replace('</body>',
          '<script>(function(){try{new EventSource("http://' + req.headers.host + '/__reload").onmessage=function(e){if(e.data==="go")location.reload()};}catch(e){}})();</script></body>');
        res.end(t);
      } else {
        res.end(buf);
      }
    });
  });
}).listen(PORT, () => {
  console.log('  Situs: http://localhost:' + PORT);
  console.log('  Edit file di VS Code lalu Simpan (Ctrl+S).');
  console.log('  Auto-push: ' + (AUTO_PUSH ? 'AKTIF' : 'mati (AUTO_PUSH=0 untuk mengunci)'));
});