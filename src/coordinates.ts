export class Coordinates {
    private _x: number;
    private _y: number;

    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }


    getX(): number {
        return this._x;
    }

    getY(): number {
        return this._y;
    }

    equalsTo(coordinates: Coordinates): boolean {
        return this._x === coordinates.getX()
            && this._y === coordinates.getY();
    }
}