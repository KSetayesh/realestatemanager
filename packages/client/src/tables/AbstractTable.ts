import {
    TableColumn,
    TableDataItem,
    TableRow
} from "../components/ReusableTable";

/* ----For PropertiesListTable---- 
    Y = ListingWithScenariosResponseDTO
    X = PropertiesListTableType
    T = ListingWithScenariosResponseDTO

   ----For InvestmentBreakdownTable---- 
    Y = MonthlyInvestmentDetailsResponseDTO
    X = InvestmentBreakdownTableType
    T = ListingWithScenariosResponseDTO
*/

export interface TableConfig<Y> { //<T> {
    columns: TableColumn[];
    data: (data: Y) => TableRow //MonthlyInvestmentDetailsDTO) => TableRow;
};

export interface TablesConfig<Y> { //<T> {
    [type: string]: TableConfig<Y>; //<T>;
};

export interface AbstractTable<Y, X> { //, T> {

    getTableData(
        listOfData: Y[], //T[],
        tableType: X,
    ): TableDataItem<Y>[];

    getTablesConfig(): TablesConfig<Y>;

    getRowData(data: Y, tableType: X): TableDataItem<Y>;

};