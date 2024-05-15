export abstract class Entity {
    private _id: number;
    private _dateCreated?: Date;
    private _dateUpdated?: Date;

    constructor(id: number, dateCreated?: Date, dateUpdated?: Date) {
        this._id = id;
        this._dateCreated = dateCreated;
        this._dateUpdated = dateUpdated;
    }

    get id(): number {
        return this._id;
    }

    get dateCreated(): Date {
        return this._dateCreated;
    }

    get dateUpdated(): Date {
        return this._dateUpdated;
    }

}