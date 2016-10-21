declare function require(name: string): any;
declare function describe(text: string, callback: any): any;
declare function it(text: string, callback: any): any;

var expect = require('chai').expect;

import { SparseBinaryMatrix } from '../src/sparseBinaryMatrix';

describe('SparseBinaryMatrix', function () {
    describe('.get(vector)', function () {

        var matrix = new SparseBinaryMatrix([8, 8]);

        matrix.set([4, 5], true);
        matrix.set([3, 5], 1);

        it('should return expected value', function () {
            expect(matrix.get([4, 5])).to.equal(true);
            expect(matrix.get([3, 5])).to.equal(true);
        });

        it('should return empty field as false', function () {
            expect(matrix.get([5, 5])).to.equal(false);
        });
    });

    describe('.set(vector, value)', function () {

        var matrix = new SparseBinaryMatrix([4, 4]);

        matrix.set([0, 0], true);
        matrix.set([1, 0], false);
        matrix.set([2, 0], true);
        matrix.set([3, 0], false);
        matrix.set([0, 1], true);
        matrix.set([1, 1], false);
        matrix.set([2, 1], true);
        matrix.set([3, 1], false);
        matrix.set([0, 2], true);
        matrix.set([1, 2], false);
        matrix.set([2, 2], true);
        matrix.set([3, 2], false);
        matrix.set([0, 3], true);
        matrix.set([1, 3], false);
        matrix.set([2, 3], true);
        matrix.set([3, 3], false);

        matrix.set([2, 3], false);
        matrix.set([3, 3], true);

        it('should set expected value', function () {
            expect(matrix.get([0, 0])).to.equal(true);
            expect(matrix.get([1, 0])).to.equal(false);
            expect(matrix.get([2, 0])).to.equal(true);
            expect(matrix.get([3, 0])).to.equal(false);
            expect(matrix.get([0, 1])).to.equal(true);
            expect(matrix.get([1, 1])).to.equal(false);
            expect(matrix.get([2, 1])).to.equal(true);
            expect(matrix.get([3, 1])).to.equal(false);
            expect(matrix.get([0, 2])).to.equal(true);
            expect(matrix.get([1, 2])).to.equal(false);
            expect(matrix.get([2, 2])).to.equal(true);
            expect(matrix.get([3, 2])).to.equal(false);
            expect(matrix.get([0, 3])).to.equal(true);
            expect(matrix.get([1, 3])).to.equal(false);
            expect(matrix.get([2, 3])).to.equal(false);
            expect(matrix.get([3, 3])).to.equal(true);
        });
    });

    describe('.clear()', function () {

        var matrix = new SparseBinaryMatrix([8, 8]);

        matrix.set([4, 5], true);
        matrix.set([3, 3], false);
        matrix.set([7, 7], true);

        matrix.clear();

        it('should clear all values', function () {
            expect(matrix.get([4, 5])).to.equal(false);
            expect(matrix.get([3, 3])).to.equal(false);
            expect(matrix.get([7, 7])).to.equal(false);
        });
    });

    describe('.mergeFrom(matrix)', function () {

        var matrix1 = new SparseBinaryMatrix([8, 8]);
        var matrix2 = new SparseBinaryMatrix([8, 8]);

        matrix1.set([0, 0], false);
        matrix1.set([0, 1], true);
        matrix1.set([0, 2], false);
        matrix1.set([0, 3], true);

        matrix2.set([1, 0], true);
        matrix2.set([1, 1], false);
        matrix2.set([1, 2], true);
        matrix2.set([1, 3], false);

        matrix2.set([0, 3], false);

        matrix1.mergeFrom(matrix2);

        it('should merge matrix(arg) into matrix(this)', function () {

            expect(matrix1.get([0, 1])).to.equal(true);
            expect(matrix1.get([0, 2])).to.equal(false);
            expect(matrix1.get([0, 3])).to.equal(true);

            expect(matrix1.get([1, 1])).to.equal(false);
            expect(matrix1.get([1, 2])).to.equal(true);
        });
    });
});