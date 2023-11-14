"use strict";
const errmsg="К сожалению, что-то пошло не так. Перезагрузите страницу. Если ситуация повторяется, свяжитесь с нами по email или тел."


const asyncVideo=a('video[data-src]');
if(asyncVideo&&asyncVideo.length&&asyncVideo.length>0){
    for(const el of asyncVideo){
        const src=el.dataset.src.split('|');//1080|720
        if(window.innerWidth>1390&&src[0]){//1080
            el.src=src[0];
        }else if(src[1]){
            el.src=src[1];
        }else if(src[0]){
            el.src=src[0]
        }
        el.removeAttribute('data-src')
    }
    //asyncVideo.src=asyncVideo.dataset.src;
    //asyncVideo.removeAttribute(asyncVideo.dataset.src)
}
const asyncIframe=s('iframe[data-src]');
if(asyncIframe){
    setTimeout(()=>{
        asyncIframe.src=asyncIframe.dataset.src;
        asyncIframe.removeAttribute('data-src')
    },3e3)
}
const copy=a('.copy');
if(copy){
    function copyMe(text) {
        const hiddenInputEl=s('.JhiddenInput');
        if(hiddenInputEl===null){
            const hiddenInput=d.createElement('input');
            hiddenInput.classList.add('JhiddenInput','hideIn');
            hiddenInput.setAttribute('readonly','');
            d.body.append(hiddenInput);
        };
        const hiddenInput=s('.JhiddenInput');
        hiddenInput.setAttribute('value',text);
        const copyText =s('.JhiddenInput');
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        d.execCommand("copy");
        hiddenInput.remove();
    };
    copy.forEach(function (el) {
        el.addEventListener('click',()=>{
            copyMe(el.innerText);
            alt('Скопировано')
        });
    })
};
const loadSvg=a('.loadSvg');
if(loadSvg&&loadSvg.length){
    for(const el of loadSvg){
        const path=el.dataset.path, class_=el.dataset.class;
        if(path){
            fetch(path).then(e=>e.text()).then(e=>{
                if(class_)e=e.replace('xmlns', `class="${class_}" xmlns`);
                el.insertAdjacentHTML("afterend",e);
                el.remove();
            })
        }
    }
}
const loadPic=a('.loadPicture');
if(loadPic&&loadPic.length){
    for(const el of loadPic){
        const im=el.dataset.pic;
        if(im){
            el.insertAdjacentHTML("afterend",`
            <picture>${tplPic(im,'br.2')}</picture>
            `);
            el.remove();
        }
    }
}
const bgCatImg=s('.catImg');
if(bgCatImg){
    const imgData=JSON.parse(bgCatImg.innerText);
    if(!imgData.catImgAlt)imgData.catImgAlt='pirodesign';
    if(imgData.catImg&&imgData.catImgAlt) {
        const im='/'+imgData.catImg.replace(/\.[^/.]+$/, ""),
            pic=d.createElement('picture');
        pic.innerHTML=tplPic(im,'pa z-1 bg-img',imgData?.catImgAlt);
        //pa z-1 bg-img
        const mainContent=s('.mainContent')
        if(mainContent)mainContent.appendChild(pic)
    }
}

const imgs=a('img');
if(imgs&&imgs?.length>0){
    for(const el of imgs){
        el.addEventListener('contextmenu',e=>e.preventDefault())
    }
}

const shw=a('.showMoreHide'),
 showMore=s('.showMore');
if(showMore&&shw&&shw?.length>0){
    const sms=showMore.querySelector('span'),
          smt=sms.innerText;
    showMore.addEventListener('click',()=>{
        for(const el of shw){
            el.classList.toggle('showMoreHideCl')
        }
        if(showMore.classList.contains('btnShw')){// opened, click to close
            sms.innerText=smt;
            const b=s('.btnShwScrll');
            if(b)b.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
        }else{
            sms.innerText='Скрыть'
        }
        showMore.classList.toggle('btnShw');
    })
}

const coursesRM=s('.settingsForCourses');
if(coursesRM){
    const json=JSON.parse(coursesRM.innerText);
    if(json&&json.htmlUrl){
        fetch(json.htmlUrl).then(e=>e.text()).then(e=>{
            const q=d.createElement('div');
            q.innerHTML=e;
            d.body.appendChild(q);
            const JSOnFetch=s('.JSOnFetch');
            if(JSOnFetch){
                const js=d.createElement('script');
                js.innerHTML=JSOnFetch.innerHTML;
                d.body.appendChild(js);
                js.remove();
                JSOnFetch.remove()
            }
        })
    }else{
        console.warn('_NO JSON DATA_')
    }
}

