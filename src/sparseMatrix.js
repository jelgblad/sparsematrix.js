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