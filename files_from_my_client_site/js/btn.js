class LiquidButton {
    constructor(button) {
        const { width, height } = button.getBoundingClientRect(),
              buttonStyles = window.getComputedStyle(button),
              options = button.dataset || {};
        const t=this
        t.font = `${buttonStyles['font-size']} ${buttonStyles['font-family']}`;
        t.tension = options.tension || 0.4;
        t.width = width;
        t.height = height;
        t.margin = options.margin || 50;
        // assume the padding it the same all around
        t.padding = parseFloat(buttonStyles.paddingRight);
        t.hoverFactor = options.hoverFactor || 0.5;
        t.gap = options.gap || 5;
        t.debug = options.debug || false;
        t.forceFactor = options.forceFactor || 0.2;
        t.color1 = options.color1 || '#ccc';
        t.color2 = options.color2 || '#6862d2';
        t.color3 = options.color3 || '#393185';
        t.textColor = buttonStyles.color || '#FFFFFF';
        t.layers = [{
            points: [],viscosity: 0.5,mouseForce: 100,forceLimit: 2,
        }, {
            points: [],viscosity: 0.8,mouseForce: 100,forceLimit: 3,
        }];
        t.text = button.textContent;
        t.canvas = options.canvas || document.createElement('canvas');
        t.context = t.canvas.getContext('2d');
        // t.wrapperElement = options.wrapperElement || document.body;
        // if (!t.canvas.parentElement) {
        //   t.wrapperElement.append(t.canvas);
        // }
        button.append(t.canvas)
        t.touches = [];
        t.noise = options.noise || 0;
        button.addEventListener('mousemove', t.mousemove);
        button.addEventListener('mouseout', t.mouseout);
        t.initOrigins();
        t.animate();
        t.restingFace();
    }

    restingFace() {
        // force a mouse move on each button
        this.mousemove({ offsetX: Math.random() * this.width, offsetY: 1 })
    }

    get mousemove() {
        return e => {
            this.touches = [{
                x: e.offsetX,y: e.offsetY,z: 0,force: 1,
            }];
        };
    }

    get mouseout() {
        return () => {
            this.touches = [];
            this.restingFace();
        };
    }

    get raf() {
        return this.__raf || (this.__raf = (
            window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function (callback) { setTimeout(callback, 10) }
        ).bind(window));
    }

    distance(p1, p2) {
        return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
    }

    update() {
        const t=this;
        for (let layerIndex = 0; layerIndex < t.layers.length; layerIndex++) {
            const layer = t.layers[layerIndex];
            const points = layer.points;
            for (let pointIndex = 0; pointIndex < points.length; pointIndex++) {
                const point = points[pointIndex];
                const dx = point.ox - point.x + (Math.random() - 0.5) * t.noise;
                const dy = point.oy - point.y + (Math.random() - 0.5) * t.noise;
                const d = Math.sqrt(dx * dx + dy * dy);
                const f = d * t.forceFactor;
                point.vx += f * ((dx / d) || 0);
                point.vy += f * ((dy / d) || 0);
                for (let touchIndex = 0; touchIndex < t.touches.length; touchIndex++) {
                    const touch = t.touches[touchIndex];
                    let mouseForce = layer.mouseForce;
                    if (
                        touch.x > t.margin &&
                        touch.x < t.margin + t.width &&
                        touch.y > t.margin &&
                        touch.y < t.margin + t.height
                    ) {
                        mouseForce *= -t.hoverFactor;
                    }
                    const mx = point.x - touch.x;
                    const my = point.y - touch.y;
                    const md = Math.sqrt(mx * mx + my * my);
                    const mf = Math.max(-layer.forceLimit, Math.min(layer.forceLimit, (mouseForce * touch.force) / md));
                    point.vx += mf * ((mx / md) || 0);
                    point.vy += mf * ((my / md) || 0);
                }
                point.vx *= layer.viscosity;
                point.vy *= layer.viscosity;
                point.x += point.vx;
                point.y += point.vy;
            }
            for (let pointIndex = 0; pointIndex < points.length; pointIndex++) {
                const prev = points[(pointIndex + points.length - 1) % points.length];
                const point = points[pointIndex];
                const next = points[(pointIndex + points.length + 1) % points.length];
                const dPrev = t.distance(point, prev);
                const dNext = t.distance(point, next);

                const line = {
                    x: next.x - prev.x,
                    y: next.y - prev.y,
                };
                const dLine = Math.sqrt(line.x * line.x + line.y * line.y);

                point.cPrev = {
                    x: point.x - (line.x / dLine) * dPrev * t.tension,
                    y: point.y - (line.y / dLine) * dPrev * t.tension,
                };
                point.cNext = {
                    x: point.x + (line.x / dLine) * dNext * t.tension,
                    y: point.y + (line.y / dLine) * dNext * t.tension,
                };
            }
        }
    }

    animate() {
        const t=this;
        t.raf(() => {
            t.update();
            t.draw();
            t.animate();
        });
    }

    draw() {
        const t=this;
        t.context.clearRect(0, 0, t.canvas.width, t.canvas.height);
        for (let layerIndex = 0; layerIndex < t.layers.length; layerIndex++) {
            const layer = t.layers[layerIndex];
            if (layerIndex === 1) {
                if (t.touches.length > 0) {
                    const gx = t.touches[0].x;
                    const gy = t.touches[0].y;
                    layer.color = t.context.createRadialGradient(gx, gy, t.height * 2, gx, gy, 0);
                    layer.color.addColorStop(0, t.color2);
                    layer.color.addColorStop(1, t.color3);
                } else {
                    layer.color = t.color2;
                }
            } else {
                layer.color = t.color1;
            }
            const points = layer.points;
            t.context.fillStyle = layer.color;
            t.context.beginPath();
            t.context.moveTo(points[0].x, points[0].y);
            for (let pointIndex = 1; pointIndex < points.length; pointIndex += 1) {
                t.context.bezierCurveTo(
                    points[(pointIndex + 0) % points.length].cNext.x,
                    points[(pointIndex + 0) % points.length].cNext.y,
                    points[(pointIndex + 1) % points.length].cPrev.x,
                    points[(pointIndex + 1) % points.length].cPrev.y,
                    points[(pointIndex + 1) % points.length].x,
                    points[(pointIndex + 1) % points.length].y
                );
            }
            t.context.fill();
        }
        t.context.fillStyle = t.textColor;
        // t.context.font = '100 ' + (t.height - t.padding * 2) + 'px ' + t.fontFamily;
        t.context.font = t.font;
        t.context.textAlign = 'center';
        t.context.textBaseline = 'middle';
        t.context.text
        // t.context.fillText(t.text, t.canvas.width / 2, t.canvas.height / 2, t.width - t.padding);
        if (t.debug) {
            t.drawDebug();
        }
    }

    drawDebug() {
        const t=this;
        t.context.fillStyle = 'rgba(255, 255, 255, 0.8)';
        t.context.fillRect(0, 0, t.canvas.width, t.canvas.height);
        for (let layerIndex = 0; layerIndex < t.layers.length; layerIndex++) {
            const layer = t.layers[layerIndex];
            const points = layer.points;
            for (let pointIndex = 0; pointIndex < points.length; pointIndex++) {
                if (layerIndex === 0) {
                    t.context.fillStyle = t.color1;
                } else {
                    t.context.fillStyle = t.color2;
                }
                const point = points[pointIndex];
                t.context.fillRect(point.x, point.y, 1, 1);
                t.context.fillStyle = '#000';
                t.context.fillRect(point.cPrev.x, point.cPrev.y, 1, 1);
                t.context.fillRect(point.cNext.x, point.cNext.y, 1, 1);
                t.context.strokeStyle = 'rgba(0, 0, 0, 0.33)';
                t.context.strokeWidth = 0.5;
                t.context.beginPath();
                t.context.moveTo(point.cPrev.x, point.cPrev.y);
                t.context.lineTo(point.cNext.x, point.cNext.y);
                t.context.stroke();
            }
        }
    }

    createPoint(x, y) {
        return {x: x,y: y,ox: x,oy: y,vx: 0,vy: 0};
    }

    initOrigins() {
        const t=this;
        t.canvas.width = t.width + t.margin * 2;
        t.canvas.height = t.height + t.margin * 2;
        for (let layerIndex = 0; layerIndex < t.layers.length; layerIndex++) {
            const layer = t.layers[layerIndex];
            const points = [];
            for (let x = ~~(t.height / 2); x < t.width - ~~(t.height / 2); x += t.gap) {
                points.push(t.createPoint(
                    x + t.margin,
                    t.margin
                ));
            }
            for (let alpha = ~~(t.height * 1.25); alpha >= 0; alpha -= t.gap) {
                const angle = (Math.PI / ~~(t.height * 1.25)) * alpha;
                points.push(t.createPoint(
                    Math.sin(angle) * t.height / 2 + t.margin + t.width - t.height / 2,
                    Math.cos(angle) * t.height / 2 + t.margin + t.height / 2
                ));
            }
            for (let x = t.width - ~~(t.height / 2) - 1; x >= ~~(t.height / 2); x -= t.gap) {
                points.push(t.createPoint(
                    x + t.margin,
                    t.margin + t.height
                ));
            }
            for (let alpha = 0; alpha <= ~~(t.height * 1.25); alpha += t.gap) {
                const angle = (Math.PI / ~~(t.height * 1.25)) * alpha;
                points.push(t.createPoint(
                    (t.height - Math.sin(angle) * t.height / 2) + t.margin - t.height / 2,
                    Math.cos(angle) * t.height / 2 + t.margin + t.height / 2
                ));
            }
            layer.points = points;
        }
    }
}

const buttons = document.querySelectorAll('.cardIcn');

buttons.forEach(button => {
    button.liquidButton = new LiquidButton(button);
})