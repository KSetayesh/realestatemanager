import { HomeType, PropertyDetailsDTO } from "@realestatemanager/shared";
import { Address } from "./address.model";
import { IDTOConvertible } from "../idtoconvertible.model";
import { SchoolRating } from "./schoolrating.model";

export class PropertyDetails implements IDTOConvertible<PropertyDetailsDTO>{
    private address?: Address;
    private schoolRating?: SchoolRating;
    private numberOfDaysOnMarket?: number;
    private numberOfBedrooms?: number;
    private numberOfFullBathrooms?: number;
    private numberOfHalfBathrooms?: number;
    private squareFeet?: number;
    private acres?: number;
    private yearBuilt?: number;
    private hasGarage?: boolean;
    private hasPool?: boolean;
    private hasBasement?: boolean;
    private homeType?: HomeType;
    private description?: string;

    constructor(
        address?: Address,
        schoolRating?: SchoolRating,
        numberOfDaysOnMarket?: number,
        numberOfBedrooms?: number,
        numberOfFullBathrooms?: number,
        numberOfHalfBathrooms?: number,
        squareFeet?: number,
        acres?: number,
        yearBuilt?: number,
        hasGarage?: boolean,
        hasPool?: boolean,
        hasBasement?: boolean,
        homeType?: HomeType,
        description?: string,
    ) {
        this.address = address;
        this.schoolRating = schoolRating
        this.numberOfDaysOnMarket = numberOfDaysOnMarket;
        this.numberOfBedrooms = numberOfBedrooms;
        this.numberOfFullBathrooms = numberOfFullBathrooms;
        this.numberOfHalfBathrooms = numberOfHalfBathrooms;
        this.squareFeet = squareFeet;
        this.acres = acres;
        this.yearBuilt = yearBuilt;
        this.hasGarage = hasGarage;
        this.hasPool = hasPool;
        this.hasBasement = hasBasement;
        this.homeType = homeType;
        this.description = description;
    }

    toDTO(): PropertyDetailsDTO {
        return {
            address: this.address.toDTO(),
            schoolRating: this.schoolRating.toDTO(),
            numberOfDaysOnMarket: this.numberOfDaysOnMarket,
            numberOfBedrooms: this.numberOfBedrooms,
            numberOfFullBathrooms: this.numberOfFullBathrooms,
            numberOfHalfBathrooms: this.numberOfHalfBathrooms,
            squareFeet: this.squareFeet,
            acres: this.acres,
            yearBuilt: this.yearBuilt,
            homeType: this.homeType,
            hasGarage: this.hasGarage,
            hasPool: this.hasPool,
            hasBasement: this.hasBasement,
            description: this.description,
        }
    }
};