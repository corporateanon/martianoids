//@ts-ignore
import isomath from 'isomath';
import { Projection3Dto2D } from './primitives';

export const createProjection = (w: number, h: number): Projection3Dto2D => {
    const project = isomath({
        ratio: 0.5,
        origin: [w / 2, h / 2],
    });

    return function isometricProjection(
        x: number,
        y: number,
        z: number
    ): [number, number] {
        //rotation
        [y, z] = [z, y];

        return project(x, y, z);
    };
};
