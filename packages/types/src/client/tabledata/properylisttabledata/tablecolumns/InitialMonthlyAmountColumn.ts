import { ListingWithScenariosResponseDTO } from "../../../../server/InvestmentTypes";
import { InputType, SortDirection } from "../../../types/ClientTypes";
import { PropertyColumnAccessorEnum } from "../table/PropertiesTableData";
import { TableHelper } from "../../TableHelper";
import { TableColumn } from "./TableColumn";
import { INITIAL_MONTHLY_AMOUNT } from "../../TableTitles";

export class InitialMonthlyAmountColumn extends TableColumn<ListingWithScenariosResponseDTO, PropertyColumnAccessorEnum> {

    protected _title: string = INITIAL_MONTHLY_AMOUNT;
    protected _accessor: PropertyColumnAccessorEnum = PropertyColumnAccessorEnum.INITIAL_MONTHLY_AMOUNT;
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