import {
    CreateGetAllPropertiesRequest,
    CreateInvestmentScenarioRequest,
    CreateListingDetailsRequest,
    CreatePropertiesInBulkRequest,
    CreateUpdatePropertyRequest
} from "@realestatemanager/types";

export interface RealEstateCalcApiInterface<T> {
    getAllProperties(getAllPropertiesRequest?: CreateGetAllPropertiesRequest): Promise<T[]>;
    updateProperty(createUpdatePropertyRequest: CreateUpdatePropertyRequest): Promise<T>;
    deleteListingDetails(zillowURL: string): Promise<boolean>;
    realEstateCalculator(dataToSubmit: CreateInvestmentScenarioRequest): Promise<T>;
    addPropertiesInBulk(dataToSubmit: CreatePropertiesInBulkRequest): Promise<number>;
    addNewProperty(dataToSubmit: CreateListingDetailsRequest): Promise<boolean>;
}