import { Country, HomeType, State } from "@realestatemanager/shared";

export class RentCastResponse {

    private _id: string;
    private _formattedAddress: string;
    private _addressLine1: string;
    private _addressLine2: string;
    private _city: string;
    private _state: State;
    private _zipCode: string;
    private _county: Country;
    private _bedrooms: number;
    private _bathrooms: number;
    private _latitude: number;
    private _longitude: number;
    private _squareFootage: number;
    private _propertyType: HomeType;
    private _lotSize: number;
    private _status: string;
    private _yearBuilt: number;
    private _price: number;
    private _listedDate: string;
    private _removedDate: string;
    private _createdDate: string;
    private _lastSeenDate: string;
    private _daysOnMarket: number;

    constructor(
        id: string,
        formattedAddress: string,
        addressLine1: string,
        addressLine2: string,
        city: string,
        state: State,
        zipCode: string,
        county: Country,
        bedrooms: number,
        bathrooms: number,
        latitude: number,
        longitude: number,
        squareFootage: number,
        propertyType: HomeType,
        lotSize: number,
        status: string,
        yearBuilt: number,
        price: number,
        listedDate: string,
        removedDate: string,
        createdDate: string,
        lastSeenDate: string,
        daysOnMarket: number,
    ) {
        this._id = id;
        this._formattedAddress = formattedAddress;
        this._addressLine1 = addressLine1;
        this._addressLine2 = addressLine2;
        this._city = city;
        this._state = state;
        this._zipCode = zipCode;
        this._county = county;
        this._bedrooms = bedrooms;
        this._bathrooms = bathrooms;
        this._latitude = latitude;
        this._longitude = longitude;
        this._squareFootage = squareFootage;
        this._propertyType = propertyType;
        this._lotSize = lotSize;
        this._status = status;
        this._yearBuilt = yearBuilt;
        this._price = price;
        this._listedDate = listedDate;
        this._removedDate = removedDate;
        this._createdDate = createdDate;
        this._lastSeenDate = lastSeenDate;
        this._daysOnMarket = daysOnMarket;
    }

    get id(): string {
        return this._id;
    }

    get formattedAddress(): string {
        return this._formattedAddress;
    }

    get addressLine1(): string {
        return this._addressLine1;
    }

    get addressLine2(): string {
        return this._addressLine2;
    }

    get city(): string {
        return this._city;
    }

    get state(): State {
        return this._state;
    }

    get zipCode(): string {
        return this._zipCode;
    }

    get county(): Country {
        return this._county;
    }

    get bedrooms(): number {
        return this._bedrooms;
    }

    get bathrooms(): number {
        return this._bathrooms;
    }

    get latitude(): number {
        return this._latitude;
    }

    get longitude(): number {
        return this._longitude;
    }

    get squareFootage(): number {
        return this._squareFootage;
    }

    get propertyType(): HomeType {
        return this._propertyType;
    }

    get lotSize(): number {
        return this._lotSize;
    }

    get status(): string {
        return this._status;
    }

    get yearBuilt(): number {
        return this._yearBuilt;
    }

    get price(): number {
        return this._price;
    }

    get listedDate(): string {
        return this._listedDate;
    }

    get removedDate(): string {
        return this._removedDate;
    }

    get createdDate(): string {
        return this._createdDate;
    }

    get lastSeenDate(): string {
        return this._lastSeenDate;
    }

    get daysOnMarket(): number {
        return this._daysOnMarket;
    }

}