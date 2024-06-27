import { MonthlyInvestmentDetailsResponseDTO } from "../../server/InvestmentTypes";
import { TableColumnDetailsEnum } from "../tabledata/TableColumnConfig";
import { ColumnDetail, InvestmentBreakdownTableType, PrimitiveType, TableType } from "../types/ClientTypes";
import { AbstractTable1, TableColumn } from "./AbstractTable1";

export class InvestmentBreakdownTable1 extends AbstractTable1<
    TableType.INVESTMENT_BREAKDOWN_TABLE,
    MonthlyInvestmentDetailsResponseDTO,
    InvestmentBreakdownTableType
> {

    constructor() {
        super(TableType.INVESTMENT_BREAKDOWN_TABLE);
    }

    protected _getAllSubTableColumns(subTableType?: InvestmentBreakdownTableType): TableColumnDetailsEnum[] {
        if (!subTableType) {
            return this.subTables[this.getDefaultTableType()];
        }
        return this.subTables[subTableType];
    }

    getDefaultTableType(): InvestmentBreakdownTableType {
        return InvestmentBreakdownTableType.STANDARD_BREAKDOWN;
    }

    protected getColumnValue(
        subTableType: InvestmentBreakdownTableType,
        item: MonthlyInvestmentDetailsResponseDTO,
        columnType: TableColumnDetailsEnum
    ): PrimitiveType {
        const tableColumn: TableColumn = this.getColumnDetails(subTableType, columnType);
        const columnDetail: ColumnDetail = tableColumn.columnDetails;
        if (columnDetail[TableType.INVESTMENT_BREAKDOWN_TABLE]) {
            const { value } = columnDetail[TableType.INVESTMENT_BREAKDOWN_TABLE]!;
            return value(item);
        }
        throw new Error(`Column ${columnType} does not have a value function for ${TableType.INVESTMENT_BREAKDOWN_TABLE}`);
    }


}