import { ListingWithScenariosResponseDTO } from "../../../../server/InvestmentTypes";
import { SortDirection, TableColumnDetailsType } from "../../../types/ClientTypes";
import { TableHelper } from "../../TableHelper";
import { TableColumn } from "./TableColumn";
import { tableColumnDetailsMap } from "../../TableTitles";

export class InitialMonthlyAmountColumn extends TableColumn<ListingWithScenariosResponseDTO> {

    protected tableColumnDetails: TableColumnDetailsType = tableColumnDetailsMap.INITIAL_MONTHLY_AMOUNT;

    constructor(
        showColumn: boolean = true,
        isEditable: boolean = false,
        isSortable: boolean = true,
    ) {
        super(showColumn, isEditable, isSortable);
    }

    value(listingWithScenarios: ListingWithScenariosResponseDTO): string | number | boolean {
        return TableHelper.getInitialInvestmentDetails(listingWithScenarios).transactions.Mortgage.breakdown.amount;
    }

    protected _sort(listingWithScenarios: ListingWithScenariosResponseDTO[], sortDirection: SortDirection): ListingWithScenariosResponseDTO[] {
        return listingWithScenarios.sort((a, b) => {
            // Come back to this --> initialInvestmentDetails(a).transactions.Mortgage.breakdown.amount;
            const aValue = TableHelper.getInitialInvestmentDetails(a).transactions.Mortgage.breakdown.amount;
            const bValue = TableHelper.getInitialInvestmentDetails(b).transactions.Mortgage.breakdown.amount;
            return this.genericSort(aValue, bValue, sortDirection);
        });
    }
}