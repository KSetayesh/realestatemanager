import { TableColumn, TableDataItem, TableRow } from "../components/ReusableTable";

/* ----For PropertiesListTable---- 
    Y = ListingWithScenariosResponseDTO
    X = PropertiesListTableType
    T = ListingWithScenariosResponseDTO

   ----For InvestmentBreakdownTable---- 
    Y = MonthlyInvestmentDetailsResponseDTO
    X = InvestmentBreakdownTableType
    T = ListingWithScenariosResponseDTO
*/

export interface TableConfig<T> {
    columns: TableColumn[];
    data: (data: T) => TableRow //MonthlyInvestmentDetailsDTO) => TableRow;
};

export interface TablesConfig<T> {
    [type: string]: TableConfig<T>;
};

export interface AbstractTable<Y, X, T> {

    getTableData(
        listOfData: T[],
        tableType: X,
    ): TableDataItem<Y>[];

    getTablesConfig(): TablesConfig<Y>;

    getRowData(data: Y, tableType: X): TableDataItem<Y>;

}