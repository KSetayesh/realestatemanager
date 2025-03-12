// import { HighYeildSavingsResponseDTO } from "@realestatemanager/types";
// import { AbstractTable, TablesConfig } from "./AbstractTable";
// import { TableColumn, TableRow } from "../components/ReusableTable";
// import { highYieldSavingsDefaultColumns } from "./columns/HighYieldSavingsColumns";
// import { DefaultTableType } from "../constants/Constant";

// export class HighYieldSavingsTable extends AbstractTable<HighYeildSavingsResponseDTO, DefaultTableType> {

//     getDefaultTableType(): DefaultTableType {
//         return DefaultTableType.DEFAULT;
//     }

//     getTablesConfig(): TablesConfig<HighYeildSavingsResponseDTO> {
//         return {
//             [DefaultTableType.DEFAULT]: {
//                 columns: this.getDefaultColumns(),
//                 data: (highYieldSavingsData: HighYeildSavingsResponseDTO): TableRow => {
//                     return highYieldSavingsData;
//                 },
//             },
//         };
//     }

//     getDefaultColumns(): TableColumn[] {
//         return highYieldSavingsDefaultColumns;
//     }

// } 