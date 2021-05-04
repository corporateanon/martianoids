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

const root = new Container();
app.stage.addChild(root);

const projection = createProjection(app.view.width, app.view.height);
addGridAndAxes(projection, root);

const dude = new DudeModel();
const dudeView = new DudeView();
dudeView.setProjection(projection);
dudeView.setParent(root);
dudeView.add();
dudeView.update(dude);
