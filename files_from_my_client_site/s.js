"use strict"
console.log('powered by %o','https://order.inverser.pro')
const d=document;
function s(e){return d.querySelector(e)};
function a(e){return d.querySelectorAll(e)};
fetch('/sys/asyncS.css').then(e=>e.text()).then(e=>{
  const st=d.createElement('style');
  e=e.replace(/(?:\r\n|\r|\n)/g, '');
  st.innerText=e;
  d.body.appendChild(st)
});
const slider=s('.slider'),gtbf=a('.goToFormBtm');
if(gtbf&&gtbf?.length>0){
  //const btmf=s('.scroll-btn-onHeader')
  for(const el of gtbf){
    el.addEventListener('click',()=>{
      const btmf=s('.loadAsyncForm input')
      if(btmf) {
        btmf.scrollIntoView({behavior: "smooth", block: 'center'})
        setTimeout(()=>btmf.focus(),1e3)
      }
    },{passive:true})
  }
}
if(slider&&window.screen.width>768){
  fetch('/sys/sld/glider.min.js').then(e=>e.text()).then(e=>{
    const scr=d.createElement('script');
    scr.innerHTML=e;
    d.body.appendChild(scr);
    const slides=a('.slide');
    if(slides&&slides?.length>1){
      new Glider(slider, {
        slidesToShow: 3,slidesToScroll: 3,draggable: true,rewind: true,arrows: {next: '.glider-next'},breakpoints:{1441:{perView:3},765:{perView:2},480:{perView:1}}
      });
    }
    scr.remove()
  });
}
function action(formClassname){
  function chTkn(){
    const token = s('.token');
    if (!token||token===''||!token.value||token.length<20) {
      alt('Ошибка 02. '+errmsg);
      return 0;
    }
    return 1;
  }
  function chSiSe(){
    const stse = s('.siteSettings');
    if (!stse||stse==='') {
      alt('Ошибка 01. '+errmsg);
      return 0;
    }
    return 1;
  }
  const cs=s(formClassname+' .contact-send');
  if(cs){
    cs.addEventListener('click',()=>{
      let q1=1;
      if(!chTkn()) {q1 = 0;throw "Token error..."};
      if(!chSiSe()) {q1 = 0;throw "SiSett error..."};
      if (q1===1) {
        const data = {};
        data.header = s(formClassname+' h3').innerText;
        data.name = s(formClassname+' .formName');
        data.phone = s(formClassname+' .formTel');
        data.text = s(formClassname+' .formTxt');
        data.mailto = JSON.parse(s('.siteSettings').innerText)?.emailTo;
        if(!data.mailto)alt(errmsg);
        const altCl=a('.alt-att');
        if(altCl&&altCl?.length>0){
          for(const el of altCl){
            el.classList.remove('alt-att')
          }
        }
        Object.values(data).forEach(e=>{
          if(e.value===''&&e.getAttribute('id')!='z3'){
            e.classList.remove('alt-att');
            e.classList.add('alt-att');
            e.focus();
            alt(`Необходимо заполнить ${e.getAttribute('placeholder').toLowerCase()}.`);
            e.addEventListener('click',()=>{if(e.classList.contains('alt-att')){e.classList.remove('alt-att')}})
            throw 'Value is empty.';
          }
        });
        if(data.phone.value.replace(/\D/g,"").length<10||data.phone.value.replace(/\D/g,"").length>20){
          data.phone.focus();
          alt('Номер телефона введён неверно. '+data.phone.value);
          throw "Invalid phone number";
        }
        data.name=data.name.value;
        data.phone=data.phone.value;
        data.text=data.text.value;
        try {
          fetch('/', {
            method: 'post',
            headers: {
              'Accept': 'application/json, text/plain',
              'X-Token': s('.token').value,
              'Content-Type': 'application/json'
            },
            mode: "same-origin",
            cache: "force-cache",
            credentials: "same-origin",
            body: JSON.stringify({location_: location.href, set: 'feedback', data})
          }).then(res => res.json())
           .then(res => {
             if (res.s===undefined||res.d===undefined)return false;
             if (res.s===1)alt(res.d);
             if (res.d)alt(res.d);
             if (res.j) {
               let s = d.createElement('script');
               s.classList.add("JS");
               s.innerHTML = res.j;
               d.body.appendChild(s)
             };
           })
           .catch((e) => {alt('Ошибка...' + e)});
        } catch (e) {
          alt('Ошибка... ' + e);
        }
      }
    })
  }
}

