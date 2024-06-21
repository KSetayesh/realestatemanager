import { ListingWithScenariosResponseDTO, MonthlyInvestmentDetailsResponseDTO } from "../../server/InvestmentTypes";
import { InvestmentDetailsTableHelper } from "../tabledata/InvestmentDetailsTableHelper";
import { PropertiesListTableHelper } from "../tabledata/PropertiesListTableHelper";
import { TableType, sort } from "../tabledata/TableColumnConfig";
import { ColumnDetail, InputType, PrimitiveType, SortDirection } from "../types/ClientTypes";

export const RentEstimateColumn: ColumnDetail = {
    title: "Rent Estimate",
    accessor: "rentEstimate",
    inputType: InputType.TEXT,
    isUrl: false,
    isDollarAmount: true,
    addSuffix: "",
    showColumn: true,
    isEditable: true,
    isSortable: true,
    detailedDescription: "",
    [TableType.PROPERTY_LIST_TABLE]: {
        sortFunction: (
            listingWithScenarios: ListingWithScenariosResponseDTO[],
            sortDirection: SortDirection
        ) => {
            return sort(
                listingWithScenarios,
                listing => PropertiesListTableHelper.getRentEstimate(listing),
                sortDirection
            );
        },
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getRentEstimate(listingWithScenarios);
        }
    },
    [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
        sortFunction: (
            monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
            sortDirection: SortDirection
        ) => {
            return sort(
                monthlyInvestmentDetails,
                monthlyInvestmentDetails => InvestmentDetailsTableHelper.getRentEstimate(monthlyInvestmentDetails),
                sortDirection
            );
        },
        value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): PrimitiveType => {
            return InvestmentDetailsTableHelper.getRentEstimate(monthlyInvestmentDetails);
        }
    }
};