(function(){
  /* ================= KONFIGURASI HALAMAN / SEJARAH AI =================
     Ubah nama, warna era, dan urutan halaman di sini. Warna di sini harus
     cocok dengan tema body[data-page=...] di assets/styles.css */
  var PAGES=[
    {key:'index',     file:'index.html',     label:'Beranda',    year:'2025', name:'Era AI Generatif',      color:'#ff2d8f'},
    {key:'biodata',   file:'biodata.html',   label:'Biodata',    year:'2015', name:'Era Deep Learning',     color:'#00e0c6'},
    {key:'keahlian',  file:'keahlian.html',  label:'Keahlian',   year:'2006', name:'Era Machine Learning',  color:'#3b82f6'},
    {key:'proyek',    file:'proyek.html',    label:'Proyek',     year:'1997', name:'Era Deep Blue',         color:'#22c55e'},
    {key:'kegiatan',  file:'kegiatan.html',  label:'Kegiatan',   year:'1986', name:'Era Sistem Pakar',      color:'#f59e0b'},
    {key:'pencapaian',file:'pencapaian.html',label:'Pencapaian', year:'1966', name:'Era Logika & ELIZA',    color:'#a78bfa'},
    {key:'kontak',    file:'kontak.html',    label:'Kontak',     year:'1950', name:'Kelahiran AI - Turing', color:'#e0b060'}
  ];

  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var cur=location.pathname.split('/').pop();
  if(!cur)cur='index.html';
  var CI=-1,CP=null;
  PAGES.forEach(function(p,i){if(p.file===cur){CI=i;CP=p}});
  if(!CP){CI=0;CP=PAGES[0]}
  document.body.setAttribute('data-page',CP.key);

  var $=function(s,r){return (r||document).querySelector(s)};
  var $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};

  /* ---------- DATA DARI ADMIN (localStorage) ---------- */
  var PFL={};try{PFL=JSON.parse(localStorage.getItem('pfData')||'null')||{}}catch(e){PFL={}}
  var DH={
    igL:PFL.igL||'https://instagram.com/rizky.pratama', ig:PFL.ig||'@rizky.pratama',
    ghL:PFL.ghL||'https://github.com/rizkypratama', gh:PFL.gh||'@rizkypratama',
    liL:PFL.liL||'https://linkedin.com/in/rizkypratama', li:PFL.li||'/in/rizkypratama',
    em:PFL.email||'rizky.pratama@gmail.com',
    waL:PFL.waL||'6281234567890', wa:PFL.wa||'+62 812-3456-7890'
  };
  var NAMA=PFL.nama||'Fachry Satria Putra';
  var GH={owner:'fsstraa',repo:'portofolio',branch:'main',file:'pfdata.json'};
  function buildDH(){
    return {
      igL:PFL.igL||'https://instagram.com/rizky.pratama', ig:PFL.ig||'@rizky.pratama',
      ghL:PFL.ghL||'https://github.com/rizkypratama', gh:PFL.gh||'@rizkypratama',
      liL:PFL.liL||'https://linkedin.com/in/rizkypratama', li:PFL.li||'/in/rizkypratama',
      em:PFL.email||'rizky.pratama@gmail.com',
      waL:PFL.waL||'6281234567890', wa:PFL.wa||'+62 812-3456-7890'
    };
  }
  DH=buildDH();

  /* ---------- ICON SOSMED ---------- */
  var IC={
    ig:'<svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>',
    gh:'<svg viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>',
    lk:'<svg viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
    gm:'<svg viewBox="0 0 24 24"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/></svg>',
    wa:'<svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>'
  };
  function buildSOC(){
    return '<a class="soc ig" href="'+DH.igL+'" target="_blank" rel="noopener" aria-label="Instagram">'+IC.ig+'</a>'+
           '<a class="soc gh" href="'+DH.ghL+'" target="_blank" rel="noopener" aria-label="GitHub">'+IC.gh+'</a>'+
           '<a class="soc lk" href="'+DH.liL+'" target="_blank" rel="noopener" aria-label="LinkedIn">'+IC.lk+'</a>'+
           '<a class="soc gm" href="mailto:'+DH.em+'" aria-label="Email">'+IC.gm+'</a>'+
           '<a class="soc wa" href="https://wa.me/'+DH.waL+'" target="_blank" rel="noopener" aria-label="WhatsApp">'+IC.wa+'</a>';
  }
  var SOC=buildSOC();

  /* ---------- INJECT NAV / FOOTER / ARAH ---------- */
  document.body.insertAdjacentHTML('afterbegin',
    '<div id="codeGrid"></div><div class="blob b1"></div><div class="blob b2"></div>'+
    '<nav id="navShell">'+
      '<ul>'+PAGES.map(function(p){return '<li><a href="'+p.file+'" data-slide class="'+(p.file===CP.file?'on':'')+'">'+p.label+'</a></li>'}).join('')+'</ul>'+
      '<button class="burger" aria-label="Menu"><span></span><span></span><span></span></button>'+
    '</nav>');

  var prev=PAGES[(CI-1+PAGES.length)%PAGES.length];
  var next=PAGES[(CI+1)%PAGES.length];
  var arrowL='<svg viewBox="0 0 24 24"><path d="M20 12H5"/><path d="M12 5l-7 7 7 7"/></svg>';
  var arrowR='<svg viewBox="0 0 24 24"><path d="M4 12h15"/><path d="M12 5l7 7-7 7"/></svg>';
  var ftr=(CI===0||CI===PAGES.length-1)?'<footer><div class="socials">'+SOC+'</div><p>Portofolio 3D ringan - HTML + CSS + JavaScript.<br>Copyright &copy; 2026 <b>'+NAMA+'</b> &middot; '+PFL.badge+'</p></footer>':'';
  document.body.insertAdjacentHTML('beforeend',
    '<a class="nav-btn prev" href="'+prev.file+'" data-slide aria-label="Halaman sebelumnya">'+arrowL+'<span>Kembali</span></a>'+
    '<a class="nav-btn next" href="'+next.file+'" data-slide aria-label="Halaman berikutnya"><span>Lanjut</span>'+arrowR+'</a>'+
    ftr);

  var navHid=null;
  function navShow(){
    document.body.classList.add('nav-visible');
    clearTimeout(navHid);
    navHid=setTimeout(function(){document.body.classList.remove('nav-visible')},3000);
  }
  navShow();
  ['mousemove','touchstart','wheel','scroll','keydown'].forEach(function(ev){
    document.addEventListener(ev,navShow,{passive:true});
  });

  /* ---------- NAV BEHAVIOR ---------- */
  var shell=$('#navShell'),burger=$('.burger');
  if(shell){
    var heroSoc=$('#heroSoc');if(heroSoc)heroSoc.innerHTML=SOC;
    window.addEventListener('scroll',function(){shell.classList.toggle('scrolled',window.scrollY>24)},{passive:true});
    burger.addEventListener('click',function(){document.body.classList.toggle('menu-open')});
    $$('#navShell ul a').forEach(function(a){a.addEventListener('click',function(){document.body.classList.remove('menu-open')})});
  }

  /* ---------- SLIDE NAVIGASI (zoom + popup) ---------- */
  var slideFrom=sessionStorage.getItem('pf_dir');sessionStorage.removeItem('pf_dir');
  if(slideFrom){document.body.classList.add('entering-r');setTimeout(function(){document.body.classList.remove('entering-r','entering-l')},520)}

  function showPV(p){
    if(reduce)return;
    var old=$('.pv');if(old)old.remove();
    var d=document.createElement('div');d.className='pv';
    var n=PAGES.indexOf(p);
    var num=String(n<0?0:n+1).padStart((PAGES.length+'').length,'0');
    d.innerHTML='<em class="k">Menuju</em><b>'+num+'</b><span>'+p.label+'</span><em class="e">'+p.name+'</em>';
    document.body.appendChild(d);
    requestAnimationFrame(function(){requestAnimationFrame(function(){d.classList.add('go')})});
  }

  function showHint(msg){
    if(reduce)return;
    try{if(sessionStorage.getItem('pf_kh'))return}catch(e){}
    var h=document.createElement('div');h.className='hint-pop';
    h.innerHTML='<svg viewBox="0 0 24 24"><path d="M4 12h15"/><path d="M13 7l5 5-5 5"/></svg><span>'+msg+'</span>';
    document.body.appendChild(h);
    requestAnimationFrame(function(){requestAnimationFrame(function(){h.classList.add('go')})});
    setTimeout(function(){h.classList.remove('go');h.classList.add('out');setTimeout(function(){if(h.parentNode)h.parentNode.removeChild(h)},460)},5200);
    try{sessionStorage.setItem('pf_kh','1')}catch(e){}
  }
  if(CI===0)showHint('Geser atau ketuk foto 2x untuk ke Biodata');
  else if(CI===1)showHint('Ketuk foto 2x untuk ke Keahlian');

  var lastTap=0,tapX=0,tapY=0;
  function bindDouble(sel){
    var el=$(sel);if(!el)return;
    el.addEventListener('dblclick',function(e){e.preventDefault();go(CI+1,'next')});
    el.addEventListener('touchend',function(e){
      var t=e.changedTouches[0],now=Date.now();
      if(now-lastTap<340&&Math.abs(t.clientX-tapX)<36&&Math.abs(t.clientY-tapY)<36){e.preventDefault();go(CI+1,'next')}
      lastTap=now;tapX=t.clientX;tapY=t.clientY;
    },{passive:false});
  }
  bindDouble('#scene');
  bindDouble('.ab-ph');

  function go(i,dir){
    var t=PAGES[(i+PAGES.length)%PAGES.length];
    if(t.file===CP.file)return;
    sessionStorage.setItem('pf_dir',dir);
    showPV(t);
    document.body.classList.add(dir==='next'?'exiting-r':'exiting-l');
    setTimeout(function(){location.href=t.file},reduce?0:320);
  }
  document.addEventListener('click',function(e){
    var a=e.target.closest('a[data-slide]');
    if(!a)return;e.preventDefault();
    var href=a.getAttribute('href');
    var ti;for(ti=0;ti<PAGES.length;ti++)if(PAGES[ti].file===href)break;
    if(ti===PAGES.length)return;
    if(ti===CI)return;
    var dir=a.classList.contains('prev')?'prev':a.classList.contains('next')?'next':(ti>CI?'next':'prev');
    go(ti,dir);
  });
  document.addEventListener('keydown',function(e){
    if(e.key==='ArrowRight')go(CI+1,'next');
    else if(e.key==='ArrowLeft')go(CI-1,'prev');
  });
  var sx=0,sy=0;
  document.addEventListener('touchstart',function(e){sx=e.touches[0].clientX;sy=e.touches[0].clientY},{passive:true});
  document.addEventListener('touchend',function(e){
    if(e.target.closest('#scene'))return;
    var dx=e.changedTouches[0].clientX-sx,dy=e.changedTouches[0].clientY-sy;
    if(Math.abs(dx)>70&&Math.abs(dx)>Math.abs(dy)*1.4)go(dx<0?CI+1:CI-1,dx<0?'next':'prev');
  },{passive:true});

  /* ---------- PARTIKEL HALUS (bulir) ---------- */
  var cv=$('#bg'),ptHide=false;
  document.addEventListener('visibilitychange',function(){ptHide=document.hidden});
  if(cv){try{
  var ctx=cv.getContext('2d'),W,H,parts=[],webs=[],px0=.5,py0=.5,px=.5,py=.5;
  var isTouch=('ontouchstart' in window)||(navigator.maxTouchPoints>0);
  function pgColor(){return (getComputedStyle(document.body).getPropertyValue('--pg')||'#3b82f6').trim()}
  function resize(){
    var d=Math.min(window.devicePixelRatio||1,isTouch?1.1:1.3);
    W=window.innerWidth;H=window.innerHeight;
    cv.width=Math.round(W*d);cv.height=Math.round(H*d);
    cv.style.width=W+'px';cv.style.height=H+'px';
    ctx.setTransform(d,0,0,d,0,0);
    var n=Math.round(Math.min(isTouch?30:52,Math.max(isTouch?12:18,W*H/(isTouch?38000:21000))));
    parts=[];for(var i=0;i<n;i++)parts.push(np());
    webs=[];
  }
  function np(){return {x:Math.random()*W,y:Math.random()*H,r:.5+Math.random()*1.5,vx:(Math.random()-.5)*.18,vy:-.04-Math.random()*.26,ph:Math.random()*6.2832,tw:.4+Math.random()*1.2,gl:(Math.random()<(isTouch?.15:.24)?TOKS[(Math.random()*TOKS.length)|0]:null)}}
  var TOKS=['{','}',';','=>','</>','[]','()','_','#','$','//',':'];
  window.webBurst=function(cx,cy){var n=reduce?10:26;for(var i=0;i<n;i++){var a=Math.random()*6.2832,s=.5+Math.random()*2.6;webs.push({x:cx,y:cy,vx:Math.cos(a)*s,vy:Math.sin(a)*s-1,r:1+Math.random()*1.8,life:1})}};
  function step(){
    if(ptHide){requestAnimationFrame(step);return}
    ctx.clearRect(0,0,W,H);
    px+=(px0-px)*.05;py+=(py0-py)*.05;
    var offx=(px-.5)*.5*Math.min(W,1400),offy=(py-.5)*.5*Math.min(H,900);
    var pgc=pgColor(),t=Date.now();
    for(var i=0;i<parts.length;i++){var p=parts[i];
      p.x+=p.vx;p.y+=p.vy;
      if(p.y<-10){p.y=H+10;p.x=Math.random()*W}
      if(p.x<-10)p.x=W+10;if(p.x>W+10)p.x=-10;
      var a=.14+.26*(Math.sin(t*(.0016*p.tw)+p.ph)*.5+.5);
      ctx.globalAlpha=a;
      ctx.fillStyle=pgc;
      if(p.gl){ctx.font=(8+p.r*6).toFixed(0)+'px "Courier New",monospace';ctx.fillText(p.gl,p.x+offx,p.y+offy)}
      else{ctx.beginPath();ctx.arc(p.x+offx,p.y+offy,p.r,0,6.2832);ctx.fill()}
    }
    ctx.globalAlpha=1;
    if(!reduce&&!isTouch&&parts.length<56){
      ctx.lineWidth=1;
      for(var i=0;i<parts.length;i++)for(var j=i+1;j<parts.length;j++){
        var a=parts[i],b=parts[j],dx=a.x-b.x,dy=a.y-b.y,d2=dx*dx+dy*dy;
        if(d2<8100){ctx.globalAlpha=.08*(1-d2/8100);ctx.strokeStyle=pgc;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()}
      }
      ctx.globalAlpha=1;
    }
    for(var i=webs.length-1;i>=0;i--){var w=webs[i];w.x+=w.vx;w.y+=w.vy;w.vy+=.05;w.life-=.02;
      if(w.life<=0){webs.splice(i,1);continue}
      ctx.globalAlpha=Math.max(0,w.life*.85);ctx.fillStyle=pgc;ctx.beginPath();ctx.arc(w.x,w.y,w.r,0,6.2832);ctx.fill()
    }
    ctx.globalAlpha=1;
    requestAnimationFrame(step);
  }
  window.addEventListener('resize',resize);
  window.addEventListener('mousemove',function(e){px0=e.clientX/W;py0=e.clientY/H},{passive:true});
  resize();if(!reduce)requestAnimationFrame(step);
  }catch(e){}}

  /* ---------- TERAPKAN DATA ADMIN ---------- */
  function applyPF(){
    if(PFL&&JSON.stringify(PFL)!=='{}'){
      $$('[data-pf]').forEach(function(el){var k=el.getAttribute('data-pf'),v=PFL[k];if(v!=null&&String(v).trim()!=='')el.textContent=String(v)});
      $$('[data-pf-lk]').forEach(function(el){var k=el.getAttribute('data-pf-lk');var v=(k==='email')?('mailto:'+(PFL.email||DH.em)):(PFL[k+'L']||'');if(v&&String(v).trim()!=='')el.setAttribute('href',v)});
      $$('[data-pf-i]').forEach(function(el){
        var k=el.getAttribute('data-pf-i'),v=PFL[k];
        if(v&&String(v).indexOf('data:')===0){el.src=v;var bg=el.closest('.ph,.ab-ph');if(bg)$$('.ph-bg',bg).forEach(function(b){b.classList.add('gone')})}
      });
      $$('[data-pf-num]').forEach(function(el){var k=el.getAttribute('data-pf-num'),v=parseInt(PFL[k],10);if(!isNaN(v))el.dataset.to=v});
      $$('[data-pf-lbl]').forEach(function(el){var v=PFL[el.getAttribute('data-pf-lbl')];if(v!=null&&String(v).trim()!=='')el.textContent=String(v)});
    }
  }
  applyPF();

  /* ---------- AMBIL DATA DARI GITHUB (lintas device) ---------- */
  function loadRemote(){
    try{
      fetch('https://raw.githubusercontent.com/'+GH.owner+'/'+GH.repo+'/'+GH.branch+'/'+GH.file+'?t='+Date.now(),{cache:'no-store'})
        .then(function(r){if(!r.ok)throw 0;return r.json()})
        .then(function(j){
          if(!j||typeof j!=='object')return;
          PFL=j;
          DH=buildDH();
          NAMA=PFL.nama||NAMA;
          SOC=buildSOC();
          try{localStorage.setItem('pfData',JSON.stringify(PFL))}catch(e){}
          var hS=$('#heroSoc');if(hS)hS.innerHTML=SOC;
          var ft=$('footer');
          if(ft){
            var fb=ft.querySelector('b');if(fb)fb.textContent=NAMA;
            var fS=ft.querySelector('.socials');if(fS)fS.innerHTML=SOC;
            var fP=ft.querySelector('p');if(fP&&PFL.badge)fP.innerHTML='Portofolio 3D ringan - HTML + CSS + JavaScript.<br>Copyright &copy; 2026 <b>'+NAMA+'</b> &middot; '+PFL.badge;
          }
          applyPF();
        })
        .catch(function(){});
    }catch(e){}
  }
  loadRemote();

  /* ---------- REVEAL ---------- */
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});
  $$('.reveal').forEach(function(el){io.observe(el)});

  /* ---------- COUNTER (Pencapaian) ---------- */
  var co=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){var el=e.target,to=+el.dataset.to,suf=el.dataset.suf||'',v=0;
    (function tick(){v+=Math.max(1,Math.ceil((to-v)/15));el.textContent=v+suf;if(v<to)requestAnimationFrame(tick);else el.textContent=to+suf})();
    co.unobserve(el)}})},{threshold:.4});
  $$('.count').forEach(function(el){co.observe(el)});

  /* ---------- TYPED (Beranda) ---------- */
  var te=$('#typed');
  if(te){
    var roles=(PFL.roles&&PFL.roles.length)?PFL.roles:['Web Development','Builder','UI/UX Designer'];
    var ri=0,ci=0,del=false;
    (function typeLoop(){
      te.textContent=roles[ri].slice(0,ci);
      if(!del){if(ci<roles[ri].length){ci++;setTimeout(typeLoop,60)}else{del=true;setTimeout(typeLoop,1500)}}
      else{if(ci>0){ci--;setTimeout(typeLoop,30)}else{del=false;ri=(ri+1)%roles.length;setTimeout(typeLoop,260)}}
    })();
  }

  /* ---------- MARQUEE (Keahlian) ---------- */
  $$('.m-track').forEach(function(tr){tr.innerHTML+=tr.innerHTML});

  /* ---------- 3D SPIDERMAN CARD (Beranda) ---------- */
  var scene=$('#scene');
  if(scene){
    var card=$('#card3d'),tip=$('#spideyTip');
    var cur={rx:-14,ry:0},tgt={rx:-14,ry:0},over=false,flipNow=false;
    function setSpidey(on){
      if(on!==flipNow){
        flipNow=on;
        card.classList.toggle('spidey',on);
        tip.classList.toggle('hot',on);
        tip.innerHTML=on?'Spider-Man muncul! Geser/kembalikan ke tengah untuk kembali.':'Gerakkan kursor atau miringkan HP agar foto berubah jadi Spider-Man';
        if(on){var R=scene.getBoundingClientRect();window.webBurst(R.left+R.width/2,R.top+R.height/2)}
      }
    }
    scene.addEventListener('pointermove',function(e){
      var R=scene.getBoundingClientRect();
      var x=(e.clientX-R.left)/R.width-.5,y=(e.clientY-R.top)/R.height-.5;
      tgt.ry=x*44;tgt.rx=-14-y*26;
      setSpidey(Math.abs(x)>.4||Math.abs(y)>.45);
    },{passive:true});
    scene.addEventListener('pointerenter',function(){over=true});
    scene.addEventListener('pointerleave',function(){over=false;tgt.rx=-14;tgt.ry=0});
    (function tiltLoop(){
      var t=Date.now();
      if(!over){tgt.ry=Math.sin(t*.0005)*7;tgt.rx=-14+Math.cos(t*.00042)*3}
      cur.rx+=(tgt.rx-cur.rx)*.09;cur.ry+=(tgt.ry-cur.ry)*.09;
      card.style.setProperty('--rx',cur.rx.toFixed(2)+'deg');
      card.style.setProperty('--ry',cur.ry.toFixed(2)+'deg');
      requestAnimationFrame(tiltLoop);
    })();
    if(window.DeviceOrientationEvent){
      window.addEventListener('deviceorientation',function(e){
        if(over)return;
        var b=e.beta||0,g=e.gamma||0;
        tgt.rx=Math.max(-30,Math.min(10,-b+12));
        tgt.ry=Math.max(-30,Math.min(30,g));
        setSpidey(Math.abs(g)>24||Math.abs(b-12)>26);
      },true);
    }
  }

  /* ---------- TILT CARD (Proyek) ---------- */
  $$('.tilt').forEach(function(c){
    c.addEventListener('mousemove',function(e){
      var r=c.getBoundingClientRect();
      c.style.setProperty('--ux',((e.clientX-r.left)/r.width-.5)*14+'deg');
      c.style.setProperty('--uy',(-(e.clientY-r.top)/r.height+.5)*14+'deg');
    });
    c.addEventListener('mouseleave',function(){c.style.setProperty('--ux','0deg');c.style.setProperty('--uy','0deg')});
  });

  /* ---------- FORM (Kontak) ---------- */
  var form=$('#contactForm');
  if(form){
    form.addEventListener('submit',function(e){
      e.preventDefault();
      var f=e.target,name=f.name.value,email=f.email.value,msg=f.msg.value;
      window.location.href='mailto:rizky.pratama@gmail.com?subject='+encodeURIComponent('Pesan portofolio dari '+name+' ('+email+')')+'&body='+encodeURIComponent(msg);
    });
  }
})();