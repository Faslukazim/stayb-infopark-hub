// Run: node tools/build.mjs  -> writes static pages into /site
import fs from 'fs'; import {fileURLToPath} from 'url';
// PREVIEW=<github-user> -> client preview for GitHub Pages at https://<user>.github.io/stayb/ (noindex, /stayb prefix, output in docs/)
const PV = process.env.PREVIEW;
const OUT = fileURLToPath(new URL(PV ? '../docs/' : '../site/', import.meta.url));
const PFX = PV ? '/stayb' : '';
const BASE = PV ? `https://${PV}.github.io/stayb` : 'https://www.staybhostels.in'; // change when a custom domain is attached
const PHONE = '+919633310117', PHONE_DISP = '96333 10117';
const WA = 'https://wa.me/919633310117?text=' + encodeURIComponent("Hi, I'm looking for a bed at StayB near Infopark. Is there availability?");
const MAPS = 'https://maps.google.com/?q=StayB+Hostel+Infopark+Kochi';

const FAQ = [
 ['How far is StayB from Infopark Phase 2?', 'StayB is a 7-minute walk from Infopark Phase 2 in Kakkanad, Kochi. Most residents walk to work, so there is no bus, auto or bike expense.'],
 ['What is the rent at StayB men\'s hostel?', 'Rent is ₹7,500 per month, all-inclusive: breakfast, packed lunch for office, dinner, WiFi, laundry and ironing. The first month is ₹8,500, which includes the refundable deposit and admission.'],
 ['Is food included in the hostel rent?', 'Yes. Three meals a day are covered: breakfast, a packed lunch you can carry to office, and dinner. There are no separate mess bills.'],
 ['Is the security deposit refundable?', 'Yes. The deposit is fully returned when you move out.'],
 ['Is there a curfew?', 'No fixed curfew. You get your own key and can enter and exit freely. Quiet hours start at 11 PM.'],
 ['Are guests allowed?', 'Guests are allowed in common areas only. There are no overnight guests.'],
 ['Who stays at StayB?', 'Working professionals, freshers and interns from Infopark companies such as TCS, Infosys and UST. It is a men\'s hostel.'],
 ['How do I book a bed?', 'Tap Check Availability to WhatsApp us, or call 96333 10117. Beds are limited, so message before you travel.']
];

