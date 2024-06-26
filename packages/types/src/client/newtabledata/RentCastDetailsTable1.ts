import { RentCastDetailsResponseDTO } from "../../server/RentCastApiTypes";
import { TableColumnDetailsEnum } from "../tabledata/TableColumnConfig";
import { ColumnDetail, DefaultTableType, PrimitiveType, TableType } from "../types/ClientTypes";
import { AbstractTable1, TableColumn } from "./AbstractTable1";

export class RentCastDetailsTable1 extends AbstractTable1<
    TableType.RENT_CAST_DETAILS_TABLE,
    RentCastDetailsResponseDTO,
    DefaultTableType
> {

    constructor() {
        super(TableType.RENT_CAST_DETAILS_TABLE);
    }

    protected getAllSubTableColumns(subTableType?: DefaultTableType): TableColumnDetailsEnum[] {
        if (!subTableType) {
            return this.subTables[this.getDefaultTableType()];
        }
        return this.subTables[subTableType];
    }

    getDefaultTableType(): DefaultTableType {
        return DefaultTableType.DEFAULT;
    }

    getColumnValue(
        subTableType: DefaultTableType,
        item: RentCastDetailsResponseDTO,
        columnType: TableColumnDetailsEnum
    ): PrimitiveType {
        const tableColumn: TableColumn = this.getColumnDetails(subTableType, columnType);
        const columnDetail: ColumnDetail = tableColumn.columnDetails;
        if (columnDetail[TableType.RENT_CAST_DETAILS_TABLE]) {
            const { value } = columnDetail[TableType.RENT_CAST_DETAILS_TABLE]!;
            return value(item);
        }
        throw new Error(`Column ${columnType} does not have a value function for ${TableType.RENT_CAST_DETAILS_TABLE}`);
    }

}