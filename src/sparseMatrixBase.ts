/** SparseMatrixBase */
export abstract class SparseMatrixBase {

    /**
	* dimensions				Array representing each dimension size
	*/
    constructor(private dimensions: number[]) {

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
    public getSize(): number {

        var size = this.dimensions[0];

        for (var i = 1; i < this.dimensions.length; i++) {
            size *= this.dimensions[i];
        }

        return size;
    }


    /** Get coordinates from data index */
    public getCoordinates(index: number): number[] {

        // Verify index
        if (index >= this.getSize() || index < 0) {
            throw new RangeError('SparseMatrix: ' + 'Index is out of range');
        }

        var vector: number[] = [];

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
    }


    /** Get data index from coordinates */
    public getIndex(vector: number[]): number {

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
    }


    /** Merge matrix into this matrix */
    public mergeFrom(matrix: SparseMatrixBase, overwrite: boolean = false): any {

        if (this.getSign() !== matrix.getSign()) {
            throw new Error('SparseMatrix: ' + 'Can\'t merge matrices with different signatures');
        }

        var thisSize = this.getSize();
        var mergingSize = matrix.getSize();

        for (var i = 0; i < mergingSize; i++) {

            var thisVal = this.get(i);
            if (!overwrite && thisVal !== undefined && thisVal !== null) continue;

            var mergeVal = matrix.get(i);
            if (mergeVal === undefined || mergeVal === null) continue;

            // Set value
            this.set(i, matrix.get(i));
        }
    }


    /** Get matrix signature */
    public getSign(): string {

        var sign: string = '';

        sign += this.dimensions.length;

        sign += '#';

        for (var i = 0; i < this.dimensions.length; i++) {
            sign += this.dimensions[i];
        }

        sign += '#';

        sign += this.getSize();

        return sign;
    }


    /** Get value */
    public abstract get(vector: number[] | number): any;

    /** Set value */
    public abstract set(vector: number[] | number, value: any): any;

    /** Clear all values */
    public abstract clear(): any;
}
