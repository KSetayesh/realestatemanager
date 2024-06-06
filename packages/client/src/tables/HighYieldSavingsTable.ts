import { HighYeildSavingsResponseDTO } from "@realestatemanager/shared";
import { AbstractTable, TablesConfig } from "./AbstractTable";
import { TableColumn, TableRow } from "../components/ReusableTable";
import { highYieldSavingsDefaultColumns } from "./columns/HighYieldSavingsColumns";
import { DefaultTableType } from "../constants/Constant";

export class HighYieldSavingsTable extends AbstractTable<HighYeildSavingsResponseDTO, DefaultTableType> {

    getDefaultTableType(): DefaultTableType {
        return DefaultTableType.DEFAULT;
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