(()=>{
const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
const root=document.documentElement;
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer=matchMedia('(hover: hover) and (pointer: fine)').matches;
const clamp=(v,a=0,b=1)=>Math.min(b,Math.max(a,v));
const lerp=(a,b,t)=>a+(b-a)*t;
const easeOut=t=>1-Math.pow(1-t,3);
const NS='http://www.w3.org/2000/svg';
const store={get:k=>{try{return sessionStorage.getItem(k)}catch(e){return null}},set:(k,v)=>{try{sessionStorage.setItem(k,v)}catch(e){}},del:k=>{try{sessionStorage.removeItem(k)}catch(e){}}};
const progress=$('.progress'),nav=$('.nav'),dock=$('.dock');

/* ---------- smooth scroll ---------- */
let lenis=null;
if(window.Lenis&&!reduce){
  lenis=new Lenis({duration:1.15,easing:t=>Math.min(1,1.001-Math.pow(2,-10*t)),smoothWheel:true});
  const raf=t=>{lenis.raf(t);requestAnimationFrame(raf)};requestAnimationFrame(raf);
}
const scrollToEl=el=>{const y=el.getBoundingClientRect().top+scrollY-(innerWidth>860?64:56);lenis?lenis.scrollTo(y,{duration:1.4}):scrollTo({top:y,behavior:reduce?'auto':'smooth'})};

/* ---------- page entrance ---------- */
const enter=()=>document.body.classList.add('is-in');
const pt=$('.pt');
// arriving through a page transition: lift the curtain
if(root.classList.contains('pt-in')&&pt){
  store.del('stayb-pt');
  requestAnimationFrame(()=>requestAnimationFrame(()=>{pt.classList.add('leave');
    setTimeout(()=>{pt.style.transition='none';root.classList.remove('pt-in');pt.classList.remove('leave');void pt.offsetWidth;pt.style.transition=''},900)}));
}
addEventListener('pageshow',e=>{if(e.persisted&&pt){pt.classList.remove('cover')}});

/* ---------- intro (home, once per visit) ---------- */
const intro=$('.intro');
if(intro&&!root.classList.contains('seen')&&!reduce){
  lenis&&lenis.stop();root.style.overflow='hidden';
  const num=$('.intro-num span',intro),bar=$('.intro-bar span',intro),t0=performance.now(),D=1500;
  const tick=t=>{const p=clamp((t-t0)/D),e=easeOut(p);num.textContent=String(Math.round(e*7)).padStart(2,'0');bar.style.transform=`scaleX(${e})`;
    if(p<1)requestAnimationFrame(tick);
    else setTimeout(()=>{intro.classList.add('done');store.set('stayb-intro','1');setTimeout(enter,250);
      setTimeout(()=>{intro.style.display='none';root.style.overflow='';lenis&&lenis.start()},1100)},350)};
  requestAnimationFrame(tick);
}else{
  if(intro)intro.style.display='none';
  requestAnimationFrame(()=>requestAnimationFrame(enter));
}

/* ---------- links: in-page glide, cross-page curtain ---------- */
document.addEventListener('click',e=>{
  const a=e.target.closest('a');if(!a||e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
  if(a.target==='_blank'||a.origin!==location.origin)return;
  if(a.hash&&a.pathname===location.pathname){const t=document.getElementById(a.hash.slice(1));if(t){e.preventDefault();scrollToEl(t);history.replaceState(null,'',a.hash)}return}
  if(pt&&!reduce&&/\.html$|\/[^.]*$/.test(a.pathname)&&!a.hasAttribute('download')){
    e.preventDefault();store.set('stayb-pt','1');pt.classList.add('cover');setTimeout(()=>{location.href=a.href},760);
  }
});

/* ---------- headings rise word by word ---------- */
const splitWords=el=>{
  let i=0;
  const walk=node=>{[...node.childNodes].forEach(n=>{
    if(n.nodeType===3){const parts=n.textContent.split(/(\s+)/);const frag=document.createDocumentFragment();
      parts.forEach(p=>{if(!p)return;if(/^\s+$/.test(p)){frag.append(document.createTextNode(p));return}
        const w=document.createElement('span');w.className='w';const s=document.createElement('span');s.textContent=p;s.style.setProperty('--i',i++);w.append(s);frag.append(w)});
      n.replaceWith(frag)}
    else if(n.nodeType===1&&n.tagName!=='BR')walk(n)})};
  walk(el);el.classList.add('split');
};
const headIO=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');headIO.unobserve(e.target)}}),{threshold:.3});
if(!reduce)$$('main h2:not(.qa h2)').forEach(h=>{splitWords(h);headIO.observe(h)});

/* ---------- reveal on scroll ---------- */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.14,rootMargin:'0px 0px -48px 0px'});
$$('.rv').forEach(el=>io.observe(el));

/* ---------- numbers count up ---------- */
const countIO=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;countIO.unobserve(e.target);
  const el=e.target,m=el.textContent.match(/^(\D*)([\d,]+)(.*)$/);if(!m)return;
  const [,pre,num,post]=m,to=+num.replace(/,/g,''),fmt=num.includes(',')?(v=>v.toLocaleString('en-IN')):(v=>String(v)),t0=performance.now(),D=1600;
  const step=t=>{const p=clamp((t-t0)/D);el.textContent=pre+fmt(Math.round(to*(1-Math.pow(2,-10*p))))+post;if(p<1)requestAnimationFrame(step);else el.textContent=pre+num+post};
  requestAnimationFrame(step)}),{threshold:.6});
