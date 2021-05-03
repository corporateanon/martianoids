//@ts-ignore
import isomath from 'isomath';

export type Projection3Dto2D = (
    x: number,
    y: number,
    z: number
) => [number, number];

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
