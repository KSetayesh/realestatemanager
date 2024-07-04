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

    getDefaultTableType(): DefaultTableType {
        return DefaultTableType.DEFAULT;
    }

    protected _getAllSubTableColumns(subTableType: DefaultTableType): TableColumnDetailsEnum[] {
        return this.subTables[subTableType];
    }

    protected getColumnValue(
        item: RentCastDetailsResponseDTO,
        tableColumn: TableColumn,
    ): PrimitiveType {
        const columnDetail: ColumnDetail = tableColumn.columnDetails;
        if (columnDetail[TableType.RENT_CAST_DETAILS_TABLE]) {
            const { value } = columnDetail[TableType.RENT_CAST_DETAILS_TABLE]!;
            return value(item);
        }
        throw new Error(`Column ${tableColumn.columnKey} does not have a value function for ${TableType.RENT_CAST_DETAILS_TABLE}`);
    }

    protected setColumnValue(
        item: RentCastDetailsResponseDTO,
        newValue: PrimitiveType,
        tableColumn: TableColumn,
    ): void {
        const columnDetail: ColumnDetail = tableColumn.columnDetails;
        if (columnDetail[TableType.RENT_CAST_DETAILS_TABLE]) {
            const { setValue } = columnDetail[TableType.RENT_CAST_DETAILS_TABLE];
            if (setValue) {
                setValue(item, newValue);
                return;
            }
        }
        throw new Error(`Column ${tableColumn.columnKey} does not have a setValue function for ${TableType.RENT_CAST_DETAILS_TABLE}`);
    }

}