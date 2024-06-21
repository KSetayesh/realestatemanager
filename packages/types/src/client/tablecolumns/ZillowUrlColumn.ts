import { ListingWithScenariosResponseDTO, MonthlyInvestmentDetailsResponseDTO } from "../../server/InvestmentTypes";
import { PropertiesListTableHelper } from "../tabledata/PropertiesListTableHelper";
import { TableType, sort } from "../tabledata/TableColumnConfig";
import { ColumnDetail, InputType, PrimitiveType, SortDirection } from "../types/ClientTypes";

export const ZillowUrlColumn: ColumnDetail = {
    title: "Zillow Url",
    accessor: "zillowUrl",
    inputType: InputType.TEXT,
    isUrl: true,
    isDollarAmount: false,
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
            return sort(
                listingWithScenarios,
                listing => PropertiesListTableHelper.getZillowURL(listing),
                sortDirection
            );
        },
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getZillowURL(listingWithScenarios);
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