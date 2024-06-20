import { ListingWithScenariosResponseDTO } from "../../../../server/InvestmentTypes";
import { SortDirection, TableColumnDetailsType } from "../../../types/ClientTypes";
import { TableHelper } from "../../TableHelper";
import { TableColumn } from "./TableColumn";
import { tableColumnDetailsMap } from "../../TableTitles";

export class LoanAmountColumn extends TableColumn<ListingWithScenariosResponseDTO> {

    protected tableColumnDetails: TableColumnDetailsType = tableColumnDetailsMap.LOAN_AMOUNT;

    constructor(
        showColumn: boolean = true,
        isEditable: boolean = false,
        isSortable: boolean = true,
    ) {
        super(showColumn, isEditable, isSortable);
    }

    value(listingWithScenarios: ListingWithScenariosResponseDTO): string | number | boolean {
        return TableHelper.getInitialInvestmentDetails(listingWithScenarios).transactions.Financing.breakdown["Loan Amount"];
    }

    protected _sort(listingWithScenarios: ListingWithScenariosResponseDTO[], sortDirection: SortDirection): ListingWithScenariosResponseDTO[] {
        return listingWithScenarios.sort((a, b) => {
            const aValue = TableHelper.getInitialInvestmentDetails(a).transactions.Financing.breakdown["Loan Amount"];
            const bValue = TableHelper.getInitialInvestmentDetails(b).transactions.Financing.breakdown["Loan Amount"];
            return this.genericSort(aValue, bValue, sortDirection);
        });
    }
}