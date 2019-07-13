import '../styles/index.scss';

//import Icosohedron from '../scripts/Icosohedron'
import TextScrambler from '../scripts/TextScrambler'
import ScrollInertia from '../scripts/ScrollInertia'
import Reticle from '../scripts/Reticle'

const init = () => {
//    initIcosohedron()
//    initTextScramble()
    // initScrollInertia()
    initReticle()
}

const initIcosohedron = () => new Icosohedron()
const initScrollInertia = () => new ScrollInertia()
const initReticle = () => new Reticle(
    document.querySelector('.reticle')
)

init()



