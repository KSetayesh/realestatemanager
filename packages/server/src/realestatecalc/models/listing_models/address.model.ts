import { AddressDTO, Country, State } from "@realestatemanager/shared";
import { IDTOConvertible } from "../idtoconvertible.model";

export class Address implements IDTOConvertible<AddressDTO> {
    private fullAddress: string;
    private state?: State; // Assuming State is a type or enum you've defined
    private zipcode?: string;
    private city?: string;
    private county?: string;
    private country?: Country; // Assuming Country is a type or enum you've defined
    private streetAddress?: string;
    private apartmentNumber?: string;
    private longitude?: number;
    private latitude?: number;

    constructor(
        fullAddress: string,
        state?: State,
        zipCode?: string,
        city?: string,
        county?: string,
        country?: Country,
        streetAddress?: string,
        apartmentNumber?: string,
        longitude?: number,
        latitude?: number
    ) {

        this.fullAddress = fullAddress;
        this.state = state;
        this.zipcode = zipCode;
        this.city = city;
        this.county = county;
        this.country = country;
        this.streetAddress = streetAddress;
        this.apartmentNumber = apartmentNumber;
        this.longitude = longitude;
        this.latitude = latitude;
    }

    toDTO(): AddressDTO {
        return {
            fullAddress: this.fullAddress,
            state: this.state,
            zipcode: this.zipcode,
            city: this.city,
            county: this.county,
            country: this.country,
            streetAddress: this.streetAddress,
            apartmentNumber: this.apartmentNumber,
            longitude: this.longitude,
            latitude: this.latitude,
        };
    }

}