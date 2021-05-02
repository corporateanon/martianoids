import { Application, Resource, Sprite, Texture } from 'pixi.js';

const app = new Application({
    width: 800,
    height: 600,
    backgroundColor: 0x000000,
    resolution: 1,
});
document.body.appendChild(app.view);

class DudeSprite extends Sprite {
    private rotationTextures: {
        [k: string]: Texture<Resource> | undefined;
    } = {};

    init(app: Application) {
        this.rotationTextures = Object.fromEntries(
            [0, 120, 150, 180, 210, 240, 270, 30, 300, 330, 60, 90].map(
                (angle) => {
                    const frameID = `Dude.rotate_${angle}`;
                    return [
                        angle,
                        app.loader.resources['spritesheets/characters.json']
                            ?.textures?.[frameID],
                    ];
                }
            )
        );
        return this;
    }

    setRotation(angle: number) {
        const textureForAngle = this.rotationTextures[angle];
        if (textureForAngle) {
            this.texture = textureForAngle;
        }
    }
}

class GameState {
    dudeRotation = 0;
    dude = new DudeSprite();
    prevDate = new Date();

    public readonly init = (app: Application) => {
        this.dude.init(app);
        app.stage.addChild(this.dude);

        app.ticker.add(this.update);
    };

    public readonly update = (delta: number) => {
        const now = new Date();
        if (now.getTime() - this.prevDate.getTime() >= 100) {
            this.prevDate = now;
            this.dudeRotation += 30;
            this.dudeRotation %= 360;
            this.dude.setRotation(this.dudeRotation);
        }
    };
}

const setup = () => {
    const gameState = new GameState();
    gameState.init(app);
};

app.loader.add('spritesheets/characters.json').load(setup);
