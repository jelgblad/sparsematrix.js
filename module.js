'use strict';

(function () {

    var root = this
    //var previous_sparsematrix = root.sparsematrix;

    var sparsematrix = {};

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = sparsematrix;
        }
        exports.sparsematrix = sparsematrix;
    }
    else {
        root.sparsematrix = sparsematrix;
    }

    ///modulescript

}).call(this);