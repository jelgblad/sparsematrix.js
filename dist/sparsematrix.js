(function(){
/* jshint unused: false */
/**
 * @typedef module
 * @type {object}
 * @property {string} id - the identifier for the module.
 * @property {string} filename - the fully resolved filename to the module.
 * @property {module} parent - the module that required this one.
 * @property {module[]} children - the module objects required by this one.
 * @property {boolean} loaded - whether or not the module is done loading, or is in the process of loading
 */
/**
	*
	* Define scope for `require`
	*/
var _require = (function(){
	var /**
			* Store modules (types assigned to module.exports)
			* @type {module[]}
			*/
			imports = [],
			/**
			 * Store the code that constructs a module (and assigns to exports)
			 * @type {*[]}
			 */
			factories = [],
			/**
			 * @type {module}
			 */
			module = {},
			/**
			 * Implement CommonJS `require`
			 * http://wiki.commonjs.org/wiki/Modules/1.1.1
			 * @param {string} filename
			 * @returns {*}
			 */
			__require = function( filename ) {

				if ( typeof imports[ filename ] !== "undefined" ) {
					return imports[ filename ].exports;
				}
				module = {
					id: filename,
					filename: filename,
					parent: module,
					children: [],
					exports: {},
					loaded: false
				};
				if ( typeof factories[ filename ] === "undefined" ) {
					throw new Error( "The factory of " + filename + " module not found" );
				}
				// Called first time, so let's run code constructing (exporting) the module
				imports[ filename ] = factories[ filename ]( _require, module.exports, module,
          typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : null );
				imports[ filename ].loaded = true;
				if ( imports[ filename ].parent.children ) {
					imports[ filename ].parent.children.push( imports[ filename ] );
				}
				return imports[ filename ].exports;
			};
	/**
	 * Register module
	 * @param {string} filename
	 * @param {function(module, *)} moduleFactory
	 */
	__require.def = function( filename, moduleFactory ) {
		factories[ filename ] = moduleFactory;
	};
	return __require;
}());
// Must run for UMD, but under CommonJS do not conflict with global require
if ( typeof require === "undefined" ) {
	require = _require;
}
_require.def( "module.js", function( _require, exports, module, global ){
"use strict";
var sparseMatrix = _require( "src\\sparseMatrix.js" );
var sparseBinaryMatrix = _require( "src\\sparseBinaryMatrix.js" );

window.sparsematrix = {
    sparseMatrix: sparseMatrix.SparseMatrix,
    sparseBinaryMatrix: sparseBinaryMatrix.SparseBinaryMatrix
};

  return module;
});

_require.def( "src\\sparseMatrix.js", function( _require, exports, module, global ){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var sparseMatrixBase_1 = _require( "src\\sparseMatrixBase.js" );
var SparseMatrix = (function (_super) {
    __extends(SparseMatrix, _super);
    function SparseMatrix(dimensions) {
        _super.call(this, dimensions);
        this._data = {};
    }
    SparseMatrix.prototype.get = function (vector, copyObject) {
        if (copyObject === void 0) { copyObject = false; }
        var index;
        if (Array.isArray(vector)) {
            index = this.getIndex(vector);
        }
        else {
            index = vector;
            if (index >= this.getSize() || index < 0) {
                throw new RangeError('SparseMatrix: ' + 'Index is out of range');
            }
        }
        var data = this._data[index.toString()];
        if (typeof data === 'object' && copyObject) {
            data = JSON.parse(JSON.stringify(data));
        }
        return data;
    };
    SparseMatrix.prototype.getAsNumber = function (vector) {
        var data = this.get(vector);
        if (data === undefined) {
            data = 0;
        }
        return data;
    };
    ;
    SparseMatrix.prototype.set = function (vector, value) {
        var index;
        if (Array.isArray(vector)) {
            index = this.getIndex(vector);
        }
        else {
            index = vector;
            if (index >= this.getSize() || index < 0) {
                throw new RangeError('SparseMatrix: ' + 'Index is out of range');
            }
        }
        if (value === false || value === 0 || value === null || undefined) {
            delete this._data[index.toString()];
        }
        else {
            this._data[index.toString()] = value;
        }
    };
    SparseMatrix.prototype.clear = function () {
        this._data = [];
    };
    ;
    return SparseMatrix;
}(sparseMatrixBase_1.SparseMatrixBase));
exports.SparseMatrix = SparseMatrix;
//# sourceMappingURL=sparseMatrix.js.map
  module.exports = exports;


  return module;
});

_require.def( "src\\sparseBinaryMatrix.js", function( _require, exports, module, global ){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var sparseMatrixBase_1 = _require( "src\\sparseMatrixBase.js" );
var SparseBinaryMatrix = (function (_super) {
    __extends(SparseBinaryMatrix, _super);
    function SparseBinaryMatrix(dimensions) {
        _super.call(this, dimensions);
        this._data = [];
    }
    SparseBinaryMatrix.prototype.get = function (vector) {
        var index;
        if (Array.isArray(vector)) {
            index = this.getIndex(vector);
        }
        else {
            index = vector;
            if (index >= this.getSize() || index < 0) {
                throw new RangeError('SparseMatrix: ' + 'Index is out of range');
            }
        }
        var dataArrayIndex = this._data.indexOf(index);
        if (dataArrayIndex > -1) {
            return true;
        }
        else {
            return false;
        }
    };
    SparseBinaryMatrix.prototype.set = function (vector, value) {
        var index;
        if (Array.isArray(vector)) {
            index = this.getIndex(vector);
        }
        else {
            index = vector;
            if (index >= this.getSize() || index < 0) {
                throw new RangeError('SparseMatrix: ' + 'Index is out of range');
            }
        }
        var dataArrayIndex = this._data.indexOf(index);
        if (dataArrayIndex > -1) {
            if (value === false || value === 0) {
                this._data.splice(dataArrayIndex, 1);
            }
        }
        else {
            if (value === true || value === 1) {
                this._data.push(index);
            }
        }
    };
    SparseBinaryMatrix.prototype.mergeFrom = function (matrix) {
        var thisSize = this.getSize();
        var mergingSize = matrix.getSize();
        for (var i = 0; i < mergingSize; i++) {
            if (matrix.get(i) === false)
                continue;
            this.set(i, true);
        }
    };
    SparseBinaryMatrix.prototype.getIndices = function () {
        return this._data;
    };
    SparseBinaryMatrix.prototype.clear = function () {
        this._data = [];
    };
    ;
    return SparseBinaryMatrix;
}(sparseMatrixBase_1.SparseMatrixBase));
exports.SparseBinaryMatrix = SparseBinaryMatrix;
//# sourceMappingURL=sparseBinaryMatrix.js.map
  module.exports = exports;


  return module;
});

_require.def( "src\\sparseMatrixBase.js", function( _require, exports, module, global ){
"use strict";
var SparseMatrixBase = (function () {
    function SparseMatrixBase(dimensions) {
        this.dimensions = dimensions;
        if (!Array.isArray(dimensions)) {
            throw new TypeError('SparseMatrix: ' + 'Array expected');
        }
        for (var i = 0; i < dimensions.length; i++) {
            if (dimensions[i] <= 0) {
                throw new RangeError('SparseMatrix: ' + 'Dimensions are out of range');
            }
        }
    }
    SparseMatrixBase.prototype.getSize = function () {
        var size = this.dimensions[0];
        for (var i = 1; i < this.dimensions.length; i++) {
            size *= this.dimensions[i];
        }
        return size;
    };
    SparseMatrixBase.prototype.getCoordinates = function (index) {
        if (index >= this.getSize() || index < 0) {
            throw new RangeError('SparseMatrix: ' + 'Index is out of range');
        }
        var vector = [];
        for (var i = 1; i < this.dimensions.length; i++) {
            var tmp = this.dimensions[i];
            for (var ii = i + 1; ii < this.dimensions.length; ii++) {
                tmp *= this.dimensions[ii];
            }
            var coord = Math.floor(index / tmp);
            index = Math.floor(index % tmp);
            vector.push(coord);
        }
        vector.push(index);
        return vector;
    };
    SparseMatrixBase.prototype.getIndex = function (vector) {
        if (!Array.isArray(vector)) {
            throw new TypeError('SparseMatrix: ' + 'Array expected');
        }
        if (vector.length !== this.dimensions.length) {
            throw new Error('SparseMatrix: ' + 'Wrong number of dimensions in vector (' + vector.length + ' expected ' + this.dimensions.length + ')');
        }
        for (var i = 0; i < this.dimensions.length; i++) {
            if (vector[i] >= this.dimensions[i] || vector[i] < 0) {
                throw new RangeError('SparseMatrix: ' + 'Coordinates are out of range');
            }
        }
        var index = 0;
        for (var i = 0; i < this.dimensions.length - 1; i++) {
            var tmp = vector[i];
            for (var ii = i + 1; ii < this.dimensions.length; ii++) {
                tmp *= this.dimensions[ii];
            }
            index += tmp;
        }
        index += vector[this.dimensions.length - 1];
        return index;
    };
    SparseMatrixBase.prototype.mergeFrom = function (matrix, overwrite) {
        if (overwrite === void 0) { overwrite = false; }
        var thisSize = this.getSize();
        var mergingSize = matrix.getSize();
        for (var i = 0; i < mergingSize; i++) {
            var thisVal = this.get(i);
            if (!overwrite && thisVal !== undefined && thisVal !== null)
                continue;
            var mergeVal = matrix.get(i);
            if (mergeVal === undefined || mergeVal === null)
                continue;
            this.set(i, matrix.get(i));
        }
    };
    return SparseMatrixBase;
}());
exports.SparseMatrixBase = SparseMatrixBase;
//# sourceMappingURL=sparseMatrixBase.js.map
  module.exports = exports;


  return module;
});

(function(){
_require( "module.js" );
}());
}());