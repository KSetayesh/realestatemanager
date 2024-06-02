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

export interface AbstractTable<Y, X> {

    getTableData(
        listOfData: Y[],
        tableType: X,
    ): TableDataItem<Y>[];

    getTablesConfig(): TablesConfig<Y>;

    getRowData(data: Y, tableType: X): TableDataItem<Y>;

};