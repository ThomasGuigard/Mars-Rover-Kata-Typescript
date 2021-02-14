export class Rover {
    x: number;
    y: number;
    direction: RoverDirectionEnum;

    constructor(x: number, y: number, direction: RoverDirectionEnum) {
        this.x = x;
        this.y = y;
        this.direction = direction;
    }

    getX(): number {
        return this.x;
    }

    getY(): number {
        return this.y;
    }

    getDirection(): RoverDirectionEnum {
        return this.direction;
    }

    moveBackward() {
        if (this.direction === RoverDirectionEnum.N) {
            this.y = this.y - 1;
        }
        if (this.direction === RoverDirectionEnum.E) {
            this.x = this.x - 1;
        }
        if (this.direction === RoverDirectionEnum.S) {
            this.y = this.y + 1;
        }
        if (this.direction === RoverDirectionEnum.W) {
            this.x = this.x + 1;
        }
    }

    moveForward(): void {
        if (this.direction === RoverDirectionEnum.N) {
            this.y = this.y + 1;
        }
        if (this.direction === RoverDirectionEnum.E) {
            this.x = this.x + 1;
        }
        if (this.direction === RoverDirectionEnum.S) {
            this.y = this.y - 1;
        }
        if (this.direction === RoverDirectionEnum.W) {
            this.x = this.x - 1;
        }
    }

    turnLeft(): void {
        if (this.direction === RoverDirectionEnum.N) {
            this.direction = RoverDirectionEnum.W;
        } else if (this.direction === RoverDirectionEnum.E) {
            this.direction = RoverDirectionEnum.N;
        } else if (this.direction === RoverDirectionEnum.S) {
            this.direction = RoverDirectionEnum.E;
        } else if (this.direction === RoverDirectionEnum.W) {
            this.direction = RoverDirectionEnum.S;
        }
    }

    turnRight(): void {
        if (this.direction === RoverDirectionEnum.N) {
            this.direction = RoverDirectionEnum.E;
        } else if (this.direction === RoverDirectionEnum.E) {
            this.direction = RoverDirectionEnum.S;
        } else if (this.direction === RoverDirectionEnum.S) {
            this.direction = RoverDirectionEnum.W;
        } else if (this.direction === RoverDirectionEnum.W) {
            this.direction = RoverDirectionEnum.N;
        }
    }

    executeCommands(commands: RoverCommandEnum[]): void {
        commands.forEach(command => this.executeCommand(command));
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