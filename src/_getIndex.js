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