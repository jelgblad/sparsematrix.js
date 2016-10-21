declare function require(name: string): any;
declare function describe(text: string, callback: any): any;
declare function it(text: string, callback: any): any;

var expect = require('chai').expect;

import { SparseMatrixBase } from '../src/sparseMatrixBase';

class SparseMatrixBase_Mock extends SparseMatrixBase {

    constructor(dimensions: number[]) {
        super(dimensions);
    }

    public get() { }
    public set() { }
    public clear() { }
}

describe('SparseMatrixBase', function () {
    describe('.getIndex()', function () {

        var matrix2d = new SparseMatrixBase_Mock([4, 8]);

        it('should return expected index', function () {
            expect(matrix2d.getIndex([1, 1])).to.equal(9);
        });
    });

    describe('.getCoordinates()', function () {

        var matrix = new SparseMatrixBase_Mock([3, 7, 5]);

        it('should return expected coordinates', function () {
            for (var i = 0; i < matrix.getSize(); i++) {
                var coords = matrix.getCoordinates(i);
                var index = matrix.getIndex(coords);

                expect(index).to.equal(i);
            }
        });
    });

    describe('.getSize()', function () {

        var matrix2d = new SparseMatrixBase_Mock([4, 8]);
        var matrix3d = new SparseMatrixBase_Mock([4, 8, 16]);
        var matrix4d = new SparseMatrixBase_Mock([4, 8, 16, 32]);

        it('should return expected size', function () {
            expect(matrix2d.getSize()).to.equal(32);
            expect(matrix3d.getSize()).to.equal(512);
            expect(matrix4d.getSize()).to.equal(16384);
        });
    });
});
