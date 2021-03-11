/* eslint-disable no-underscore-dangle */
import * as THREE from 'three';

export default class Entity extends THREE.Object3D {
    /** @internal */
    public _internalIsInitalized : boolean;

    public get isInitalized():boolean { return this._internalIsInitalized; }

    /** @internal */
    public _internalRenderer : THREE.Renderer;

    public get mRenderer():THREE.Renderer { return this._internalRenderer; }

    /** @internal */
    public _internalScene : THREE.Scene;

    public get mScene():THREE.Scene { return this._internalScene; }

    constructor() {
        super();
        this._internalIsInitalized = false;
    }

    begin() {}

    update(delta: number) {}

    dispose() {}
}
