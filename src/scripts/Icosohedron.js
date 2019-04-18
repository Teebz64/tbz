import * as THREE from 'three';
import {
    BloomEffect,
    EffectComposer,
    EffectPass,
    RenderPass
} from "postprocessing";

export default class Icosohedron {
    constructor () {
        this.scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        )
        this.camera.position.set(10,10,10)
        this.camera.lookAt(0,0,0)
        this.renderer = new THREE.WebGLRenderer({
            alpha: false
        })
        this.renderer.setClearColor(0x140916)
        this.renderer.setSize(
            window.innerWidth,
            window.innerHeight
        )

        document.body.appendChild(
            this.renderer.domElement
        )

        this.renderer.domElement.className = 'icosohedron'

        this.init()
        this.buildScene()
        this.animate()
    }

    init = () => {
        const path = '/public/images/textures'
        const fileName = 'scramble.jpg'

        this.textureCube = THREE.ImageUtils.loadTextureCube([
            `${path}/${fileName}`,
            `${path}/${fileName}`,
            `${path}/${fileName}`,
            `${path}/${fileName}`,
            `${path}/${fileName}`,
            `${path}/${fileName}`
        ])

        this.reflectiveMaterial = new THREE.MeshBasicMaterial({
            color: 0x979797,
            envMap: this.textureCube,
            // wireframe: true
        })
    }

    buildScene = () => {
        this.buildSmallIcosahedron()
        this.buildLargeIcosahedron()
        this.buildLights()
        this.buildSkybox()
    }

    buildSmallIcosahedron = () => {
        const geometry = new THREE.IcosahedronGeometry( 3 )

        this.smallIcosahedron = new THREE.Mesh(
            geometry,
            this.reflectiveMaterial
        )

        this.scene.add( this.smallIcosahedron )
    }

    buildLargeIcosahedron = () => {
        const geometry = new THREE.IcosahedronGeometry(200)

        this.largeIcosahedron = new THREE.Mesh(
            geometry,
            this.reflectiveMaterial
        )

        this.largeIcosahedron.position.set( 0, -100, -400 )

        this.scene.add( this.largeIcosahedron )
    }

    buildLights = () => {
        this.light = new THREE.PointLight(0xffffff, 1.5)
        this.light.position.set(30, 30, 30)
        this.scene.add( this.light )
    }

    buildSkybox = () => {
        const shader = THREE.ShaderLib["cube"]
        shader.uniforms["tCube"].value = this.textureCube

        const material = new THREE.ShaderMaterial({
            fragmentShader: shader.fragmentShader,
            vertexShader: shader.vertexShader,
            uniforms: shader.uniforms,
            depthWrite: false,
            side: THREE.BackSide
        });

        this.skybox = new THREE.Mesh(
            new THREE.CubeGeometry(10000, 10000, 10000),
            material
        )

        //this.scene.add(this.skybox)
    }

    animate = () => {
        requestAnimationFrame( this.animate )
        this.largeIcosahedron.rotation.y += .001
        this.smallIcosahedron.rotation.z += .003
        this.renderer.render(
            this.scene,
            this.camera
        )
    }
}