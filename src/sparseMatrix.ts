import { SparseMatrixBase } from './sparseMatrixBase';

/** SparseMatrix */
export class SparseMatrix extends SparseMatrixBase {

    // Store data on this object
    private _data: any = {};

    constructor(dimensions: number[]) {
        super(dimensions);
    }


    protected _get(vector: number[] | number, copyObject: boolean = false): any {

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

        // Copy if object
        if (typeof data === 'object' && copyObject) {
            data = JSON.parse(JSON.stringify(data));
        }

        return data;
    }


    /** Get value */
    public get(vector: number[] | number, copyObject: boolean = false): any {
        return this._get(vector, copyObject);
    }



    /**
    * Get value as number
    * undefined is returned as 0 
    */
    public getAsNumber(vector: number[] | number): any {

        var data = this._get(vector);

        if (data === undefined) {
            data = 0;
        }

        return data;
    };



    /** Set value */
    public set(vector: number[] | number, value: any) {

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

        // Removes data on index if value is false, 0, null or undefined
        if (value === false || value === 0 || value === null || undefined) {
            // _data.splice(index, 1);
            delete this._data[index.toString()];
        }
        else {
            this._data[index.toString()] = value;
        }
    }


    /** Get indices of all values */
    public getIndices(): number[] {
        return Object.keys(this._data).map(x => { return parseInt(x);});
    }


    /** Clear all values */
    public clear(): any {

        this._data = {};
    };
}
