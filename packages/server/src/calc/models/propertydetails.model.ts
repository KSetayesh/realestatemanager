import { HomeType, PropertyDetailsDTO } from "@realestatemanager/shared";
import { Address } from "./address.model";

export class PropertyDetails {
    address?: Address;
    numberOfDaysOnMarket?: number;
    elementarySchoolRating?: number;
    middleSchoolRating?: number;
    highSchoolRating?: number;
    numberOfBedrooms?: number;
    numberOfFullBathrooms?: number;
    numberOfHalfBathrooms?: number;
    squareFeet?: number;
    acres?: number;
    yearBuilt?: number;
    homeType?: HomeType;

    constructor() { }

    toDTO(): PropertyDetailsDTO {
        return {
            address: this.address,
            numberOfDaysOnMarket: this.numberOfDaysOnMarket,
            elementarySchoolRating: this.elementarySchoolRating,
            middleSchoolRating: this.middleSchoolRating,
            highSchoolRating: this.highSchoolRating,
            numberOfBedrooms: this.numberOfBedrooms,
            numberOfFullBathrooms: this.numberOfFullBathrooms,
            numberOfHalfBathrooms: this.numberOfHalfBathrooms,
            squareFeet: this.squareFeet,
            acres: this.acres,
            yearBuilt: this.yearBuilt,
            homeType: this.homeType,
        }
    }
};