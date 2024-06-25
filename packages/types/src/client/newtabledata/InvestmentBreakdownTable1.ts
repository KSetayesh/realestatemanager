import { MonthlyInvestmentDetailsResponseDTO } from "../../server/InvestmentTypes";
import { TableColumnDetailsEnum } from "../tabledata/TableColumnConfig";
import { InvestmentBreakdownTableType, TableType } from "../tabledata/TableConfig";
import { ColumnDetail, PrimitiveType } from "../types/ClientTypes";
import { AbstractTable1 } from "./AbstractTable1";

export class InvestmentBreakdownTable1 extends AbstractTable1<
    TableType.INVESTMENT_BREAKDOWN_TABLE,
    MonthlyInvestmentDetailsResponseDTO,
    InvestmentBreakdownTableType
> {

    getDefaultTableType(): InvestmentBreakdownTableType {
        return InvestmentBreakdownTableType.STANDARD_BREAKDOWN;
    }

    getAllSubTableColumns(subTableType: InvestmentBreakdownTableType): TableColumnDetailsEnum[] {
        return this.subTables[subTableType];
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