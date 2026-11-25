(function(){
  var d=document,b=d.body,top=d.querySelector('.top'),btn=d.querySelector('.menu-toggle'),menu=d.getElementById('menu');
  var hero=d.querySelector('.hero');
  function onScroll(){ if(!hero){top.classList.add('solid');return;} top.classList.toggle('solid',window.scrollY>hero.offsetHeight-90); }
  onScroll(); window.addEventListener('scroll',onScroll,{passive:true}); window.addEventListener('resize',onScroll);
  function setMenu(open){ b.classList.toggle('menu-open',open); btn.setAttribute('aria-expanded',open); menu.setAttribute('aria-hidden',!open); btn.querySelector('.mt-label').textContent=open?'Close':'Menu'; }
  btn.addEventListener('click',function(){ setMenu(!b.classList.contains('menu-open')); });
  d.addEventListener('keydown',function(e){ if(e.key==='Escape') setMenu(false); });
  menu.addEventListener('click',function(e){ if(e.target.closest('a')) setMenu(false); });
  var els=d.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } }); },{threshold:.12,rootMargin:'0px 0px -6% 0px'});
    els.forEach(function(el,i){ io.observe(el); });
  } else { els.forEach(function(el){ el.classList.add('in'); }); }
  var v=d.querySelector('.hero-media video');
  if(v && window.matchMedia('(prefers-reduced-motion: reduce)').matches){ v.removeAttribute('autoplay'); v.pause(); }
})();
