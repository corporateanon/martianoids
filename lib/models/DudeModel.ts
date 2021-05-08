import { BaseModel } from '../BaseModel';
import { Coords3D } from '../primitives';

export class DudeModel extends BaseModel {
    private readonly position: Coords3D = [0, 0, 0];
    private rotation: number = 0;

    getPosition() {
        return this.position;
    }
    getRotation() {
        return this.rotation;
    }
    setRotation(angle: number) {
        this.rotation = angle % 360;
    }
    setPosition(...position: Coords3D) {
        this.position[0] = position[0];
        this.position[1] = position[1];
        this.position[2] = position[2];
    }
}