/*load courses and prices| DO NOT REMOVE FROM THIS FILE!*/
const loadPrcs=s('.loadPrices');
if(loadPrcs){
  if(loadPrcs.dataset.load){
    fetch(loadPrcs.dataset.load).then(e=>e.json()).then(e_=>{
      let itr=0,clss_='_',counter=3;
      if(window.screen.width<769)counter=4
      const arrOfBtnsTypes=[];
      Object.values(e_).forEach((e,l)=>{
        if(itr>counter-1)clss_='dn'
        itr++;
        const ndv=d.createElement('div'),
         mainPrc=(e?.prc)?String(e.prc):'',
         oldPrc=(e.oprc)?`<sup><del class=ml1>${e?.oprc}</del></sup>`:'',
         tim=(e.time)?`<small class=c7c>${e?.time} ак. часов</small>`:'',
         svg_=(mainPrc!=='free')?'<svg viewBox="0 0 24 24" width=32 class=mr-025><use href="/sys/s.svg#order"></use></svg> Заказать':'<svg viewBox="0 0 512 512" width=32 class=mr-025><use href="/sys/s.svg#freeOrder"></use></svg> Получить',
         im=e.img||'';
        let prcs='',
         clss='',
         mainPrcNw='',
         h3='Получить бесплатный курс';
        if(mainPrc.length>3){
          mainPrcNw=mainPrc.substring(0,mainPrc.length-3)+' '+mainPrc.substring(mainPrc.length - 3)
        }else{
          mainPrcNw=mainPrc
        }
        if(mainPrc==='free') {
          prcs='<span class="p4 bgr cf br tu">Бесплатно</span>';
          clss='goToFree'
        }else {
          prcs=`<span><svg viewBox="0 0 24 24" width=24 class=vam><use href="/sys/s.svg#price"></use></svg> <q>${mainPrcNw} <svg viewBox="0 0 256 256" width="14" class=invert><use href="/sys/s.svg#rur"></use></svg></q>${oldPrc}</span> `;
          clss='goToPaid'
          h3='Заказать курс'
        }
        ndv.classList.add('prc','fx','fdc','fsb','my1','bxsh','br.2','p4','bx','bgb',clss_);
        ndv.innerHTML=`<div class="pr prcImg">
<picture>${tplPic(im,'br.2','','lazy')}</picture>
<button class="pa btn p4 br tu goToCourseInfo" data-id="${l}"><svg viewBox="0 0 64 64" class="vas" width="10"><use href="/sys/s.svg#more"></use></svg> Подробнее</button>
</div>
<h4>${e?.ttl}</h4>
<div class=prcTxt>
  <div class="fx ac fsa fw gap.3">
    ${prcs}
    ${tim}
    <button class="fx ac br p4 bx bxsh tu bgf ${clss}" data-h3="${h3}">${svg_}</button>
  </div>
</div>`;
        if(e.type){
          arrOfBtnsTypes.push(e.type);
          ndv.setAttribute('data-type',e.type);
        }
        loadPrcs.appendChild(ndv)
      });
      //goToPaid
      const btnsPay=a('.goToPaid'),
          scrollHere=s('.scrollHere');
      if(scrollHere&&btnsPay&&btnsPay.length&&btnsPay.length>0){
        for(const el of btnsPay){
          el.addEventListener('click',()=>{
            scrollHere.scrollIntoView({behavior: "smooth",block:'start'})
          })
        }
      }
      // create filters
      let newArFrTypes=[];// for create btns
      for(const el of arrOfBtnsTypes){
        const y=el.split('|');
        for(const ele of y){
          newArFrTypes.push(ele)
        }
      }
      newArFrTypes=[...new Set(newArFrTypes)];//get only uniq values
      newArFrTypes.sort((a, b)=>{
        if(a < b) { return -1; }
        if(a > b) { return 1; }
        return 0;
      })
      const neBtn=d.createElement('button'),
      neDiv=d.createElement('div');
      neDiv.classList.add('fx','gap1','fw','btnTypes')
      neBtn.classList.add('btn','br','p4','fs1');
      loadPrcs.before(neDiv)
      const cloned=neBtn.cloneNode(true);
      cloned.innerText='Все';
      neDiv.appendChild(cloned);
      cloned.classList.add('bgb','cf')
      for(const el of newArFrTypes){
        const cloned=neBtn.cloneNode(true);
        cloned.innerText=el;
        neDiv.appendChild(cloned);
      }
      const btnMore=d.createElement('button');
      if(Object.values(e_).length>counter){
        btnMore.classList.add('btn','p4','fx','ac','btn','br','p4','mlra','my4','fs1.2','cf','bgb');
        btnMore.innerHTML='<svg viewBox="0 0 256 256" width="34" class="vam invert mr-025"><use href="/sys/s.svg#showMore"></use></svg> <span>ПОКАЗАТЬ ВСЕ КУРСЫ</span>'
        loadPrcs.after(btnMore)
        btnMore.addEventListener('click',()=>{
          const prc=a('.prc.dn');
          if(prc&&prc?.length>0){
            for(const el of prc){
              el.classList.remove('dn')
            }
          };
          btnMore.remove()
        })
      }
      const allBtnType=a('.btnTypes button'),
          allLess=a('.loadPrices .prc');
      if(allBtnType&&allBtnType?.length>0){
        for(const el of allBtnType){
          el.addEventListener('click',e=>{
            const u=e.target;//btn
            if(!u.classList.contains('bgb')){
              for(const ele of allBtnType){
                ele.classList.remove('bgb','cf');
              }
              u.classList.add('bgb','cf');
              if(u.innerText==='Все'){
                for(const q of allLess){
                  q.classList.remove('dn');
                  btnMore.remove()
                }
              }else if(u.innerText==='Бесплатные'){
                for(const q of allLess){
                  q.classList.add('dn');
                  if(q.dataset.type&&q.dataset.type.search('Бесплатные')>-1)q.classList.remove('dn')
                  btnMore.remove()
                }
              }else{
                for(const q of allLess){
                  q.classList.add('dn');
                  if(q.dataset.type) {
                    //console.log('q='+q.dataset.type,'btn='+u.innerText,q.dataset.type.search(u.innerText))
                    if (q.dataset.type === 'Бесплатные' || q.dataset.type.search(u.innerText)>-1) {
                      q.classList.remove('dn')
                    }
                  }
                  btnMore.remove()
                }
              }
            }
          })
        }
      }

    });
  }else{
    console.log(loadPrcs + 'NO DATA URL')
  }
}
// \ courses

