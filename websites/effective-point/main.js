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

 /* Forms: post to data-endpoint when one is configured; until then, say so honestly. */
 d.querySelectorAll('form[data-form]').forEach(function(f){
  f.addEventListener('submit',function(e){
   e.preventDefault();
   if(!f.reportValidity()) return;
   var wrap=f.closest('.form-area')||f.parentNode, url=f.getAttribute('data-endpoint');
   var done=function(ok){ wrap.classList.add('sent'); var m=wrap.querySelector('.form-done'); if(m){ m.querySelector('[data-ok]').hidden=!ok; m.querySelector('[data-off]').hidden=ok; m.setAttribute('tabindex','-1'); m.focus(); } };
   if(!url){
    // No form service yet: open the visitor's email app with the message written out.
    var to=f.getAttribute('data-email'), lines=[], seen={};
    Array.prototype.forEach.call(f.elements,function(el){
     if(!el.name||el.type==='submit'||((el.type==='checkbox'||el.type==='radio')&&!el.checked)||!el.value) return;
     var fs=el.closest('fieldset'), lab=fs?fs.querySelector('legend'):(el.labels&&el.labels[0]);
     var key=(lab?lab.textContent:el.name).replace(/\s*Choose any that apply\.?/,'').trim();
     if(seen[key]!==undefined){ lines[seen[key]]+=', '+el.value; return; }
     seen[key]=lines.length; lines.push(key+': '+el.value);
    });
    var subj=f.getAttribute('data-subject')||'Website enquiry';
    if(to) window.location.href='mailto:'+to+'?subject='+encodeURIComponent(subj)+'&body='+encodeURIComponent(lines.join('\n\n'));
    done(false); return;
   }
   fetch(url,{method:'POST',body:new FormData(f),headers:{Accept:'application/json'}}).then(function(r){ done(r.ok); }).catch(function(){ done(false); });
  });
 });
 /* Insights filter */
 var fb=d.querySelectorAll('.filter');
 fb.forEach(function(b){ b.addEventListener('click',function(){
  var t=b.getAttribute('data-filter');
  fb.forEach(function(x){ x.setAttribute('aria-pressed',String(x===b)); });
  d.querySelectorAll('.cards .card').forEach(function(c){ c.hidden = t!=='all' && c.getAttribute('data-topic')!==t; });
 }); });
})();
