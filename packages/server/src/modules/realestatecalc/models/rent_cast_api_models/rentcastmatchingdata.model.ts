import { RentCastApiResponse } from "../../api/rent.cast.api.client";

type RentCastApiResponseWithId = {
    rentCastResponseId: number;
    rentCastData: RentCastApiResponse;
};

export class RentCastMatchingData {

    private _addressId: string;
    private _saleRentCastData: RentCastApiResponseWithId;
    private _propertyRentCastData: RentCastApiResponseWithId;

    constructor(
        addressId: string,
        saleRentCastData: RentCastApiResponseWithId,
        propertyRentCastData: RentCastApiResponseWithId,
    ) {
        this._addressId = addressId;
        this._saleRentCastData = saleRentCastData;
        this._propertyRentCastData = propertyRentCastData;
    }

    get addressId(): string {
        return this._addressId
    }

    get rentCastApiSaleJsonData(): any {
        return this._saleRentCastData.rentCastData.jsonData;
    }

    get rentCastApiPropertyJsonData(): any {
        return this._propertyRentCastData.rentCastData.jsonData;
    }

    get rentCastSaleResponseId(): number {
        return this._saleRentCastData.rentCastResponseId;
    }

    get rentCastPropertyResponseId(): number {
        return this._propertyRentCastData.rentCastResponseId;
    }


}