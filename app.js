/* Furniture Zone commerce interactions.
   Replace WHATSAPP_NUMBER and demo product details before launch. */
const WHATSAPP_NUMBER = "8801978587503";
const PRODUCTS = [
 {id:"fz01",name:"Walnut Round Dining Set",category:"Dining",price:48500,oldPrice:56500,image:"assets/dining-set.png",description:"A warm dining set for everyday meals and shared moments.",badge:"Bestseller",popular:100,newest:2},
 {id:"fz02",name:"Sculpted Lounge Chair",category:"Living",price:18900,image:"https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=900&q=85",description:"A relaxed accent chair with a sculptural silhouette.",badge:"Popular",popular:96,newest:4},
 {id:"fz03",name:"Minimal Coffee Table",category:"Living",price:14500,image:"https://images.unsplash.com/photo-1499933374294-4584851497cc?auto=format&fit=crop&w=900&q=85",description:"A simple centrepiece for your living room.",badge:"New",popular:80,newest:1},
 {id:"fz04",name:"Modern Sideboard",category:"Storage",price:32000,oldPrice:35900,image:"https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85",description:"A considered storage piece for everyday essentials.",badge:"Offer",popular:92,newest:7},
 {id:"fz05",name:"Nordic Dining Chair",category:"Dining",price:8500,image:"https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=900&q=85",description:"An understated chair for dining and conversation.",popular:88,newest:6},
 {id:"fz06",name:"Compact Work Desk",category:"Workspace",price:16500,image:"https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=85",description:"A focused workspace with a clean, practical profile.",badge:"New",popular:83,newest:3},
 {id:"fz07",name:"Bedside Table",category:"Bedroom",price:7800,image:"https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=85",description:"A compact bedside companion for your daily essentials.",popular:78,newest:8},
 {id:"fz08",name:"Accent Armchair",category:"Living",price:21500,image:"https://images.unsplash.com/photo-1598300053653-3a3f6e9b9b4a?auto=format&fit=crop&w=900&q=85",description:"A comfortable accent for a quiet reading corner.",popular:90,newest:5},
 {id:"fz09",name:"Console Table",category:"Storage",price:13900,image:"https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=85",description:"A useful surface for an entryway or living space.",popular:76,newest:9},
 {id:"fz10",name:"Oak Accent Stool",category:"Living",price:6900,image:"https://images.unsplash.com/photo-1598300056393-4aac492f4344?auto=format&fit=crop&w=900&q=85",description:"A versatile extra seat or occasional side table.",popular:72,newest:10},
 {id:"fz11",name:"Upholstered Bed Frame",category:"Bedroom",price:42500,image:"https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=900&q=85",description:"A soft upholstered centrepiece for the bedroom.",badge:"New",popular:85,newest:11},
 {id:"fz12",name:"Executive Office Chair",category:"Workspace",price:22500,image:"https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&w=900&q=85",description:"Supportive seating for a more comfortable workday.",popular:81,newest:12}
];
const money=n=>"৳ "+Number(n).toLocaleString("en-BD");
const validNumber=()=>/^\d{10,15}$/.test(WHATSAPP_NUMBER);
function whatsappUrl(message){
 if(!validNumber()){alert("Furniture Zone WhatsApp number has not been configured yet. Please contact the store directly.");return "#";}
 return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
function orderMessage(p){return `Hello Furniture Zone, I am interested in purchasing ${p.name}. Please share availability, price and delivery details.`;}
function orderLink(p){return whatsappUrl(orderMessage(p));}
document.querySelectorAll("[data-whatsapp-general]").forEach(a=>{a.href=whatsappUrl("Hello Furniture Zone, I have a question about your furniture collection.");a.target="_blank";a.rel="noopener";});
function card(p){
 return `<article class="shop-card" data-product-id="${p.id}">
 <button class="shop-image" type="button" data-details="${p.id}" aria-label="View ${p.name} details"><img loading="lazy" src="${p.image}" alt="${p.name}" onerror="this.onerror=null;this.src='assets/hero-room.jpg'">${p.badge?`<span class="product-badge">${p.badge}</span>`:""}<span class="quick-view">VIEW DETAILS ↗</span></button>
 <div class="shop-info"><div><span class="shop-category">${p.category}</span><h3><button type="button" data-details="${p.id}">${p.name}</button></h3><p>Demo product · confirm details</p></div><strong>${money(p.price)}${p.oldPrice?`<del>${money(p.oldPrice)}</del>`:""}</strong></div>
 <a class="buy-button" href="${orderLink(p)}" target="_blank" rel="noopener">BUY NOW <span>↗</span></a></article>`;
}
function setupCarousel(el,items){
 const track=el.querySelector("[data-track]"); if(!track)return;
 track.innerHTML=items.map(card).join("");
 let timer=null,visible=false,paused=false;
 const step=()=>{const item=track.querySelector(".shop-card");if(!item)return;const gap=parseFloat(getComputedStyle(track).gap)||18;const amount=item.getBoundingClientRect().width+gap;const max=track.scrollWidth-track.clientWidth;if(max<5)return;if(track.scrollLeft>=max-amount/2)track.scrollTo({left:0,behavior:"smooth"});else track.scrollBy({left:amount,behavior:"smooth"});};
 const stop=()=>{if(timer)clearInterval(timer);timer=null;};
 const start=()=>{stop();if(visible&&!paused&&!matchMedia("(prefers-reduced-motion: reduce)").matches)timer=setInterval(step,4200);};
 el.querySelector(".carousel-prev")?.addEventListener("click",()=>{paused=true;stop();const item=track.querySelector(".shop-card");track.scrollBy({left:-(item?.getBoundingClientRect().width||240)-18,behavior:"smooth"});});
 el.querySelector(".carousel-next")?.addEventListener("click",()=>{paused=true;stop();step();});
 el.addEventListener("mouseenter",()=>{paused=true;stop();});
 el.addEventListener("mouseleave",()=>{paused=false;start();});
 el.addEventListener("focusin",()=>{paused=true;stop();});
 el.addEventListener("focusout",e=>{if(!el.contains(e.relatedTarget)){paused=false;start();}});
 let touchStart=0;track.addEventListener("touchstart",e=>{touchStart=e.touches[0].clientX;paused=true;stop();},{passive:true});
 track.addEventListener("touchend",e=>{if(Math.abs(e.changedTouches[0].clientX-touchStart)>24){paused=false;start();}},{passive:true});
 const io=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(!visible)stop();else start();},{threshold:.25});io.observe(el);
}
document.querySelectorAll('[data-carousel="bestsellers"]').forEach(el=>setupCarousel(el,PRODUCTS.filter(p=>p.popular>=88)));
document.querySelectorAll('[data-carousel="new"]').forEach(el=>setupCarousel(el,[...PRODUCTS].sort((a,b)=>a.newest-b.newest).slice(0,7)));
document.querySelectorAll('[data-carousel="featured"]').forEach(el=>setupCarousel(el,PRODUCTS.filter(p=>p.badge)));
const catalog=document.querySelector("[data-catalog]");
if(catalog){
 let active="all",query="",sort="popular",limit=8;
 const search=document.querySelector("#product-search"),sorter=document.querySelector("#product-sort"),buttons=[...document.querySelectorAll("[data-filter]")],more=document.querySelector("#show-more"),count=document.querySelector("[data-result-count]");
 const params=new URLSearchParams(location.search);if(params.has("category"))active=params.get("category");if(params.has("sort"))sort=params.get("sort");
 buttons.forEach(b=>{b.classList.toggle("active",b.dataset.filter.toLowerCase()===active.toLowerCase());});
 if(sorter&&["popular","newest","price-asc","price-desc"].includes(sort))sorter.value=sort;
 function render(){
  let list=PRODUCTS.filter(p=>(active==="all"||p.category.toLowerCase()===active.toLowerCase())&&(p.name+" "+p.category+" "+p.description).toLowerCase().includes(query));
  if(sort==="price-asc")list.sort((a,b)=>a.price-b.price);else if(sort==="price-desc")list.sort((a,b)=>b.price-a.price);else if(sort==="newest")list.sort((a,b)=>a.newest-b.newest);else list.sort((a,b)=>b.popular-a.popular);
  catalog.innerHTML=list.slice(0,limit).map(card).join("");
  if(count)count.textContent=`${list.length} PRODUCTS`;
  if(more){more.hidden=list.length<=limit;more.textContent=limit>=list.length?"ALL PRODUCTS SHOWN":"LOAD MORE PRODUCTS +";}
 }
 search?.addEventListener("input",()=>{query=search.value.trim().toLowerCase();limit=8;render();});
 sorter?.addEventListener("change",()=>{sort=sorter.value;limit=8;render();});
 buttons.forEach(b=>b.addEventListener("click",()=>{active=b.dataset.filter;buttons.forEach(x=>x.classList.toggle("active",x===b));limit=8;render();}));
 more?.addEventListener("click",()=>{limit+=4;render();});
 render();
}
const modal=document.querySelector("#product-modal"),modalContent=document.querySelector("#modal-content");
function openDetails(id){
 const p=PRODUCTS.find(x=>x.id===id);if(!p||!modal)return;
 modalContent.innerHTML=`<div class="modal-product"><img src="${p.image}" alt="${p.name}" onerror="this.onerror=null;this.src='assets/hero-room.jpg'"><div><span class="eyebrow">${p.category} / FURNITURE ZONE</span><h2 id="modal-title">${p.name}</h2><strong class="modal-price">${money(p.price)}</strong>${p.oldPrice?`<del>${money(p.oldPrice)}</del>`:""}<p>${p.description}</p><p class="modal-disclaimer">Demo listing. Please confirm current price, availability, dimensions, materials and delivery details with our team before ordering.</p><a class="buy-button" href="${orderLink(p)}" target="_blank" rel="noopener">ORDER ON WHATSAPP ↗</a></div></div>`;
 modal.classList.add("open");modal.setAttribute("aria-hidden","false");document.body.classList.add("modal-open");
}
document.addEventListener("click",e=>{const trigger=e.target.closest("[data-details]");if(trigger)openDetails(trigger.dataset.details);if(e.target.closest("[data-close-modal]"))closeModal();});
function closeModal(){modal?.classList.remove("open");modal?.setAttribute("aria-hidden","true");document.body.classList.remove("modal-open");}
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal();});
document.querySelectorAll("[data-newsletter]").forEach(form=>form.addEventListener("submit",e=>{e.preventDefault();const msg=form.querySelector("[data-newsletter-message]");if(msg)msg.textContent="Thanks! This demo form is not connected to a mailing list yet. Please contact the store to subscribe.";form.reset();}));
document.querySelectorAll("[data-contact-form]").forEach(form=>form.addEventListener("submit",e=>{e.preventDefault();const d=new FormData(form);const msg=`Hello Furniture Zone, my name is ${d.get("name")}. Contact: ${d.get("contact")}. Enquiry: ${d.get("topic")}. Message: ${d.get("message")||"Please contact me."}`;const url=whatsappUrl(msg);if(url!=="#")window.open(url,"_blank","noopener");}));
const toggle=document.querySelector(".menu-toggle"),nav=document.querySelector(".nav");
toggle?.addEventListener("click",()=>{const open=nav.classList.toggle("open");toggle.setAttribute("aria-expanded",String(open));toggle.textContent=open?"CLOSE ×":"MENU ☰";});
nav?.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");toggle?.setAttribute("aria-expanded","false");if(toggle)toggle.textContent="MENU ☰";}));
const header=document.querySelector(".site-header");const updateHeader=()=>header?.classList.toggle("scrolled",scrollY>24);addEventListener("scroll",updateHeader,{passive:true});updateHeader();
// Loading screen: keep it brief, then reveal the page without waiting on every remote image.
(()=>{
 const started=performance.now();
 const finish=()=>{const delay=Math.max(0,650-(performance.now()-started));setTimeout(()=>document.body.classList.add("ready"),delay);};
 if(document.readyState==="complete")finish();else window.addEventListener("load",finish,{once:true});
 // Safety fallback for slow third-party assets: never trap the visitor behind the loader.
 setTimeout(()=>document.body.classList.add("ready"),2200);
})();

