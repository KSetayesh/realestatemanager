import { ListingWithScenariosResponseDTO } from "@realestatemanager/shared";
import { TablesConfig } from "../pages/InvestmentBreakdown";
import { PropertiesListTableType } from "../pages/PropertiesList";
import { TableColumn, TableDataItem } from "../components/ReusableTable";
import { AbstractTable } from "./AbstractTable";

export class PropertiesListTable extends AbstractTable<PropertiesListTableType, ListingWithScenariosResponseDTO> {

    getDefaultColumns(additionalTableColumns: TableColumn[] = []): TableColumn[] {

        const columns = super.getDefaultColumns();
        columns.push(...additionalTableColumns);
        // columns.push(investmentBreakdownColumn);

        return columns;
    }

    getTableData(
        properties: ListingWithScenariosResponseDTO[],
        tableType: PropertiesListTableType
    ): TableDataItem<ListingWithScenariosResponseDTO>[] {
        const tablesConfig = this.getTablesConfig();
        return properties.map(property => ({
            objectData: {
                key: property,
            },
            rowData: tablesConfig[tableType].data(property),
        }));
    }

    getTablesConfig(): TablesConfig<ListingWithScenariosResponseDTO> {
        const getAllColumns = (): TableColumn[] => {
            return this.getDefaultColumns().map(column => ({
                ...column,
                showColumn: true  // Set showColumn to true for each object
            }));
        };

        return {
            [PropertiesListTableType.STANDARD_BREAKDOWN]: {
                columns: this.getDefaultColumns(),
                data: (ammortizationDetail: ListingWithScenariosResponseDTO) => this.getDefaultRowData(ammortizationDetail),
            },
            [PropertiesListTableType.ALL]: {
                columns: getAllColumns(),
                data: (ammortizationDetail: ListingWithScenariosResponseDTO) => this.getDefaultRowData(ammortizationDetail),
            },
        };
    }

}