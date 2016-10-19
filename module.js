"use strict";
var sparseMatrix = require('./src/sparseMatrix');
var sparseBinaryMatrix = require('./src/sparseBinaryMatrix');

window.sparsematrix = {
    sparseMatrix: sparseMatrix.SparseMatrix,
    sparseBinaryMatrix: sparseBinaryMatrix.SparseBinaryMatrix
};