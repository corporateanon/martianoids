import { BaseModel } from '../BaseModel';
import { Location } from '../Location';
import { Coords3D } from '../primitives';

export class DudeModel extends BaseModel {
    public location: Location = new Location();
}
