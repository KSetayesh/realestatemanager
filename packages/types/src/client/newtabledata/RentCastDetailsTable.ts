import { RentCastDetailsResponseDTO } from "../../server/RentCastApiTypes";
import { TableColumnDetailsEnum } from "../tabledata/TableColumnConfig";
import { DefaultTableType, TableType } from "../tabledata/TableConfig";
import { ColumnDetail, PrimitiveType } from "../types/ClientTypes";
import { AbstractTable } from "./AbstractTable";

export class RentCastDetailsTable extends AbstractTable<
    TableType.RENT_CAST_DETAILS_TABLE,
    RentCastDetailsResponseDTO,
    DefaultTableType
> {

    getAllSubTableColumns(subTableType: DefaultTableType): TableColumnDetailsEnum[] {
        return this.subTables[subTableType];
    }

    getColumnValue(
        subTableType: DefaultTableType,
        item: RentCastDetailsResponseDTO,
        columnType: TableColumnDetailsEnum
    ): PrimitiveType {
        const columnDetail: ColumnDetail = this.getColumnDetails(subTableType, columnType);
        if (columnDetail[TableType.RENT_CAST_DETAILS_TABLE]) {
            const { value } = columnDetail[TableType.RENT_CAST_DETAILS_TABLE]!;
            return value(item);
        }
        throw new Error(`Column ${columnType} does not have a value function for AGENT_TABLE`);
    }


}