import { ListingWithScenariosResponseDTO, MonthlyInvestmentDetailsResponseDTO } from "../../server/InvestmentTypes";
import { InvestmentDetailsTableHelper } from "../tabledata/InvestmentDetailsTableHelper";
import { TableType, sort } from "../tabledata/TableColumnConfig";
import { ColumnDetail, InputType, PrimitiveType, SortDirection } from "../types/ClientTypes";

export const PropertyTaxAmountColumn: ColumnDetail = {
    title: "Property Tax Amount",
    accessor: "propertyTaxAmount",
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
                monthlyInvestmentDetails => InvestmentDetailsTableHelper.getPropertyTaxAmount(monthlyInvestmentDetails),
                sortDirection
            );
        },
        value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): PrimitiveType => {
            return InvestmentDetailsTableHelper.getPropertyTaxAmount(monthlyInvestmentDetails);
        }
    }
};