const loadAKF=s('.loadAsyncKonturForm');
if(loadAKF){
    const what=loadAKF.dataset.type;
    if(!what) {
        alt('Возникла ошибка ERR4563567')
        throw 'ERR025! NO DATA';
    }
    const obj={
        pid:'',
        prn:what
    }
    switch (what) {
        case 'diadoc':
            obj.pid='30ed694a-9a16-4d25-a79c-9512aa4b6552'
            break;
        case 'normativ':
            obj.pid='e13b4819-444f-4d5b-8e79-b58cb9c01b7c'
            break;
        case 'extern':
            obj.pid='4f4028de-c960-4d7f-b6b9-402bd0668673'
            break;
        case 'focus':
            obj.pid='78b56514-0b1b-45aa-9b70-74f402d1ffab'
            break;
        case 'bukhuchet-school':
            obj.pid='923c34fd-9bd0-402e-84dd-455ff454c944'
            break;
        case 'safety':
            obj.pid='cffa1b46-5f7f-4d08-85fd-94866fc89b48'
            break;
        case 'zakupki':
            obj.pid='03d154d4-fc38-44ac-b735-6ca70fab6a2c'
            break;
    }
    setTimeout(()=>{
        fetch('/sys/js/jquery-1.11.2.min.js').then(e=>e.text()).then(e=>{
            const scr=d.createElement('script');
            scr.classList.add('JSasync');
            scr.innerHTML=e;
            d.body.appendChild(scr);
            const scr2=d.createElement('script');
            scr2.innerHTML=`var _skbOrder = []
 _skbOrder.push(['ProductId', '${obj.pid}'])
 _skbOrder.push(['ProductName', '${obj.prn}'])
 _skbOrder.push(['ServiceCenterUid', '0cfc5e86-687c-ed11-80e6-005056b2c665'])
 _skbOrder.push(['Source', 'Виджет заявки'])`;
            scr2.classList.add('JSasync');
            d.body.appendChild(scr2);
            fetch('/sys/js/kontur.js').then(e=>e.text()).then(e=>{
                const scr=d.createElement('script');
                scr.classList.add('JSasync');
                scr.innerHTML=e;
                d.body.appendChild(scr);
            })
    })
    },2e3)
}

(()=>{
    const popupDiv=s('.popupDiv');
    if(popupDiv){
        popupDiv.addEventListener('click',function (e){
            if(e.target.classList.contains('popupDiv'))clsPP()
        })
    }

    setTimeout(()=>{
        const catAniText=s('.catAniText'),loadPrdctLogo=s('.loadPrdctLogo'),ifif=s('.no-head-nav');
        if(catAniText&&loadPrdctLogo&&window.screen.width>1440&&!ifif){
            loadPrdctLogo.innerHTML=catAniText.innerHTML;
            loadPrdctLogo.setAttribute('style',`color:${catAniText.style.color}`)
            loadPrdctLogo.addEventListener("click", ()=>{
                const mc=s('.mainContent');
                if(mc)mc.scrollTo({top:0,behavior:"smooth"})
            });
            const bbttnn=d.createElement('button'),
                  h1bg=catAniText.style.color;
            bbttnn.classList.add('btn','cf');
            bbttnn.innerText='Подключиться';
            bbttnn.setAttribute('style',`background-color:${h1bg}`);
            bbttnn.addEventListener('click',e=>{
                e.stopPropagation();
                const mc=s('.scroll-btn-onHeader');
                if(mc)mc.scrollIntoView({behavior:"smooth", block: "start", inline: "nearest"})
            })
            loadPrdctLogo.prepend(bbttnn);
            const ul=d.createElement('ul'),addnavtop=s('.addnavtop');
            if(addnavtop){
                ul.setAttribute('style','font-size:.9rem')
                ul.classList.add('fx','gap1','navtop','mob-hide')
                ul.innerHTML=`
            <li>Возможности</li> <li>Интеграция</li> <li>Цены</li> <li>Клиенты</li> <li>Справка</li> <li>Войти</li>
            `;
                addnavtop.appendChild(ul)
            }

        }
    },1e3);
    const bt=a('.dnBtn'),gtt=s('.gototop'),showHT=a('.showHT');
    if(bt&&bt?.length>0){
        let whiteLS=0,loaded=0;
        function z(){
            fetch('/sys/white-theme.css').then(e=>e.text()).then(e=>{
                const st=d.createElement('style');
                e=e.replace(/(?:\r\n|\r|\n)/g, '');
                st.innerText=e;
                d.body.appendChild(st)
            });
        }
        function ftch(data){
            fetch('/',{method: 'post',// Just set in backend white theme
                headers: {
                    'Accept': 'application/json, text/plain','X-Token': s('.token').value,'Content-Type': 'application/json'
                },
                mode: "same-origin",cache: "force-cache",credentials: "same-origin",
                body: JSON.stringify({location_: location.href, set: 'setThemeWhite',data})})
        }
        if(localStorage.theme){// white
            if(localStorage.theme==='1') {
                whiteLS = 1;
                loaded=1;
                z();
            }
        }
        const proxy = new Proxy({// https://css-tricks.com/an-intro-to-javascript-proxy/
            clss: 'invert'
        }, {
            get: function (target, prop) {
                return target[prop];
            },
            set: function (target, prop, value) {
                for(const el of bt){
                    el.classList.toggle(value)
                }
                target[prop] = value;
                return true;
            }
        });
        for(const el of bt){
            el.addEventListener('click',()=>{
                d.body.classList.toggle('white');
                if(!localStorage.theme||localStorage.theme==='0'){
                    localStorage.setItem('theme','1');// white
                    if(!loaded){
                        z();
                        loaded=1;
                    }
                }else{
                    localStorage.setItem('theme','0');// dark
                }
                proxy.clss = 'invert';
            })
            if(whiteLS) {
                proxy.clss = '_';
                el.classList.add('invert');
            }
        }
    }
    if(gtt){
        gtt.addEventListener('click',()=>{
            s('.mainContent').scrollTo({ top: 0})
        })
    }
    if(showHT&&showHT?.length>0){
        for(const el of showHT){
            el.addEventListener('click',function(){
                if(window.screen.width>1280){
                    for(const el2 of showHT){
                        const u=el2.parentNode.querySelector('div.hiddenTxt');
                        if(u)u.classList.toggle('hiddenTxtCl');
                        el2.classList.toggle('showHTCl')
                    }
                }else{
                    const u=this.parentNode.querySelector('div.hiddenTxt');
                    if(u)u.classList.toggle('hiddenTxtCl');
                    this.classList.toggle('showHTCl')
                }
            })
        }
    }
})()