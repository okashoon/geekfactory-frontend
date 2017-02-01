var assert = require('assert');
var arrays = require('./arrays');

describe('Arrays', function () {
    describe('#sum', function () {
        it('should return sum of the array', function () {
            assert.equal(10, arrays.sum([1, 10, -50, 50, -1]));
        });
    });

    describe('#odds', function () {
        it('should return the odds', function () {
            assert.deepEqual([1, -1], arrays.odds([1, 10, -50, 50, -1]));
        });
    });

    describe('#find', function () {
        it('should find the matching value', function () {
            assert.equal(50, arrays.find([1, 10, -50, 50, -1], function(v){
                return v === 50;
            }));
        });
    });
});