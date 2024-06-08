import { AddressResponseDTO, Country, State } from "@realestatemanager/shared";
import { Entity } from "src/shared/entity";
import { IDTOConvertible } from "src/shared/idtoconvertible.model";

export class Address extends Entity implements IDTOConvertible<AddressResponseDTO> {
    private _fullAddress: string;
    private _state?: State; // Assuming State is a type or enum you've defined
    private _zipcode?: string;
    private _city?: string;
    private _county?: string;
    private _country?: Country; // Assuming Country is a type or enum you've defined
    private _streetAddress?: string;
    private _apartmentNumber?: string;
    private _longitude?: number;
    private _latitude?: number;

    constructor(
        id: number,
        fullAddress: string,
        state?: State,
        zipCode?: string,
        city?: string,
        county?: string,
        country?: Country,
        streetAddress?: string,
        apartmentNumber?: string,
        longitude?: number,
        latitude?: number,
    ) {
        super(id);
        this._fullAddress = fullAddress;
        this._state = state;
        this._zipcode = zipCode;
        this._city = city;
        this._county = county;
        this._country = country;
        this._streetAddress = streetAddress;
        this._apartmentNumber = apartmentNumber;
        this._longitude = longitude;
        this._latitude = latitude;
    }

    get fullAddress(): string {
        return this._fullAddress;
    }

    get state(): State {
        return this._state;
    }

    get zipcode(): string {
        return this._zipcode;
    }

    get city(): string {
        return this._city;
    }

    get county(): string {
        return this._county;
    }

    get country(): Country {
        return this._country;
    }

    get streetAddress(): string {
        return this._streetAddress;
    }

    get apartmentNumber(): string {
        return this._apartmentNumber;
    }

    get longitude(): number {
        return this._longitude;
    }

    get latitude(): number {
        return this._latitude;
    }

    toDTO(): AddressResponseDTO {
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