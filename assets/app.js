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

  /* ---------- AURORA (latar bergaya blackbox.ai, berlapis tidak berat) ---------- */
  if(!document.querySelector('.orb'))document.body.insertAdjacentHTML('beforeend','<i class="bg-grid" aria-hidden="true"></i><i class="bg2" aria-hidden="true"></i><i class="orb o1" aria-hidden="true"></i><i class="orb o2" aria-hidden="true"></i>');

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