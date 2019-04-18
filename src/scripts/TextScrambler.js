import ScrambleText from 'scramble-text'

export default class TextScambler {
    constructor(element) {
        this.element = element
        this.scrambleText = new ScrambleText(this.element, {
            timeOffset: this.element.getAttribute('data-scramble-offset')
                ? this.element.getAttribute('data-scramble-offset')
                : 50,
            chars: [
                '安','■','宇','衣','於',
                '加','幾','■','■','己',
                '■','之','寸','世','曽',
            ]
        }).start()

        this.bindEvents()
    }

    bindEvents = () => {
        this.element.addEventListener(
            'mouseover',
            this.onHover
        )
    }

    onHover = () => {
        this.scrambleText.play()
        setTimeout(() => {

            this.scrambleText.stop()

            setTimeout(() => {
                this.scrambleText.play()
                this.scrambleText.start()
            }, 200)

        }, 150)
    }
}