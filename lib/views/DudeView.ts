import { Texture } from '@pixi/core';
import { Graphics } from '@pixi/graphics';
import { Loader } from '@pixi/loaders';
import { IPointData } from '@pixi/math';
import { Sprite } from '@pixi/sprite';
import { BaseView, IUpdatableView } from '../BaseView';
import { DudeModel } from '../models/DudeModel';

interface TexturesMap {
    rotation: {
        0: Texture;
        30: Texture;
        60: Texture;
        90: Texture;
        120: Texture;
        150: Texture;
        180: Texture;
        210: Texture;
        240: Texture;
        270: Texture;
        300: Texture;
        330: Texture;
    };
}

export class DudeView
    extends BaseView<Sprite>
    implements IUpdatableView<DudeModel, Sprite> {
    private texturesMap?: TexturesMap;

    constructor() {
        super();

        this.displayObject = new Sprite();

        // this.displayObject = new Graphics();

        // this.displayObject.lineStyle({
        //     width: 4,
        //     color: 0xcccc00,
        // });
        // this.displayObject.drawEllipse(0, 0, 45, 20);
    }

    private getTextureForRotation(angle: number) {
        const normalizedAngle = (Math.round(angle / 30) * 30) % 360;
        //@ts-ignore
        return this.getTextures().rotation[normalizedAngle.toString()];
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
            rotation: {
                0: textures['Dude.rotate_0'],
                30: textures['Dude.rotate_30'],
                60: textures['Dude.rotate_60'],
                90: textures['Dude.rotate_90'],
                120: textures['Dude.rotate_120'],
                150: textures['Dude.rotate_150'],
                180: textures['Dude.rotate_180'],
                210: textures['Dude.rotate_210'],
                240: textures['Dude.rotate_240'],
                270: textures['Dude.rotate_270'],
                300: textures['Dude.rotate_300'],
                330: textures['Dude.rotate_330'],
            },
        };

        return this.texturesMap;
    }

    update(model: DudeModel): void {
        const pos = model.getPosition();
        const pos2D = this.projection(...pos);
        if (this.displayObject) {
            this.displayObject.x = Math.round(pos2D[0]);
            this.displayObject.y = Math.round(pos2D[1]);
            const texture: Texture = this.getTextureForRotation(
                model.getRotation()
            );
            this.displayObject.texture = texture;
            this.displayObject.anchor.x = texture.defaultAnchor.x;
            this.displayObject.anchor.y = texture.defaultAnchor.y;
        }
    }
}
