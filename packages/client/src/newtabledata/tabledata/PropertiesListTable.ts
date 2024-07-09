import {
    ColumnDetail,
    CreateUpdatePropertyRequest,
    ListingWithScenariosResponseDTO,
    PrimitiveType,
    PropertiesListTableType,
    TableColumnDetailsEnum,
    TableType
} from "@realestatemanager/types";
import { AbstractTable, TableColumn } from "./AbstractTable";
import { PropertiesListTableHelper } from "../../newutilities/PropertiesListTableHelper";

export class PropertiesListTable extends AbstractTable<
    TableType.PROPERTY_LIST_TABLE,
    ListingWithScenariosResponseDTO,
    PropertiesListTableType
> {

    constructor() {
        super(TableType.PROPERTY_LIST_TABLE);
    }

    getDefaultTableType(): PropertiesListTableType {
        return PropertiesListTableType.STANDARD_BREAKDOWN;
    }

    protected _getAllSubTableColumns(subTableType: PropertiesListTableType): TableColumnDetailsEnum[] {
        return this.subTables[subTableType];
    }

    protected getColumnValue(
        item: ListingWithScenariosResponseDTO,
        tableColumn: TableColumn,
    ): PrimitiveType {
        const columnDetail: ColumnDetail = tableColumn.columnDetails;
        if (columnDetail[TableType.PROPERTY_LIST_TABLE]) {
            const { value } = columnDetail[TableType.PROPERTY_LIST_TABLE]!;
            return value(item);
        }
        throw new Error(`Column ${tableColumn.columnKey} does not have a value function for ${TableType.PROPERTY_LIST_TABLE}`);
    }

    protected setColumnValue(
        item: ListingWithScenariosResponseDTO,
        newValue: PrimitiveType,
        tableColumn: TableColumn,
    ): void {
        const columnDetail: ColumnDetail = tableColumn.columnDetails;
        if (columnDetail[TableType.PROPERTY_LIST_TABLE]) {
            const { setValue } = columnDetail[TableType.PROPERTY_LIST_TABLE];
            if (setValue) {
                setValue(item, newValue);
                return;
            }
        }
        throw new Error(`Column ${tableColumn.columnKey} does not have a setValue function for ${TableType.PROPERTY_LIST_TABLE}`);
    }

    createUpdatePropertyRequest(property: ListingWithScenariosResponseDTO): CreateUpdatePropertyRequest {
        // const property: ListingWithScenariosResponseDTO = tableDataItem.objectData.key;
        return {
            propertyIdentifier: {
                fullAddress: PropertiesListTableHelper.getFullAddress(property),
                zillowURL: PropertiesListTableHelper.getZillowURL(property),
            },
            price: PropertiesListTableHelper.getPrice(property), //tableDataItem.rowData.price,
            rentEstimate: PropertiesListTableHelper.getRentEstimate(property), //tableDataItem.rowData.rentEstimate,
            elementarySchoolRating: PropertiesListTableHelper.getElementarySchoolRating(property), //tableDataItem.rowData.elementarySchoolRating,
            middleSchoolRating: PropertiesListTableHelper.getMiddleSchoolRating(property), //tableDataItem.rowData.middleSchoolRating,
            highSchoolRating: PropertiesListTableHelper.getHighSchoolRating(property), // tableDataItem.rowData.highSchoolRating,
            numberOfBedrooms: PropertiesListTableHelper.getNumberOfBedrooms(property), // tableDataItem.rowData.numberOfBedrooms,
            numberOfFullBathrooms: PropertiesListTableHelper.getNumberOfFullBathrooms(property), // tableDataItem.rowData.numberOfFullBathrooms,
            numberOfHalfBathrooms: PropertiesListTableHelper.getNumberOfHalfBathrooms(property), // tableDataItem.rowData.numberOfHalfBathrooms,
            squareFeet: PropertiesListTableHelper.getSquareFeet(property), // tableDataItem.rowData.squareFeet,
            acres: PropertiesListTableHelper.getAcres(property), // tableDataItem.rowData.acres,
            yearBuilt: PropertiesListTableHelper.getYearBuilt(property), // tableDataItem.rowData.yearBuilt,
            hasGarage: PropertiesListTableHelper.hasGarage(property), // tableDataItem.rowData.hasGarage,
            hasPool: PropertiesListTableHelper.hasPool(property), //tableDataItem.rowData.hasPool,
            hasBasement: PropertiesListTableHelper.hasBasement(property), // tableDataItem.rowData.hasBasement,
            listingPrice: PropertiesListTableHelper.getListingPrice(property), // tableDataItem.rowData.listingPrice,
            zestimate: PropertiesListTableHelper.getZestimate(property), // tableDataItem.rowData.zestimate,
            zillowRentEstimate: PropertiesListTableHelper.getZillowRentEstimate(property), // tableDataItem.rowData.zillowRentEstimate,
            zestimateRangeLow: PropertiesListTableHelper.getZestimateRangeLow(property), // tableDataItem.rowData.zestimateRangeLow,
            zestimateRangeHigh: PropertiesListTableHelper.getZestimateRangeHigh(property), // tableDataItem.rowData.zestimateRangeHigh,
            zillowMonthlyPropertyTaxAmount: PropertiesListTableHelper.getZillowMonthlyPropertyTaxAmount(property), // tableDataItem.rowData.zillowMonthlyPropertyTaxAmount,
            zillowMonthlyHomeInsuranceAmount: PropertiesListTableHelper.getZillowMonthlyHomeInsuranceAmount(property), // tableDataItem.rowData.zillowMonthlyHomeInsuranceAmount,
            zillowMonthlyHOAFeesAmount: PropertiesListTableHelper.getZillowMonthlyHOAFeesAmount(property), // tableDataItem.rowData.zillowMonthlyHOAFeesAmount,
            description: PropertiesListTableHelper.getDescription(property), //tableDataItem.rowData.description,
        };
    }


}