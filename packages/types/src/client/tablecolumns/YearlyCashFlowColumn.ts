import { ListingWithScenariosResponseDTO, MonthlyInvestmentDetailsResponseDTO } from "../../server/InvestmentTypes";
import { PropertiesListTableHelper } from "../tabledata/PropertiesListTableHelper";
import { TableType, sort } from "../tabledata/TableColumnConfig";
import { ColumnDetail, InputType, PrimitiveType, SortDirection } from "../types/ClientTypes";

export const YearlyCashFlowColumn: ColumnDetail = {
    title: "Yearly Cash Flow",
    accessor: "yearlyCashFlow",
    inputType: InputType.TEXT,
    isUrl: false,
    isDollarAmount: true,
    addSuffix: "",
    showColumn: true,
    isEditable: false,
    isSortable: true,
    detailedDescription: "",
    [TableType.PROPERTY_LIST_TABLE]: {
        sortFunction: (
            listingWithScenarios: ListingWithScenariosResponseDTO[],
            sortDirection: SortDirection
        ) => {
            return sort(
                listingWithScenarios,
                listing => PropertiesListTableHelper.getYearlyCashFlow(listing),
                sortDirection
            );
        },
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getYearlyCashFlow(listingWithScenarios);
        }
    },
    [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
        sortFunction: (
            monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
            sortDirection: SortDirection
        ) => {
            throw new Error("Not implemented");
        },
        value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): PrimitiveType => {
            return;
        }
    }
};