const LANDINGS = [
 { slug:'hostel-near-infopark-kochi', kw:'Hostel near Infopark Kochi', title:'Hostel Near Infopark Kochi · 7 Min Walk · ₹7,500 with Food | StayB',
   desc:'Men\'s hostel near Infopark Kochi, 7-minute walk to Phase 2. ₹7,500/month with 3 meals, WiFi, laundry and ironing. Message StayB to check beds.',
   h1:'The hostel near <em>Infopark Kochi</em> you can walk from.',
   intro:'If you have just joined a company at Infopark, the first problem is where to stay. StayB is a men\'s hostel a 7-minute walk from Infopark Phase 2 in Kakkanad, so your commute is a stroll instead of a bus ride.',
   sections:[
    ['Why employees choose a hostel near Infopark','Travel time is the hidden cost of living far from work. Staying within walking distance gives you back an hour or more each day, removes daily transport spend and means you are never late because of traffic on the Kakkanad road.'],
    ['What you get for ₹7,500 a month','Breakfast, a packed lunch for office, dinner, WiFi, laundry and ironing are all included. The first month is ₹8,500, which includes your refundable deposit and admission.'],
   ], bullets:['7-minute walk to Infopark Phase 2','3 meals a day included','WiFi, laundry and ironing included','No fixed curfew, own key','Refundable deposit'],
   faq:[FAQ[0],FAQ[1],FAQ[6]] },
 { slug:'mens-hostel-kakkanad', kw:'Men\'s hostel in Kakkanad', title:'Men\'s Hostel in Kakkanad, Kochi · Food + WiFi Included | StayB',
   desc:'StayB is a men\'s hostel in Kakkanad, Kochi for IT professionals, freshers and interns. All-inclusive ₹7,500/month. Walk to Infopark in 7 minutes.',
   h1:'A men\'s hostel in <em>Kakkanad</em> that feels like home.',
   intro:'Kakkanad is the heart of Kochi\'s IT corridor, and StayB sits inside it. We are a men\'s hostel built around working professionals: early mornings, packed lunches, quiet nights and a short walk to work.',
   sections:[
    ['Living in Kakkanad','Staying in Kakkanad puts you close to Infopark, SmartCity and the cafes and shops around them. StayB keeps it simple: your room, shared common areas and clear house rules so everyone gets the rest they need.'],
    ['House rules that keep it calm','No fixed curfew and you carry your own key. Quiet hours start at 11 PM. Guests are welcome in common areas only, with no overnight guests. Rooms are yours, common areas are shared.'],
   ], bullets:['Men\'s hostel for working professionals','Kakkanad, Kochi','Quiet hours after 11 PM','Common-area guests only','Meals and laundry included'],
   faq:[FAQ[4],FAQ[5],FAQ[6]] },
 { slug:'pg-for-men-near-infopark', kw:'PG for men near Infopark', title:'PG for Men Near Infopark Kochi · Meals Included | StayB',
   desc:'Looking for a PG for men near Infopark? StayB offers rooms with 3 meals, WiFi, laundry and ironing for ₹7,500/month, 7 minutes from Phase 2.',
   h1:'Looking for a <em>PG for men</em> near Infopark?',
   intro:'A paying guest stay near Infopark usually means paying separately for food, WiFi and laundry, then still commuting. StayB bundles everything into one monthly price and puts you a 7-minute walk from Phase 2.',
   sections:[
    ['One price, no add-ons','Breakfast, packed lunch, dinner, WiFi, laundry and ironing are included in ₹7,500 a month. No mess bills and no WiFi add-ons.'],
    ['PG vs hostel at StayB','Unlike a typical PG with a single owner\'s rules, StayB runs as a hostel with written, predictable rules and a community of Infopark professionals, so you know exactly what to expect before you move in.'],
   ], bullets:['Everything included in one price','Walk to Infopark Phase 2','Fully refundable deposit','Written house rules','Freshers and experienced staff welcome'],
   faq:[FAQ[1],FAQ[2],FAQ[3]] },
 { slug:'hostel-with-food-near-infopark', kw:'Hostel with food near Infopark', title:'Hostel With Food Near Infopark Kochi · 3 Meals Daily | StayB',
   desc:'Hostel with food near Infopark: breakfast, packed lunch for office and dinner included at ₹7,500/month. 7-minute walk to Phase 2, Kakkanad.',
   h1:'A hostel with <em>food</em> near Infopark. All three meals.',
   intro:'Eating well on a work schedule is hard when you cook for yourself or order out daily. StayB covers breakfast, a packed lunch you can take to the office, and dinner, all inside the monthly rent.',
   sections:[
    ['Meals built around your workday','Breakfast before you leave, a packed lunch for the office and dinner when you are back. No separate mess bill and no daily food spend.'],
    ['Plus the basics','WiFi, laundry and ironing are included too, so you arrive with a bag and focus on the job.'],
   ], bullets:['Breakfast','Packed lunch for office','Dinner','WiFi, laundry, ironing','₹7,500 per month all-in'],
   faq:[FAQ[2],FAQ[1],FAQ[7]] },
 { slug:'cheap-hostel-kakkanad-kochi', kw:'Affordable hostel in Kakkanad', title:'Affordable Hostel in Kakkanad, Kochi · ₹7,500 All-Inclusive | StayB',
   desc:'Affordable hostel in Kakkanad, Kochi. ₹7,500/month with meals, WiFi, laundry and ironing, and zero commute cost to Infopark Phase 2.',
   h1:'An affordable hostel in <em>Kakkanad</em>, where the rent covers it all.',
   intro:'The real cost of a cheap room is rarely the rent. Add food, WiFi, laundry and daily travel and the number grows fast. StayB is priced as one number, ₹7,500 a month, with a 7-minute walk to Infopark.',
   sections:[
    ['Count the whole bill','Add up what you pay now for rent, food, WiFi, laundry and travel, then compare it with StayB\'s single all-in price.'],
    ['Zero commute expense','Walking to Infopark Phase 2 means travel costs nothing, and you save the time as well.'],
   ], bullets:['₹7,500/month all-inclusive','First month ₹8,500 including deposit and admission','No commute cost','No mess or WiFi extras'],
   faq:[FAQ[1],FAQ[3],FAQ[0]] },
 { slug:'hostel-for-it-employees-kochi', kw:'Hostel for IT employees in Kochi', title:'Hostel for IT Employees in Kochi · TCS, Infosys, UST Staff | StayB',
   desc:'Hostel for IT employees, freshers and interns working at Infopark Kochi. Walk to work, meals included, ₹7,500/month. Beds available in Kakkanad.',
   h1:'The hostel for <em>IT employees</em> working at Infopark.',
   intro:'StayB is home to professionals from TCS, Infosys, UST and other Infopark companies. Freshers and experienced staff share the same simple setup: a bed, three meals and a short walk to work.',
   sections:[
    ['Joining a new company in Kochi?','Relocating for a first job is stressful enough. Move in within days, walk to Infopark Phase 2 and skip the search for separate food and laundry arrangements.'],
    ['For parents','A walkable location, a fully refundable deposit, all meals covered and clear rules. Parents can see exactly what their son is signing up for before he arrives.'],
   ], bullets:['Walk to Infopark Phase 2','Fresher friendly','Meals, WiFi, laundry included','Clear rules, safe and predictable'],
   faq:[FAQ[6],FAQ[3],FAQ[7]] },
];

