import { ListingWithScenariosResponseDTO, MonthlyInvestmentDetailsResponseDTO } from "../../server/InvestmentTypes";
import { PropertiesListTableHelper } from "../tabledata/PropertiesListTableHelper";
import { TableType, sort } from "../tabledata/TableColumnConfig";
import { ColumnDetail, InputType, PrimitiveType, SortDirection } from "../types/ClientTypes";

export const CityColumn: ColumnDetail = {
    title: "City",
    accessor: "city",
    inputType: InputType.TEXT,
    isUrl: false,
    isDollarAmount: false,
    addSuffix: "",
    showColumn: false,
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
                listing => PropertiesListTableHelper.getCity(listing),
                sortDirection
            );
        },
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getCity(listingWithScenarios);
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