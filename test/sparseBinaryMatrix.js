var expect = require("chai").expect;
var sparsematrix = require('..');


describe('SparseBinaryMatrix', function () {
  describe('.getIndex()', function () {

    var matrix2d = new sparsematrix.SparseBinaryMatrix([4, 8]);

    it('should return expected index', function () {
      expect(matrix2d.getIndex([1, 1])).to.equal(9);
    });
  });

  describe('.getCoordinates()', function () {

    var matrix = new sparsematrix.SparseBinaryMatrix([3, 7, 5]);

    it('should return expected coordinates', function () {
      for (var i = 0; i < matrix.getSize(); i++) {
        var coords = matrix.getCoordinates(i);
        var index = matrix.getIndex(coords);

        expect(index).to.equal(i);
      }
    });
  });

  describe('.getSize()', function () {

    var matrix2d = new sparsematrix.SparseBinaryMatrix([4, 8]);
    var matrix3d = new sparsematrix.SparseBinaryMatrix([4, 8, 16]);
    var matrix4d = new sparsematrix.SparseBinaryMatrix([4, 8, 16, 32]);

    it('should return expected size', function () {
      expect(matrix2d.getSize()).to.equal(32);
      expect(matrix3d.getSize()).to.equal(512);
      expect(matrix4d.getSize()).to.equal(16384);
    });
  });

  describe('.get(vector)', function () {

    var matrix = new sparsematrix.SparseBinaryMatrix([8, 8]);

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

    var matrix = new sparsematrix.SparseBinaryMatrix([4, 4]);

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

    var matrix = new sparsematrix.SparseBinaryMatrix([8, 8]);

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
});