import { ListingWithScenariosResponseDTO } from "@realestatemanager/shared";
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
} from "../components/TableColumn";

export class PropertiesListTable implements AbstractTable<ListingWithScenariosResponseDTO, PropertiesListTableType, ListingWithScenariosResponseDTO> {

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

    getTablesConfig(): TablesConfig<ListingWithScenariosResponseDTO> {
        const getAllColumns = (): TableColumn[] => {
            return this.getDefaultColumns().map(column => ({
                ...column,
                showColumn: true  // Set showColumn to true for each object
            }));
        };

        return {
            [PropertiesListTableType.STANDARD_BREAKDOWN]: {
                columns: this.getDefaultColumns(),
                data: (ammortizationDetail: ListingWithScenariosResponseDTO) => this.getDefaultRowData(ammortizationDetail),
            },
            [PropertiesListTableType.ALL]: {
                columns: getAllColumns(),
                data: (ammortizationDetail: ListingWithScenariosResponseDTO) => this.getDefaultRowData(ammortizationDetail),
            },
        };
    }

    getDefaultColumns(additionalTableColumns: TableColumn[] = []): TableColumn[] {
        const columns = propertiesListColumns;
        columns.push(...additionalTableColumns);
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

}