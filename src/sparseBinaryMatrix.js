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