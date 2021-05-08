import { Texture } from '@pixi/core';
import { Sprite } from '@pixi/sprite';
import { BaseView, IUpdatableView } from '../BaseView';
import { WallModel } from '../models/WallModel';

interface TexturesMap {
    variant: {
        [v in WallModel['variant']]: Texture;
    };
}

export class WallView
    extends BaseView<Sprite>
    implements IUpdatableView<WallModel, Sprite> {
    private texturesMap?: TexturesMap;

    constructor() {
        super();
        this.displayObject = new Sprite();
    }

    private getTextureForVariant(variant: WallModel['variant']) {
        return this.getTextures()?.variant[variant];
    }

    private getTextures() {
        if (this.texturesMap) {
            return this.texturesMap;
        }
        const textures = this.app?.loader.resources[
            'spritesheets/characters.json'
        ].textures;
        if (!textures) {
            throw new Error('No textures');
        }

        this.texturesMap = {
            variant: {
                cross: textures['Wall.cross'],
                xAxis: textures['Wall.rotate_0'],
                yAxis: textures['Wall.rotate_90'],
            },
        };

        return this.texturesMap;
    }

    update(model: WallModel): void {
        const pos = model.location.getPosition();
        const pos2D = this.projection(...pos);
        if (this.displayObject) {
            this.displayObject.x = Math.round(pos2D[0]);
            this.displayObject.y = Math.round(pos2D[1]);
            const texture: Texture = this.getTextureForVariant(model.variant);
            this.displayObject.texture = texture;
            this.displayObject.anchor.x = texture.defaultAnchor.x;
            this.displayObject.anchor.y = texture.defaultAnchor.y;
        }
    }
}
