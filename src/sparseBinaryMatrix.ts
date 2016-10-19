import { SparseMatrixBase } from './sparseMatrixBase';

/** SparseBinaryMatrix */
export class SparseBinaryMatrix extends SparseMatrixBase {

    // Store indices of 'on' fields in this array
    private _data: number[] = [];

    constructor(dimensions: number[]) {
        super(dimensions);
    }



    public get(vector: number[] | number): boolean {

        var index: number;

        // Check if vector array
        if (Array.isArray(vector)) {
            index = this.getIndex(vector);
        }
        else {

            index = vector;

            // Verify index
            if (index >= this.getSize() || index < 0) {
                throw new RangeError('SparseMatrix: ' + 'Index is out of range');
            }
        }

        var dataArrayIndex = this._data.indexOf(index);

        if (dataArrayIndex > -1) {
            return true;
        }
        else {
            return false;
        }
    }



    // Set value
    public set(vector: number[] | number, value: boolean | number) {

        var index: number;

        // Check if vector array
        if (Array.isArray(vector)) {
            index = this.getIndex(vector);
        }
        else {

            index = vector;

            // Verify index
            if (index >= this.getSize() || index < 0) {
                throw new RangeError('SparseMatrix: ' + 'Index is out of range');
            }
        }

        var dataArrayIndex = this._data.indexOf(index);

        if (dataArrayIndex > -1) {
            if (value === false || value === 0) {
                this._data.splice(dataArrayIndex, 1);
            }
        }
        else {
            if (value === true || value === 1) {
                this._data.push(index);
            }
        }
    }



    // Merge array into this array
    public mergeFrom(matrix: SparseBinaryMatrix): any {

        var thisIndices = this.getIndices();
        var mergingIndices = matrix.getIndices();

        for (var i = 0; i < mergingIndices.length; i++) {

            this.set(mergingIndices[i], true);
        }
    }



    public getIndices(): number[] {
        return this._data;
    }



    // Clear matrix
    public clear(): any {

        this._data = [];
    };
}