if(!reduce)$$('.facts dd,.amount>span,.first .amount-sm').forEach(el=>countIO.observe(el));

/* ---------- "who lives here" lights up as you read ---------- */
const who=$('.who');let whoUpdate=()=>{};
if(who&&!reduce){
  const words=who.textContent.trim().split(/\s+/);who.innerHTML=words.map(w=>`<span class="wd">${w}</span>`).join(' ');
  const spans=$$('.wd',who);
  whoUpdate=()=>{const r=who.getBoundingClientRect(),p=clamp((innerHeight*.85-r.top)/(innerHeight*.5)),n=Math.round(p*spans.length);spans.forEach((s,i)=>s.classList.toggle('lit',i<n))};
}

/* ---------- full-screen photo moment ---------- */
const breath=$('.b-track');let breathUpdate=()=>{};
if(breath){
  const stick=$('.b-stick',breath);
  breathUpdate=()=>{
    const r=breath.getBoundingClientRect(),p=reduce?1:clamp(-r.top/(r.height-innerHeight));
    const e=easeOut(clamp(p/.6)),narrow=innerWidth<=860;
    stick.style.setProperty('--ci',lerp(narrow?26:20,0,e).toFixed(2)+'%');
    stick.style.setProperty('--cx',lerp(narrow?10:30,0,e).toFixed(2)+'%');
    stick.style.setProperty('--cr',lerp(4,0,e).toFixed(1)+'px');
    stick.style.setProperty('--sc',lerp(1.25,1,e).toFixed(3));
    stick.style.setProperty('--sh',e.toFixed(3));
    stick.style.setProperty('--to',clamp((p-.42)/.25).toFixed(3));
  };
}

/* ---------- a day at StayB ---------- */
const day=$('.day .track');
let dayUpdate=()=>{};
if(day){
  const stick=$('.stick',day),clock=$('.clock'),list=$('.moments'),items=$$('.moments li');
  const trail=$('.sp-trail'),sun=$('.sp-sun'),moon=$('.sp-moon');
  const L=trail.getTotalLength();
  // Kochi sits ~10°N: sunrise and sunset stay close to 06:15 and 18:15 all year.
  const RISE=6.25,SET=18.25;
  // scroll progress -> hour. The two walks get more scroll so they can be read.
  const MAP=[[0,6],[.12,7.5],[.22,8.75],[.34,8.95],[.46,13],[.58,18.3],[.70,18.5],[.84,20],[1,23.25]];
  const AT=[6,7.5,8.75,13,18.3,19.5,22.5];
  // very muted background shift: night, dawn warmth, day, dusk warmth
  const BG=[[0,'#0c120e'],[5.8,'#0f1511'],[6.6,'#1a1b15'],[8,'#111a14'],[12,'#131d16'],[17.4,'#131c15'],[18.3,'#1c1a14'],[19.4,'#0f1511'],[24,'#0c120e']];
  const hex=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16));
  const mix=(a,b,t)=>{const A=hex(a),B=hex(b);return'rgb('+A.map((v,i)=>Math.round(lerp(v,B[i],t))).join(',')+')'};
  const bgAt=h=>{for(let i=0;i<BG.length-1;i++){const[a,c1]=BG[i],[b,c2]=BG[i+1];if(h>=a&&h<=b)return mix(c1,c2,(h-a)/(b-a))}return BG[0][1]};
  const hourAt=p=>{for(let i=0;i<MAP.length-1;i++){const[a,h1]=MAP[i],[b,h2]=MAP[i+1];if(p<=b)return lerp(h1,h2,(p-a)/(b-a))}return MAP.at(-1)[1]};
  let last=-1;
  dayUpdate=()=>{
    const r=day.getBoundingClientRect(),p=clamp(-r.top/(r.height-innerHeight));
    const h=hourAt(p);
    stick.style.backgroundColor=bgAt(h);
    const u=clamp((h-RISE)/(SET-RISE));
    if(h>=RISE&&h<=SET){const pt=trail.getPointAtLength(L*u);sun.setAttribute('transform',`translate(${pt.x.toFixed(1)} ${pt.y.toFixed(1)})`);sun.style.opacity=1;trail.style.strokeDashoffset=(1-u).toFixed(4)}
    else{sun.style.opacity=0;trail.style.strokeDashoffset=h>SET?0:1}
    if(h>SET+.4){const v=clamp((h-SET-.4)/10);const pt=trail.getPointAtLength(L*(.12+v*.5));moon.setAttribute('transform',`translate(${pt.x.toFixed(1)} ${pt.y.toFixed(1)})`);moon.style.opacity=clamp((h-SET-.4)/.6)}else moon.style.opacity=0;
    const walking=(h>=8.75&&h<=8.95)||(h>=18.3&&h<=18.5);
    const step=walking?1:5,mins=Math.round(h*60/step)*step;
    clock.textContent=String(Math.floor(mins/60)%24).padStart(2,'0')+':'+String(mins%60).padStart(2,'0');
    let k=0;AT.forEach((a,i)=>{if(h>=a-.001)k=i});
    if(k!==last){last=k;items.forEach((li,i)=>li.classList.toggle('on',i===k))}
    list.style.setProperty('--prog',(p*100).toFixed(2)+'%');
  };
}

