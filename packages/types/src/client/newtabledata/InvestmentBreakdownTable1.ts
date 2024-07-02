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

    getDefaultTableType(): InvestmentBreakdownTableType {
        return InvestmentBreakdownTableType.STANDARD_BREAKDOWN;
    }

    protected _getAllSubTableColumns(subTableType: InvestmentBreakdownTableType): TableColumnDetailsEnum[] {
        return this.subTables[subTableType];
    }


    protected getColumnValue(
        item: MonthlyInvestmentDetailsResponseDTO,
        tableColumn: TableColumn,
    ): PrimitiveType {
        const columnDetail: ColumnDetail = tableColumn.columnDetails;
        if (columnDetail[TableType.INVESTMENT_BREAKDOWN_TABLE]) {
            const { value } = columnDetail[TableType.INVESTMENT_BREAKDOWN_TABLE]!;
            return value(item);
        }
        throw new Error(`Column ${tableColumn.columnKey} does not have a value function for ${TableType.INVESTMENT_BREAKDOWN_TABLE}`);
    }

    protected setColumnValue(
        item: MonthlyInvestmentDetailsResponseDTO,
        newValue: PrimitiveType,
        tableColumn: TableColumn,
    ): PrimitiveType {
        const columnDetail: ColumnDetail = tableColumn.columnDetails;
        if (columnDetail[TableType.INVESTMENT_BREAKDOWN_TABLE]) {
            const { setValue } = columnDetail[TableType.INVESTMENT_BREAKDOWN_TABLE]!;
            setValue(item, newValue);
        }
        throw new Error(`Column ${tableColumn.columnKey} does not have a setValue function for ${TableType.INVESTMENT_BREAKDOWN_TABLE}`);
    }


}