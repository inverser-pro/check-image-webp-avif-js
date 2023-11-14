(()=>{
// microslider
 const slideScr=s('.slider script'),
  sldJSN=(slideScr)?JSON.parse(slideScr.innerText):null;
 if(sldJSN) {
  Object.values(sldJSN).forEach(e=>{
   const li=d.createElement('li');
   li.classList.add('micro-slider-slide','my1');
   li.innerHTML=`<div class="fx ac m0a"><img loading="lazy" class="mr1 br" width="200" src="${e?.photo}" alt><div><h4>${e?.title}</h4><p class="tj">${e?.body}</p></div></div>`;
   s('.micro-slider').appendChild(li)
  });
  slideScr.remove();
  const obs={};
  obs.sld=s(".micro-slider");
  obs.sldAll=a(".micro-slider .micro-slider-slide");
  obs.btnC=d.createElement("button");
  obs.btnC.innerHTML=`<span class="pa p0"></span>`;
  obs.btnC.classList.add("micro-slider-btn","pa","z2");
  s(".micro-slider-main").appendChild(obs.btnC);
  s(".micro-slider .micro-slider-slide").dataset.active=1;
  obs.btnC.addEventListener("click",()=>{
   obs.w=parseInt(getComputedStyle(s(".micro-slider .micro-slider-slide"), null).width.replace("px", ""));
   obs.active=null;
   obs.sldAll.forEach((e,l)=>{
    if(e.dataset&&e.dataset.active==1)obs.active=l;
    e.dataset.active=0;
   });
   if(obs.active+1==obs.sldAll.length)obs.active=-1;
   obs.sldAll[obs.active+1].dataset.active=1;
   obs.sld.setAttribute("style",`transform:translateX(-${obs.w*(obs.active+1)}px)`);
  });
 }else{console.log('ERR055; no slide data');}
// \ Micro slider

})()

(()=>{
 const d=documemnt,
  x=d.querySelector('.getSldrDt'),
  z=d.createElement('div');
 if(x){
  z.classList.add('fx','fdc','gap1','p4','br.2','slide');
  const y=JSON.parse(x?.innerText);
  z.innerHTML+=`
<span><svg fill="none" viewBox="0 0 32 32" width="36" class=vam><use href="/sys/s.svg#school"></use></svg> <a href="/nashi-servisy/shkola">Школа</a></span>
<p class=tj>Проходите онлайн обучение, повышайте квалификацию, получайте официальный документ по окончанию</p>
 `
 }
})()