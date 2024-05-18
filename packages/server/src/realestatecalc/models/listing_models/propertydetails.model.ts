import {
    PropertyType,
    State,
    Country,
    PropertyDetailsResponseDTO
} from "@realestatemanager/shared";
import { Address } from "./address.model";
import { IDTOConvertible } from "../idtoconvertible.model";
import { SchoolRating } from "./schoolrating.model";
import { Entity } from "src/shared/entity";

export class PropertyDetails extends Entity implements IDTOConvertible<PropertyDetailsResponseDTO>{
    private _address?: Address;
    private _schoolRating?: SchoolRating;
    private _numberOfBedrooms?: number;
    private _numberOfFullBathrooms?: number;
    private _numberOfHalfBathrooms?: number;
    private _squareFeet?: number;
    private _acres?: number;
    private _yearBuilt?: number;
    private _hasGarage?: boolean;
    private _hasPool?: boolean;
    private _hasBasement?: boolean;
    private _propertyType?: PropertyType;
    private _description?: string;

    constructor(
        id: number,
        address?: Address,
        schoolRating?: SchoolRating,
        numberOfBedrooms?: number,
        numberOfFullBathrooms?: number,
        numberOfHalfBathrooms?: number,
        squareFeet?: number,
        acres?: number,
        yearBuilt?: number,
        hasGarage?: boolean,
        hasPool?: boolean,
        hasBasement?: boolean,
        propertyType?: PropertyType,
        description?: string,
    ) {
        super(id);
        this._address = address;
        this._schoolRating = schoolRating;
        this._numberOfBedrooms = numberOfBedrooms;
        this._numberOfFullBathrooms = numberOfFullBathrooms;
        this._numberOfHalfBathrooms = numberOfHalfBathrooms;
        this._squareFeet = squareFeet;
        this._acres = acres;
        this._yearBuilt = yearBuilt;
        this._hasGarage = hasGarage;
        this._hasPool = hasPool;
        this._hasBasement = hasBasement;
        this._propertyType = propertyType;
        this._description = description;
    }

    get fullAddress(): string {
        return this._address.fullAddress;
    }

    get state(): State {
        return this._address.state;
    }

    get zipcode(): string {
        return this._address.zipcode;
    }

    get city(): string {
        return this._address.city;
    }

    get county(): string {
        return this._address.county;
    }

    get country(): Country {
        return this._address.country;
    }

    get streetAddress(): string {
        return this._address.streetAddress;
    }

    get apartmentNumber(): string {
        return this._address.apartmentNumber;
    }

    get longitude(): number {
        return this._address.longitude;
    }

    get latitude(): number {
        return this._address.latitude;
    }

    get elementarySchoolRating(): number {
        return this._schoolRating.elementarySchoolRating;
    }

    get middleSchoolRating(): number {
        return this._schoolRating.middleSchoolRating;
    }

    get highSchoolRating(): number {
        return this._schoolRating.highSchoolRating;
    }

    get numberOfBedrooms(): number {
        return this._numberOfBedrooms;
    }

    get numberOfFullBathrooms(): number {
        return this._numberOfFullBathrooms;
    }

    get numberOfHalfBathrooms(): number {
        return this._numberOfHalfBathrooms;
    }

    get squareFeet(): number {
        return this._squareFeet;
    }

    get acres(): number {
        return this._acres;
    }

    get yearBuilt(): number {
        return this._yearBuilt;
    }

    get hasGarage(): boolean {
        return this._hasGarage;
    }

    get hasPool(): boolean {
        return this._hasPool;
    }

    get hasBasement(): boolean {
        return this._hasBasement;
    }

    get propertyType(): PropertyType {
        return this._propertyType;
    }

    get description(): string {
        return this._description;
    }

    toDTO(): PropertyDetailsResponseDTO {
        return {
            address: this._address.toDTO(),
            schoolRating: this._schoolRating.toDTO(),
            numberOfBedrooms: this.numberOfBedrooms,
            numberOfFullBathrooms: this.numberOfFullBathrooms,
            numberOfHalfBathrooms: this.numberOfHalfBathrooms,
            squareFeet: this.squareFeet,
            acres: this.acres,
            yearBuilt: this.yearBuilt,
            propertyType: this.propertyType,
            hasGarage: this.hasGarage,
            hasPool: this.hasPool,
            hasBasement: this.hasBasement,
            description: this.description,
        }
    }
};