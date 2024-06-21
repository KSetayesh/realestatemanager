import { ListingWithScenariosResponseDTO, MonthlyInvestmentDetailsResponseDTO } from "../../server/InvestmentTypes";
import { InvestmentDetailsTableHelper } from "../tabledata/InvestmentDetailsTableHelper";
import { TableType, sort } from "../tabledata/TableColumnConfig";
import { ColumnDetail, InputType, PrimitiveType, SortDirection } from "../types/ClientTypes";

export const AccumulatedNetIncomeColumn: ColumnDetail = {
    title: "Accumulated Net Income",
    accessor: "accumulatedNetIncome",
    inputType: InputType.NUMBER,
    isUrl: false,
    isDollarAmount: true,
    addSuffix: "",
    showColumn: true,
    isEditable: false,
    isSortable: false,
    detailedDescription: "",
    [TableType.PROPERTY_LIST_TABLE]: {
        sortFunction: (
            listingWithScenarios: ListingWithScenariosResponseDTO[],
            sortDirection: SortDirection
        ) => {
            return listingWithScenarios;
        },
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return;
        }
    },
    [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
        sortFunction: (
            monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
            sortDirection: SortDirection
        ) => {
            return sort(
                monthlyInvestmentDetails,
                monthlyInvestmentDetails => InvestmentDetailsTableHelper.getAccumulatedNetIncome(monthlyInvestmentDetails),
                sortDirection
            );
        },
        value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): PrimitiveType => {
            return InvestmentDetailsTableHelper.getAccumulatedNetIncome(monthlyInvestmentDetails);
        }
    }
};