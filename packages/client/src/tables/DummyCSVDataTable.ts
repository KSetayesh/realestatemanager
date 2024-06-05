import { AbstractTable, TablesConfig } from "./AbstractTable";
import { TableColumn, TableDataItem, TableRow } from "../components/ReusableTable";
import { DefaultTableType } from "../constants/Constant";
import { DummyCSVDataType } from "../pages/PropertyForm";
import { dummyDataDefaultColumns } from "./columns/DummyCSVDataColumns";

export class DummyCSVDataTable implements AbstractTable<DummyCSVDataType, DefaultTableType> {

    getRowData(
        dummyData: DummyCSVDataType,
        tableType: DefaultTableType
    ): TableDataItem<DummyCSVDataType> {
        const tablesConfig = this.getTablesConfig();
        return {
            objectData: {
                key: dummyData,
            },
            rowData: tablesConfig[tableType].data(dummyData),
        };
    }

    getTableData(listOfData: DummyCSVDataType[], tableType: DefaultTableType): TableDataItem<DummyCSVDataType>[] {
        const tablesConfig = this.getTablesConfig();
        return listOfData.map(data => ({
            objectData: {
                key: data,
            },
            rowData: tablesConfig[tableType].data(data),
        }));
    }

    getTablesConfig(): TablesConfig<DummyCSVDataType> {
        return {
            [DefaultTableType.DEFAULT]: {
                columns: this.getDefaultColumns(),
                data: (dummyData: DummyCSVDataType): TableRow => {
                    return this.createRowData(dummyData);
                },
            },
        };
    }

    getDefaultColumns(): TableColumn[] {
        return dummyDataDefaultColumns;
    }

    private createRowData(dummyData: DummyCSVDataType) {
        return {
            zillowURL: dummyData.zillowURL,
            fullAddress: dummyData.fullAddress,
            state: dummyData.state,
            zipcode: dummyData.zipcode,
            city: dummyData.city,
            county: dummyData.county,
            country: dummyData.country,
            streetAddress: dummyData.streetAddress,
            apartmentNumber: dummyData.apartmentNumber,
            longitude: dummyData.longitude,
            latitude: dummyData.latitude,
            numberOfDaysOnMarket: dummyData.numberOfDaysOnMarket,
            elementarySchoolRating: dummyData.elementarySchoolRating,
            middleSchoolRating: dummyData.middleSchoolRating,
            highSchoolRating: dummyData.highSchoolRating,
            numberOfBedrooms: dummyData.numberOfBedrooms,
            numberOfFullBathrooms: dummyData.numberOfFullBathrooms,
            numberOfHalfBathrooms: dummyData.numberOfHalfBathrooms,
            squareFeet: dummyData.squareFeet,
            acres: dummyData.acres,
            yearBuilt: dummyData.yearBuilt,
            hasGarage: dummyData.hasGarage,
            hasPool: dummyData.hasPool,
            hasBasement: dummyData.hasBasement,
            propertyType: dummyData.propertyType,
            propertyStatus: dummyData.propertyStatus,
            listingPrice: dummyData.listingPrice,
            zestimate: dummyData.zestimate,
            zillowRentEstimate: dummyData.zillowRentEstimate,
            zestimateRangeLow: dummyData.zestimateRangeLow,
            zestimateRangeHigh: dummyData.zestimateRangeHigh,
            zillowMonthlyPropertyTaxAmount: dummyData.zillowMonthlyPropertyTaxAmount,
            zillowMonthlyHomeInsuranceAmount: dummyData.zillowMonthlyHomeInsuranceAmount,
            zillowMonthlyHOAFeesAmount: dummyData.zillowMonthlyHOAFeesAmount,
            description: dummyData.description,
        };
    }

}