/* ---------- photos: horizontal on scroll (desktop) ---------- */
const gtrack=$('.gtrack'),strip=$('.strip');
let galUpdate=()=>{},galFit=()=>{};
if(gtrack&&strip){
  let dist=0;
  galFit=()=>{
    strip.style.transform='';
    if(innerWidth<=860||reduce){gtrack.style.height='';dist=0;return}
    // end with the same margin the strip starts with
    const last=strip.lastElementChild,pad=parseFloat(getComputedStyle(strip).paddingLeft)||0;
    dist=Math.max(0,last.offsetLeft+last.offsetWidth+pad-innerWidth);
    gtrack.style.height=(innerHeight+dist)+'px';
  };
  galUpdate=()=>{
    if(!dist)return;
    const r=gtrack.getBoundingClientRect(),p=clamp(-r.top/(r.height-innerHeight));
    strip.style.transform=`translate3d(${(-dist*p).toFixed(1)}px,0,0)`;
  };
}

/* ---------- 7-minute walk ---------- */
const route=$('.route');
let walkUpdate=()=>{};
if(route){
  const timer=$('.timer .t',route);
  const drawings=$$('.rsvg',route).map(svg=>{
    const base=$('.rbase',svg),done=$('.rdone',svg),w=$('.rwalker',svg),mins=$('.mins',svg),vertical=!!svg.dataset.v;
    const L=base.getTotalLength();
    done.style.strokeDasharray=L;done.style.strokeDashoffset=L;
    const samples=Array.from({length:121},(_,i)=>base.getPointAtLength(L*i/120));
    const far=(x,y)=>samples.reduce((m,s)=>Math.min(m,Math.hypot(s.x-x,s.y-y)),1e9);
    const dots=[];
    for(let m=1;m<=6;m++){
      const pt=base.getPointAtLength(L*m/7);
      const c=document.createElementNS(NS,'circle');c.setAttribute('cx',pt.x);c.setAttribute('cy',pt.y);c.setAttribute('r',5);
      const t=document.createElementNS(NS,'text');t.textContent=m+' min';
      // put each label on the side of the line that is farthest from the rest of the route
      const a=base.getPointAtLength(Math.max(0,L*m/7-4)),b=base.getPointAtLength(Math.min(L,L*m/7+4));
      let nx=-(b.y-a.y),ny=b.x-a.x;const n=Math.hypot(nx,ny)||1;nx/=n;ny/=n;
      const d=vertical?30:26,c1=[pt.x+nx*d,pt.y+ny*d],c2=[pt.x-nx*d,pt.y-ny*d],[cx,cy]=far(...c1)>=far(...c2)?c1:c2;
      t.setAttribute('x',cx);t.setAttribute('y',cy+5);
      if(vertical)t.setAttribute('text-anchor',cx>=pt.x?'start':'end');
      mins.append(c,t);dots.push(c)}
    return{svg,base,done,w,L,dots};
  });
  walkUpdate=()=>{
    const r=route.getBoundingClientRect();
    const p=reduce?1:clamp((innerHeight*.85-r.top)/(innerHeight*.45+r.height*.5));
    drawings.forEach(({svg,base,done,w,L,dots})=>{
      if(!svg.getBoundingClientRect().width)return;
      done.style.strokeDashoffset=L*(1-p);
      const pt=base.getPointAtLength(L*p);w.setAttribute('transform',`translate(${pt.x.toFixed(1)} ${pt.y.toFixed(1)})`);
      dots.forEach((d,i)=>d.classList.toggle('on',p>=(i+1)/7));
    });
    const s=Math.round(p*420);timer.textContent=Math.floor(s/60)+':'+String(s%60).padStart(2,'0');
  };
}

