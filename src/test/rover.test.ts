import {Rover, RoverCommandEnum, RoverDirectionEnum} from "../rover";
import {Planet} from "../planet";
import {Coordinates} from "../coordinates";
import {Obstacle} from "../obstacle";

describe('rover', () => {

    describe('rover should be initialized properly', () => {

        it('should have coordinates', (done) => {
            const dummyCoordinates = new Coordinates(0, 0);
            const rover = new Rover(0, 0, RoverDirectionEnum.N);
            expect(rover.coordinates).toBeDefined();
            expect(rover.getCoordinates()).toEqual(dummyCoordinates);
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
            const expectedCoordinates = new Coordinates(4, 4);
            const rover = new Rover(3, 4, RoverDirectionEnum.E);
            rover.moveForward();
            expect(rover.getCoordinates()).toEqual(expectedCoordinates);
            done();
        });

        it('should move backward facing west', (done) => {
            const expectedCoordinates = new Coordinates(6, 6);
            const rover = new Rover(5, 6, RoverDirectionEnum.W);
            rover.moveBackward();
            expect(rover.getCoordinates()).toEqual(expectedCoordinates);
            done();
        });

        it('should move forward facing north', (done) => {
            const expectedCoordinates = new Coordinates(1, 3);
            const rover = new Rover(1, 2, RoverDirectionEnum.N);
            rover.moveForward();
            expect(rover.getCoordinates()).toEqual(expectedCoordinates);
            done();
        });

        it('should move backward facing north', (done) => {
            const expectedCoordinates = new Coordinates(1, 1);
            const rover = new Rover(1, 2, RoverDirectionEnum.N);
            rover.moveBackward();
            expect(rover.getCoordinates()).toEqual(expectedCoordinates);
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
            const expectedCoordinates = new Coordinates(1, 4);
            const rover = new Rover(1, 3, RoverDirectionEnum.S);
            rover.executeCommand(RoverCommandEnum.MOVE_BACKWARD);
            expect(rover.getCoordinates()).toEqual(expectedCoordinates);
            done();
        });

        it('should move forward', (done) => {
            const expectedCoordinates = new Coordinates(2, 3);
            const rover = new Rover(1, 3, RoverDirectionEnum.E);
            rover.executeCommand(RoverCommandEnum.MOVE_FORWARD);
            expect(rover.getCoordinates()).toEqual(expectedCoordinates);
            done();
        });

    });

    describe('rover should handle array of commands', () => {
        it('should turn to the right from west to north then move forward', (done) => {
            const expectedCoordinates = new Coordinates(1, 4);
            const rover = new Rover(1, 3, RoverDirectionEnum.W);
            const roverCommands = [RoverCommandEnum.TURN_RIGHT, RoverCommandEnum.MOVE_FORWARD];
            rover.executeCommands(roverCommands);
            expect(rover.getDirection()).toEqual(RoverDirectionEnum.N);
            expect(rover.getCoordinates()).toEqual(expectedCoordinates);
            done();
        });

        it('should turn to the left from south to east then move backward', (done) => {
            const expectedCoordinates = new Coordinates(0, 3);
            const rover = new Rover(1, 3, RoverDirectionEnum.S);
            const roverCommands = [RoverCommandEnum.TURN_LEFT, RoverCommandEnum.MOVE_BACKWARD];
            rover.executeCommands(roverCommands);
            expect(rover.getDirection()).toEqual(RoverDirectionEnum.E);
            expect(rover.getCoordinates()).toEqual(expectedCoordinates);
            done();
        });

        it('should turn to the left from south to east then move backward then turn right twice and move forward', (done) => {
            const expectedCoordinates = new Coordinates(-1, 3);
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
            expect(rover.getCoordinates()).toEqual(expectedCoordinates);
            done();
        });

    });

    describe('rover should handle correctly a rotation around the planet', () => {
        it('should return to the opposite side if you reach the limit of the planet', (done) => {
            const expectedCoordinates = new Coordinates(5, 3);
            const planet = new Planet(5);
            const rover = new Rover(1, 3, RoverDirectionEnum.W, planet);
            rover.moveForward();
            expect(rover.getCoordinates()).toEqual(expectedCoordinates);
            done();
        });

        it('should return to the opposite side if you reach the limit of the planet', (done) => {
            const expectedCoordinates = new Coordinates(1, 1);
            const planet = new Planet(5);
            const rover = new Rover(5, 1, RoverDirectionEnum.E, planet);
            rover.moveForward();
            expect(rover.getCoordinates()).toEqual(expectedCoordinates);
            done();
        });

        it('should return to the opposite side if you reach the limit of the planet', (done) => {
            const expectedCoordinates = new Coordinates(1, 1);
            const planet = new Planet(5);
            const rover = new Rover(1, 5, RoverDirectionEnum.N, planet);
            rover.moveForward();
            expect(rover.getCoordinates()).toEqual(expectedCoordinates);
            done();
        });

        it('should return to the opposite side if you reach the limit of the planet', (done) => {
            const expectedCoordinates = new Coordinates(1, 5)
            const planet = new Planet(5);
            const rover = new Rover(1, 1, RoverDirectionEnum.S, planet);
            rover.moveForward();
            expect(rover.getCoordinates()).toEqual(expectedCoordinates);
            done();
        });
    });
    describe('rover moves up to the last possible point, aborts the sequence and reports the obstacle', () => {
        it('should return true because there\'s an obstacle at this coords', (done) => {
            const obstacles = [
                new Obstacle(
                    new Coordinates(3, 8),
                    new Coordinates(3, 7),
                    new Coordinates(4, 7),
                    new Coordinates(4, 8),
                ),
            ];
            const planet = new Planet(10, obstacles);
            const rover = new Rover(2, 7, RoverDirectionEnum.N, planet);
            const coordinatesToObserve = new Coordinates(3, 7);
            expect(rover.detectObstacleAt(coordinatesToObserve)).toEqual(true);
            done();
        });

        it('should return false because there\'s no obstacle at this coords', (done) => {
            const obstacles = [
                new Obstacle(
                    new Coordinates(3, 8),
                    new Coordinates(3, 7),
                    new Coordinates(4, 7),
                    new Coordinates(4, 8),
                ),
            ];
            const planet = new Planet(10, obstacles);
            const rover = new Rover(2, 7, RoverDirectionEnum.N, planet);
            const coordinatesToObserve = new Coordinates(1, 1);
            expect(rover.detectObstacleAt(coordinatesToObserve)).toEqual(false);
            done();
        });

        it('should return an exception when rover encounters an obstacle', (done) => {
            const obstacles = [
                new Obstacle(
                    new Coordinates(3, 8),
                    new Coordinates(3, 7),
                    new Coordinates(4, 7),
                    new Coordinates(4, 8),
                ),
                new Obstacle(
                    new Coordinates(2, 3),
                    new Coordinates(2, 2),
                    new Coordinates(4, 3),
                    new Coordinates(4, 2)
                ),
                new Obstacle(
                    new Coordinates(5, 5),
                    new Coordinates(5, 3),
                    new Coordinates(6, 5),
                    new Coordinates(6, 3)
                ),
            ];
            const planet = new Planet(10, obstacles);
            const rover = new Rover(2, 7, RoverDirectionEnum.N, planet);
            const coordinatesBeforeObstacle = new Coordinates(2, 7);
            const roverCommands = [
                RoverCommandEnum.TURN_LEFT,
                RoverCommandEnum.MOVE_BACKWARD,
                RoverCommandEnum.TURN_RIGHT,
                RoverCommandEnum.TURN_RIGHT,
                RoverCommandEnum.MOVE_FORWARD,
            ];
            expect(() => rover.executeCommands(roverCommands))
                .toThrow(new Error('Obstacle encoutered !'));
            expect(rover.getCoordinates()).toEqual(coordinatesBeforeObstacle);
            done();
        });


    })
});