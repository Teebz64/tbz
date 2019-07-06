import '../styles/index.scss';

import Icosohedron from '../scripts/Icosohedron'
import TextScrambler from '../scripts/TextScrambler'
import Loader from '../scripts/Loader'

const init = () => {
    initIcosohedron()
    initTextScramble()
    initLoader()
}

const initIcosohedron = () => new Icosohedron()
const initLoader = () => new Loader()

const initTextScramble = () => {
    const elements = document.querySelectorAll('[data-scramble]')

    elements.forEach(
        (element) => new TextScrambler(element)
    )
}

init()



