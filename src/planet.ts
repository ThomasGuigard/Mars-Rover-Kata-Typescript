import {Obstacle} from "./obstacle";

export class Planet {
    private _size: number;
    private _obstacles: Obstacle[];

    constructor(size: number, obstacles: Obstacle[] = []) {
        this._size = size;
        this._obstacles = obstacles;
    }

    getSize(): number {
        return this._size;
    }

    getObstacles(): Obstacle[] {
        return this._obstacles;
    }
}