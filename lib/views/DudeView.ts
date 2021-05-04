import { Graphics } from '@pixi/graphics';
import { BaseView, IUpdatableView } from '../BaseView';
import { DudeModel } from '../models/DudeModel';

export class DudeView
    extends BaseView<Graphics>
    implements IUpdatableView<DudeModel, Graphics> {
    constructor() {
        super();
        this.displayObject = new Graphics();

        this.displayObject.lineStyle({
            width: 4,
            color: 0xcccc00,
        });
        this.displayObject.drawEllipse(0, 0, 45, 20);
    }

    update(model: DudeModel): void {
        const pos = model.getPosition();
        const pos2D = this.projection(...pos);
        if (this.displayObject) {
            [this.displayObject.x, this.displayObject.y] = pos2D;
        }
    }
}
