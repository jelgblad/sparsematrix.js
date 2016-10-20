import { SparseMatrixBase } from './sparseMatrixBase';

/** SparseMathMatrix */
export class SparseMathMatrix extends SparseMatrixBase {

    // Store data on this object
    private _data: any = {};

    constructor(dimensions: number[]) {
        super(dimensions);
    }


    /** Get value */
    public get(vector: number[] | number): any {

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

        var data = this._data[index.toString()];

        if (data === undefined) {
            data = 0;
        }

        return data;
    }


    /** Set value */
    public set(vector: number[] | number, value: number) {

        function isNumeric(n: any) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        }

        if(!isNumeric(value)){
            throw new RangeError('SparseMatrix: ' + 'Value is not a number');
        }

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

        // Removes data on index if value is 0, null or undefined
        if (value === 0 || value === null || undefined) {
            delete this._data[index.toString()];
        }
        else {
            this._data[index.toString()] = value;
        }
    }



    /** Clear all values */
    public clear(): any {

        this._data = {};
    };
}
