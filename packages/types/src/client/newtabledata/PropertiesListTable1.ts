import { ListingWithScenariosResponseDTO } from "../../server/InvestmentTypes";
import { TableColumnDetailsEnum } from "../tabledata/TableColumnConfig";
import { ColumnDetail, PrimitiveType, PropertiesListTableType, TableType } from "../types/ClientTypes";
import { AbstractTable1, TableColumn } from "./AbstractTable1";

export class PropertiesListTable1 extends AbstractTable1<
    TableType.PROPERTY_LIST_TABLE,
    ListingWithScenariosResponseDTO,
    PropertiesListTableType
> {

    constructor() {
        super(TableType.PROPERTY_LIST_TABLE);
    }

    protected _getAllSubTableColumns(subTableType?: PropertiesListTableType): TableColumnDetailsEnum[] {
        if (!subTableType) {
            return this.subTables[this.getDefaultTableType()];
        }
        return this.subTables[subTableType];
    }

    getDefaultTableType(): PropertiesListTableType {
        return PropertiesListTableType.STANDARD_BREAKDOWN;
    }

    protected getColumnValue(
        subTableType: PropertiesListTableType,
        item: ListingWithScenariosResponseDTO,
        columnType: TableColumnDetailsEnum
    ): PrimitiveType {
        const tableColumn: TableColumn = this.getColumnDetails(subTableType, columnType);
        const columnDetail: ColumnDetail = tableColumn.columnDetails;
        if (columnDetail[TableType.PROPERTY_LIST_TABLE]) {
            const { value } = columnDetail[TableType.PROPERTY_LIST_TABLE]!;
            return value(item);
        }
        throw new Error(`Column ${columnType} does not have a value function for ${TableType.PROPERTY_LIST_TABLE}`);
    }


}