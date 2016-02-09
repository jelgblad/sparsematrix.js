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