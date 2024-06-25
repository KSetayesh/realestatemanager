import { ListingWithScenariosResponseDTO } from "../../server/InvestmentTypes";
import { TableColumnDetailsEnum } from "../tabledata/TableColumnConfig";
import { PropertiesListTableType, TableType } from "../tabledata/TableConfig";
import { ColumnDetail, PrimitiveType } from "../types/ClientTypes";
import { AbstractTable } from "./AbstractTable";

export class PropertiesListTable extends AbstractTable<TableType.PROPERTY_LIST_TABLE, ListingWithScenariosResponseDTO, PropertiesListTableType> {

    getAllSubTableColumns(subTableType: PropertiesListTableType): Set<TableColumnDetailsEnum> {
        const tableColumnsTypes: TableColumnDetailsEnum[] = this.subTables[subTableType];
        return new Set(tableColumnsTypes);
    }

    getColumnValue(
        subTableType: PropertiesListTableType,
        item: ListingWithScenariosResponseDTO,
        columnType: TableColumnDetailsEnum
    ): PrimitiveType {
        const columnDetail: ColumnDetail = this.getColumnDetails(subTableType, columnType);
        if (columnDetail[TableType.PROPERTY_LIST_TABLE]) {
            const { value } = columnDetail[TableType.PROPERTY_LIST_TABLE]!;
            return value(item);
        }
        throw new Error(`Column ${columnType} does not have a value function for AGENT_TABLE`);
    }


}