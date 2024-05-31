import { TableDataItem } from "../components/ReusableTable";
import { TablesConfig } from "../pages/InvestmentBreakdown";


/* ----For PropertiesListTable---- 
    Y = ListingWithScenariosResponseDTO
    X = PropertiesListTableType
    T = ListingWithScenariosResponseDTO

   ----For InvestmentBreakdownTable---- 
    Y = MonthlyInvestmentDetailsResponseDTO
    X = InvestmentBreakdownTableType
    T = ListingWithScenariosResponseDTO
*/

export interface AbstractTable<Y, X, T> {

    getTableData(
        listOfData: T[],
        tableType: X,
    ): TableDataItem<Y>[];

    getTablesConfig(): TablesConfig<Y>;

    getRowData(data: Y, tableType: X): TableDataItem<Y>;

}