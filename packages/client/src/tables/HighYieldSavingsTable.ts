import { HighYeildSavingsResponseDTO } from "@realestatemanager/shared";
import { AbstractTable } from "./AbstractTable";
import { TableColumn, TableDataItem, TableRow } from "../components/ReusableTable";
import { TablesConfig } from "../pages/InvestmentBreakdown";
import { highYieldSavingsDefaultColumns } from "./columns/HighYieldSavingsColumns";
import { DefaultTableType } from "../constants/Constant";

export class HighYieldSavingsTable implements AbstractTable<HighYeildSavingsResponseDTO, DefaultTableType, HighYeildSavingsResponseDTO> {

    getRowData(
        highYieldSavings: HighYeildSavingsResponseDTO,
        tableType: DefaultTableType
    ): TableDataItem<HighYeildSavingsResponseDTO> {
        const tablesConfig = this.getTablesConfig();
        return {
            objectData: {
                key: highYieldSavings,
            },
            rowData: tablesConfig[tableType].data(highYieldSavings),
        };
    }

    getTableData(listOfData: HighYeildSavingsResponseDTO[], tableType: DefaultTableType): TableDataItem<HighYeildSavingsResponseDTO>[] {
        const tablesConfig = this.getTablesConfig();
        return listOfData.map(data => ({
            objectData: {
                key: data,
            },
            rowData: tablesConfig[tableType].data(data),
        }));
    }

    getTablesConfig(): TablesConfig<HighYeildSavingsResponseDTO> {
        return {
            [DefaultTableType.DEFAULT]: {
                columns: this.getDefaultColumns(),
                data: (highYieldSavingsData: HighYeildSavingsResponseDTO): TableRow => {
                    return this.createRowData(highYieldSavingsData);
                },
            },
        };
    }

    getDefaultColumns(): TableColumn[] {
        return highYieldSavingsDefaultColumns;
    }

    private createRowData(highYieldSavingsData: HighYeildSavingsResponseDTO) {
        return {
            year: highYieldSavingsData.year,
            month: highYieldSavingsData.month,
            date: highYieldSavingsData.date,
            startPrincipal: highYieldSavingsData.startPrincipal,
            startBalance: highYieldSavingsData.startBalance,
            interest: highYieldSavingsData.interest,
            accumulatedInterest: highYieldSavingsData.accumulatedInterest,
            endBalance: highYieldSavingsData.endBalance,
            endPrincipal: highYieldSavingsData.endPrincipal,
        };
    }



} 