fetch('/sys/pub/asyncFormFeedback.html').then(e=>e.text()).then(e=>{
  const div=d.createElement('div'),
        openForm=s('.loadAsyncForm');
  div.innerHTML=e;
  d.body.appendChild(div);

  if(openForm){
    const form=s('.popupDiv .getFormForOpenForm')
    if(form) {
      openForm.innerHTML = form.innerHTML;
      openForm.classList.add('contact');
      action('.loadAsyncForm')
      const loadedFormLabels = a('.loadAsyncForm.contact label'),
            loadedFormInputs = a('.loadAsyncForm.contact input'),
            loadedFormTxts = a('.loadAsyncForm.contact textarea');
      function set__(elnts,h='for'){
        if (elnts && elnts?.length > 0) {
          for (const el of elnts) {
            el.setAttribute(h,el.getAttribute(h) + '_')
          }
        }
      }
      set__(loadedFormLabels,'for');
      set__(loadedFormInputs,'id');
      set__(loadedFormTxts,'id')
    }
  }

  fetch('/sys/js/anime.min.js').then(e=>e.text()).then(e=>{
    const an=d.createElement('script');
    an.innerHTML=e
    d.body.appendChild(an);
    const cb=a('.goToFree'),
     pp=s('.popupJS'),
     duration=800,
     easing='linear',
     ee='easeOutElastic',
     close=s('.pclose');
    if(pp&&cb&&cb?.length>0){
      for(const el of cb){
        el.addEventListener('click',()=>{
          let h3=(el.dataset.h3?.length>0)?el.dataset.h3:'Задайте свой вопрос';
          const h3c=s('.popupJS h3');
          if(h3c)h3c.innerText=h3
          //anime({targets:close,easing,translateY:'-110%'})
          anime({targets:pp,easing,opacity:0,duration:0,complete:()=>{
              pp.classList.remove('dn');
              //d.body.classList.add('ovh');
              anime.timeline().add({targets:pp,opacity:1,duration:200,easing})
               .add({targets:close,translateY:['-110%','0'],duration:400,easing:ee})
               .add({targets:'.popup',opacity:[0,1],duration:400,easing})
               .add({targets: '.popupJS label',translateY: [25,0],opacity:[0,1],duration:800,easing,delay: anime.stagger(50)});
              const ppft=s('.popup .formTel');
              if(ppft)ppft.focus()
            }});
          const vdo=s('video');
          if(vdo)vdo.pause();
        })
      }
      if(close){
        close.addEventListener('click',()=>{
          //d.body.classList.remove('ovh');
          clsPP()
        })
        action('.popupDiv')
      }
    }
    anime.timeline()//.add({targets:'header.header',opacity:1,easing:ee,duration,translateY:['-110%',0]})
     .add({targets:'.bg-img',opacity:[0,1],easing,duration})
     //.add({targets:'.an-ch',scale:[.7,1],opacity:[0,1],easing,duration,translateY:['10%',0]})
     //.add({targets: '.an-queue',translateY: ['5%',0],opacity:[0,1],easing,delay: anime.stagger(100)})
     //.add({targets: '.slider .slide',translateY: ['5%',0],opacity:[0,1],easing,delay: anime.stagger(50)})
     //.add({targets:'.glider-next',opacity:[0,1],easing,duration:1e3});

    // animate onscroll

    const mainContent=s('.mainContent')//remove ПРАВКИ

    /*
    * */
    const header=s('header.header'),
        scrD=s('.scrollDown');
    let shRM=true;
    /*
    * \
    * */

    if(mainContent) {//remove ПРАВКИ и ниже
      /*window.*/mainContent.onscroll=()=>{
        if(mainContent.scrollTop>210) {
          header.classList.add('headerCl')
          if(shRM){
            shRM=false;
            if(scrD)setTimeout(()=>{s('.scrollDown').classList.add('o0!')},1e3)
          }
        }else {
          header.classList.remove('headerCl')
        }
      }
    }

    const bgi=s('.bg-img');
    if(bgi){
      // picture margin-top
      /*const catHead=s('.catHeader'),
            mp=s('.mainpage');
      if(catHead&&window.innerWidth<769){
        let w=40;
        if(mp)w=50;
        setTimeout(()=>{
          let htop=parseInt(getComputedStyle(bgi)['height']);
          htop=htop-(htop*w/100);
          catHead.setAttribute('style',`transition:margin linear 1s,transform linear .6s;opacity:1;margin-top:${htop}px`);
        },4e3)
      }*/
      // \ picture margin-top
      const an_=anime({targets:bgi,translateY:[0,'-100%'],easing,duration:8e3,autoplay:false});


    }
    an.remove()
// \ animate onscroll
  })/*fetch anime*/
})
function clsPP(){
  const easing='linear',
      pp=s('.popupJS');
  anime({targets:close,translateY:[0,'-110%'],duration:200,easing,complete:()=>{
      anime.timeline()
          .add({targets: '.popupJS label',translateY: [0,5],opacity:[1,0],easing,duration:500,delay: anime.stagger(50)})
          .add({targets:'.popup',opacity:0,duration:400,easing})
          .add({targets:'.popupJS',opacity:0,duration:400,easing,complete:()=>{
              pp.classList.add('dn');
              const vdo=s('video');
              if(vdo)vdo.play();
            }});
    }});
}
function alt(e) {
  const t = s(".alt");
  if (!t) {
    const e = d.createElement("div");
    e.classList.add("alt", "cf", "ovh");
    d.body.append(e)
  } else {
    t.remove();
    const e = d.createElement("div");
    e.classList.add("alt", "cf", "ovh");
    d.body.append(e)
  }
  const n = s(".alt");
  n.innerHTML = `${e}`,
      s(".alt").classList.remove("altCl");
  let r = setTimeout(()=>{
        n.remove();
        clearTimeout(r);
        r=null
      }, 20e3)
}
(()=>{
// https://joyofcode.xyz/dark-mode-favicon
  const fvicn = d.querySelector('link[rel="alternate icon"]');
  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  fvicn.href=(mq.matches)?'/favicon-dark.avif':'/favicon.avif';

  const mnu=a('.mod-menu li a');
  if(mnu&&mnu.length&&mnu.length>0){
    for(const el of mnu){
      const s0=String(el.classList),szs=s0.substring(1).split('_');
      if(s0.length>0)el.classList.remove(s0)
      if(szs[0]&&szs[1]){
        szs[1]=szs[1].split('|')
        if(!szs[1][1])szs[1][1]='fff';
        const spn=[el.querySelector('span')];
        if(spn[0]){
          spn[1]=`<q>${spn[0].className.replace('p-2 ','',spn[0].className)}</q>`
        }else{spn[1]=''}
        el.innerHTML=`<svg viewBox="0 0 ${szs[0]} ${szs[1][0]}"><use xlink:href="/sys/s.svg#${el.title}"></use></svg>
<p class="fx fdc">
  <q style="color:#${szs[1][1]}">${el.innerText}</q>
  ${spn[1]}
</p>`;
        el.classList.add('fx','ac');
        el.removeAttribute('title');
      }
    }
    // menu
    const menu=s('ul.mod-menu.mainmenu'),
          newmenu=d.createElement('div'),
          menuBtn=s('.menuBtn');
    if(menu&&menuBtn){
      let cl_='_'
      if(window.screen.width<1025){
        cl_='mobMCl'
      }
      newmenu.classList.add('pr',/*'p0',*/'mobmenu',/*'mobMCl','ova',*/'wmc','fx','fsb','fdc',cl_);
      newmenu.innerHTML=`<ul class="pr fx fdc gap1 w1">${menu.innerHTML}</ul><div class="fdc fx gap1 jc tlem"></div>`;
      d.body.appendChild(newmenu);
      const clsBtn=d.createElement('li');
      clsBtn.classList.add('cf','clsBtnLi','pc-hide')
      clsBtn.innerHTML=`
<a href="#" class="fx ac jc gap.5 br nav-item pc-hide mob-fx cf bgb clsBtn">
  <svg viewBox="0 0 468.067 468.067"><use xlink:href="/sys/s.svg#clsBtn"></use></svg> Закрыть
</a>`;
      /*const sml=d.createElement('small');
      sml.innerText='Официальный партнёр СКБ «Контур»';
      sml.classList.add('my1','cp','tc');
      sml.setAttribute('onclick','location.href=\'/\'');
      s('.mobmenu ul li').before(sml)*/
      const menuTel=d.createElement('div'),
            tl=s('[data-load="tel"]'),
            clar=['fx','ac','jc','nav-item','mbli'];
      menuTel.classList.add(...clar)
      menuTel.innerHTML=`<a href="tel:${tl.innerText}">${tl.parentNode.innerHTML}</a>`;
      const menuEmail=d.createElement('div');
      menuEmail.classList.add(...clar)
      menuEmail.innerHTML='<span data-load=email></span>'//s('[data-load="email"]').innerHTML;
      s('.mobmenu ul li').before(clsBtn)
      const dnBtn=s('.dnBtn'),
            tlem=s('.tlem');
      if(tlem) {
        tlem.appendChild(menuTel)
        tlem.appendChild(menuEmail)
        if(dnBtn){
          //setTimeout(()=>{
            const clnd=dnBtn.cloneNode(true);
            clnd.classList.add('nav-item');
            tlem.appendChild(clnd)
          //},1e3)
        }
      }
      function cls(){
        const mobMenu=s('.mobmenu')
        //d.body.classList.remove('ovh');
        if(anime){
          anime({
            targets: '.mobmenu .nav-item',translateY:5,opacity:0,duration:800,delay: anime.stagger(50),complete:()=>{
              if(mobMenu)mobMenu.classList.add('mobMCl');
            }
          })
        }
      }
      clsBtn.addEventListener('click',e=>{e.preventDefault();cls();return})
      menuBtn.addEventListener('click',e=>{
        e.preventDefault();
        menuBtn.classList.toggle('menuBtnCl');
        newmenu.classList.toggle('mobMCl');
        //d.body.classList.toggle('ovh');
        if(anime){
          anime({
            targets: '.mobmenu .nav-item',translateY: [50,0],opacity:[0,1],duration:800,delay: anime.stagger(50)
          })
        }
      })
      // parent
      const prnt=a('.mobmenu .parent'),
            prntUl=a('.mobmenu .parent ul');
      if(prnt&&prnt?.length>0){
        for(const el of prnt){
          const btn=d.createElement('button');
          btn.classList.add('pa','fs1','btn-opnSubMnu')
          btn.innerHTML='<div class=fwb>+</div>';
          el.appendChild(btn);
          btn.addEventListener('click',e=>{
            let elem=e.target;
            if(elem.nodeName.toLowerCase()==='span')elem=elem.parentNode;
            if(!elem.classList.contains('clcl')) {
              elem.classList.add('clcl')
            }else{
              elem.classList.remove('clcl')
            }
            const u=btn.parentNode.querySelector('ul');
            if(u.classList.contains('dn')){
              u.classList.remove('dn','animm2');
              u.classList.add('animm')
            }else{
              setTimeout(()=>{u.classList.add('animm2')},100);
              setTimeout(()=>{u.classList.add('dn')},600);
              u.classList.remove('animm')
            }
          })
        }
      }
      if(prntUl&&prntUl?.length>0){
        for(const el of prntUl){
          el.classList.add('dn')
        }
      }
      // \ parent
    }
  }
  const loadFromJSON=JSON.parse(s('.siteSettings').innerText),
        dataLoad=a('[data-load]');//Keys from JSON must match attribute values
  if(!loadFromJSON||!dataLoad||!dataLoad.length||dataLoad.length<1){
    console.warn('no data from JSON || no data-load attributes')
  }else{
    for(const el of dataLoad){
      const data=el.dataset.load;
      if(data&&loadFromJSON[data]) {
        el.innerText=loadFromJSON[data];
        if(data==='tel'&&el.parentNode.tagName==='A')el.parentNode.href=`tel:${loadFromJSON[data].split(' ').join('-')}`;
        if(data==='email'){
          el.innerText='';
          const a=d.createElement('a');
          a.href=`mailto:${loadFromJSON[data]}`;
          a.innerText=loadFromJSON[data];
          el.appendChild(a);
        }
        if(data==='address'){
          el.innerText='';
          const adr=d.createElement('address');
          adr.innerText=loadFromJSON[data];
          el.appendChild(adr)
        }
      }
    }
  }
/*  const header=s('header.header'), // REMOVE /**---/
        scrD=s('.scrollDown');
  let shRM=true;
  if(header){
    const mainContent=s('.mainContent')//remove ПРАВКИ
    if(mainContent) {
      /!*document*!/mainContent.onscroll=()=>{
        console.log('scroll',mainContent.scrollTop)
        if(mainContent.scrollTop>210) {
          header.classList.add('headerCl')
          if(shRM){
            shRM=false;
            if(scrD)setTimeout(()=>{s('.scrollDown').classList.add('o0!')},1e3)
          }
        }else {
          header.classList.remove('headerCl')
        }
      }
    }
  }*/
  fetch('/sys/js/data.js').then(e=>e.text()).then(e=>{
    const scr=d.createElement('script');
    scr.innerHTML=e;
    d.body.appendChild(scr)
  });

  // https://codepen.io/HighFlyer/pen/qByPyqr
/*  const onscrll = a("[data-onscr]");
  const scrollReveal = function(){
    for(const el of onscrll){
      const isElementsOnScreen = el.getBoundingClientRect().top < window.innerHeight;
      if(!el.classList.contains('onscr')) {
        if (isElementsOnScreen) {
          el.classList.add("onscr")
        } else {
          el.classList.remove("onscr")
        }
      }
    }
  }
  window.addEventListener("scroll", scrollReveal);
  window.addEventListener("load", scrollReveal);*/
})();


