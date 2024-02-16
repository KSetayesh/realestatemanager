import { AddressDTO, Country, State } from "@realestatemanager/shared";

export class Address {
    fullAddress: string;
    state?: State; // Assuming State is a type or enum you've defined
    zipcode?: string;
    town?: string;
    county?: string;
    country?: Country; // Assuming Country is a type or enum you've defined
    streetAddress?: string;
    apartmentNumber?: string;

    constructor() { }

    toDTO(): AddressDTO {
        return {
            fullAddress: this.fullAddress,
            state: this.state,
            zipcode: this.zipcode,
            town: this.town,
            county: this.county,
            country: this.country,
            streetAddress: this.streetAddress,
            apartmentNumber: this.apartmentNumber,
        };
    }

}