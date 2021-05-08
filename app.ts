import { Application, Container } from 'pixi.js';
import { createAxes, createGrid } from './lib/grid';
import { createProjection } from './lib/isometric';
import { DudeModel } from './lib/models/DudeModel';
import { WallModel } from './lib/models/WallModel';
import { Projection3Dto2D } from './lib/primitives';
import { DudeView } from './lib/views/DudeView';
import { WallView } from './lib/views/WallView';

function addGridAndAxes(projection: Projection3Dto2D, parent: Container) {
    const cellSize = 60;
    const grid = createGrid({
        projection,
        cellSize,
        minX: -360,
        maxX: 360,
        minY: -360,
        maxY: 360,
        z: 0,
    });
    parent.addChild(grid);
    parent.addChild(createAxes({ projection, length: 80 }));
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
        dude.location.setPosition(x, y, 0);
        dude.location.setRotation(angle + 90);
        angle += 0.5;
    }, 20);

    const walls: [number, number, WallModel['variant']][] = [
        [0, 120, 'yAxis'],
        [120, 0, 'xAxis'],
        [0, 60, 'yAxis'],
        [60, 0, 'xAxis'],
        [0, 0, 'cross'],
    ];
    const wallModels = walls.map(([x, y, variant]) => {
        const model = new WallModel();
        model.location.setPosition(x, y, 0);
        model.variant = variant;
        return model;
    });
    const wallViews = walls.map(() => {
        const view = new WallView();
        view.setProjection(projection);
        view.setParent(root);
        view.setApp(app);
        view.add();
        return view;
    });

    app.ticker.add(() => {
        dudeView.update(dude);
        wallViews.forEach((wallView, i) => {
            wallView.update(wallModels[i]);
        });
    });
});
