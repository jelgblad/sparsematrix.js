declare function require(name: string): any;
declare function describe(text: string, callback: any): any;
declare function it(text: string, callback: any): any;

var expect = require('chai').expect;

import { SparseMatrix } from '../src/sparseMatrix';

describe('SparseMatrix', function () {
    describe('.getIndex()', function () {

        var matrix2d = new SparseMatrix([4, 8]);

        it('should return expected index', function () {
            expect(matrix2d.getIndex([1, 1])).to.equal(9);
        });
    });

    describe('.getCoordinates()', function () {

        var matrix = new SparseMatrix([3, 7, 5]);

        it('should return expected coordinates', function () {
            for (var i = 0; i < matrix.getSize(); i++) {
                var coords = matrix.getCoordinates(i);
                var index = matrix.getIndex(coords);

                expect(index).to.equal(i);
            }
        });
    });

    describe('.getSize()', function () {

        var matrix2d = new SparseMatrix([4, 8]);
        var matrix3d = new SparseMatrix([4, 8, 16]);
        var matrix4d = new SparseMatrix([4, 8, 16, 32]);

        it('should return expected size', function () {
            expect(matrix2d.getSize()).to.equal(32);
            expect(matrix3d.getSize()).to.equal(512);
            expect(matrix4d.getSize()).to.equal(16384);
        });
    });

    describe('.get(vector)', function () {

        var matrix = new SparseMatrix([8, 8]);

        matrix.set([4, 5], 0.02);

        it('should return expected value', function () {
            expect(matrix.get([4, 5])).to.equal(0.02);
        });

        it('should return empty field as undefined', function () {
            expect(matrix.get([5, 5])).to.equal(undefined);
        });
    });

    describe('.getAsNumber(vector)', function () {

        var matrix = new SparseMatrix([8, 8]);

        matrix.set([4, 5], 0.02);

        it('should return empty field as number', function () {
            expect(matrix.getAsNumber([2, 3])).to.equal(0);
            expect(matrix.getAsNumber([4, 5])).to.equal(0.02);
        });
    });

    describe('.set(vector, value)', function () {

        var matrix = new SparseMatrix([4, 4]);

        matrix.set([0, 0], 1);
        matrix.set([1, 0], 2);
        matrix.set([2, 0], 3);
        matrix.set([3, 0], 4);
        matrix.set([0, 1], 5);
        matrix.set([1, 1], 6);
        matrix.set([2, 1], 7);
        matrix.set([3, 1], 8);
        matrix.set([0, 2], 9);
        matrix.set([1, 2], 10);
        matrix.set([2, 2], 11);
        matrix.set([3, 2], 12);
        matrix.set([0, 3], 13);
        matrix.set([1, 3], 14);
        matrix.set([2, 3], 15);
        matrix.set([3, 3], 16);

        it('should set expected value', function () {
            expect(matrix.get([0, 0])).to.equal(1);
            expect(matrix.get([1, 0])).to.equal(2);
            expect(matrix.get([2, 0])).to.equal(3);
            expect(matrix.get([3, 0])).to.equal(4);
            expect(matrix.get([0, 1])).to.equal(5);
            expect(matrix.get([1, 1])).to.equal(6);
            expect(matrix.get([2, 1])).to.equal(7);
            expect(matrix.get([3, 1])).to.equal(8);
            expect(matrix.get([0, 2])).to.equal(9);
            expect(matrix.get([1, 2])).to.equal(10);
            expect(matrix.get([2, 2])).to.equal(11);
            expect(matrix.get([3, 2])).to.equal(12);
            expect(matrix.get([0, 3])).to.equal(13);
            expect(matrix.get([1, 3])).to.equal(14);
            expect(matrix.get([2, 3])).to.equal(15);
            expect(matrix.get([3, 3])).to.equal(16);
        });
    });

    //   describe('.setColumn', function () {
    // 
    //     var matrix = new SparseMatrix([8, 8]);
    // 
    //     matrix.setColumn(6, 123);
    // 
    //     it('should set all values in column', function () {
    //       expect(matrix.get(6, 0)).to.equal(123);
    //       expect(matrix.get(6, 7)).to.equal(123);
    //     });
    //   });
    // 
    //   describe('.setRow', function () {
    // 
    //     var matrix = new SparseMatrix(8, 8);
    // 
    //     matrix.setRow(6, 123);
    // 
    //     it('should set all values in row', function () {
    //       expect(matrix.get(0, 6)).to.equal(123);
    //       expect(matrix.get(7, 6)).to.equal(123);
    //     });
    //   });

    describe('.clear()', function () {

        var matrix = new SparseMatrix([8, 8]);

        matrix.set([4, 5], 123);
        matrix.set([3, 3], 123);
        matrix.set([7, 7], 123);

        matrix.clear();

        it('should clear all values', function () {
            expect(matrix.get([4, 5])).to.equal(undefined);
            expect(matrix.get([3, 3])).to.equal(undefined);
            expect(matrix.get([7, 7])).to.equal(undefined);
        });
    });

    describe('.mergeFrom(matrix)', function () {

        var matrix1 = new SparseMatrix([8, 8]);
        var matrix2 = new SparseMatrix([8, 8]);

        matrix1.set([0, 0], 1);
        matrix1.set([0, 1], 2);
        matrix1.set([0, 2], 3);
        matrix1.set([0, 3], 4);

        matrix2.set([1, 0], 5);
        matrix2.set([1, 1], 6);
        matrix2.set([1, 2], 7);
        matrix2.set([1, 3], 8);

        matrix2.set([0, 3], 9);

        matrix1.mergeFrom(matrix2);

        it('should merge matrix(arg) into matrix(this)', function () {

            expect(matrix1.get([0, 1])).to.equal(2);
            expect(matrix1.get([1, 1])).to.equal(6);

            expect(matrix1.get([0, 3])).to.not.equal(9);
        });

        var matrix3 = new SparseMatrix([8, 8]);
        var matrix4 = new SparseMatrix([8, 8]);

        matrix3.set([0, 0], 1);
        matrix3.set([0, 1], 2);

        matrix4.set([1, 0], 3);
        matrix4.set([0, 1], 4);

        matrix3.mergeFrom(matrix4, true);

        it('should merge matrix(arg) into matrix(this) and overwrite existing values', function () {

            expect(matrix3.get([0, 0])).to.equal(1);
            expect(matrix3.get([0, 1])).to.not.equal(2);
            expect(matrix3.get([1, 0])).to.equal(3);
            expect(matrix3.get([0, 1])).to.equal(4);
        });
    });
});