import { PropertyType, PropertyDetailsDTO } from "@realestatemanager/shared";
import { Address } from "./address.model";
import { IDTOConvertible } from "../idtoconvertible.model";
import { SchoolRating } from "./schoolrating.model";

export class PropertyDetails implements IDTOConvertible<PropertyDetailsDTO>{
    private address?: Address;
    private schoolRating?: SchoolRating;
    private numberOfBedrooms?: number;
    private numberOfFullBathrooms?: number;
    private numberOfHalfBathrooms?: number;
    private squareFeet?: number;
    private acres?: number;
    private yearBuilt?: number;
    private hasGarage?: boolean;
    private hasPool?: boolean;
    private hasBasement?: boolean;
    private propertyType?: PropertyType;
    private description?: string;

    constructor(
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
        this.address = address;
        this.schoolRating = schoolRating;
        this.numberOfBedrooms = numberOfBedrooms;
        this.numberOfFullBathrooms = numberOfFullBathrooms;
        this.numberOfHalfBathrooms = numberOfHalfBathrooms;
        this.squareFeet = squareFeet;
        this.acres = acres;
        this.yearBuilt = yearBuilt;
        this.hasGarage = hasGarage;
        this.hasPool = hasPool;
        this.hasBasement = hasBasement;
        this.propertyType = propertyType;
        this.description = description;
    }

    toDTO(): PropertyDetailsDTO {
        return {
            address: this.address.toDTO(),
            schoolRating: this.schoolRating.toDTO(),
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