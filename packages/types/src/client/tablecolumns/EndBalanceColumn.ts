import { HighYeildSavingsResponseDTO } from "../../server/HighYieldSavingsApiTypes";
import { TableType } from "../tabledata/TableColumnConfig";
import { ColumnDetail, InputType, PrimitiveType, SortDirection } from "../types/ClientTypes";

export const EndBalanceColumn: ColumnDetail = {
    title: "End Balance",
    accessor: "endBalance",
    inputType: InputType.NUMBER,
    isUrl: false,
    isDollarAmount: true,
    addSuffix: "",
    showColumn: true,
    isEditable: false,
    isSortable: false,
    detailedDescription: "",
    [TableType.HIGH_YIELD_SAVINGS_TABLE]: {
        value: (highYeildSavings: HighYeildSavingsResponseDTO): PrimitiveType => {
            return highYeildSavings.endBalance;
        }
    },
};