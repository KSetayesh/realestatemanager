import { ListingWithScenariosResponseDTO } from "../../server/InvestmentTypes";
import { TableColumnDetailsEnum } from "../tabledata/TableColumnConfig";
import { PropertiesListTableType, TableType } from "../tabledata/TableConfig";
import { ColumnDetail, PrimitiveType } from "../types/ClientTypes";
import { AbstractTable1 } from "./AbstractTable1";

export class PropertiesListTable1 extends AbstractTable1<
    TableType.PROPERTY_LIST_TABLE,
    ListingWithScenariosResponseDTO,
    PropertiesListTableType
> {

    getDefaultTableType(): PropertiesListTableType {
        return PropertiesListTableType.STANDARD_BREAKDOWN;
    }

    getAllSubTableColumns(subTableType: PropertiesListTableType): TableColumnDetailsEnum[] {
        return this.subTables[subTableType];
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