import {
    TableColumn,
    TableDataItem,
    TableRow
} from "../components/ReusableTable";

/* ----For PropertiesListTable---- 
    Y = ListingWithScenariosResponseDTO
    X = PropertiesListTableType

   ----For InvestmentBreakdownTable---- 
    Y = MonthlyInvestmentDetailsResponseDTO
    X = InvestmentBreakdownTableType
*/

export interface TableConfig<Y> {
    columns: TableColumn[];
    data: (data: Y) => TableRow;
};

export interface TablesConfig<Y> {
    [type: string]: TableConfig<Y>;
};

export abstract class AbstractTable<Y, X> {

    abstract getTableData(
        listOfData: Y[],
        tableType: X,
    ): TableDataItem<Y>[];

    abstract getTablesConfig(): TablesConfig<Y>;

    abstract getRowData(data: Y, tableType: X): TableDataItem<Y>;

    getTableOptions(): X[] {
        const tablesConfig: TablesConfig<Y> = this.getTablesConfig();
        return Object.keys(tablesConfig) as X[];
    }

};