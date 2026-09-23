(function(){
  /* ===== DATA PORTFOLIO + ANIMASI RINGAN =====
     Data dari Admin (localStorage + pfdata.json GitHub), reveal, counter,
     marquee, form kontak, aurora, tilt 3D, parallax hero, slide antar halaman. */

  var $=function(s,r){return (r||document).querySelector(s)};
  var $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var PFL={};try{PFL=JSON.parse(localStorage.getItem('pfData')||'null')||{}}catch(e){PFL={}}
  var GH={owner:'fsstraa',repo:'portofolio',branch:'main',file:'pfdata.json'};
  var DH={
    igL:'https://instagram.com/rizky.pratama', ig:'@rizky.pratama',
    ghL:'https://github.com/rizkypratama', gh:'@rizkypratama',
    liL:'https://linkedin.com/in/rizkypratama', li:'/in/rizkypratama',
    em:'rizky.pratama@gmail.com', waL:'6281234567890', wa:'+62 812-3456-7890'
  };
  function buildDH(){
    return {
      ig:PFL.ig||DH.ig, igL:PFL.igL||DH.igL,
      gh:PFL.gh||DH.gh, ghL:PFL.ghL||DH.ghL,
      li:PFL.li||DH.li, liL:PFL.liL||DH.liL,
      em:PFL.email||DH.em, wa:PFL.wa||DH.wa, waL:PFL.waL||DH.waL
    };
  }

  /* ---------- TERAPKAN DATA DARI ADMIN ---------- */
  function applyPF(){
    if(!PFL||JSON.stringify(PFL)==='{}')return;
    $$('[data-pf]').forEach(function(el){var k=el.getAttribute('data-pf'),v=PFL[k];if(v!=null&&String(v).trim()!=='')el.textContent=String(v)});
    $$('[data-pf-lk]').forEach(function(el){var k=el.getAttribute('data-pf-lk');var v=(k==='email')?('mailto:'+(PFL.email||DH.em)):(PFL[k+'L']||'');if(v&&String(v).trim()!=='')el.setAttribute('href',v)});
    $$('[data-pf-i]').forEach(function(el){
      var k=el.getAttribute('data-pf-i'),v=PFL[k];
      if(v&&String(v).indexOf('data:')===0){
        el.src=v;
        var box=el.closest('.ph,.ab-ph');if(box)$$('.ph-bg',box).forEach(function(b){b.classList.add('gone')});
      }
    });
    $$('[data-pf-num]').forEach(function(el){var k=el.getAttribute('data-pf-num'),v=parseInt(PFL[k],10);if(!isNaN(v))el.dataset.to=v});
    $$('[data-pf-lbl]').forEach(function(el){var v=PFL[el.getAttribute('data-pf-lbl')];if(v!=null&&String(v).trim()!=='')el.textContent=String(v)});
  }
  applyPF();

  /* ---------- AMBIL DATA DARI GITHUB (lintas device) ---------- */
  try{
    fetch('https://raw.githubusercontent.com/'+GH.owner+'/'+GH.repo+'/'+GH.branch+'/'+GH.file+'?t='+Date.now(),{cache:'no-store'})
      .then(function(r){if(!r.ok)throw 0;return r.json()})
      .then(function(j){
        if(!j||typeof j!=='object')return;
        PFL=j;
        DH=buildDH();
        try{localStorage.setItem('pfData',JSON.stringify(PFL))}catch(e){}
        applyPF();
      })
      .catch(function(){});
  }catch(e){}

  /* ---------- REVEAL ---------- */
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});
  $$('.reveal').forEach(function(el){io.observe(el)});

  /* ---------- COUNTER (Pencapaian) ---------- */
  var co=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){var el=e.target,to=+el.dataset.to,suf=el.dataset.suf||'',v=0;
    (function tick(){v+=Math.max(1,Math.ceil((to-v)/15));el.textContent=v+suf;if(v<to)requestAnimationFrame(tick);else el.textContent=to+suf})();
    co.unobserve(el)}})},{threshold:.4});
  $$('.count').forEach(function(el){co.observe(el)});

  /* ---------- MARQUEE (Keahlian) ---------- */
  $$('.m-track').forEach(function(tr){tr.innerHTML+=tr.innerHTML});

  /* ---------- FORM (Kontak) ---------- */
  var form=$('#contactForm');
  if(form){
    form.addEventListener('submit',function(e){
      e.preventDefault();
      var f=e.target;
      window.location.href='mailto:'+DH.em+'?subject='+encodeURIComponent('Pesan portofolio dari '+f.name.value+' ('+f.email.value+')')+'&body='+encodeURIComponent(f.msg.value);
    });
  }

  /* ---------- LAPISAN LATAR PER-HALAMAN (gaya editor/terminal, tiap page beda) ---------- */
  var SC={
    'index.html':{tabs:['fachry.tsx','server.ts'],exp:'EXPLORER',
      tree:[[1,'#e8a33d','app.ts'],[1,'#79c0ff','ui.css'],[0,'#7ee787','index.ts'],[0,'#79c0ff','fachry.tsx']],
      rows:['<span class="c-c">// folio — build &amp; deploy in one shot</span>',
        '<span class="c-k">import</span> <span class="c-w">ui</span> <span class="c-k">from</span> <span class="c-g">"./ui"</span>;',
        '<span class="c-k">const</span> <span class="c-w">theme</span> = <span class="c-g">"#ff6901"</span>;',
        '<span class="c-k">export async function</span> <span class="c-b">build</span>(site) {',
        '&nbsp;&nbsp;<span class="c-k">const</span> out = <span class="c-k">await</span> <span class="c-b">compile</span>(site.files);',
        '&nbsp;&nbsp;<span class="c-k">if</span> (fmt(out).size &gt; 8120) <span class="c-k">return</span> <span class="c-b">warn</span>(site);',
        '&nbsp;&nbsp;<span class="c-k">return</span> <span class="c-b">push</span>(gh, out);','}','',
        '<span class="c-c">// 0 errors · main ●</span>'],
      st:['main ●','0▲ 0▼','ln 7, col 4','UTF-8','LF','2 sp']},
    'biodata.html':{tabs:['profile.ts','hobbies.ts'],exp:'PERSONAL',
      tree:[[1,'#e8a33d','cv.pdf'],[1,'#79c0ff','foto.png'],[0,'#7ee787','profile.ts'],[0,'#79c0ff','hobbies.ts']],
      rows:['<span class="c-c">// profil pribadi — Fachry</span>',
        '<span class="c-k">export const</span> <span class="c-w">person</span> = {',
        '&nbsp;&nbsp;origin : <span class="c-g">"Tangerang, Indonesia"</span>,',
        '&nbsp;&nbsp;focus  : <span class="c-g">"web + on-device ai"</span>,',
        '&nbsp;&nbsp;edu    : <span class="c-g">"itsn — teknik informatika"</span>,',
        '&nbsp;&nbsp;hobby  : [<span class="c-b">build</span>, <span class="c-b">read</span>, <span class="c-b">plot</span>],',
        '};','',
        '<span class="c-w">person</span>.title = <span class="c-g">"biasa dipanggil FS"</span>;',
        '<span class="c-c">// wa/email dikelola via menu admin</span>'],
      st:['main ●','profile read','ln 9, col 2','UTF-8','LF','2 sp']},
    'keahlian.html':{tabs:['stack.yml','dotfiles'],exp:'STACK',
      tree:[[1,'#e8a33d','.npmrc'],[1,'#79c0ff','settings.json'],[0,'#7ee787','stack.yml']],
      rows:['<span class="c-k">stack:</span>',
        '&nbsp;&nbsp;frontend : [react, laravel, flutter]',
        '&nbsp;&nbsp;ai&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: [local llm, vision]',
        '&nbsp;&nbsp;tools&nbsp;&nbsp;&nbsp;: [figma, git, docker]',
        '&nbsp;&nbsp;lang&nbsp;&nbsp;&nbsp;&nbsp;: [ts, js, php, dart]',
        '<span class="c-k">notes:</span>',
        '&nbsp;&nbsp;- dipakai harian, bukan cuma tau nama','',
        '<span class="c-c"># 36 logo, dua jalur marquee</span>',
        '<span class="c-c"># arahkan kursor untuk pause</span>'],
      st:['main ●','yaml lint ok','UTF-8','LF','2 sp']},
    'kegiatan.html':{tabs:['CHANGELOG.md','log-2026'],exp:'LOG',
      tree:[[0,'#7ee787','build-day.md'],[0,'#79c0ff','workshop-ondevice.md'],[0,'#e8a33d','kepanitiaan.md']],
      rows:['<span class="c-w"># kegiatan — 2026</span>','',
        '<span class="c-k">##</span> lomba &amp; workshop',
        '- build day @ kampus — ui/ux 3 besar',
        '- workshop on-device ai — 40 peserta','',
        '<span class="c-k">##</span> organisasi',
        '- panitia tryout nasional (2 season)',
        '- mentor kelas web — 15 siswa','',
        '<span class="c-c">// setiap ide tercatat di sini</span>'],
      st:['main ●','+11 entries','UTF-8','LF']},
    'proyek.html':{tabs:['deploy.sh','app.ts'],exp:'SHIP',
      tree:[[0,'#79c0ff','dashboard.md'],[0,'#e8a33d','pos-kasir'],[0,'#7ee787','ai-scan.md']],
      rows:['<span class="c-c">#!/bin/bash</span>',
        '<span class="c-w">git</span> push gh folio',
        '<span class="c-w">npm</span> run gen <span class="c-k">&amp;&amp;</span> <span class="c-w">npm</span> run build',
        '<span class="c-w">scp</span> dist/* fs@vps:/srv/folio/',
        '<span class="c-w">curl</span> -fsS http://app.fs/healthz',
        '<span class="c-c"># → 200 ok (26ms)</span>','',
        '<span class="c-c"># tiap rilis tercatat</span>',
        '<span class="c-w">git</span> log --oneline -3',
        '<span class="c-c"># 3 feature, 2 fix, 0 bug baru</span>'],
      st:['main ●','deploy ok','26ms','UTF-8','LF','2 sp']},
    'pencapaian.html':{tabs:['trophy.ts','verif'],exp:'ACH',
      tree:[[0,'#7ee787','ach-2024.md'],[0,'#79c0ff','cert-2025'],[0,'#e8a33d','verif.ts']],
      rows:['<span class="c-c">// jejak — semua ada buktinya</span>',
        '<span class="c-k">const</span> ach = <span class="c-b">list</span>(<span class="c-g">"proof/"</span>)',
        '&nbsp;&nbsp;.filter(a =&gt; a.evidence == <span class="c-b">true</span>)',
        '&nbsp;&nbsp;.sort((a,b) =&gt; a.year - b.year);','',
        '<span class="c-c">// 12 entri · semua terverifikasi</span>',
        '<span class="c-c">// tidak ada klaim kosong</span>'],
      st:['main ●','12 entries','verified','UTF-8','LF']},
    'kontak.html':{tabs:['whos.ts','inbox'],exp:'INBOX',
      tree:[[0,'#7ee787','wa.txt'],[0,'#79c0ff','email.txt'],[0,'#e8a33d','linkedin.txt']],
      rows:['<span class="c-c">// balas &lt; 24 jam — janji</span>',
        '<span class="c-b">include</span>({ email, wa, linkedin });',
        '<span class="c-b">inbox</span>.read();',
        '<span class="c-k">for</span> (const msg <span class="c-k">of</span> q)',
        '&nbsp;&nbsp;<span class="c-b">reply</span>(msg, { soon: <span class="c-b">true</span> });','',
        '<span class="c-c">// pilih saluran favoritmu</span>',
        '<span class="c-c">// nggak usah basa-basi</span>'],
      st:['main ●','inbox 3 new','< 24h','UTF-8','LF']}
  };
  var cur = location.pathname.split('/').pop() || 'index.html';
  var S = SC[cur] || SC['index.html'];
  var treeHtml = (S.tree||[]).map(function(t){
    return '<div class="vsc-fl" style="--f:'+t[1]+';margin-left:'+(12+t[0]*20)+'px">'+t[2]+'</div>';
  }).join('');
  var rowsHtml = S.rows.map(function(r,i){
    return '<div class="vsc-row"><span class="vsc-g">'+(i+1)+'</span><code>'+r+'</code></div>';
  }).join('');
  var stHtml = S.st.map(function(x){return '<i>'+x+'</i>';}).join('');
  var ambient='<i class="bg-grid" aria-hidden="true"></i><i class="bg2" aria-hidden="true"></i>'
    +'<div class="vsc" aria-hidden="true">'
    +'<div class="vsc-title"><i></i><i></i><i></i><span class="vsc-tab">'+S.tabs[0]+'</span><span class="vsc-tab">'+S.tabs[1]+'</span></div>'
    +'<div class="vsc-main"><div class="vsc-act"><b></b><b></b><b></b><b></b><b></b></div>'
    +'<div class="vsc-side"><div class="vsc-sec">'+S.exp+'</div>'+treeHtml+'</div>'
    +'<div class="vsc-ed">'+rowsHtml+'</div></div>'
    +'<div class="vsc-status"><b></b><b></b><b></b>'+stHtml+'</div>'
    +'</div>'
    +'<i class="orb o1" aria-hidden="true"></i><i class="orb o2" aria-hidden="true"></i>'
    +'<div class="island"><i></i>fachry · folio</div>'
    +'<div class="grain"></div>';
  if(!document.querySelector('.orb'))document.body.insertAdjacentHTML('beforeend',ambient);

  /* ---------- 3D TILT HALUS (spring, gaya iOS) ---------- */
  if(!reduce){
    $$('.home-card,.proj,.ach,.act-card').forEach(function(card){
      var rx=0,ry=0,li=0,trx=0,tryI=0,tli=0,raf=null;
      function frame(){
        rx+=(trx-rx)*.13;ry+=(tryI-ry)*.13;li+=(tli-li)*.16;
        card.style.transform='perspective(900px) rotateX('+rx.toFixed(2)+'deg) rotateY('+ry.toFixed(2)+'deg) translateY('+li.toFixed(1)+'px)';
        if(Math.abs(trx-rx)>.01||Math.abs(tryI-ry)>.01||Math.abs(tli-li)>.01)raf=requestAnimationFrame(frame);else raf=null;
      }
      card.addEventListener('pointermove',function(e){
        var b=card.getBoundingClientRect();
        var px=(e.clientX-b.left)/b.width,py=(e.clientY-b.top)/b.height;
        trx=(.5-py)*9;tryI=(px-.5)*11;tli=-4;
        if(!raf)raf=requestAnimationFrame(frame);
      },{passive:true});
      card.addEventListener('pointerout',function(){trx=0;tryI=0;tli=0;if(!raf)raf=requestAnimationFrame(frame);},{passive:true});
    });
  }

  /* ---------- HERO 3D PARALLAX (beranda) ---------- */
  if(!reduce){
    var sc=$('.hero3d');
    if(sc){
      var cw=$('.cw',sc),hx=0,hy=0,thx=0,thy=0,hraf=null;
      function hframe(){
        hx+=(thx-hx)*.1;hy+=(thy-hy)*.1;
        cw.style.transform='rotateY('+(-14+hy*12).toFixed(2)+'deg) rotateX('+(5-hx*7).toFixed(2)+'deg)';
        if(Math.abs(thx-hx)>.01||Math.abs(thy-hy)>.01)hraf=requestAnimationFrame(hframe);else hraf=null;
      }
      sc.addEventListener('pointermove',function(e){
        var b=sc.getBoundingClientRect();
        thx=(e.clientX-b.left)/b.width-.5;thy=(e.clientY-b.top)/b.height-.5;
        if(!hraf)hraf=requestAnimationFrame(hframe);
      },{passive:true});
      sc.addEventListener('pointerleave',function(){thx=0;thy=0;if(!hraf)hraf=requestAnimationFrame(hframe);},{passive:true});
    }
  }

  /* ---------- SLIDE ANTAR HALAMAN ---------- */
  if(!reduce){
    var ORDER=['index.html','biodata.html','keahlian.html','kegiatan.html','proyek.html','pencapaian.html','kontak.html'];
    var cur=location.pathname.split('/').pop()||'index.html';
    var idx=ORDER.indexOf(cur);
    if(idx>-1){
      var main=document.getElementById('page');
      var sdir=sessionStorage.getItem('pfSlide');
      if(sdir){main.setAttribute('data-slide',sdir);sessionStorage.removeItem('pfSlide')}
      function slide(t,back){
        sessionStorage.setItem('pfSlide',back?'l':'r');
        main.style.setProperty('--sx',back?'-44px':'44px');
        main.classList.add('s-out');
        setTimeout(function(){location.href=t},260);
      }
      function go(dirTo){
        var t=idx+dirTo;if(t<0)t=ORDER.length-1;if(t>ORDER.length-1)t=0;
        slide(ORDER[t],dirTo>0);
      }
      document.addEventListener('keydown',function(e){
        if(e.key!=='ArrowLeft'&&e.key!=='ArrowRight')return;
        var tag=(e.target.tagName||'').toLowerCase();
        if(tag==='input'||tag==='textarea'||tag==='select'||e.target.isContentEditable)return;
        e.preventDefault();go(e.key==='ArrowRight'?1:-1);
      });
      var px0=null;
      document.addEventListener('pointerdown',function(e){px0=e.clientX},{passive:true});
      document.addEventListener('pointerup',function(e){if(px0==null)return;var dx=e.clientX-px0;px0=null;if(Math.abs(dx)>70)go(dx>0?-1:1);},{passive:true});
      document.addEventListener('click',function(e){
        var a=e.target.closest('a');if(!a)return;
        var href=(a.getAttribute('href')||'').trim();
        if(!href||href[0]==='#'||/^(https?:|mailto:|tel:|javascript:)/i.test(href)||a.target==='_blank')return;
        var t=ORDER.indexOf(href);
        if(t<0)return;
        if(t===idx){e.preventDefault();return}
        e.preventDefault();
        slide(href,t>idx);
      });
      var hint=document.createElement('div');
      hint.className='swipe-hint';hint.textContent='← → panah / geser untuk pindah halaman';
      document.body.appendChild(hint);
      setTimeout(function(){hint.classList.add('show')},700);
      setTimeout(function(){hint.classList.remove('show')},9000);
    }
  }
})();