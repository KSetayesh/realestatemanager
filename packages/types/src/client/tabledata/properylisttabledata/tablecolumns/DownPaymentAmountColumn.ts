import { ListingWithScenariosResponseDTO } from "../../../../server/InvestmentTypes";
import { InputType, SortDirection } from "../../../types/ClientTypes";
import { PropertyColumnAccessorEnum } from "../table/PropertiesTableData";
import { TableHelper } from "../../TableHelper";
import { TableColumn } from "./TableColumn";
import { DOWN_PAYMENT_AMOUNT } from "../../TableTitles";

export class DownPaymentAmountColumn extends TableColumn<ListingWithScenariosResponseDTO, PropertyColumnAccessorEnum> {

    protected _title: string = DOWN_PAYMENT_AMOUNT;
    protected _accessor: PropertyColumnAccessorEnum = PropertyColumnAccessorEnum.DOWN_PAYMENT_AMOUNT;
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
