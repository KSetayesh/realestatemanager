import { ListingWithScenariosResponseDTO } from "../../../server/InvestmentTypes";
import { isBoolean } from "../../../utilities/Utility";
import { InputType } from "../../types/ClientTypes";
import { PropertyColumnAccessorEnum, SortDirection } from "../PropertiesTableData";
import { TableColumn } from "./TableColumn";

export class HasBasementColumn extends TableColumn {

    private _accessor: PropertyColumnAccessorEnum = PropertyColumnAccessorEnum.HAS_BASEMENT;
    private _inputType: InputType = InputType.STRING;
    private _isUrl: boolean = false;
    private _isDollarAmount: boolean = false;
    private _addSuffix: string = '';

    constructor(
        showColumn: boolean = false,
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
        return this.getListingDetails(listingWithScenarios).propertyDetails.hasBasement;
    }

    protected _sort(listingWithScenarios: ListingWithScenariosResponseDTO[], sortDirection: SortDirection): ListingWithScenariosResponseDTO[] {
        return listingWithScenarios.sort((a, b) => {
            const aValue = this.getListingDetails(a).propertyDetails.hasBasement;
            const bValue = this.getListingDetails(b).propertyDetails.hasBasement;
            return this.genericSort(aValue, bValue, sortDirection);
        });
    }

    protected _isValidEdit(value: string): boolean {
        return isBoolean(value);
    }
}