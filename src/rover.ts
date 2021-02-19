import {Planet} from "./planet";
import {Coordinates} from "./coordinates";
import {Obstacle} from "./obstacle";

export class Rover {
    coordinates: Coordinates;
    direction: RoverDirectionEnum;
    planet: Planet;

    constructor(x: number, y:number, direction: RoverDirectionEnum, planet?: Planet) {
        this.coordinates = new Coordinates(x, y);
        this.direction = direction;
        this.planet = planet;
    }

    setCoordinates(coordinates: Coordinates): void {
        this.coordinates = coordinates;
    }

    getCoordinates(): Coordinates {
        return this.coordinates;
    }

    getDirection(): RoverDirectionEnum {
        return this.direction;
    }

    private move(forward: boolean = true) {
        let x: number = this.coordinates.getX();
        let y: number = this.coordinates.getY();

        if (this.direction === RoverDirectionEnum.N) {
            (forward) ? y++ : y--;
        }
        if (this.direction === RoverDirectionEnum.E) {
            (forward) ? x++ : x--;
        }
        if (this.direction === RoverDirectionEnum.S) {
            (forward) ? y-- : y++;
        }
        if (this.direction === RoverDirectionEnum.W) {
            (forward) ? x-- : x++;
        }

        if (this.planet) {
            if (x > this.planet.getSize()) {
                x = 1;
            }
            if (y > this.planet.getSize()) {
                y = 1;
            }
            if (x < 1) {
                x = this.planet.getSize();
            }
            if (y < 1) {
                y = this.planet.getSize();
            }

            if(this.detectObstacleAt(new Coordinates(x, y))) {
                throw new Error('Obstacle encoutered !');
            }
        }

        this.setCoordinates(new Coordinates(x, y));
    }

    private turn(right: boolean = true) {
        let direction = this.direction;
        if (this.direction === RoverDirectionEnum.N) {
            direction = (right) ? RoverDirectionEnum.E : RoverDirectionEnum.W;
        }
        if (this.direction === RoverDirectionEnum.E) {
            direction = right
                ? RoverDirectionEnum.S
                : RoverDirectionEnum.N;
        }
        if (this.direction === RoverDirectionEnum.S) {
            direction = right
                ? RoverDirectionEnum.W
                : RoverDirectionEnum.E;
        }
        if (this.direction === RoverDirectionEnum.W) {
            direction = right
                ? RoverDirectionEnum.N
                : RoverDirectionEnum.S;
        }
        this.direction = direction;
    }

     detectObstacleAt(coordinates: Coordinates): boolean {
        return this.planet
            .getObstacles()
            .some(o => Object
                .keys(o)
                .some(k => coordinates.equalsTo(o[k]))
            );
    }

    moveBackward() {
        this.move(false);
    }

    moveForward(): void {
        this.move();
    }

    turnLeft(): void {
        this.turn(false);
    }

    turnRight(): void {
        this.turn();
    }

    executeCommands(commands: RoverCommandEnum[]): void {
        try {
            commands.forEach(command => this.executeCommand(command));
        } catch (e) {
            console.log(`An error occured : ${e.message}`)
            throw e;
        }
    }

    executeCommand(command: RoverCommandEnum): void {
        if (command === RoverCommandEnum.TURN_RIGHT) {
            this.turnRight();
        } else if (command === RoverCommandEnum.TURN_LEFT) {
            this.turnLeft();
        } else if (command === RoverCommandEnum.MOVE_FORWARD) {
            this.moveForward();
        } else if (command === RoverCommandEnum.MOVE_BACKWARD) {
            this.moveBackward();
        }
    }


}

export enum RoverDirectionEnum {
    N, E, S, W,
}

export enum RoverCommandEnum {
    TURN_LEFT,
    TURN_RIGHT,
    MOVE_FORWARD,
    MOVE_BACKWARD,
}