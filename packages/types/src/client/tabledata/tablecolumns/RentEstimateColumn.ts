import { ListingWithScenariosResponseDTO } from "../../../server/InvestmentTypes";
import { isInteger } from "../../../utilities/Utility";
import { InputType } from "../../types/ClientTypes";
import { PropertyColumnAccessorEnum, SortDirection } from "../PropertiesTableData";
import { TableColumn } from "./TableColumn"; 

export class RentEstimateColumn extends TableColumn {

    private _accessor: PropertyColumnAccessorEnum = PropertyColumnAccessorEnum.RENT_ESTIMATE;
    private _inputType: InputType = InputType.NUMBER;
    private _isUrl: boolean = false;
    private _isDollarAmount: boolean = true;
    private _addSuffix: string = '';

    constructor(
        showColumn: boolean = true,
        isEditable: boolean = true,
        isSortable: boolean = true,
    ) {
        super(showColumn, isEditable, isSortable);
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
        return this.getInitialInvestmentDetails(listingWithScenarios).transactions["Income Streams"].breakdown["Rental Income"].amount;
    }

    protected _sort(listingWithScenarios: ListingWithScenariosResponseDTO[], sortDirection: SortDirection): ListingWithScenariosResponseDTO[] {
        return listingWithScenarios.sort((a, b) => {
            const aValue = this.getInitialInvestmentDetails(a).transactions["Income Streams"].breakdown["Rental Income"].amount;
            const bValue = this.getInitialInvestmentDetails(b).transactions["Income Streams"].breakdown["Rental Income"].amount;
            return this.genericSort(aValue, bValue, sortDirection);
        });
    }

    protected _isValidEdit(value: string): boolean {
        return isInteger(value);
    }

}