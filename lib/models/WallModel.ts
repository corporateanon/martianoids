import { BaseModel } from '../BaseModel';
import { Location } from '../Location';

export class WallModel extends BaseModel {
    public location: Location = new Location();
    public variant: 'xAxis' | 'yAxis' | 'cross' = 'cross';
}
