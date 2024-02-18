import { HomeType, PropertyDetailsDTO } from "@realestatemanager/shared";
import { Address } from "./address.model";
import { IDTOConvertible } from "./idtoconvertible.model";

export class PropertyDetails implements IDTOConvertible<PropertyDetailsDTO>{
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

    constructor(
        address?: Address,
        numberOfDaysOnMarket?: number,
        elementarySchoolRating?: number,
        middleSchoolRating?: number,
        highSchoolRating?: number,
        numberOfBedrooms?: number,
        numberOfFullBathrooms?: number,
        numberOfHalfBathrooms?: number,
        squareFeet?: number,
        acres?: number,
        yearBuilt?: number,
        homeType?: HomeType
    ) {
        this.address = address;
        this.numberOfDaysOnMarket = numberOfDaysOnMarket;
        this.elementarySchoolRating = elementarySchoolRating;
        this.middleSchoolRating = middleSchoolRating;
        this.highSchoolRating = highSchoolRating;
        this.numberOfBedrooms = numberOfBedrooms;
        this.numberOfFullBathrooms = numberOfFullBathrooms;
        this.numberOfHalfBathrooms = numberOfHalfBathrooms;
        this.squareFeet = squareFeet;
        this.acres = acres;
        this.yearBuilt = yearBuilt;
        this.homeType = homeType;
    }

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