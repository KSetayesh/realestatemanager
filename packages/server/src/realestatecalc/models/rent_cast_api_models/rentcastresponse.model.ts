export class RentCastResponse {

    private _addressId: string;
    private _apiResponseData: any;

    constructor(addressId: string, apiResponseData: any) {
        this._addressId = addressId;
        this._apiResponseData = apiResponseData;
    }

    get addressId(): string {
        return this._addressId;
    }

    get apiResponseData(): any {
        return this._apiResponseData;
    }

}