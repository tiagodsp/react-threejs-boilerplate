import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import {
    Card,
} from '@blueprintjs/core';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import Three from 'components/Three';
import * as THREE from 'three';

const myScene = (scene : THREE.Scene, camera : THREE.Camera, renderer: THREE.Renderer) => {
    camera.position.z = 8;
    camera.position.y = 5;

    // LIGHTS
    const lights = [];
    lights[0] = new THREE.PointLight(0x304ffe, 1, 0);
    lights[1] = new THREE.PointLight(0xffffff, 1, 0);
    lights[2] = new THREE.PointLight(0xffffff, 1, 0);
    lights[0].position.set(0, 200, 0);
    lights[1].position.set(100, 200, 100);
    lights[2].position.set(-100, -200, -100);
    scene.add(lights[0]);
    scene.add(lights[1]);
    scene.add(lights[2]);

    const cubeGeometry = new THREE.BoxGeometry(5, 5, 5);
    const material = new THREE.MeshBasicMaterial({
        color: '#2bff00',
    });
    const cubeMesh = new THREE.Mesh(cubeGeometry, material);
    scene.add(cubeMesh);
};

const tick = () => {

};

export default class ContentPanel extends React.Component {
    render() {
        return (
            <Card style={{ height: '100%' }}>
                <Three
                    createSceneFuntion={myScene}
                    onSceneTick={tick}
                    showStats
                />
            </Card>
        );
    }
}
