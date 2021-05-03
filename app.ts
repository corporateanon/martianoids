import { Application, Container } from 'pixi.js';
import { createAxes, createGrid } from './lib/grid';
import { createProjection } from './lib/isometric';

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

const cellSize = 100;
for (let z = 0; z <= 0; z += cellSize / 4.7) {
    const grid = createGrid({
        projection,
        cellSize,
        minX: -400,
        maxX: 400,
        minY: -400,
        maxY: 400,
        z,
    });

    root.addChild(grid);
}

root.addChild(createAxes({ projection, length: 100 }));
