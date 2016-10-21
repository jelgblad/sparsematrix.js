declare function require(name: string): any;
declare function describe(text: string, callback: any): any;
declare function it(text: string, callback: any): any;

var expect = require('chai').expect;

import { SparseMathMatrix } from '../src/sparseMathMatrix';

describe('SparseMathMatrix', function () {
    describe('.get(vector)', function () {

        var matrix = new SparseMathMatrix([8, 8]);

        matrix.set([4, 5], 0.02);

        it('should return expected value', function () {
            expect(matrix.get([4, 5])).to.equal(0.02);
        });

        it('should return empty field as 0', function () {
            expect(matrix.get([5, 5])).to.equal(0);
        });
    });

    describe('.set(vector, value)', function () {

        var matrix = new SparseMathMatrix([4, 4]);

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

    describe('.clear()', function () {

        var matrix = new SparseMathMatrix([8, 8]);

        matrix.set([4, 5], 123);
        matrix.set([3, 3], 123);
        matrix.set([7, 7], 123);

        matrix.clear();

        it('should clear all values', function () {
            expect(matrix.get([4, 5])).to.equal(0);
            expect(matrix.get([3, 3])).to.equal(0);
            expect(matrix.get([7, 7])).to.equal(0);
        });
    });

    // describe('.mergeFrom(matrix)', function () {

    //     var matrix1 = new SparseMathMatrix([8, 8]);
    //     var matrix2 = new SparseMathMatrix([8, 8]);

    //     matrix1.set([0, 0], 1);
    //     matrix1.set([0, 1], 2);
    //     matrix1.set([0, 2], 3);
    //     matrix1.set([0, 3], 4);

    //     matrix2.set([1, 0], 5);
    //     matrix2.set([1, 1], 6);
    //     matrix2.set([1, 2], 7);
    //     matrix2.set([1, 3], 8);

    //     matrix2.set([0, 3], 9);

    //     matrix1.mergeFrom(matrix2);

    //     it('should merge matrix(arg) into matrix(this)', function () {

    //         expect(matrix1.get([0, 1])).to.equal(2);
    //         expect(matrix1.get([1, 1])).to.equal(6);

    //         expect(matrix1.get([0, 3])).to.not.equal(9);
    //     });

    //     var matrix3 = new SparseMathMatrix([8, 8]);
    //     var matrix4 = new SparseMathMatrix([8, 8]);

    //     matrix3.set([0, 0], 1);
    //     matrix3.set([0, 1], 2);

    //     matrix4.set([1, 0], 3);
    //     matrix4.set([0, 1], 4);

    //     matrix3.mergeFrom(matrix4, true);

    //     it('should merge matrix(arg) into matrix(this) and overwrite existing values', function () {

    //         expect(matrix3.get([0, 0])).to.equal(1);
    //         expect(matrix3.get([0, 1])).to.not.equal(2);
    //         expect(matrix3.get([1, 0])).to.equal(3);
    //         expect(matrix3.get([0, 1])).to.equal(4);
    //     });
    // });

    describe('.addFrom()', function () {

        var matrix1 = new SparseMathMatrix([8, 8]);
        var matrix2 = new SparseMathMatrix([8, 8]);

        matrix1.set([0, 0], 0);
        matrix1.set([1, 1], 4);
        matrix1.set([1, 2], -5);

        matrix2.set([0, 0], 8);
        matrix2.set([0, 1], 6);
        matrix2.set([1, 1], 6);
        matrix2.set([1, 2], 6);

        matrix1.addFrom(matrix2);

        it('should add values from matrix(arg) into matrix(this)', function () {
            expect(matrix1.get([0, 0])).to.equal(8);
            expect(matrix1.get([0, 1])).to.equal(6);
            expect(matrix1.get([1, 1])).to.equal(10);
            expect(matrix1.get([1, 2])).to.equal(1);
        });
    });

    describe('.subtractFrom()', function () {

        var matrix1 = new SparseMathMatrix([8, 8]);
        var matrix2 = new SparseMathMatrix([8, 8]);

        matrix1.set([0, 0], 8);
        matrix1.set([1, 1], 4);
        matrix1.set([1, 2], 20);

        matrix2.set([0, 0], 4);
        matrix2.set([0, 1], 6);
        matrix2.set([1, 1], 2);
        matrix2.set([1, 2], 5);

        matrix1.subtractFrom(matrix2);

        it('should subtract values from matrix(arg) to values in matrix(this)', function () {
            expect(matrix1.get([0, 0])).to.equal(4);
            expect(matrix1.get([0, 1])).to.equal(-6);
            expect(matrix1.get([1, 1])).to.equal(2);
            expect(matrix1.get([1, 2])).to.equal(15);
        });
    });
});