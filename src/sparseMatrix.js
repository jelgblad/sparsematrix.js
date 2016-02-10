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