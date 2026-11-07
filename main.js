
/* ===== CONTROL DEL SCROLL PROGRESS ===== */
(function(){
  var bar = document.getElementById('pbar');
  window.addEventListener('scroll', function(){
    var h = document.documentElement.scrollHeight - window.innerHeight;
    if(bar && h > 0){
      bar.style.width = (window.scrollY / h * 100) + '%';
    }
  });
})();

/* ===== INTERSECTION OBSERVER PARA ANIMACIONES ===== */
(function(){
  var obs = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('v');
        if(entry.target.classList.contains('sec-divider')){
          entry.target.classList.add('drawn');
        }
      }
    });
  }, {threshold: 0.12, rootMargin: '0px 0px -30px 0px'});

  document.querySelectorAll('.a, .sec-divider').forEach(function(el){ obs.observe(el); });
})();

/* ===== CURSOR INTERACTIVO ===== */
(function(){
  var d = document.getElementById('cdot'), h = document.getElementById('chalo');
  var mx = window.innerWidth / 2, my = window.innerHeight / 2, hx = mx, hy = my;
  window.addEventListener('mousemove', function(e){
    mx = e.clientX;
    my = e.clientY;
    if(d) d.style.transform = 'translate3d(' + (mx - 4) + 'px,' + (my - 4) + 'px,0)';
  });
  (function loop(){
    hx += (mx - hx) * 0.16;
    hy += (my - hy) * 0.16;
    if(h) h.style.transform = 'translate3d(' + (hx - 19) + 'px,' + (hy - 19) + 'px,0)';
    requestAnimationFrame(loop);
  })();

  document.querySelectorAll('a, button, .accent-card, .gallery-thumb, .expand-block, .hero-card, .toc-card').forEach(function(el){
    el.addEventListener('mouseenter', function(){ document.body.classList.add('hovered'); });
    el.addEventListener('mouseleave', function(){ document.body.classList.remove('hovered'); });
  });
})();

/* ===== PARTICULAS EN CANVAS CON COLORES CORPORATIVOS SME ===== */
(function(){
  var c = document.getElementById('pcanvas');
  if(!c) return;
  var x = c.getContext('2d');
  var w = c.width = window.innerWidth, ht = c.height = window.innerHeight;
  var m = {x: w / 2, y: ht / 2, r: 180};

  window.addEventListener('resize', function(){
    w = c.width = window.innerWidth;
    ht = c.height = window.innerHeight;
  });
  window.addEventListener('mousemove', function(e){ m.x = e.clientX; m.y = e.clientY; });

  var ps = [];
  var cols = ['#0089d0', '#38bdf8', '#bed62f', '#d6eb4d', 'rgba(255,255,255,0.7)'];
  for(var i = 0; i < 65; i++){
    ps.push({
      x: Math.random() * w,
      y: Math.random() * ht,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      s: Math.random() * 2.2 + 0.8,
      c: cols[i % cols.length],
      a: Math.random() * 0.35 + 0.15
    });
  }

  (function render(){
    x.clearRect(0, 0, w, ht);
    for(var i = 0; i < ps.length; i++){
      var p = ps[i];
      p.x += p.vx; p.y += p.vy;
      if(p.x < 0) p.x = w; if(p.x > w) p.x = 0;
      if(p.y < 0) p.y = ht; if(p.y > ht) p.y = 0;

      var dx = m.x - p.x, dy = m.y - p.y, dd = Math.sqrt(dx * dx + dy * dy);
      if(dd < m.r){
        var f = (m.r - dd) / m.r;
        p.x -= (dx / dd) * f * 1.5;
        p.y -= (dy / dd) * f * 1.5;
      }

      x.beginPath();
      x.arc(p.x, p.y, p.s, 0, Math.PI * 2);
      x.fillStyle = p.c;
      x.globalAlpha = p.a;
      x.fill();

      for(var j = i + 1; j < ps.length; j++){
        var q = ps[j];
        var dx2 = p.x - q.x, dy2 = p.y - q.y, d2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
        if(d2 < 110){
          x.beginPath();
          x.moveTo(p.x, p.y);
          x.lineTo(q.x, q.y);
          x.strokeStyle = 'rgba(0,137,208,0.16)';
          x.globalAlpha = (1 - d2 / 110) * 0.18;
          x.lineWidth = 0.6;
          x.stroke();
        }
      }
    }
    requestAnimationFrame(render);
  })();
})();

