import { AddressDTO, Country, State } from "@realestatemanager/shared";
import { IDTOConvertible } from "./idtoconvertible.model";

export class Address implements IDTOConvertible<AddressDTO> {
    fullAddress: string;
    state?: State; // Assuming State is a type or enum you've defined
    zipcode?: string;
    town?: string;
    county?: string;
    country?: Country; // Assuming Country is a type or enum you've defined
    streetAddress?: string;
    apartmentNumber?: string;

    constructor(fullAddress: string,
        state?: State,
        zipCode?: string,
        town?: string,
        county?: string,
        country?: Country,
        streetAddress?: string,
        apartmentNumber?: string) {

        this.fullAddress = fullAddress;
        this.state = state;
        this.zipcode = zipCode;
        this.town = town;
        this.county = county;
        this.country = country;
        this.streetAddress = streetAddress;
        this.apartmentNumber = apartmentNumber;
    }

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