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
/** SparseBinaryMatrix */
var SparseBinaryMatrix = (function (_super) {
    __extends(SparseBinaryMatrix, _super);
    function SparseBinaryMatrix(dimensions) {
        _super.call(this, dimensions);
        // Store indices of 'on' fields in this array
        this._data = [];
    }
    /** Get value */
    SparseBinaryMatrix.prototype.get = function (vector) {
        var index;
        // Check if vector array
        if (Array.isArray(vector)) {
            index = this.getIndex(vector);
        }
        else {
            index = vector;
            // Verify index
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
    /** Set value */
    SparseBinaryMatrix.prototype.set = function (vector, value) {
        var index;
        // Check if vector array
        if (Array.isArray(vector)) {
            index = this.getIndex(vector);
        }
        else {
            index = vector;
            // Verify index
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
    /** Merge matrix into this matrix */
    SparseBinaryMatrix.prototype.mergeFrom = function (matrix) {
        if (this.getSign() !== matrix.getSign()) {
            throw new Error('SparseMatrix: ' + 'Can\'t merge matrices with different signatures');
        }
        var mergingIndices = matrix.getIndices();
        for (var i = 0; i < mergingIndices.length; i++) {
            this.set(mergingIndices[i], true);
        }
    };
    /** Get indices of on 'bits' */
    SparseBinaryMatrix.prototype.getIndices = function () {
        return this._data;
    };
    /** Clear all values */
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

_require.def( "src\\sparseMatrix.js", function( _require, exports, module, global ){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var sparseMatrixBase_1 = _require( "src\\sparseMatrixBase.js" );
/** SparseMatrix */
var SparseMatrix = (function (_super) {
    __extends(SparseMatrix, _super);
    function SparseMatrix(dimensions) {
        _super.call(this, dimensions);
        // Store data on this object
        this._data = {};
    }
    /** Get value */
    SparseMatrix.prototype.get = function (vector, copyObject) {
        if (copyObject === void 0) { copyObject = false; }
        var index;
        // Check if vector array
        if (Array.isArray(vector)) {
            index = this.getIndex(vector);
        }
        else {
            index = vector;
            // Verify index
            if (index >= this.getSize() || index < 0) {
                throw new RangeError('SparseMatrix: ' + 'Index is out of range');
            }
        }
        var data = this._data[index.toString()];
        // Copy if object
        if (typeof data === 'object' && copyObject) {
            data = JSON.parse(JSON.stringify(data));
        }
        return data;
    };
    /**
    * Get value as number
    * undefined is returned as 0
    */
    SparseMatrix.prototype.getAsNumber = function (vector) {
        var data = this.get(vector);
        if (data === undefined) {
            data = 0;
        }
        return data;
    };
    ;
    /** Set value */
    SparseMatrix.prototype.set = function (vector, value) {
        var index;
        // Check if vector array
        if (Array.isArray(vector)) {
            index = this.getIndex(vector);
        }
        else {
            index = vector;
            // Verify index
            if (index >= this.getSize() || index < 0) {
                throw new RangeError('SparseMatrix: ' + 'Index is out of range');
            }
        }
        // Removes data on index if value is false, 0, null or undefined
        if (value === false || value === 0 || value === null || undefined) {
            // _data.splice(index, 1);
            delete this._data[index.toString()];
        }
        else {
            this._data[index.toString()] = value;
        }
    };
    /** Clear all values */
    SparseMatrix.prototype.clear = function () {
        this._data = {};
    };
    ;
    return SparseMatrix;
}(sparseMatrixBase_1.SparseMatrixBase));
exports.SparseMatrix = SparseMatrix;
//# sourceMappingURL=sparseMatrix.js.map
  module.exports = exports;


  return module;
});

_require.def( "src\\sparseMatrixBase.js", function( _require, exports, module, global ){
"use strict";
/** SparseMatrixBase */
var SparseMatrixBase = (function () {
    /**
    * dimensions				Array representing each dimension size
    */
    function SparseMatrixBase(dimensions) {
        this.dimensions = dimensions;
        // Verify dimensions: is array
        if (!Array.isArray(dimensions)) {
            throw new TypeError('SparseMatrix: ' + 'Array expected');
        }
        // Verify dimensions: positive numbers
        for (var i = 0; i < dimensions.length; i++) {
            if (dimensions[i] <= 0) {
                throw new RangeError('SparseMatrix: ' + 'Dimensions are out of range');
            }
        }
    }
    /** Get total number of available values */
    SparseMatrixBase.prototype.getSize = function () {
        var size = this.dimensions[0];
        for (var i = 1; i < this.dimensions.length; i++) {
            size *= this.dimensions[i];
        }
        return size;
    };
    /** Get coordinates from data index */
    SparseMatrixBase.prototype.getCoordinates = function (index) {
        // Verify index
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
    /** Get data index from coordinates */
    SparseMatrixBase.prototype.getIndex = function (vector) {
        // Verify vector
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
        /// TODO: Check if array elements is positive numbers
        // 		var dimensions3 = [2, 2, 2, 2];
        // 		var vector3 = [1, 1, 1, 1];
        // 
        // 		var index3 = 0;
        // 
        // 		index3 += vector2[0] * dimensions3[1] * dimensions3[2] * dimensions3[3];
        // 		index3 += vector2[1] * dimensions3[2] * dimensions3[3];
        // 		index3 += vector3[2] * dimensions3[3];
        // 		index3 += vector3[3];
        // 
        // 		console.log(index3); // 15
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
    /** Merge matrix into this matrix */
    SparseMatrixBase.prototype.mergeFrom = function (matrix, overwrite) {
        if (overwrite === void 0) { overwrite = false; }
        if (this.getSign() !== matrix.getSign()) {
            throw new Error('SparseMatrix: ' + 'Can\'t merge matrices with different signatures');
        }
        var thisSize = this.getSize();
        var mergingSize = matrix.getSize();
        for (var i = 0; i < mergingSize; i++) {
            var thisVal = this.get(i);
            if (!overwrite && thisVal !== undefined && thisVal !== null)
                continue;
            var mergeVal = matrix.get(i);
            if (mergeVal === undefined || mergeVal === null)
                continue;
            // Set value
            this.set(i, matrix.get(i));
        }
    };
    /** Get matrix signature */
    SparseMatrixBase.prototype.getSign = function () {
        var sign = '';
        sign += this.dimensions.length;
        sign += '#';
        for (var i = 0; i < this.dimensions.length; i++) {
            sign += this.dimensions[i];
        }
        sign += '#';
        sign += this.getSize();
        return sign;
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