//https://cdnjs.cloudflare.com/ajax/libs/gsap/1.18.0/TweenMax.min.js
/*fetch('https://cdnjs.cloudflare.com/ajax/libs/gsap/1.18.0/TweenMax.min.js').then(e=>e.text()).then(e=>{
    const tween=d.createElement('script');
    tween.innerHTML=e
    d.body.appendChild(tween);
    fetch('/sys/js/data.js').then(e=>e.text()).then(e=>{
        const scr=d.createElement('script');
        scr.innerHTML=e;
        d.body.appendChild(scr)
    });
})*/

/**
 *
 * .cc {position: fixed;left: 0;top: 0;pointer-events: none;border-radius: 50%;}
 * .cc-o {width: 30px;height: 30px;border: 1px solid #000;z-index: 12000;opacity: 0.5;}
 * .cc-i {width: 5px;height: 5px;left: -2.5px;top: -2.5px;z-index: 11000;background: #000;}
 * */

// Cursor
if(window.innerWidth>1024){
    class Cursor {
        constructor() {
            this.initCursor();
            this.initHovers();
        }
        initCursor() {
            const { Back } = window;
            this.outerCursor = document.querySelector(".cc-o");
            this.innerCursor = document.querySelector(".cc-i");
            this.outerCursorBox = this.outerCursor.getBoundingClientRect();
            this.outerCursorSpeed = 0;
            this.easing = Back.easeOut.config(1.7);
            this.clientX = -100;
            this.clientY = -100;
            this.showCursor = false;

            const unveilCursor = () => {
                TweenMax.set(this.innerCursor, {
                    x: this.clientX,
                    y: this.clientY
                });
                TweenMax.set(this.outerCursor, {
                    x: this.clientX - this.outerCursorBox.width / 2,
                    y: this.clientY - this.outerCursorBox.height / 2
                });
                setTimeout(() => {
                    this.outerCursorSpeed = 0.2;
                }, 100);
                this.showCursor = true;
            };
            document.addEventListener("mousemove", unveilCursor);

            document.addEventListener("mousemove", e => {
                this.clientX = e.clientX;
                this.clientY = e.clientY;
            });

            const render = () => {
                TweenMax.set(this.innerCursor, {
                    x: this.clientX,
                    y: this.clientY
                });
                if (!this.isStuck) {
                    TweenMax.to(this.outerCursor, this.outerCursorSpeed, {
                        x: this.clientX - this.outerCursorBox.width / 2,
                        y: this.clientY - this.outerCursorBox.height / 2
                    });
                }
                if (this.showCursor) {
                    document.removeEventListener("mousemove", unveilCursor);
                }
                requestAnimationFrame(render);
            };
            requestAnimationFrame(render);
        }

        initHovers() {
            const mainNavHoverTween = TweenMax.to(this.outerCursor, 0.3, {
                backgroundColor: "#000",
                ease: this.easing,
                paused: true,
                opacity:.2,
            });

            const mainNavMouseEnter = () => {
                this.outerCursorSpeed = 0;
                TweenMax.set(this.innerCursor, { opacity: 0 });
                mainNavHoverTween.play();
            };

            const mainNavMouseLeave = () => {
                this.outerCursorSpeed=.2;
                TweenMax.set(this.innerCursor, { opacity: 1 });
                mainNavHoverTween.reverse();
            };

            const a_btn = new Set([...a('a'), ...a('button')]);
            for(const el of a_btn){
                el.addEventListener("mouseenter", mainNavMouseEnter);
                el.addEventListener("mouseleave", mainNavMouseLeave)
            }
        }
    }

    new Cursor();

    fetch('/sys/js/button.js').then(e=>e.text()).then(e=>{
        const scr=d.createElement('script');
        scr.innerHTML=e;
        d.body.appendChild(scr)
    })
}
// \ Cursor