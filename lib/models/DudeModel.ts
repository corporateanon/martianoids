import { BaseModel } from '../BaseModel';
import { Coords3D } from '../primitives';

export class DudeModel extends BaseModel {
    private readonly position: Coords3D = [0, 0, 0];
    private readonly rotation: number = 0;

    getPosition() {
        return this.position;
    }
    getRotation() {
        return this.rotation;
    }
}
