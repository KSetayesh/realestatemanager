import { RentCastApiResponse } from "src/realestatecalc/api/rent.cast.api";

export class RentCastMatchingData {

    private _addressId: string;
    private _saleRentCastData: RentCastApiResponse;
    private _propertyRentCastData: RentCastApiResponse;

    constructor(
        addressId: string,
        saleRentCastData: RentCastApiResponse,
        propertyRentCastData: RentCastApiResponse,
    ) {
        this._addressId = addressId;
        this._saleRentCastData = saleRentCastData;
        this._propertyRentCastData = propertyRentCastData;
    }

    get addressId(): string {
        return this._addressId
    }

    get rentCastApiSaleCallId(): number {
        return this._saleRentCastData.rentCastApiCallId;
    }

    get rentCastApiPropertyCallId(): number {
        return this._propertyRentCastData.rentCastApiCallId;
    }


}