/* ---------- cursor, hover previews, magnetic buttons (mouse only) ---------- */
if(finePointer&&!reduce){
  root.classList.add('has-cursor');
  const cur=$('.cursor'),lbl=$('.c-lbl',cur),prev=$('.hover-prev'),prevImg=$('img',prev);
  let mx=-100,my=-100,cx=-100,cy=-100,px=-100,py=-100;
  addEventListener('pointermove',e=>{mx=e.clientX;my=e.clientY},{passive:true});
  const loop=()=>{cx=lerp(cx,mx,.22);cy=lerp(cy,my,.22);px=lerp(px,mx,.12);py=lerp(py,my,.12);
    cur.style.transform=`translate3d(${cx.toFixed(1)}px,${cy.toFixed(1)}px,0)`;
    prev.style.left=clamp(px+150,130,innerWidth-130).toFixed(1)+'px';prev.style.top=clamp(py,160,innerHeight-160).toFixed(1)+'px';requestAnimationFrame(loop)};
  requestAnimationFrame(loop);
  document.addEventListener('pointerover',e=>{
    const lab=e.target.closest('[data-cursor]'),link=e.target.closest('a,button,summary');
    cur.classList.toggle('label',!!lab&&!link);lbl.textContent=lab&&!link?lab.dataset.cursor:'';
    cur.classList.toggle('link',!!link);
    const img=e.target.closest('a[data-img]');
    if(img){if(prevImg.getAttribute('src')!==img.dataset.img)prevImg.src=img.dataset.img;prev.classList.add('on')}else prev.classList.remove('on');
  });
  document.addEventListener('pointerleave',()=>{cur.style.opacity=0});
  document.addEventListener('pointerenter',()=>{cur.style.opacity=1});
  $$('.btn,.nav-cta').forEach(b=>{
    b.addEventListener('pointermove',e=>{const r=b.getBoundingClientRect();b.style.transform=`translate(${((e.clientX-r.left-r.width/2)*.18).toFixed(1)}px,${((e.clientY-r.top-r.height/2)*.3).toFixed(1)}px)`});
    b.addEventListener('pointerleave',()=>{b.style.transition='transform .6s cubic-bezier(.22,.8,.18,1)';b.style.transform='';setTimeout(()=>b.style.transition='',600)});
  });
}

/* ---------- scroll loop ---------- */
const heroImg=$('.hero-media img'),fin=$('.final');
let ticking=false,lastY=scrollY,skTimer=0;
function onScroll(){
  ticking=false;
  const y=scrollY,h=document.documentElement.scrollHeight-innerHeight;
  progress.style.transform=`scaleX(${h>0?(y/h).toFixed(4):0})`;
  nav.classList.toggle('s',y>24);
  if(heroImg&&!reduce&&y<innerHeight*1.4)heroImg.style.transform=`translate3d(0,${(-y*.06).toFixed(1)}px,0)`;
  if(dock){const inFinal=fin&&fin.getBoundingClientRect().top<innerHeight*.75;dock.classList.toggle('on',y>innerHeight*.7&&!inFinal)}
  // the photo strip leans slightly with scroll speed, then settles
  if(strip&&!reduce&&innerWidth>860){const v=y-lastY;strip.style.setProperty('--sk',clamp(-v*.06,-3,3).toFixed(2)+'deg');clearTimeout(skTimer);skTimer=setTimeout(()=>strip.style.setProperty('--sk','0deg'),120)}
  lastY=y;
  breathUpdate();dayUpdate();galUpdate();walkUpdate();whoUpdate();
}
addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(onScroll)}},{passive:true});
addEventListener('resize',()=>{galFit();onScroll()});
addEventListener('load',()=>{galFit();onScroll()});
galFit();onScroll();

/* faq: one open at a time per list */
$$('details').forEach(d=>d.addEventListener('toggle',()=>{if(d.open)$$('details',d.parentElement).forEach(o=>{if(o!==d)o.open=false})}));
})();
