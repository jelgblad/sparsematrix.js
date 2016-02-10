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

    sparsematrix.SparseBinaryMatrix = function (dimensions) {

	/*
	* dimensions				Array representing each dimension size
	*/
	
    // Verify dimensions: is array
    if (!Array.isArray(dimensions)) {
        throw new TypeError('Array expected');
    }
    
    // Verify dimensions: positive numbers
    for (var i = 0; i < dimensions.length; i++) {
        if (dimensions[i] < 0) {
            throw new RangeError('Dimensions are out of range');
        }
    }
	
    // Store indices of 'on' fields in this array
    var _data = [];
	
    // Get value
    this.get = function (vector) {

        var index = vector;
        
        // Check if vector array
        if (Array.isArray(vector)) {
            index = this.getIndex(vector);
        }
        else {
            // Verify index
            if (index >= _getSize(dimensions)) {
                throw new RangeError('Index is out of range');
            }
        }

        var dataArrayIndex = _data.indexOf(index);

        if (dataArrayIndex > -1) {
            return true;
        }
        else {
            return false;
        }
    };
	
    // Set value
    this.set = function (vector, value) {

        var index = vector;
        
        // Check if vector array
        if (Array.isArray(vector)) {
            index = this.getIndex(vector);
        }
        else {
            // Verify index
            if (index >= _getSize(dimensions)) {
                throw new RangeError('Index is out of range');
            }
        }

        var dataArrayIndex = _data.indexOf(index);

        if (dataArrayIndex > -1) {
            if (value === false || value === 0) {
                _data.splice(dataArrayIndex, 1);
            }
        }
        else {
            if (value === true || value === 1) {
                _data.push(index);
            }
        }
    };
	
    // Get indices of 'on' fields
    this.getIndices = function () {
        return _data;
    };
	
    // Get index
    this.getIndex = function (vector) {
        return _getIndex(dimensions, vector);
    };
	
    // Get coordinates
    this.getCoordinates = function (index) {
        return _getCoordinates(dimensions, index);
    };
	
    // Get size of matrix
    this.getSize = function () {
        return _getSize(dimensions);
    };
	
    // Clear matrix
    this.clear = function () {
        _data = [];
    };
}
sparsematrix.SparseMatrix = function (dimensions) {

	/*
	* dimensions				Array representing each dimension size
	*/
	
    // Verify dimensions: is array
    if (!Array.isArray(dimensions)) {
        throw new TypeError('Array expected');
    }
    
    // Verify dimensions: positive numbers
    for (var i = 0; i < dimensions.length; i++) {
        if (dimensions[i] < 0) {
            throw new RangeError('Dimensions are out of range');
        }
    }
	
    // Store data on this object
    var _data = {};
	
    // Get value
    this.get = function (vector, copyObject) {

        var index = vector;
        
        // Check if vector array
        if (Array.isArray(vector)) {
            index = this.getIndex(vector);
        }
        else {
            // Verify index
            if (index >= _getSize(dimensions)) {
                throw new RangeError('Index is out of range');
            }
        }

        var data = _data[index];
        
        // Copy if object
        if (typeof data === 'object' && copyObject) {
            data = JSON.parse(JSON.stringify(data));
        }

        return data;
    };
	
    // Get value as number if undefined
    this.getAsNumber = function (vector) {
        
        var data = this.get(vector);
        
        if (data === undefined) {
            data = 0;
        }

        return data;
    };
	
    // Set value
    this.set = function (vector, value) {

        var index = vector;
        
        // Check if vector array
        if (Array.isArray(vector)) {
            index = this.getIndex(vector);
        }
        else {
            // Verify index
            if (index >= _getSize(dimensions)) {
                throw new RangeError('Index is out of range');
            }
        }
		
        // Removes data on index if value is false, 0, null or undefined
        if (value === false || value === 0 || value === null || undefined) {
            // _data.splice(index, 1);
            delete _data[index];
        }
        else {
            _data[index] = value;
        }
    };
	
    // Get index
    this.getIndex = function (vector) {
        return _getIndex(dimensions, vector);
    };
	
    // Get coordinates
    this.getCoordinates = function (index) {
        return _getCoordinates(dimensions, index);
    };
	
    // Get size of matrix
    this.getSize = function () {
        return _getSize(dimensions);
    };
	
    // Clear matrix
    this.clear = function () {
        _data = [];
    };
}
// Get coordinates from data index
var _getCoordinates = function (dimensions, index) {
		
    // Verify index
    if (index >= _getSize(dimensions)) {
        throw new RangeError('Index is out of range');
    }

    var vector = [];

    for (var i = 1; i < dimensions.length; i++) {

        var tmp = dimensions[i];

        for (var ii = i + 1; ii < dimensions.length; ii++) {
            tmp *= dimensions[ii];
        }

        var coord = Math.floor(index / tmp);
        index = Math.floor(index % tmp);

        vector.push(coord);
    }

    vector.push(index);

    return vector;
}
// Get data index from coordinates
var _getIndex = function (dimensions, vector) {
		
    // Verify vector
    if (!Array.isArray(vector)) {
        throw new TypeError('Array expected');
    }

    if (vector.length !== dimensions.length) {
        throw new Error('Wrong number of dimensions in vector (' + vector.length + ' expected ' + dimensions.length + ')');
    }

    for (var i = 0; i < dimensions.length; i++) {
        if (vector[i] >= dimensions[i] || vector[i] < 0) {
            throw new RangeError('Coordinates are out of range');
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

    for (var i = 0; i < dimensions.length - 1; i++) {

        var tmp = vector[i];

        for (var ii = i + 1; ii < dimensions.length; ii++) {
            tmp *= dimensions[ii];
        }

        index += tmp;
    }

    index += vector[dimensions.length - 1];

    return index;
}
var _getSize = function (dimensions) {

    var size = dimensions[0];

    for (var i = 1; i < dimensions.length; i++) {
        size *= dimensions[i];
    }

    return size;
}


}).call(this);