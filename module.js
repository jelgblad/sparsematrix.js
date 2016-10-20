"use strict";
var sparseMatrix = require('./src/sparseMatrix');
var sparseBinaryMatrix = require('./src/sparseBinaryMatrix');

// window.sparsematrix = {
//     sparseMatrix: sparseMatrix.SparseMatrix,
//     sparseBinaryMatrix: sparseBinaryMatrix.SparseBinaryMatrix,
//     sparseMathMatrix: sparseBinaryMatrix.SparseMathMatrix
// };

var sparsematrix = {
    sparseMatrix: sparseMatrix.SparseMatrix,
    sparseBinaryMatrix: sparseBinaryMatrix.SparseBinaryMatrix,
    sparseMathMatrix: sparseBinaryMatrix.SparseMathMatrix
};

if (typeof window === 'undefined' && typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        exports = module.exports = sparsematrix;
    }
    exports.sparsematrix = sparsematrix;
}
else {
    window.sparsematrix = sparsematrix;
}