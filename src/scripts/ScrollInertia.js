import MathUtils from './MathUtils'

export default class ScrollInertia {

    friction = 0.3
    inertia = 0
    skew = 0
    velocity = 0
    scrollPos = {
        cur: 0,
        old: 0
    }
    skewRange = 4
    speedRange = 40
    timeOfLastScroll = new Date()
    isScrolling = false

    constructor() {
        this.bindEvents()
        this.mathUtils = new MathUtils()
    }

    bindEvents = () => {
        window.onscroll = () => {
            this.isScrolling = true
            this.scrollPos.old = this.scrollPos.cur
            this.scrollPos.cur = window.scrollY

            const moveDistance = this.scrollPos.cur - this.scrollPos.old
            const now = new Date()
            const timeSpan = now - this.timeOfLastScroll
            const scrollCheckTimer = setTimeout(this.onStopScroll, 60)

            this.velocity = moveDistance / timeSpan
            this.timeOfLastScroll = now
        }

        window.requestAnimationFrame(this.animate)
    }

    onStopScroll = () => {
        this.isScrolling = false
        this.velocity = 0
    }

    animate = () => {
        const { mathUtils } = this
        const timeDelta = 

        this.skew += this.velocity * this.intertiaScrollFactor * timeDelta
        this.velocity *= INERTIA_ACCELERATION * timeDelta
        // Keep in mind that velocity can be negative as well, hence the abs
        if (abs(this.velocity) < INERTIA_THRESHOLD)
            this.velocity = 0

        document.body.style.transform = `skewY(${this.skew}deg)`

        window.requestAnimationFrame(this.animate)
    }
}