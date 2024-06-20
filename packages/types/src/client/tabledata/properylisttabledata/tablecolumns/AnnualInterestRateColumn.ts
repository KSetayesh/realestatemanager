import { ListingWithScenariosResponseDTO } from "../../../../server/InvestmentTypes";
import { SortDirection, TableColumnDetailsType } from "../../../types/ClientTypes";
import { TableHelper } from "../../TableHelper";
import { TableColumn } from "./TableColumn";
import { tableColumnDetailsMap } from "../../TableTitles";

export class AnnualInterestRateColumn extends TableColumn<ListingWithScenariosResponseDTO> {

    protected tableColumnDetails: TableColumnDetailsType = tableColumnDetailsMap.ANNUAL_INTEREST_RATE;

    constructor(
        showColumn: boolean = true,
        isEditable: boolean = false,
        isSortable: boolean = true,
    ) {
        super(showColumn, isEditable, isSortable);
    }

    value(listingWithScenarios: ListingWithScenariosResponseDTO): string | number | boolean {
        return TableHelper.getInitialInvestmentDetails(listingWithScenarios).transactions.Mortgage.breakdown.percentage;
    }

    protected _sort(listingWithScenarios: ListingWithScenariosResponseDTO[], sortDirection: SortDirection): ListingWithScenariosResponseDTO[] {
        return listingWithScenarios.sort((a, b) => {
            const aValue = TableHelper.getInitialInvestmentDetails(a).transactions.Mortgage.breakdown.percentage;
            const bValue = TableHelper.getInitialInvestmentDetails(b).transactions.Mortgage.breakdown.percentage;
            return this.genericSort(aValue, bValue, sortDirection);
        });
    }
}