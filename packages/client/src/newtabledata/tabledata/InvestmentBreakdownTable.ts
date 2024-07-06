import {
    ColumnDetail,
    InvestmentBreakdownTableType,
    MonthlyInvestmentDetailsResponseDTO,
    PrimitiveType,
    TableColumn,
    TableColumnDetailsEnum,
    TableType
} from "@realestatemanager/types";
import { AbstractTable } from "./AbstractTable";

export class InvestmentBreakdownTable extends AbstractTable<
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
    ): void {
        const columnDetail: ColumnDetail = tableColumn.columnDetails;
        if (columnDetail[TableType.INVESTMENT_BREAKDOWN_TABLE]) {
            const { setValue } = columnDetail[TableType.INVESTMENT_BREAKDOWN_TABLE];
            if (setValue) {
                setValue(item, newValue);
                return;
            }
        }
        throw new Error(`Column ${tableColumn.columnKey} does not have a setValue function for ${TableType.INVESTMENT_BREAKDOWN_TABLE}`);
    }


}