// Scroll reveal with a gentle stagger for product rows; dynamically rendered cards are observed too.
if("IntersectionObserver" in window){
 const revealIO=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting){entry.target.classList.add("is-visible");revealIO.unobserve(entry.target);}
 }),{threshold:.08,rootMargin:"0px 0px -35px 0px"});
 const observeReveal=(scope=document)=>{
  scope.querySelectorAll("main section:not(.hero),.promo-tile,.shop-card,.category-tile,.value-grid article,.service-row,.service-list article,.review-card,.collection-feature > div").forEach(el=>{
   if(el.classList.contains("reveal-observed"))return;
   el.classList.add("reveal","reveal-observed");
   const siblings=el.parentElement?Array.from(el.parentElement.children).filter(node=>node.matches(".shop-card,.promo-tile,.category-tile,.value-grid article,.service-row,.service-list article")):[];
   const index=siblings.indexOf(el);el.style.setProperty("--reveal-delay",`${Math.max(0,index)*85}ms`);
   revealIO.observe(el);
  });
 };
 observeReveal();
 // Cards are inserted after page startup by carousel/catalog rendering.
 const dynamicObserver=new MutationObserver(records=>records.forEach(record=>record.addedNodes.forEach(node=>{
  if(node.nodeType===1){if(node.matches?.(".shop-card"))observeReveal(node.parentElement||document);else observeReveal(node);}
 })));
 document.querySelectorAll("[data-track],[data-catalog]").forEach(el=>dynamicObserver.observe(el,{childList:true}));
}
// Native scrolling is lighter on phones; Lenis is enabled only on larger screens.
if(window.Lenis&&window.matchMedia("(min-width: 701px)").matches&&!matchMedia("(prefers-reduced-motion: reduce)").matches){
 const lenis=new Lenis({duration:.9,smoothWheel:true,orientation:"vertical",gestureOrientation:"vertical"});
 let rafId;function raf(t){lenis.raf(t);rafId=requestAnimationFrame(raf);}rafId=requestAnimationFrame(raf);
 document.addEventListener("visibilitychange",()=>{if(document.hidden){cancelAnimationFrame(rafId);lenis.stop();}else{lenis.start();rafId=requestAnimationFrame(raf);}});
}
