import { ListingWithScenariosResponseDTO } from "../../../../server/InvestmentTypes";
import { InputType, SortDirection } from "../../../types/ClientTypes";
import { PropertyColumnAccessorEnum } from "../table/PropertiesTableData";
import { TableHelper } from "../../TableHelper";
import { TableColumn } from "./TableColumn";
import { DOWN_PAYMENT_AMOUNT } from "../../TableTitles";

export class DownPaymentAmountColumn extends TableColumn<ListingWithScenariosResponseDTO, PropertyColumnAccessorEnum> {

    private _title: string = DOWN_PAYMENT_AMOUNT;
    private _accessor: PropertyColumnAccessorEnum = PropertyColumnAccessorEnum.DOWN_PAYMENT_AMOUNT;
    private _inputType: InputType = InputType.NUMBER;
    private _isUrl: boolean = false;
    private _isDollarAmount: boolean = true;
    private _addSuffix: string = '';

    constructor(
        showColumn: boolean = true,
        isEditable: boolean = false,
        isSortable: boolean = true,
    ) {
        super(showColumn, isEditable, isSortable);
    }

    get title(): string {
        return this._title;
    }

    get accessor(): PropertyColumnAccessorEnum {
        return this._accessor;
    }

    get inputType(): InputType {
        return this._inputType;
    }

    get isUrl(): boolean {
        return this._isUrl;
    }

    get isDollarAmount(): boolean {
        return this._isDollarAmount;
    }

    get addSuffix(): string {
        return this._addSuffix;
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

    protected _isValidEdit(value: string): boolean {
        throw new Error("Method not implemented.");
    }
}
