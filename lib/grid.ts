import { Graphics } from 'pixi.js';
import { Projection3Dto2D } from './isometric';

export function createGrid({
    projection,
    cellSize,
    minX,
    maxX,
    minY,
    maxY,
    z,
}: {
    projection: Projection3Dto2D;
    cellSize: number;
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
    z: number;
}) {
    const grid = new Graphics();
    grid.lineStyle({ width: 1, color: 0xaaaaaa });

    for (let x = minX; x <= maxX; x += cellSize) {
        const start = projection(x, minY, z);
        const end = projection(x, maxY, z);
        grid.moveTo(...start);
        grid.lineTo(...end);
    }
    for (let y = minY; y <= maxY; y += cellSize) {
        const start = projection(minX, y, z);
        const end = projection(maxX, y, z);
        grid.moveTo(...start);
        grid.lineTo(...end);
    }

    return grid;
}

export function createAxes({
    length,
    projection,
}: {
    length: number;
    projection: Projection3Dto2D;
}) {
    const axes = new Graphics();
    const start = projection(0, 0, 0);
    const xAxisEnd = projection(length, 0, 0);
    const yAxisEnd = projection(0, length, 0);
    const zAxisEnd = projection(0, 0, length);

    axes.moveTo(...start);
    axes.lineStyle({ width: 4, color: 0xff0000 });
    axes.lineTo(...xAxisEnd);

    axes.moveTo(...start);
    axes.lineStyle({ width: 4, color: 0x00ff00 });
    axes.lineTo(...yAxisEnd);

    axes.moveTo(...start);
    axes.lineStyle({ width: 4, color: 0x0000ff });
    axes.lineTo(...zAxisEnd);

    return axes;
}
