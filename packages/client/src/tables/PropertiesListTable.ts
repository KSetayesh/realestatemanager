import { CreateUpdatePropertyRequest, ListingWithScenariosResponseDTO } from "@realestatemanager/shared";
import { TablesConfig } from "../pages/InvestmentBreakdown";
import { PropertiesListTableType } from "../pages/PropertiesList";
import { TableColumn, TableDataItem, TableRow } from "../components/ReusableTable";
import { AbstractTable } from "./AbstractTable";
import { propertiesListColumns } from "./columns/PropertiesListColumns";
import {
    getAcres,
    getAnnualInterestRate,
    getApartmentNumber,
    getCapRate,
    getCity,
    getCountry,
    getCounty,
    getCreationType,
    getDateCreated,
    getDateListed,
    getDescription,
    getDownPaymentAmount,
    getElementarySchoolRating,
    getFullAddress,
    getHighSchoolRating,
    getInitialCosts,
    getInitialMonthlyAmount,
    getLatitude,
    getListingPrice,
    getLoanAmount,
    getLongitude,
    getMiddleSchoolRating,
    getMonthlyCashFlow,
    getMortgage,
    getNumberOfBedrooms,
    getNumberOfDaysOnMarket,
    getNumberOfFullBathrooms,
    getNumberOfHalfBathrooms,
    getPrice,
    getPropertyType,
    getROI,
    getRecurringCosts,
    getRentEstimate,
    getSquareFeet,
    getState,
    getStreetAddress,
    getYearBuilt,
    getYearlyCashFlow,
    getZestimate,
    getZestimateRangeHigh,
    getZestimateRangeLow,
    getZillowMonthlyHOAFeesAmount,
    getZillowMonthlyHomeInsuranceAmount,
    getZillowMonthlyPropertyTaxAmount,
    getZillowRentEstimate,
    getZillowURL,
    getZipCode,
    hasBasement,
    hasGarage,
    hasPool
} from "../utilities/PropertyResponseHelper";

export class PropertiesListTable implements AbstractTable<ListingWithScenariosResponseDTO, PropertiesListTableType, ListingWithScenariosResponseDTO> {

    getRowData(
        property: ListingWithScenariosResponseDTO,
        tableType: PropertiesListTableType,
    ): TableDataItem<ListingWithScenariosResponseDTO> {
        const tablesConfig = this.getTablesConfig();
        return {
            objectData: {
                key: property,
            },
            rowData: tablesConfig[tableType].data(property),
        };
    }

    getTableData(
        properties: ListingWithScenariosResponseDTO[],
        tableType: PropertiesListTableType
    ): TableDataItem<ListingWithScenariosResponseDTO>[] {
        const tablesConfig = this.getTablesConfig();
        return properties.map(property => ({
            objectData: {
                key: property,
            },
            rowData: tablesConfig[tableType].data(property),
        }));
    }

    getTablesConfig(additionalTableColumns: TableColumn[] = []): TablesConfig<ListingWithScenariosResponseDTO> {
        const getAllColumns = (): TableColumn[] => {
            return this.getDefaultColumns(additionalTableColumns).map(column => ({
                ...column,
                showColumn: true  // Set showColumn to true for each object
            }));
        };

        return {
            [PropertiesListTableType.STANDARD_BREAKDOWN]: {
                columns: this.getDefaultColumns(additionalTableColumns),
                data: (listingDetail: ListingWithScenariosResponseDTO) => this.getDefaultRowData(listingDetail),
            },
            [PropertiesListTableType.ALL]: {
                columns: getAllColumns(),
                data: (listingDetail: ListingWithScenariosResponseDTO) => this.getDefaultRowData(listingDetail),
            },
        };
    }

    getDefaultColumns(additionalTableColumns: TableColumn[] = []): TableColumn[] {
        const columns: TableColumn[] = [];
        columns.push(...propertiesListColumns);
        columns.push(...additionalTableColumns);
        // console.log("columns:", columns);
        return columns;
    }

