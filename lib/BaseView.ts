import { Application } from '@pixi/app';
import { Container, DisplayObject } from '@pixi/display';
import { Projection3Dto2D } from './primitives';

export interface IAbstractView<TDisplayObject extends DisplayObject> {
    setApp(app: Application): void;
    setParent(container: Container): void;
    setProjection(projection: Projection3Dto2D): void;
    add(): void;
    remove(): void;
    getDisplayObject(): TDisplayObject;
}

export interface IUpdatableView<TModel, TDisplayObject extends DisplayObject>
    extends IAbstractView<TDisplayObject> {
    update(model: TModel): void;
}

export abstract class BaseView<TDisplayObject extends DisplayObject>
    implements IAbstractView<TDisplayObject> {
    protected parent?: Container;
    protected app?: Application;
    protected displayObject?: TDisplayObject;
    protected projection: Projection3Dto2D = (x, y, z) => [x, y];

    setParent(container: Container): void {
        this.parent = container;
    }
    setApp(app: Application): void {
        this.app = app;
    }
    setProjection(projection: Projection3Dto2D): void {
        this.projection = projection;
    }
    getDisplayObject(): TDisplayObject {
        if (!this.displayObject) {
            throw new Error('No display object');
        }
        return this.displayObject;
    }
    add(): void {
        this.parent?.addChild(this.getDisplayObject());
    }
    remove(): void {
        this.parent?.removeChild(this.getDisplayObject());
    }
}
