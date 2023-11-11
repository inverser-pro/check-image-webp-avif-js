# check-image-webp-avif-js
## Check image webp, avif with native JavaScript


### Чтобы проверить поддерживает ли браузер пользователя webp, avif, можно использовать следующий код...



```
async function supportAVIF(){//https://github.com/leechy/imgsupport/blob/master/imgsupport.js  
    const AVIF = new Image();  
    await (AVIF.onload = AVIF.onerror = function () {  
        if(AVIF.height==2){  
            window.detectAvif=true;  
            document.body.classList.add('avif')  
            return true  
        }else{  
            document.body.classList.add('noavif')  
            return false;  
        }  
    })  
    await (AVIF.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=');  
}  
supportAVIF();  
async function supportWEBP() {  
    const WEBP = new Image();  
    await (WEBP.onload = WEBP.onerror = function () {  
        if(WEBP.height==2){  
            window.detectWebp=true;  
            document.body.classList.add('webp')  
            return true  
        }else{  
            document.body.classList.add('nowebp')  
            return false;  
        }  
    })  
    await (WEBP.src = 'data:image/webp;base64,UklGRi4AAABXRUJQVlA4ICIAAABQAQCdASoDAAIAAgA2JQBOgC6gAP73M8eLuxHGTv3eIAAA');  
};  
supportWEBP();
```

При этом, Вы сможете ставить фоновые картинки асинхронно, к примеру или подгружать img тоже асинхронно.

Получается, что в глобальной переменной `window.detectAvif` и `window.detectWebp` теперь хранится значение поддержки браузером этих форматов (если поддерживает, то хранится `true`). Если какой-либо формат не поддерживается, то ставится значение `undefined`.

Также к body добавляются классы `webp`/`nowebp`, `avif`/`noavif`.

WEBP и AVIF — современные форматы изображений. WEBP получил уже большую поддержку браузерами, даже FireFox его уже поддерживает. Кстати, код выше отрабатывает поддержку также на FireFox, что НЕ делают другие коды, которые Вы можете найти в инетике...

AVIF — достаточно свежий формат, который показывает ошеломляющие результаты сжатия по сравнению с JPG. Можно достичь прироста в 50%, при том же визуальном качестве.

Подробнее о новом формате для WEB, на английском языке: [AVIF browser test page: AVIF support in Chrome, Firefox, Edge…](https://link.inverser.pro/r2?l=https://libre-software.net/avif-test/)

[Онлайн конвертер](https://link.inverser.pro/r2?l=https://squoosh.app) PNG, AVIF, JPEG, WEBP...

[Узнать поддерживает ли какой браузер AVIF](https://link.inverser.pro/r2?l=https://caniuse.com/avif).