    getDefaultRowData(property: ListingWithScenariosResponseDTO): TableRow {
        return {
            propertyType: getPropertyType(property),
            fullAddress: getFullAddress(property),
            state: getState(property),
            zipcode: getZipCode(property),
            zillowURL: getZillowURL(property),
            price: getPrice(property),
            rentEstimate: getRentEstimate(property),
            initialCosts: getInitialCosts(property),
            loanAmount: getLoanAmount(property),
            downPaymentAmount: getDownPaymentAmount(property),
            annualInterestRate: getAnnualInterestRate(property),
            ROI: getROI(property),
            capRate: getCapRate(property),
            recurringCosts: getRecurringCosts(property),
            initialMonthlyAmount: getInitialMonthlyAmount(property),
            mortgage: getMortgage(property),
            monthlyCashFlow: getMonthlyCashFlow(property),
            yearlyCashFlow: getYearlyCashFlow(property),
            city: getCity(property),
            county: getCounty(property),
            country: getCountry(property),
            streetAddress: getStreetAddress(property),
            apartmentNumber: getApartmentNumber(property),
            longitude: getLongitude(property),
            latitude: getLatitude(property),
            numberOfDaysOnMarket: getNumberOfDaysOnMarket(property),
            dateListed: getDateListed(property),
            dateCreated: getDateCreated(property),
            elementarySchoolRating: getElementarySchoolRating(property),
            middleSchoolRating: getMiddleSchoolRating(property),
            highSchoolRating: getHighSchoolRating(property),
            numberOfBedrooms: getNumberOfBedrooms(property),
            numberOfFullBathrooms: getNumberOfFullBathrooms(property),
            numberOfHalfBathrooms: getNumberOfHalfBathrooms(property),
            squareFeet: getSquareFeet(property),
            acres: getAcres(property),
            yearBuilt: getYearBuilt(property),
            hasGarage: hasGarage(property),
            hasPool: hasPool(property),
            hasBasement: hasBasement(property),
            listingPrice: getListingPrice(property),
            zestimate: getZestimate(property),
            zillowRentEstimate: getZillowRentEstimate(property),
            zestimateRangeLow: getZestimateRangeLow(property),
            zestimateRangeHigh: getZestimateRangeHigh(property),
            zillowMonthlyPropertyTaxAmount: getZillowMonthlyPropertyTaxAmount(property),
            zillowMonthlyHomeInsuranceAmount: getZillowMonthlyHomeInsuranceAmount(property),
            zillowMonthlyHOAFeesAmount: getZillowMonthlyHOAFeesAmount(property),
            description: getDescription(property),
            creationType: getCreationType(property),
            investmentBreakdown: 'View',
        };
    }

    createUpdatePropertyRequest(tableDataItem: TableDataItem<ListingWithScenariosResponseDTO>): CreateUpdatePropertyRequest {
        const property: ListingWithScenariosResponseDTO = tableDataItem.objectData.key;
        console.log('tableDataItem:', tableDataItem);
        console.log('type of price:', (typeof tableDataItem.rowData.price));
        console.log('price:', (tableDataItem.rowData.price));
        return {
            propertyIdentifier: {
                fullAddress: getFullAddress(property),
                zillowURL: getZillowURL(property),
            },
            price: tableDataItem.rowData.price,
            rentEstimate: tableDataItem.rowData.rentEstimate,
            elementarySchoolRating: tableDataItem.rowData.elementarySchoolRating,
            middleSchoolRating: tableDataItem.rowData.middleSchoolRating,
            highSchoolRating: tableDataItem.rowData.highSchoolRating,
            numberOfBedrooms: tableDataItem.rowData.numberOfBedrooms,
            numberOfFullBathrooms: tableDataItem.rowData.numberOfFullBathrooms,
            numberOfHalfBathrooms: tableDataItem.rowData.numberOfHalfBathrooms,
            squareFeet: tableDataItem.rowData.squareFeet,
            acres: tableDataItem.rowData.acres,
            yearBuilt: tableDataItem.rowData.yearBuilt,
            hasGarage: tableDataItem.rowData.hasGarage,
            hasPool: tableDataItem.rowData.hasPool,
            hasBasement: tableDataItem.rowData.hasBasement,
            listingPrice: tableDataItem.rowData.listingPrice,
            zestimate: tableDataItem.rowData.zestimate,
            zillowRentEstimate: tableDataItem.rowData.zillowRentEstimate,
            zestimateRangeLow: tableDataItem.rowData.zestimateLow,
            zestimateRangeHigh: tableDataItem.rowData.zestimateHigh,
            zillowMonthlyPropertyTaxAmount: tableDataItem.rowData.zillowMonthlyPropertyTaxAmount,
            zillowMonthlyHomeInsuranceAmount: tableDataItem.rowData.zillowMonthlyHomeInsuranceAmount,
            zillowMonthlyHOAFeesAmount: tableDataItem.rowData.zillowMonthlyHOAFeesAmount,
            description: tableDataItem.rowData.description,
        };
    }

}