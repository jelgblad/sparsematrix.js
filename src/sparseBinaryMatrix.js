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