import {Rover, RoverDirectionEnum} from "../rover";
import {Coordinates} from "../coordinates";

describe('Coordinates', () => {

    describe('Coordinates should be initialized correctly', () => {
        it('should have x attribute defined', (done) => {
            const coordinates = new Coordinates(4, 1);
            expect(coordinates.getX()).toEqual(4);
            done();
        });

        it('should have y attribute defined', (done) => {
            const coordinates = new Coordinates(3, 2);
            expect(coordinates.getY()).toEqual(2);
            done();
        });

    });
});