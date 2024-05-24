import { TableDataItem } from "../components/ReusableTable";
import { TablesConfig } from "../pages/InvestmentBreakdown";

export interface AbstractTable<Z, T, X> {

    getTableData(
        listOfData: Z[],
        tableType: T
    ): TableDataItem<X>[];

    getTablesConfig(): TablesConfig<X>;

}