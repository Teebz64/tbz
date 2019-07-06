export default class TextDistortion {

    config = {
        uDivisions: 9,
        uDivisionWidth: 0.75,
        uSpeed: 1,
        uAnimateHorizontal: false,
        uFlipAnimationDirection: true
    }

    constructor(el) {
        this.element = el
        this.characters = this.element.getAttribute('data-text')

        this.createText()
        this.createMaterial()

        this.blotter = new Blotter(
            this.material,
            { texts: this.text }
        )
        this.scope = this.blotter.forText(this.text)
        this.scope.appendTo(this.element)
    }

    createText = () => {
        this.text = new Blotter.Text(
            this.characters, {
                family : "'Druk Wide'",
                size : 24,
                fill : "#FFFFFF",
                paddingLeft : 150,
                paddingRight : 150
            }
        )
    }

    createMaterial = () => {
        this.material = new Blotter.SlidingDoorMaterial()

        this.material.uniforms.uDivisions.value = this.config.uDivisions
        this.material.uniforms.uDivisionWidth.value = this.config.uDivisionWidth
        this.material.uniforms.uSpeed.value = this.config.uSpeed
        this.material.uniforms.uAnimateHorizontal.value = this.config.uAnimateHorizontal
        this.material.uniforms.uFlipAnimationDirection.value = this.config.uFlipAnimationDirection
    }
}