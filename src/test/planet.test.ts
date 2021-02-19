import {Planet} from "../planet";

describe('planet', () => {
    describe('Planet should be initialized correctly', () => {
        it('should have size attribute defined', (done) => {
            const planet = new Planet(5);
            expect(planet.getSize()).toEqual(5);
            done();
        });
    });
});