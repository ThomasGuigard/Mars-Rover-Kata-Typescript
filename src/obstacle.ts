import {Coordinates} from "./coordinates";

export class Obstacle {
    private _p1: Coordinates;
    private _p2: Coordinates;
    private _p3: Coordinates;
    private _p4: Coordinates;


    constructor(p1: Coordinates, p2: Coordinates, p3: Coordinates, p4: Coordinates) {
        this._p1 = p1;
        this._p2 = p2;
        this._p3 = p3;
        this._p4 = p4;
    }


    getP1(): Coordinates {
        return this._p1;
    }

    getP2(): Coordinates {
        return this._p2;
    }

    getP3(): Coordinates {
        return this._p3;
    }

    getP4(): Coordinates {
        return this._p4;
    }
}