
/* tema claro / oscuro */
(function(){
  var r=document.documentElement, b=document.getElementById('themeBtn');
  if(b) b.addEventListener('click',function(){
    var n=r.getAttribute('data-theme')==='dark'?'light':'dark'; r.setAttribute('data-theme',n);
    try{localStorage.setItem('sme-theme',n)}catch(e){}
  });
  try{var mq=window.matchMedia('(prefers-color-scheme: dark)');var f=function(){var s=null;try{s=localStorage.getItem('sme-theme')}catch(e){} if(!s) r.setAttribute('data-theme',mq.matches?'dark':'light');};
    mq.addEventListener?mq.addEventListener('change',f):mq.addListener(f);}catch(e){}
})();
/* menú en celular */
(function(){
  var nav=document.querySelector('.nav'), b=document.getElementById('burger'); if(!nav||!b) return;
  b.addEventListener('click',function(){ var o=nav.classList.toggle('open'); b.setAttribute('aria-expanded',o?'true':'false'); b.setAttribute('aria-label',o?'Cerrar menú':'Abrir menú'); });
  window.addEventListener('resize',function(){ if(window.innerWidth>900){ nav.classList.remove('open'); b.setAttribute('aria-expanded','false'); } });
})();
/* portada con diapositivas */
(function(){
  var hero=document.getElementById('hero'); if(!hero) return;
  var slides=hero.querySelectorAll('.slide'), dots=hero.querySelectorAll('.dots button'), i=0, timer=null;
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function go(n){ slides[i].classList.remove('on'); dots[i].classList.remove('on'); i=(n+slides.length)%slides.length; slides[i].classList.add('on'); dots[i].classList.add('on'); }
  function play(){ if(reduce) return; stop(); timer=setInterval(function(){ go(i+1); },7000); }
  function stop(){ if(timer){ clearInterval(timer); timer=null; } }
  dots.forEach(function(d,k){ d.addEventListener('click',function(){ go(k); play(); }); });
  hero.querySelector('.harr.prev').addEventListener('click',function(){ go(i-1); play(); });
  hero.querySelector('.harr.next').addEventListener('click',function(){ go(i+1); play(); });
  hero.addEventListener('mouseenter',stop); hero.addEventListener('mouseleave',play);
  hero.addEventListener('focusin',stop); hero.addEventListener('focusout',play);
  var x0=null; hero.addEventListener('touchstart',function(e){ x0=e.touches[0].clientX; },{passive:true});
  hero.addEventListener('touchend',function(e){ if(x0===null) return; var dx=e.changedTouches[0].clientX-x0; if(Math.abs(dx)>45){ go(dx<0?i+1:i-1); play(); } x0=null; });
  play();
})();
/* carruseles */
document.querySelectorAll('.carousel').forEach(function(c){
  var t=c.querySelector('.track'), p=c.querySelector('.car-btn.prev'), n=c.querySelector('.car-btn.next');
  function step(){ var it=t.children[0]; return it ? it.getBoundingClientRect().width+24 : 300; }
  function upd(){ if(!p) return; p.disabled = t.scrollLeft<=4; n.disabled = t.scrollLeft+t.clientWidth>=t.scrollWidth-4; }
  if(p) p.addEventListener('click',function(){ t.scrollBy({left:-step(),behavior:'smooth'}); });
  if(n) n.addEventListener('click',function(){ t.scrollBy({left:step(),behavior:'smooth'}); });
  t.addEventListener('scroll',upd,{passive:true}); window.addEventListener('resize',upd); upd();
});
/* visor de imágenes */
(function(){
  var lb=document.getElementById('lb'); if(!lb) return; var im=lb.querySelector('img');
  function open(src,alt){ im.src=src; im.alt=alt||''; lb.classList.add('on'); document.body.style.overflow='hidden'; }
  function close(){ lb.classList.remove('on'); document.body.style.overflow=''; im.src=''; }
  document.addEventListener('click',function(e){
    var el=e.target.closest('[data-full]'); if(!el) return; e.preventDefault();
    var img=el.querySelector('img'); open(el.getAttribute('data-full'), img?img.alt:'');
  });
  lb.addEventListener('click',function(e){ if(e.target===lb||e.target.tagName==='BUTTON') close(); });
  document.addEventListener('keydown',function(e){ if(e.key==='Escape'&&lb.classList.contains('on')) close(); });
})();

/* portada animada del Titicaca */

(function(){
  var intro=document.getElementById('intro'); if(!intro) return;
  var body=document.body;
  // si llegan con un enlace a una sección (#proximos, etc.) se salta la portada
  var seen=false; try{ seen = sessionStorage.getItem('sme-intro')==='1'; }catch(e){}
  if(seen || (location.hash && location.hash.length>1)){ intro.remove(); body.classList.remove('intro-on'); return; }
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // letras animadas
  var d0=1.25;
  intro.querySelectorAll('[data-split]').forEach(function(el,k){
    var txt=el.textContent; el.textContent=''; el.setAttribute('aria-label',txt);
    for(var i=0;i<txt.length;i++){
      var s=document.createElement('span'); s.className='ch'; s.setAttribute('aria-hidden','true');
      s.textContent = txt[i]===' ' ? '\u00a0' : txt[i];
      s.style.animationDelay=(d0 + (k?0.35:0) + i*0.045)+'s';
      el.appendChild(s);
    }
  });
  // degradado continuo en "UNA Puno" aunque cada letra se anime por separado
  var t2=intro.querySelector('h1 .t2');
  function grad(){ if(!t2) return; var r=t2.getBoundingClientRect(), chs=t2.querySelectorAll('.ch'); if(!chs.length) return;
    var x0=chs[0].offsetLeft, x1=chs[chs.length-1].offsetLeft+chs[chs.length-1].offsetWidth, w=x1-x0;
    chs.forEach(function(c){ c.style.backgroundSize=w+'px 100%'; c.style.backgroundPosition=(-(c.offsetLeft-x0))+'px 0'; c.style.backgroundRepeat='no-repeat'; }); }
  grad(); window.addEventListener('resize',grad); if(document.fonts&&document.fonts.ready) document.fonts.ready.then(grad);
  // el hero se anima recién al entrar
  var heroEls=document.querySelectorAll('.hero .a'); heroEls.forEach(function(e){e.classList.remove('v')});
  var go=document.getElementById('introGo');
  setTimeout(function(){ intro.classList.add('ready'); try{go.focus({preventScroll:true})}catch(e){} }, reduce?50:3300);
  var done=false;
  function enter(){
    if(done) return; done=true; try{ sessionStorage.setItem('sme-intro','1'); }catch(e){}
    intro.classList.add('leaving');
    setTimeout(function(){ body.classList.remove('intro-on'); window.scrollTo(0,0); heroEls.forEach(function(e){e.classList.add('v')}); }, 650);
    setTimeout(function(){ intro.remove(); }, 1600);
  }
  go.addEventListener('click',enter);
  document.addEventListener('keydown',function(e){ if(intro.classList.contains('ready') && (e.key==='Enter'||e.key===' '||e.key==='Escape')){ e.preventDefault(); enter(); } });
})();
