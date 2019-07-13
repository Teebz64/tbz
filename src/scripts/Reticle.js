import MathUtils from './MathUtils'

export default class Reticle {

    frameCount = 0

    winsize = {
        width: window.innerWidth,
        height: window.innerHeight
    }

    mousepos = {
        x: this.winsize.width / 2,
        y: this.winsize.height / 2
    }

    DOM = {
        el: undefined,
        circle: undefined,
        ring: undefined
    }

    constructor(el) {
        this.DOM = {
            el: el,
            circle: el.querySelector('.reticle__circle'),
            ring: el.querySelector('.reticle__ring')
        }

        this.bounds = {
            width: 40,
            height: 40
        }

        this.renderedStyles = {
            reticleTx  : { previous: 0, current: 0, amt: 0.2 },
            reticleTy  : { previous: 0, current: 0, amt: 0.2 },
            ringTx     : { previous: 0, current: 0, amt: 0.15 },
            ringTy     : { previous: 0, current: 0, amt: 0.15 },
            ringScale  : { previous: 1, current: 1, amt: 0.2 },
            circleScale: { previous: 1, current: 1, amt: 0.2 }
        }

        this.mathUtils = new MathUtils()
        this.bindEvents()

        requestAnimationFrame(() => this.render())
    }

    render = () => {
        this.frameCount++

        this.renderedStyles['reticleTx'].current = this.mousepos.x - this.bounds.width / 2
        this.renderedStyles['reticleTy'].current = this.mousepos.y - this.bounds.height / 2
        this.renderedStyles['ringTx'].current = this.mousepos.x - this.bounds.width / 2
        this.renderedStyles['ringTy'].current = this.mousepos.y - this.bounds.height / 2

        for (const key in this.renderedStyles ) {
            this.renderedStyles[key].previous = this.mathUtils.lerp(
                this.renderedStyles[key].previous,
                this.renderedStyles[key].current,
                this.renderedStyles[key].amt
            )
        }

        this.DOM.circle.style.transform = `
            translateX(${this.renderedStyles['reticleTx'].previous}px)
            translateY(${this.renderedStyles['reticleTy'].previous}px)
            scale(${this.renderedStyles['circleScale'].previous})
        `

        this.DOM.ring.style.transform = `
            translateX(${(this.renderedStyles['ringTx'].previous)}px)
            translateY(${this.renderedStyles['ringTy'].previous}px)
            scale(${this.renderedStyles['ringScale'].previous})
        `

        // if (this.frameCount % 30 === 0) {
        //     console.log(this.DOM.circle)
        // }

        requestAnimationFrame(() => this.render())
    }

    bindEvents = () => {
        window.addEventListener('resize', this.calcWinsize)
        window.addEventListener('mousemove', ev => this.mousepos = this.getMousePos(ev))
        document.querySelectorAll('a').forEach((link) => {
                link.addEventListener('mouseenter', () => this.enter())
                link.addEventListener('mouseleave', () => this.leave())
            })
    }

    calcWinsize = () => {
        this.winsize = {
            width: window.innerWidth,
            height: window.innerHeight
        }
    }

    enter = () => {
        this.renderedStyles['ringScale'].current = 1.2
        this.renderedStyles['circleScale'].current = 0.6
    }

    leave = () => {
        this.renderedStyles['ringScale'].current = 1
        this.renderedStyles['circleScale'].current = 1
    }

    // click() {
    //     this.renderedStyles['ringScale'].previous = 0.4
    // }

    getMousePos = (e) => {
        let posx = 0;
        let posy = 0;
        if (!e) e = window.event;
        if (e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
        }
        else if (e.clientX || e.clientY)    {
            posx = e.clientX + body.scrollLeft + document.documentElement.scrollLeft;
            posy = e.clientY + body.scrollTop + document.documentElement.scrollTop;
        }
        return { x : posx, y : posy }
    }
}