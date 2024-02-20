import { AddressDTO, Country, State } from "@realestatemanager/shared";
import { IDTOConvertible } from "./idtoconvertible.model";

export class Address implements IDTOConvertible<AddressDTO> {
    private fullAddress: string;
    private state?: State; // Assuming State is a type or enum you've defined
    private zipcode?: string;
    private town?: string;
    private county?: string;
    private country?: Country; // Assuming Country is a type or enum you've defined
    private streetAddress?: string;
    private apartmentNumber?: string;

    constructor(
        fullAddress: string,
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