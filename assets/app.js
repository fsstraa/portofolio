(function(){
  /* ================= DATA PORTFOLIO =================
     Halaman dalam dibuka sebagai panel di atas beranda (iframe).
     Di sini hanya logika data + animasi ringan; navigasi & transisi
     halaman mandiri sudah tidak dipakai (mengikuti model UI beranda). */

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
  if(!document.querySelector('.orb'))document.body.insertAdjacentHTML('beforeend','<i class="orb o1" aria-hidden="true"></i><i class="orb o2" aria-hidden="true"></i>');

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
})();