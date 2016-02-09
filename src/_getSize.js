var _getSize = function (dimensions) {

    var size = dimensions[0];

    for (var i = 1; i < dimensions.length; i++) {
        size *= dimensions[i];
    }

    return size;
}