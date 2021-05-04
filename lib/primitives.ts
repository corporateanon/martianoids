export type Coords3D = [x: number, y: number, z: number];
export type Coords2D = [x: number, y: number];
export type Projection3Dto2D = (...coords: Coords3D) => Coords2D;

