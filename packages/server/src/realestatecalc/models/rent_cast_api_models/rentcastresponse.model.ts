export class RentCastResponse {

    private _id: string;
    private _apiResponseData: any;

    constructor(id: string, apiResponseData: any) {
        this._id = id;
        this._apiResponseData = apiResponseData;
    }

    get id(): string {
        return this._id;
    }

    get apiResponseData(): any {
        return this._apiResponseData;
    }

}