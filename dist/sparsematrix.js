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
	
	// Verify dimensions
	if (!Array.isArray(dimensions)) {
		throw new TypeError('Array expected');
	}
	/// TODO: Check if array elements is positive numbers
	
	// Store indices of 'on' fields in this array
	var _data = [];
	
	// Get value
	this.get = function (vector) {

		var index = this.getIndex(vector);
		return this.getByIndex(index);
	};
	
	// Set value
	this.set = function (vector, value) {

		var index = this.getIndex(vector);
		return this.setByIndex(index, value);
	};
	
	// Get value by data index
	this.getByIndex = function (index) {

		var dataArrayIndex = _data.indexOf(index);

		if (dataArrayIndex > -1) {
			return true;
		}
		else {
			return false;
		}
	};
	
	// Set value by data index
	this.setByIndex = function (index, value) {

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
	
    // Verify dimensions
    if (!Array.isArray(dimensions)) {
        throw new TypeError('Array expected');
    }
    /// TODO: Check if array elements is positive numbers
	
    // Store data on this object
    var _data = {};
	
    // Get value
    this.get = function (vector) {

        var index = this.getIndex(vector);
        return this.getByIndex(index);
    };
	
    // Get value as number if undefined
    this.getAsNumber = function (vector) {

        var index = this.getIndex(vector);
        return this.getAsNumberByIndex(index);
    };
	
    // Set value
    this.set = function (vector, value) {

        var index = this.getIndex(vector);
        return this.setByIndex(index, value);
    };
	
    // Get value by data index
    this.getByIndex = function (index) {
        return _data[index];
    };
	
    // Get value by data index as number if undefined
    this.getAsNumberByIndex = function (index) {

        var data = this.getByIndex(index);

        if (data === undefined) {
            data = 0;
        }

        return data;
    };
	
    // Set value by data index
    this.setByIndex = function (index, value) {
		
        // _data[index] = value;
		
        // Removes data on index if value is false, 0, null or undefined
        if (value === false || value === 0 || value === null || undefined) {
            // _data.splice(index, 1);
            delete _data[index];
        }
        else {
            _data[index] = value;
        }
    };
	
    // 	// Set all values in column
    // 	this.setColumn = function (col, value) {
    // 		
    // 		// Can be optimized?
    // 		
    // 		for (var i = 0; i < rows; i++) {
    // 			this.set(col, i, value);
    // 		}
    // 	};
    // 	
    // 	// Set value
    // 	this.setRow = function (row, value) {
    // 
    // 		// Can be optimized?
    // 		
    // 		for (var i = 0; i < columns; i++) {
    // 			this.set(i, row, value);
    // 		}
    // 	};
	
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