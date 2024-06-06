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

export abstract class AbstractTable<Y, X extends keyof TablesConfig<Y>> {

    abstract getTablesConfig(): TablesConfig<Y>;

    abstract getDefaultColumns(): TableColumn[];

    getRowData(data: Y, tableType: X): TableDataItem<Y> {
        const tablesConfig: TablesConfig<Y> = this.getTablesConfig();
        return {
            objectData: {
                key: data,
            },
            rowData: tablesConfig[tableType].data(data),
        };
    }

    getTableData(
        listOfData: Y[],
        tableType: X
    ): TableDataItem<Y>[] {
        return listOfData.map(data => this.getRowData(data, tableType));
    }

    getTableOptions(): X[] {
        const tablesConfig: TablesConfig<Y> = this.getTablesConfig();
        return Object.keys(tablesConfig) as X[];
    }

};