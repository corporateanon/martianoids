import { Application, Container } from 'pixi.js';
import { createAxes, createGrid } from './lib/grid';
import { createProjection } from './lib/isometric';
import { DudeModel } from './lib/models/DudeModel';
import { Projection3Dto2D } from './lib/primitives';
import { DudeView } from './lib/views/DudeView';

function addGridAndAxes(projection: Projection3Dto2D, parent: Container) {
    const cellSize = 100;
    const grid = createGrid({
        projection,
        cellSize,
        minX: -400,
        maxX: 400,
        minY: -400,
        maxY: 400,
        z: 0,
    });
    parent.addChild(grid);
    parent.addChild(createAxes({ projection, length: 100 }));
}

const app = new Application({
    width: 800,
    height: 600,
    backgroundColor: 0x000000,
    resolution: 1,
});
document.body.appendChild(app.view);

app.loader.add('spritesheets/characters.json').load(() => {
    const root = new Container();
    app.stage.addChild(root);

    const projection = createProjection(app.view.width, app.view.height);
    addGridAndAxes(projection, root);

    const dude = new DudeModel();
    const dudeView = new DudeView();
    dudeView.setProjection(projection);
    dudeView.setParent(root);
    dudeView.setApp(app);
    dudeView.add();

    const r = 300;
    let angle = 0;
    setInterval(() => {
        const rAngle = (Math.PI / 180) * angle;
        const x = Math.cos(rAngle) * r;
        const y = Math.sin(rAngle) * r;
        dude.setPosition(x, y, 0);
        dude.setRotation(angle + 90);
        angle += 0.5;
    }, 20);

    app.ticker.add(() => {
        dudeView.update(dude);
    });
});
