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


}