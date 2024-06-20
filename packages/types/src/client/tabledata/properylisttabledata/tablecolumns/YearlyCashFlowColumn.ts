import { ListingWithScenariosResponseDTO } from "../../../../server/InvestmentTypes";
import { InputType, SortDirection, TableColumnDetailsType } from "../../../types/ClientTypes";
import { TableHelper } from "../../TableHelper";
import { TableColumn } from "./TableColumn";
import { tableColumnDetailsMap } from "../../TableTitles";

export class YearlyCashFlowColumn extends TableColumn<ListingWithScenariosResponseDTO> {

    protected tableColumnDetails: TableColumnDetailsType = tableColumnDetailsMap.YEARLY_CASH_FLOW;

    constructor(
        showColumn: boolean = true,
        isEditable: boolean = false,
        isSortable: boolean = true,
    ) {
        super(showColumn, isEditable, isSortable);
    }

    value(listingWithScenarios: ListingWithScenariosResponseDTO): string | number | boolean {
        return TableHelper.getInitialInvestmentDetails(listingWithScenarios).investmentBreakdown.yearlyCashFlow;
    }

    protected _sort(listingWithScenarios: ListingWithScenariosResponseDTO[], sortDirection: SortDirection): ListingWithScenariosResponseDTO[] {
        return listingWithScenarios.sort((a, b) => {
            const aValue = TableHelper.getInitialInvestmentDetails(a).investmentBreakdown.yearlyCashFlow;
            const bValue = TableHelper.getInitialInvestmentDetails(b).investmentBreakdown.yearlyCashFlow;
            return this.genericSort(aValue, bValue, sortDirection);
        });
    }
}