/* ===== ACORDEONES EXPAND-BLOCK ===== */
function toggleExpand(el){
  el.classList.toggle('open');
  var btn = el.querySelector('.expand-toggle');
  if(btn){
    btn.textContent = el.classList.contains('open') ? 'Cerrar' : 'Ver Detalle';
  }
}

/* ===== LIGHTBOX MODAL CON DATA-FIG ===== */
(function(){
  var lb = document.getElementById('lb');
  var img = document.getElementById('lb-i');
  var capB = document.querySelector('#lb-cap b');
  var capS = document.querySelector('#lb-cap span');
  var num = document.getElementById('lb-n');
  var figs = [], cur = -1;

  function show(i){
    if(!figs.length) return;
    cur = (i + figs.length) % figs.length;
    var el = figs[cur];
    var hijo = el.querySelector('img');
    img.src = hijo ? hijo.getAttribute('src') : '';
    img.alt = el.getAttribute('data-cap') || '';
    capB.textContent = el.getAttribute('data-cap') || '';
    capS.textContent = el.getAttribute('data-sub') || '';
    num.textContent = 'Figura ' + (cur + 1) + ' / ' + figs.length;
    lb.classList.add('on');
    document.body.style.overflow = 'hidden';
  }

  function close(){
    lb.classList.remove('on');
    document.body.style.overflow = '';
  }

  figs = Array.prototype.slice.call(document.querySelectorAll('[data-fig]'));
  figs.forEach(function(el, i){
    el.addEventListener('click', function(){ show(i); });
  });

  document.getElementById('lb-x').addEventListener('click', close);
  document.getElementById('lb-p').addEventListener('click', function(e){ e.stopPropagation(); show(cur - 1); });
  document.getElementById('lb-nx').addEventListener('click', function(e){ e.stopPropagation(); show(cur + 1); });
  
  lb.addEventListener('click', function(e){ if(e.target === lb) close(); });
  window.addEventListener('keydown', function(e){
    if(!lb.classList.contains('on')) return;
    if(e.key === 'Escape') close();
    if(e.key === 'ArrowLeft') show(cur - 1);
    if(e.key === 'ArrowRight') show(cur + 1);
  });
})();


(function(){
  var b=document.getElementById('themeToggle'), r=document.documentElement;
  function label(){var l=b.querySelector('.tt-label'); if(l) l.textContent = r.getAttribute('data-theme')==='light' ? 'Modo oscuro' : 'Modo claro';}
  label();
  try{var mq=window.matchMedia('(prefers-color-scheme: light)');var follow=function(){var s=null;try{s=localStorage.getItem('sme-theme')}catch(e){}if(!s){r.setAttribute('data-theme',mq.matches?'light':'dark');label();}};mq.addEventListener?mq.addEventListener('change',follow):mq.addListener(follow);}catch(e){}
  b.addEventListener('click',function(){
    var n = r.getAttribute('data-theme')==='light' ? 'dark' : 'light';
    r.setAttribute('data-theme',n); label();
    try{localStorage.setItem('sme-theme',n)}catch(e){}
  });
})();


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

/* ===== MENÚ EN CELULAR ===== */
(function(){
  var nav=document.querySelector('.nav'), b=document.getElementById('navBurger');
  if(!nav||!b) return;
  b.addEventListener('click',function(){
    var o=nav.classList.toggle('open'); b.setAttribute('aria-expanded', o?'true':'false');
  });
  nav.querySelectorAll('.nav-menu a').forEach(function(a){ a.addEventListener('click',function(){ nav.classList.remove('open'); b.setAttribute('aria-expanded','false'); }); });
  window.addEventListener('resize',function(){ if(window.innerWidth>1024){ nav.classList.remove('open'); } });
})();
