import {Rover, RoverCommandEnum, RoverDirectionEnum} from "../rover";
import {Planet} from "../planet";

describe('rover', () => {

    describe('rover should be initialized properly', () => {
        it('should have x attribute defined', (done) => {
            const rover = new Rover(4, 1, RoverDirectionEnum.N);
            expect(rover.x).toBeDefined();
            expect(rover.getX()).toEqual(4);
            done();
        });

        it('should have y attribute defined', (done) => {
            const rover = new Rover(3, 2, RoverDirectionEnum.N);
            expect(rover.y).toBeDefined();
            expect(rover.getY()).toEqual(2);
            done();
        });

        it('should have a direction', (done) => {
            const rover = new Rover(0, 0, RoverDirectionEnum.N);
            expect(rover.direction).toBeDefined();
            expect(rover.getDirection()).toEqual(RoverDirectionEnum.N);
            done();
        });
    });

    describe('rover should be able to move forward or backward', () => {
        it('should move forward facing east', (done) => {
            const rover = new Rover(3, 4, RoverDirectionEnum.E);
            rover.moveForward();
            expect(rover.getX()).toEqual(4);
            expect(rover.getY()).toEqual(4);
            done();
        });

        it('should move backward facing west', (done) => {
            const rover = new Rover(5, 6, RoverDirectionEnum.W);
            rover.moveBackward();
            expect(rover.getX()).toEqual(6);
            expect(rover.getY()).toEqual(6);
            done();
        });

        it('should move forward facing north', (done) => {
            const rover = new Rover(1, 2, RoverDirectionEnum.N);
            rover.moveForward();
            expect(rover.getX()).toEqual(1);
            expect(rover.getY()).toEqual(3);
            done();
        });

        it('should move backward facing north', (done) => {
            const rover = new Rover(1, 2, RoverDirectionEnum.N);
            rover.moveBackward();
            expect(rover.getX()).toEqual(1);
            expect(rover.getY()).toEqual(1);
            done();
        });
    });


    describe('rover should be able to turn left or right', () => {

        it('sould turn to the left from north to west', (done) => {
            const rover = new Rover(2, 5, RoverDirectionEnum.N);
            rover.turnLeft();
            expect(rover.getDirection()).toEqual(RoverDirectionEnum.W);
            done();
        });

        it('sould turn to the left from west to south', (done) => {
            const rover = new Rover(2, 5, RoverDirectionEnum.W);
            rover.turnLeft();
            expect(rover.getDirection()).toEqual(RoverDirectionEnum.S);
            done();
        });

        it('sould turn to the left from south to east', (done) => {
            const rover = new Rover(2, 5, RoverDirectionEnum.S);
            rover.turnLeft();
            expect(rover.getDirection()).toEqual(RoverDirectionEnum.E);
            done();
        });

        it('sould turn to the left from east to north', (done) => {
            const rover = new Rover(2, 5, RoverDirectionEnum.E);
            rover.turnLeft();
            expect(rover.getDirection()).toEqual(RoverDirectionEnum.N);
            done();
        });

        it('sould turn to the right from north to east', (done) => {
            const rover = new Rover(2, 5, RoverDirectionEnum.N);
            rover.turnRight();
            expect(rover.getDirection()).toEqual(RoverDirectionEnum.E);
            done();
        });

        it('sould turn to the right from east to south', (done) => {
            const rover = new Rover(2, 5, RoverDirectionEnum.E);
            rover.turnRight();
            expect(rover.getDirection()).toEqual(RoverDirectionEnum.S);
            done();
        });

        it('sould turn to the right from south to west', (done) => {
            const rover = new Rover(2, 5, RoverDirectionEnum.S);
            rover.turnRight();
            expect(rover.getDirection()).toEqual(RoverDirectionEnum.W);
            done();
        });

        it('sould turn to the right from west to north', (done) => {
            const rover = new Rover(2, 5, RoverDirectionEnum.W);
            rover.turnRight();
            expect(rover.getDirection()).toEqual(RoverDirectionEnum.N);
            done();
        });
    });

    describe('rover should a command', () => {
        it('should turn to the right from west to north', (done) => {
            const rover = new Rover(1, 3, RoverDirectionEnum.W);
            rover.executeCommand(RoverCommandEnum.TURN_RIGHT);
            expect(rover.getDirection()).toEqual(RoverDirectionEnum.N);
            done();
        });

        it('should turn to the left from east to north', (done) => {
            const rover = new Rover(2, 4, RoverDirectionEnum.E);
            rover.executeCommand(RoverCommandEnum.TURN_LEFT);
            expect(rover.getDirection()).toEqual(RoverDirectionEnum.N);
            done();
        });

        it('should move backward', (done) => {
            const rover = new Rover(1, 3, RoverDirectionEnum.S);
            rover.executeCommand(RoverCommandEnum.MOVE_BACKWARD);
            expect(rover.getY()).toEqual(4);
            done();
        });

        it('should move forward', (done) => {
            const rover = new Rover(1, 3, RoverDirectionEnum.E);
            rover.executeCommand(RoverCommandEnum.MOVE_FORWARD);
            expect(rover.getX()).toEqual(2);
            done();
        });

    });

    describe('rover should handle array of commands', () => {
        it('should turn to the right from west to north then move forward', (done) => {
            const rover = new Rover(1, 3, RoverDirectionEnum.W);
            const roverCommands = [RoverCommandEnum.TURN_RIGHT, RoverCommandEnum.MOVE_FORWARD];
            rover.executeCommands(roverCommands);
            expect(rover.getDirection()).toEqual(RoverDirectionEnum.N);
            expect(rover.getY()).toEqual(4);
            done();
        });

        it('should turn to the left from south to east then move backward', (done) => {
            const rover = new Rover(1, 3, RoverDirectionEnum.S);
            const roverCommands = [RoverCommandEnum.TURN_LEFT, RoverCommandEnum.MOVE_BACKWARD];
            rover.executeCommands(roverCommands);
            expect(rover.getDirection()).toEqual(RoverDirectionEnum.E);
            expect(rover.getX()).toEqual(0);
            done();
        });

        it('should turn to the left from south to east then move backward then turn right twice and move forward', (done) => {
            const rover = new Rover(1, 3, RoverDirectionEnum.S);
            const roverCommands = [
                RoverCommandEnum.TURN_LEFT,
                RoverCommandEnum.MOVE_BACKWARD,
                RoverCommandEnum.TURN_RIGHT,
                RoverCommandEnum.TURN_RIGHT,
                RoverCommandEnum.MOVE_FORWARD,
            ];
            rover.executeCommands(roverCommands);
            expect(rover.getDirection()).toEqual(RoverDirectionEnum.W);
            expect(rover.getX()).toEqual(-1);
            expect(rover.getY()).toEqual(3)
            done();
        });

    });

    describe('rover should handle correctly a rotation around the planet', () => {
        it('should return to the opposite side if you reach the limit of the planet', (done) => {
            const planet = new Planet(5);
            const rover = new Rover(1, 3, RoverDirectionEnum.W);
            rover.moveForward();
            expect(rover.getX()).toEqual(5);
            done();
        });

        it('should return to the opposite side if you reach the limit of the planet', (done) => {
            const planet = new Planet(5);
            const rover = new Rover(5, 1, RoverDirectionEnum.E);
            rover.moveForward();
            expect(rover.getX()).toEqual(1);
            done();
        });

        it('should return to the opposite side if you reach the limit of the planet', (done) => {
            const planet = new Planet(5);
            const rover = new Rover(1, 5, RoverDirectionEnum.N);
            rover.moveForward();
            expect(rover.getY()).toEqual(1);
            done();
        });

        it('should return to the opposite side if you reach the limit of the planet', (done) => {
            const planet = new Planet(5);
            const rover = new Rover(1, 1, RoverDirectionEnum.S);
            rover.moveForward();
            expect(rover.getY()).toEqual(5);
            done();
        });
    });
});