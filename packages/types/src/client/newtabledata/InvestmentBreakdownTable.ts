import { MonthlyInvestmentDetailsResponseDTO } from "../../server/InvestmentTypes";
import { TableColumnDetailsEnum } from "../tabledata/TableColumnConfig";
import { InvestmentBreakdownTableType, TableType } from "../tabledata/TableConfig";
import { ColumnDetail, PrimitiveType } from "../types/ClientTypes";
import { AbstractTable } from "./AbstractTable";

export class InvestmentBreakdownTable extends AbstractTable<
    TableType.INVESTMENT_BREAKDOWN_TABLE,
    MonthlyInvestmentDetailsResponseDTO,
    InvestmentBreakdownTableType
> {

    getAllSubTableColumns(subTableType: InvestmentBreakdownTableType): Set<TableColumnDetailsEnum> {
        const tableColumnsTypes: TableColumnDetailsEnum[] = this.subTables[subTableType];
        return new Set(tableColumnsTypes);
    }

    getColumnValue(
        subTableType: InvestmentBreakdownTableType,
        item: MonthlyInvestmentDetailsResponseDTO,
        columnType: TableColumnDetailsEnum
    ): PrimitiveType {
        const columnDetail: ColumnDetail = this.getColumnDetails(subTableType, columnType);
        if (columnDetail[TableType.INVESTMENT_BREAKDOWN_TABLE]) {
            const { value } = columnDetail[TableType.INVESTMENT_BREAKDOWN_TABLE]!;
            return value(item);
        }
        throw new Error(`Column ${columnType} does not have a value function for AGENT_TABLE`);
    }


}