function tplPic(im,clss='',alt='',loading=''){
  if(loading)loading=` loading=lazy`;
  return `
<source type="image/avif" srcset="${im}-750.avif 750w,
${im}-1080.avif 1080w,
${im}-1366.avif 1366w,
${im}-1920.avif 1920w,
${im}-2560.avif 2560w" sizes="(min-width: 2560px) 2560px, 100vw">
<source type="image/webp" srcset="${im}-750.webp 750w,
${im}-1080.webp 1080w,
${im}-1336.webp 1366w,
${im}-1920.webp 1920w,
${im}-2560.webp 2560w" sizes="(min-width: 2560px) 2560px, 100vw">
<img width="2560" sizes="(min-width: 2560px) 2560px, 100vw" decoding="async"${loading} src="${im}-2560.jpg" class="${clss}" srcset="${im}-750.jpg 750w,
${im}-1080.jpg 1080w,
${im}-1366.jpg 1366w,
${im}-1920.jpg 1920w,
${im}-2560.jpg 2560w" alt="${alt}">`
}
/* \ load courses and prices*/

// prices for services
const prcs=a('.tabs div.tab');// === '.tabs div.tab'
if(prcs&&prcs?.length>0){
  const tBtn=a('.tabs .btnsForTab button');
  if(tBtn&&tBtn?.length>0&&prcs&&prcs?.length>0){
    if(prcs.length===tBtn.length){
      if(prcs[0]&&prcs[0].dataset.resource){
        let iter=0;
        for(const el of prcs){
          if(el.dataset.resource){
            fetch(el.dataset.resource).then(e => e.json()).then(json => {
              Object.values(json).forEach(e=>{
                if(e.head&&e.desc&&e.prce&&e.ulli&&e.btn) {
                  const div = d.createElement('div'),
                   ulli=e.ulli.split('|');
                  let ulliVal='',inf='',prime='';
                  if(e.inf)inf=`<small>${e.inf}</small>`;
                  for(const el of ulli){ulliVal+=`<li>${el}</li>`}
                  if(e.prime)prime=' tabTabCl'
                  div.classList.add('fx','fdc','tc');
                  if(e.prmo) {
                    e.prmo = `<small class="c7c">${e.prmo} <svg viewBox="0 0 256 256" class="vam invert" width="14"><use href="/sys/s.svg#rur"></use></svg> в месяц</small>`
                  }else{e.prmo=''}
                  if(e.vozm){e.vozm=`<h4>${e.vozm}</h4>`}else{e.vozm=''}
                  div.innerHTML = `
<div class="fx fdc mh1${prime}">
  <h3>${e.head}</h3>
  <span class="tPrc">${e.desc}</span>
  <span class="fs1.2">${e.prce} <svg viewBox="0 0 256 256" class="vam invert" width="22"><use href="/sys/s.svg#rur"></use></svg></span>
  ${e.prmo}
  <button class="btn my1 p4 tu goToFree" data-h3="${e.btn} ${e.prce}">${e.btn}</button>
  ${e.vozm}
  <mark>${inf}</mark>
  <ul class=tl>${ulliVal}</ul>
</div>`;
                  el.appendChild(div);
                  ulliVal=null,inf=null,prime=null
                }else{console.log('_NO some data IN JSON_',e)}
              })
            })
          }else{console.log('_NO DATA RESOURCE_',el)}
          iter++
        }
      }
      tBtn[0].classList.add('tBA');
      prcs[0].classList.add('tabCl');
      for(let i=0;i<tBtn.length;i++){
        tBtn[i].addEventListener('click',()=>{
          for(const el_ of tBtn){el_.classList.remove('tBA')};
          for(const elT of prcs){elT.classList.remove('tabCl')};
          tBtn[i].classList.add('tBA');
          prcs[i].classList.add('tabCl')
        })
      }
    }else{console.log('tabs length !== buttons length')}
  }
}
// \ prices for services
if(localStorage.theme&&localStorage.theme==='1'){
  d.body.classList.add('white');
}