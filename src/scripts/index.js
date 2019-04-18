import '../styles/index.scss';

import Icosohedron from '../scripts/Icosohedron'
import TextScrambler from '../scripts/TextScrambler'

const init = () => {
    initIcosohedron()
    initTextScramble()
}

const initIcosohedron = () => new Icosohedron()

const initTextScramble = () => {
    const elements = document.querySelectorAll('[data-scramble]')

    elements.forEach(
        (element) => new TextScrambler(element)
    )
}

init()



