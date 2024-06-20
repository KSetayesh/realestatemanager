import { ListingWithScenariosResponseDTO } from "../../../../server/InvestmentTypes";
import { SortDirection, TableColumnDetailsType } from "../../../types/ClientTypes";
import { TableHelper } from "../../TableHelper";
import { TableColumn } from "./TableColumn";
import { tableColumnDetailsMap } from "../../TableTitles";

export class DownPaymentAmountColumn extends TableColumn<ListingWithScenariosResponseDTO> {

    protected tableColumnDetails: TableColumnDetailsType = tableColumnDetailsMap.DOWN_PAYMENT_AMOUNT;

    constructor(
        showColumn: boolean = true,
        isEditable: boolean = false,
        isSortable: boolean = true,
    ) {
        super(showColumn, isEditable, isSortable);
    }

    value(listingWithScenarios: ListingWithScenariosResponseDTO): string | number | boolean {
        return TableHelper.getInitialInvestmentDetails(listingWithScenarios).transactions["Initial Expense"].breakdown["Down Payment"].amount;
    }

    protected _sort(listingWithScenarios: ListingWithScenariosResponseDTO[], sortDirection: SortDirection): ListingWithScenariosResponseDTO[] {
        return listingWithScenarios.sort((a, b) => {
            const aValue = TableHelper.getInitialInvestmentDetails(a).transactions["Initial Expense"].breakdown["Down Payment"].amount;
            const bValue = TableHelper.getInitialInvestmentDetails(b).transactions["Initial Expense"].breakdown["Down Payment"].amount;
            return this.genericSort(aValue, bValue, sortDirection);
        });
    }
}
