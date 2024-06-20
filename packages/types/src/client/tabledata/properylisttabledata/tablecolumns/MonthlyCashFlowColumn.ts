import { ListingWithScenariosResponseDTO } from "../../../../server/InvestmentTypes";
import { InputType, SortDirection } from "../../../types/ClientTypes";
import { PropertyColumnAccessorEnum } from "../table/PropertiesTableData";
import { TableHelper } from "../../TableHelper";
import { TableColumn } from "./TableColumn";
import { MONTHLY_CASH_FLOW } from "../../TableTitles";

export class MonthlyCashFlowColumn extends TableColumn<ListingWithScenariosResponseDTO, PropertyColumnAccessorEnum> {

    protected _title: string = MONTHLY_CASH_FLOW;
    protected _accessor: PropertyColumnAccessorEnum = PropertyColumnAccessorEnum.MONTHLY_CASH_FLOW;
    protected _inputType: InputType = InputType.NUMBER;
    protected _isUrl: boolean = false;
    protected _isDollarAmount: boolean = true;
    protected _addSuffix: string = '';

    constructor(
        showColumn: boolean = true,
        isEditable: boolean = false,
        isSortable: boolean = true,
    ) {
        super(showColumn, isEditable, isSortable);
    }

    value(listingWithScenarios: ListingWithScenariosResponseDTO): string | number | boolean {
        return TableHelper.getInitialInvestmentDetails(listingWithScenarios).investmentBreakdown.monthlyCashFlow;
    }

    protected _sort(listingWithScenarios: ListingWithScenariosResponseDTO[], sortDirection: SortDirection): ListingWithScenariosResponseDTO[] {
        return listingWithScenarios.sort((a, b) => {
            const aValue = TableHelper.getInitialInvestmentDetails(a).investmentBreakdown.monthlyCashFlow;
            const bValue = TableHelper.getInitialInvestmentDetails(b).investmentBreakdown.monthlyCashFlow;
            return this.genericSort(aValue, bValue, sortDirection);
        });
    }

}