const W=fs.writeFileSync;
fs.writeFileSync=(f,c)=>{ if(typeof c==='string'&&PV&&f.endsWith('.html')) c=c.replace(/(href|src)="\/(?!\/)/g,'$1="'+PFX+'/').replace('index,follow','noindex,nofollow'); if(PV&&/sitemap|llms|robots/.test(f)) return; return W(f,c)};
fs.mkdirSync(OUT,{recursive:true});
const esc = s => s.replace(/"/g,'&quot;');
const strip = s => s.replace(/<[^>]+>/g,'');
const faqHtml = f => f.map(([q,a])=>`<details><summary>${q}</summary><p>${a}</p></details>`).join('');
const faqLd = f => ({"@type":"FAQPage","mainEntity":f.map(([q,a])=>({"@type":"Question","name":q,"acceptedAnswer":{"@type":"Answer","text":a}}))});

const lodging = {
  "@context":"https://schema.org","@graph":[
  {"@type":["Hostel","LocalBusiness"],"@id":BASE+"/#business","name":"StayB Men's Hostel","url":BASE+"/","telephone":PHONE,
   "image":BASE+"/img/p2.jpg","logo":BASE+"/img/logo.png","priceRange":"₹7500/month",
   "description":"Men's hostel 7 minutes' walk from Infopark Phase 2, Kakkanad, Kochi. Meals, WiFi, laundry and ironing included.",
   "address":{"@type":"PostalAddress","addressLocality":"Kakkanad","addressRegion":"Kerala","postalCode":"682042","addressCountry":"IN"},
   "geo":{"@type":"GeoCoordinates","latitude":10.0105,"longitude":76.3640},
   "areaServed":["Kakkanad","Infopark Kochi","Kochi"],
   "amenityFeature":["Breakfast","Packed lunch","Dinner","WiFi","Laundry","Ironing"].map(n=>({"@type":"LocationFeatureSpecification","name":n,"value":true})),
   "sameAs":[]},
  {"@type":"WebSite","@id":BASE+"/#site","url":BASE+"/","name":"StayB"}]};

function head({title,desc,path,ld,extra=''}){
  return `<!doctype html><html lang="en-IN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title><meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${BASE}${path}">
<meta name="theme-color" content="#0f1712"><meta name="robots" content="index,follow,max-image-preview:large">
<meta name="geo.region" content="IN-KL"><meta name="geo.placename" content="Kakkanad, Kochi">
<meta property="og:type" content="website"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}"><meta property="og:url" content="${BASE}${path}"><meta property="og:image" content="${BASE}/img/p2.jpg"><meta property="og:locale" content="en_IN">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" type="image/svg+xml" href="/favicon.svg?v=3">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon.png?v=3">
<link rel="icon" type="image/x-icon" href="/favicon.ico?v=3" sizes="any">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=3">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/style.css">${extra}
<script>(function(d){d.classList.add('js');try{if(sessionStorage.getItem('stayb-intro'))d.classList.add('seen');if(sessionStorage.getItem('stayb-pt'))d.classList.add('pt-in')}catch(e){}})(document.documentElement)</script>
<script type="application/ld+json">${JSON.stringify(ld)}</script></head><body>
<div class="progress" aria-hidden="true"></div>
<div class="grain" aria-hidden="true"></div><div class="pt" aria-hidden="true"></div>
<div class="cursor" aria-hidden="true"><span class="c-dot"></span><span class="c-lbl"></span></div><div class="hover-prev" aria-hidden="true"><img alt="" width="720" height="720"></div>`;
}
const ARROW = `<svg class="arr" viewBox="0 0 16 16" aria-hidden="true"><path d="M2 8h11M9 4l4 4-4 4"/></svg>`;
const nav = `<header class="nav"><div class="wrap nav-in"><a class="brand" href="/" aria-label="StayB home"><img src="/img/logo-white.png" alt="StayB men's hostel logo" width="105" height="38"></a>
<nav aria-label="Primary"><ul><li><a href="/#day">A day here</a></li><li><a href="/#price">Price</a></li><li><a href="/#photos">Photos</a></li><li><a href="/#location">Location</a></li><li><a href="/#faq">FAQ</a></li></ul></nav>
<a class="nav-cta" href="${WA}" rel="noopener">Check availability ${ARROW}</a></div></header>`;
const dock = `<div class="dock"><a class="btn primary" href="${WA}" rel="noopener">WhatsApp us</a><a class="btn ghost" href="tel:${PHONE}">Call ${PHONE_DISP}</a></div>`;
const footer = `<footer class="foot"><div class="wrap">
<div class="foot-top"><img src="/img/logo-white.png" alt="StayB" width="121" height="44"><p class="foot-line">A men's hostel, 7 minutes on foot from Infopark Phase 2.</p></div>
<div class="foot-grid">
<div><h4>Visit</h4><p>StayB Men's Hostel<br>Kakkanad, Kochi, Kerala<br>7 min from Infopark Phase 2</p><p><a href="tel:${PHONE}">Call ${PHONE_DISP}</a></p></div>
<div><h4>Find a hostel</h4>${LANDINGS.map(l=>`<a href="/${l.slug}">${l.kw}</a>`).join('')}</div>
<div><h4>StayB</h4><a href="/#price">Price</a><a href="/#faq">FAQ</a><a href="${MAPS}" rel="noopener">Open in Maps</a><a href="${WA}" rel="noopener">WhatsApp</a></div>
</div>
<p class="foot-base">© StayB · Kakkanad, Kochi</p>
</div></footer>${dock}<script src="https://unpkg.com/lenis@1.1.13/dist/lenis.min.js" defer></script><script src="/assets/app.js" defer></script></body></html>`;

// thin-line diagrams
const SUNPATH = `<svg class="sunpath" viewBox="0 0 600 270" aria-hidden="true">
<path class="sp-arc" d="M40 220 A260 170 0 0 1 560 220"/>
<path class="sp-trail" d="M40 220 A260 170 0 0 1 560 220" pathLength="1"/>
<line class="sp-horizon" x1="0" y1="220" x2="600" y2="220"/>
${[[9,'09:00'],[12,'12:00'],[15,'15:00']].map(([h,l])=>{const u=(h-6.25)/12,th=Math.PI*(1-u),x=300+260*Math.cos(th),y=220-170*Math.sin(th),ox=Math.cos(th)*26,oy=-Math.sin(th)*26;return `<circle class="sp-tick" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.5"/><text class="sp-lbl" x="${(x+ox).toFixed(1)}" y="${(y+oy+4).toFixed(1)}" text-anchor="${Math.abs(ox)<6?'middle':ox<0?'end':'start'}">${l}</text>`}).join('')}
<text class="sp-lbl" x="40" y="246" text-anchor="middle">Sunrise 06:15</text><text class="sp-lbl" x="560" y="246" text-anchor="middle">Sunset 18:15</text>
<g class="sp-moon"><circle r="9"/></g>
<g class="sp-sun"><circle class="sp-halo" r="22"/><circle class="sp-core" r="9"/></g>
</svg>`;
const ROUTE_H = `<svg class="rsvg rh" viewBox="0 0 1200 260" role="img" aria-label="Diagram of the 7-minute walk from StayB to Infopark Phase 2">
<path class="rbase" d="M80 190 C260 190 300 80 470 100 S720 210 860 140 S1060 80 1120 96"/>
<path class="rdone" d="M80 190 C260 190 300 80 470 100 S720 210 860 140 S1060 80 1120 96"/>
<g class="mins"></g>
<rect class="rnode" x="72" y="182" width="16" height="16"/><rect class="rnode" x="1112" y="88" width="16" height="16"/>
<text x="80" y="236" text-anchor="middle" class="rl">StayB</text><text x="1120" y="60" text-anchor="middle" class="rl">Infopark Phase 2</text>
<g class="rwalker"><circle r="6"/><circle class="rw-ring" r="14"/></g>
</svg>`;
const ROUTE_V = `<svg class="rsvg rvert" data-v="1" viewBox="0 0 320 600" aria-hidden="true">
<path class="rbase" d="M80 530 C80 450 240 450 240 370 S80 290 80 210 S240 130 240 70"/>
<path class="rdone" d="M80 530 C80 450 240 450 240 370 S80 290 80 210 S240 130 240 70"/>
<g class="mins"></g>
<rect class="rnode" x="72" y="522" width="16" height="16"/><rect class="rnode" x="232" y="62" width="16" height="16"/>
<text x="80" y="572" text-anchor="middle" class="rl">StayB</text><text x="240" y="40" text-anchor="middle" class="rl">Infopark Phase 2</text>
<g class="rwalker"><circle r="6"/><circle class="rw-ring" r="14"/></g>
</svg>`;
const MOMENTS = [
  ['06:00','Wake up to green views.','Coconut palms outside, a quiet start. No traffic to plan around.'],
  ['07:30','Breakfast is ready.','Laundry and ironing are handled too, so your shirt is ready for the day.'],
  ['08:45','Seven minutes to your desk.','Walk to Infopark Phase 2 with your packed lunch. No bus, no auto, no fuel. At your desk before nine.'],
  ['13:00','Lunch from home, at your desk.','A packed lunch goes with you every day, already paid for in the rent.'],
  ['18:20','Home before the lights come on.','Log off and walk back. Seven minutes later you are home.'],
  ['19:30','Dinner is on the table.','Eat, call home, catch up on WiFi. No cooking, no ordering in.'],
  ['23:00','Quiet hours from 11 PM.','No fixed curfew. You carry your own key, and everyone gets their rest.']];

// ---------- HOME ----------
const home = head({
  title:"Men's Hostel Near Infopark Kochi · 7 Min Walk · ₹7,500 With Food | StayB",
  desc:"StayB men's hostel in Kakkanad, 7-minute walk to Infopark Phase 2, Kochi. ₹7,500/month with 3 meals, WiFi, laundry and ironing. Beds available now.",
  path:'/', ld:{...lodging,"@graph":[...lodging["@graph"],faqLd(FAQ)]},
  extra:`<link rel="preload" as="image" href="/img/p2.jpg">`
}) + `<div class="intro" aria-hidden="true"><div class="intro-in"><img src="/img/logo-white.png" alt="" width="105" height="38"><p class="intro-num"><span>00</span></p><p class="intro-lbl">minutes to Infopark</p></div><div class="intro-bar"><span></span></div></div>` + nav + `
<main>
<section class="hero">
<div class="wrap hero-in">
<div class="hero-copy">
<p class="kicker">Men's hostel · Kakkanad, Kochi</p>
<h1 class="display"><span class="ln"><span>Walk to</span></span><span class="ln"><span><em>Infopark.</em></span></span></h1>
<p class="lead">7 minutes from your desk. Three meals a day, WiFi, laundry and ironing, all in one price.</p>
<div class="actions"><a class="btn primary" href="${WA}" rel="noopener">Check availability ${ARROW}</a><a class="btn ghost" href="tel:${PHONE}">Call ${PHONE_DISP}</a></div>
<p class="note">First month ₹8,500, including a refundable deposit.</p>
</div>
<figure class="hero-media"><div class="frame"><img src="/img/p2.jpg" alt="Laptop on the StayB balcony overlooking coconut palms and the Kakkanad skyline" width="720" height="720" fetchpriority="high"></div><figcaption>The balcony, looking over Kakkanad</figcaption></figure>
</div>
<div class="wrap"><dl class="facts">
<div><dt>Walk to Infopark Phase 2</dt><dd>7 min</dd></div>
<div><dt>All-in, every month</dt><dd>₹7,500</dd></div>
<div><dt>Breakfast, lunch &amp; dinner</dt><dd>3 meals</dd></div>
<div><dt>Own key, no curfew</dt><dd>24 h</dd></div>
</dl></div>
</section>

<div class="ticker" aria-hidden="true"><div>${Array(2).fill('<span>Home to people from</span><b>TCS</b><i></i><b>Infosys</b><i></i><b>UST</b><i></i><span>and other Infopark companies</span><i></i><span>Freshers · Interns · IT professionals</span><i></i>').join('')}</div></div>

<section class="breath" aria-label="No travel, no tension"><div class="b-track"><div class="b-stick">
<div class="b-mask"><img src="/img/p2.jpg" alt="View from the StayB balcony over coconut palms in Kakkanad" loading="lazy" width="720" height="720"></div>
<div class="b-copy"><p class="kicker">7 minutes to your desk</p><p class="b-line">No travel,<br><em>no tension.</em></p></div>
</div></div></section>

<section class="day" id="day" aria-label="A typical day at StayB"><div class="track"><div class="stick"><div class="wrap day-in">
<div class="day-left">
<p class="kicker">A day at StayB</p>
<div class="clock" aria-hidden="true">06:00</div>
${SUNPATH}
<p class="sp-cap">Kochi sits close to the equator, so the sun rises near 06:15 and sets near 18:15 all year.</p>
</div>
<ol class="moments">${MOMENTS.map(([t,h,p],i)=>`<li${i?'':' class="on"'}><span class="m-t">${t}</span><div><h3>${h}</h3><p>${p}</p></div></li>`).join('')}</ol>
</div></div></div></section>

<section class="price light" id="price"><div class="wrap">
<header class="sec-head rv"><p class="kicker">Pricing</p><h2>One price. <em>Everything in.</em></h2></header>
<div class="price-grid">
<div class="price-main rv">
<p class="amount"><span>₹7,500</span><small>per month</small></p>
<ul class="incl">
<li><span>Breakfast</span><span>every morning</span></li><li><span>Packed lunch</span><span>for the office</span></li>
<li><span>Dinner</span><span>every night</span></li><li><span>WiFi</span><span>included</span></li>
<li><span>Laundry</span><span>included</span></li><li><span>Ironing</span><span>included</span></li></ul>
</div>
<aside class="first rv">
<p class="kicker">First month</p>
<p class="amount-sm">₹8,500</p>
<p>Includes your refundable deposit and admission. The deposit is fully returned when you move out.</p>
<ul><li>No mess bills</li><li>No WiFi add-ons</li><li>₹0 commute</li></ul>
<a class="btn primary" href="${WA}" rel="noopener">Check availability ${ARROW}</a>
</aside>
</div></div></section>

<section class="gal" id="photos"><div class="gtrack"><div class="gstick">
<div class="wrap gal-head"><p class="kicker">Photos</p><h2>Bright rooms. <em>Green views.</em></h2></div>
<div class="strip" data-cursor="Scroll">
<figure><div class="ph"><img src="/img/p2.jpg" alt="Laptop on the StayB balcony overlooking coconut palms and the Kakkanad skyline" loading="lazy" width="720" height="720"></div><figcaption><span>01</span>Balcony workspace</figcaption></figure>
<figure><div class="ph"><img src="/img/p1.jpg" alt="StayB men's hostel building with balconies in Kakkanad, Kochi" loading="lazy" width="720" height="720"></div><figcaption><span>02</span>The building</figcaption></figure>
<figure><div class="ph"><img src="/img/p3.jpg" alt="Beds and a side table inside a StayB hostel room near Infopark" loading="lazy" width="720" height="720"></div><figcaption><span>03</span>Rooms</figcaption></figure>
<figure><div class="ph"><img src="/img/p4.jpg" alt="Tiled corridor with room doors at StayB hostel, Kakkanad" loading="lazy" width="720" height="720"></div><figcaption><span>04</span>Corridors</figcaption></figure>
</div>
</div></div></section>

<section class="walk light" id="location"><div class="wrap">
<header class="sec-head rv"><p class="kicker">Location</p><h2>Door to desk in <em>7 minutes.</em></h2><p class="lead">StayB is in Kakkanad, a short walk from Infopark Phase 2. No bus, no auto, no traffic.</p></header>
<div class="route rv">
<div class="timer"><span class="t">0:00</span><small>walking time</small></div>
${ROUTE_H}${ROUTE_V}
<p class="r-note">Route drawn for illustration. Open the map for directions.</p>
</div>
<div class="loc-grid">
<dl class="loc-facts rv">
<div><dt>7 min</dt><dd>walk to Infopark Phase 2</dd></div>
<div><dt>₹0</dt><dd>daily commute cost</dd></div>
<div><dt>No curfew</dt><dd>enter any time with your key</dd></div>
<div><dt>Kakkanad</dt><dd>Kochi's IT corridor</dd></div>
<a class="link" href="${MAPS}" rel="noopener">Open in Google Maps ${ARROW}</a>
</dl>
<div class="mapf rv" data-cursor="Map"><iframe title="Map of Infopark Phase 2, Kakkanad, Kochi" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=Infopark+Phase+2,+Kakkanad,+Kochi&z=15&output=embed"></iframe></div>
</div>
</div></section>

<section class="rules" id="rules"><div class="wrap">
<header class="sec-head rv"><p class="kicker">How we live</p><h2>Simple rules. <em>No surprises.</em></h2></header>
<ol class="rule-list">
<li class="rv"><span class="n">01</span><h3>Entry &amp; exit</h3><p>No fixed curfew. Use your key.</p></li>
<li class="rv"><span class="n">02</span><h3>Guests</h3><p>Common areas only. No overnight guests.</p></li>
<li class="rv"><span class="n">03</span><h3>Noise</h3><p>Quiet hours after 11 PM.</p></li>
<li class="rv"><span class="n">04</span><h3>Cleanliness</h3><p>Rooms are yours. Common areas are shared.</p></li>
</ol>
<p class="who rv">Who lives here: employees from TCS, Infosys, UST and other Infopark companies. Freshers and experienced, all professionals.</p>
<div class="parents rv">
<div><p class="kicker">For parents</p><h2>Safe and <em>predictable.</em></h2></div>
<dl><div><dt>Walkable location</dt><dd>7 min to Infopark</dd></div><div><dt>Refundable deposit</dt><dd>Fully returned</dd></div><div><dt>Inclusive food</dt><dd>All meals covered</dd></div><div><dt>Clear rules</dt><dd>No surprises</dd></div></dl>
</div>
</div></section>

<section class="areas light"><div class="wrap areas-in">
<header class="sec-head rv"><p class="kicker">Find your stay</p><h2>Hostel in Kakkanad, <em>built for Infopark.</em></h2>
<p class="lead">StayB is a men's hostel in Kakkanad, Kochi, made for people who work at Infopark. Whether you are searching for a hostel near Infopark, a PG for men, or a hostel with food, the answer is the same: walk 7 minutes, eat well and pay one price.</p></header>
<ul class="index rv">${LANDINGS.map((l,i)=>`<li><a href="/${l.slug}" data-img="/img/${['p2','p1','p4','p3','p2','p1'][i]}.jpg"><span>${l.kw}</span>${ARROW}</a></li>`).join('')}</ul>
</div></section>

<section class="faq light" id="faq"><div class="wrap faq-in">
<header class="sec-head rv"><p class="kicker">Questions</p><h2>Everything <em>you would ask.</em></h2></header>
<div class="qa rv">${faqHtml(FAQ)}</div>
</div></section>

<section class="final"><div class="final-bg"><img src="/img/p1.jpg" alt="" loading="lazy" width="720" height="720"></div><div class="wrap final-in">
<p class="kicker">Ready?</p>
<h2>Your bed is <em>7 minutes</em> from work.</h2>
<p class="lead">Most residents find us through word of mouth. Come see why. Beds available now in Kakkanad, Kochi.</p>
<div class="actions"><a class="btn primary" href="${WA}" rel="noopener">Check availability ${ARROW}</a><a class="btn ghost" href="tel:${PHONE}">Call ${PHONE_DISP}</a></div>
</div></section>
</main>` + footer;

fs.writeFileSync(OUT+'index.html', home);

// ---------- LANDING PAGES ----------
for (const l of LANDINGS){
  const path='/'+l.slug;
  const ld={"@context":"https://schema.org","@graph":[...lodging["@graph"],faqLd(l.faq),
   {"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"StayB","item":BASE+"/"},{"@type":"ListItem","position":2,"name":l.kw,"item":BASE+path}]}]};
  const html = head({title:l.title,desc:l.desc,path,ld}) + nav + `
<main>
<header class="lp-hero"><div class="wrap lp-hero-in">
<div><p class="crumbs"><a href="/">StayB</a><span>/</span>${l.kw}</p><h1 class="display-2">${l.h1}</h1><p class="lead">${l.intro}</p>
<div class="actions"><a class="btn primary" href="${WA}" rel="noopener">Check availability ${ARROW}</a><a class="btn ghost" href="tel:${PHONE}">Call ${PHONE_DISP}</a></div></div>
<figure class="lp-media"><div class="frame"><img src="/img/p2.jpg" alt="The StayB balcony overlooking Kakkanad" width="720" height="720"></div></figure>
</div></header>
<div class="lp-body light"><div class="wrap lp-grid">
<article class="lp-main">
${l.sections.map(([h,p])=>`<h2>${h}</h2><p>${p}</p>`).join('')}
<h2>Questions</h2><div class="qa">${faqHtml(l.faq)}</div>
</article>
<aside class="lp-side"><p class="kicker">Quick facts</p><ul>${l.bullets.map(b=>`<li>${b}</li>`).join('')}</ul>
<a class="btn primary" href="${WA}" rel="noopener">Message us on WhatsApp ${ARROW}</a><a class="link" href="/">See the full StayB experience ${ARROW}</a></aside>
</div>
<div class="wrap"><p class="kicker more-k">More ways to find us</p><ul class="index">${LANDINGS.filter(x=>x!==l).map(x=>`<li><a href="/${x.slug}"><span>${x.kw}</span>${ARROW}</a></li>`).join('')}</ul></div>
</div>
</main>` + footer;
  fs.writeFileSync(OUT+l.slug+'.html', html);
}

// ---------- SEO FILES ----------
const urls=['/',...LANDINGS.map(l=>'/'+l.slug)];
const today=new Date().toISOString().slice(0,10);
fs.writeFileSync(OUT+'sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(u=>`<url><loc>${BASE}${u}</loc><lastmod>${today}</lastmod><priority>${u==='/'?'1.0':'0.8'}</priority></url>`).join('')}</urlset>`);
fs.writeFileSync(OUT+'robots.txt',`User-agent: *\nAllow: /\nSitemap: ${BASE}/sitemap.xml\n`);
fs.writeFileSync(OUT+'llms.txt',`# StayB Men's Hostel\n> Men's hostel in Kakkanad, Kochi, a 7-minute walk from Infopark Phase 2. ₹7,500/month including breakfast, packed lunch, dinner, WiFi, laundry and ironing. First month ₹8,500 including refundable deposit and admission. Phone ${PHONE_DISP}.\n\n${urls.map(u=>`- ${BASE}${u}`).join('\n')}\n`);
fs.writeFileSync(OUT+'404.html', head({title:'Page not found | StayB',desc:'Page not found',path:'/404',ld:{}}).replace('index,follow','noindex')+nav+`<main><header class="lp-hero lp-404"><div class="wrap"><h1 class="display-2">Lost? <em>Home</em> is 7 minutes away.</h1><div class="actions"><a class="btn primary" href="/">Back to StayB</a></div></div></header></main>`+footer);
if(!PV)fs.writeFileSync(OUT+"vercel.json", JSON.stringify({cleanUrls:true,headers:[
 {source:'/assets/(.*)',headers:[{key:'Cache-Control',value:'public, max-age=31536000, immutable'}]},
 {source:'/img/(.*)',headers:[{key:'Cache-Control',value:'public, max-age=31536000, immutable'}]}]},null,2));
if(PV){fs.cpSync(new URL('../site/assets/',import.meta.url),OUT+'assets',{recursive:true});fs.cpSync(new URL('../site/img/',import.meta.url),OUT+'img',{recursive:true});W(OUT+'.nojekyll','');fs.writeFileSync=W;W(OUT+'robots.txt','User-agent: *\nDisallow: /\n')}
if(!PV){const distDir = fileURLToPath(new URL('../dist/', import.meta.url)); fs.cpSync(OUT, distDir, {recursive: true});}
console.log('built',urls.length,'pages');
