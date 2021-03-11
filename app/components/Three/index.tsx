import React, { Component } from 'react';
import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';
import Entity from './Entity';

type ThreeProps = {
    createSceneFuntion : (scene : THREE.Scene, camera : THREE.Camera, renderer: THREE.Renderer) => any;
    onSceneTick : () => any;
    showStats : boolean;
}
/**
 * THREE Wrapper react component. User must define its
 * own CreateSceneFuntion to setup scene elemnts.
 */
class Three extends Component<ThreeProps> {
    private mMount : HTMLDivElement;

    private mScene : THREE.Scene;

    private mRenderer : THREE.Renderer;

    private mDefaultCamera : THREE.Camera;

    private mFrameId : Number;

    private mClock : THREE.Clock;

    private mStats : Stats;

    private mFpsStatsMount! : HTMLDivElement;

    /**
     * Setup THREE boilerplate code and initalizes the default scene and cameras.
     */
    componentDidMount() {
        // Enable stats
        this.mStats = new Stats();
        if (this.props.showStats) {
            this.mFpsStatsMount.appendChild(this.mStats.dom);
        }

        this.mClock = new THREE.Clock();

        const width = this.mMount.clientWidth;
        const height = this.mMount.clientHeight;

        this.mScene = new THREE.Scene();
        this.mDefaultCamera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

        // Add Renderer
        this.mRenderer = new THREE.WebGLRenderer({ antialias: true });
        this.mRenderer.setClearColor('#263238');
        this.mRenderer.setSize(width, height);
        this.mMount.appendChild(this.mRenderer.domElement);

        // Setup scene from delegate function
        const { createSceneFuntion: CreateSceneFuntion } = this.props;
        CreateSceneFuntion(this.mScene, this.mDefaultCamera, this.mRenderer);

        // First render scene
        this.renderScene();

        // Start animations in scene
        this.startAnimation();

        // Set event listeners
        // this.mRenderer.domElement.addEventListener('resize', this.onWindowResize.bind(this), true);
        window.addEventListener('resize', this.onWindowResize.bind(this), true);
        // renderer.domElement.addEventListener('mousemove', onMouseMove, false);
        // renderer.domElement.addEventListener('click', onMouseClick, true);
        // renderer.domElement.addEventListener('mousedown', onMouseDown, true);
    }

    private onWindowResize() {
        console.log('RESIZE');
        this.mDefaultCamera.aspect = this.mMount.clientWidth / this.mMount.clientHeight;
        this.mDefaultCamera.updateProjectionMatrix();
        this.mRenderer.setSize(this.mMount.clientWidth, this.mMount.clientHeight);
        this.mRenderer.domElement.setAttribute('width', this.mMount.clientWidth.toString());
        this.mRenderer.domElement.setAttribute('height', this.mMount.clientHeight.toString());
    }

    /**
     * Starts animations in the scene
     */
    private startAnimation() {
        this.mClock.start();
        if (!this.mFrameId) {
            this.mFrameId = window.requestAnimationFrame(this.animate.bind(this));
        }
    }

    private animate() {
        this.mStats.begin();
        // Update all entities in the scene.
        this.mScene.children.forEach((object) => {
            if (object instanceof Entity) {
                const entity = object as Entity;
                if (!entity.isInitialized) {
                    // eslint-disable-next-line no-underscore-dangle
                    entity._internalIsInitalized = true;
                    // eslint-disable-next-line no-underscore-dangle
                    entity._internalRenderer = this.mRenderer;
                    // eslint-disable-next-line no-underscore-dangle
                    entity._internalScene = this.mScene;

                    entity.begin();
                }
                entity.update(this.mClock.getDelta());
            }
        });

        // Call renderer to redraw scene.
        this.renderScene();
        // Dispacth scene tick function.
        const { onSceneTick: OnSceneTick } = this.props;
        OnSceneTick();
        // Issue animation function again to redraw next frame and saves its frame Id.
        this.mFrameId = window.requestAnimationFrame(this.animate.bind(this));
        this.mStats.end();
    }

    /**
     * Renders THREE scene with default camera.
     */
    private renderScene() {
        if (this.mRenderer) this.mRenderer.render(this.mScene, this.mDefaultCamera);
    }

    /**
     * Default React Component render function.
     * @returns Three wrapper component
     */
    render() {
        const { showStats } = this.props;
        return (
            <>
                <div
                    style={{ width: '100%', height: '100%' }}
                    ref={(mount) => { this.mMount = mount; }}
                />
                { showStats && <div ref={(ref) => { this.mFpsStatsMount = ref; }} />}
            </>
        );
    }
}

export default Three;
