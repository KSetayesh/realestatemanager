import { RentCastApiResponse } from "src/realestatecalc/api/rent.cast.api";

export class RentCastMatchingData {

    private addressId: string;
    private saleRentCastData: RentCastApiResponse;
    private propertyRentCastData: RentCastApiResponse;

    constructor(
        addressId: string,
        saleRentCastData: RentCastApiResponse,
        propertyRentCastData: RentCastApiResponse,
    ) {
        this.addressId = addressId;
        this.saleRentCastData = saleRentCastData;
        this.propertyRentCastData = propertyRentCastData;
    }
}