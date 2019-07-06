import TextDistortion from './TextDistortion'
import anime from 'animejs'

export default class Loader {

    config = {
        cols: 12,
        rows: 12
    }

    markup = `
        <div class="loader" data-element="loader">
            <div
                class="loader__text"
                data-element="loader-text"
                data-text="LOADING"
            ></div>
        </div>
    `

    constructor() {
        this.container = document
            .querySelectorAll(
                '[data-element="loader-container"]'
            )[0]

        this.appendLoader()
        this.bindEvents()
    }

    bindEvents = () => {
        document.onclick = () => {
            this.animateLoaderOut()
        }
    }

    animateLoaderOut = () => {
        const { rows, cols } = this.config
        const className="loader__tile"

        const tileMarkup = new Array(cols * rows)
            .fill(`<div class="${className}"></div>`)
            .join('')

        this.loader
            .insertAdjacentHTML(
                'beforeend',
                `<div class="loader__tile-container">
                    ${tileMarkup}
                </div>`
            )

        anime({
            targets: `.${className}`,
            scale: [
                {
                    value: 0,
                    easing: 'easeOutSine',
                    duration: 500
                },
                {
                    value: 1,
                    easing: 'easeInOutQuad',
                    duration: 1200
                },
                {
                    value: 0,
                    easing: 'easeOutSine',
                    duration: 500
                },
            ],
            delay: anime.stagger(
                200,
                {
                    grid: [rows, cols],
                    from: 'center'
                }
            ),
            complete: () => {
                console.log(document.getElementsByClassName(
                        'loader__tile-container'
                    ))
            }
        });

    }

    appendLoader = () => {
        document
            .body
            .insertAdjacentHTML(
                'beforeend',
                this.markup
            )

        this.loader = document
            .querySelectorAll(
                '[data-element="loader"]'
            )[0]

        this.textContainer = document
            .querySelectorAll(
                '[data-element="loader-text"]'
            )[0]

        this.textDistortion = new TextDistortion(
            this.textContainer,
            this.loader
        )
    }

    removeLoader = () => {

    }
}