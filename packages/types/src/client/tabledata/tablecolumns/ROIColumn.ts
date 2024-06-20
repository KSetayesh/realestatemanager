import { ListingWithScenariosResponseDTO } from "../../../server/InvestmentTypes";
import { InputType } from "../../types/ClientTypes";
import { PropertyColumnAccessorEnum, SortDirection } from "../PropertiesTableData";
import { TableColumn } from "./TableColumn";

export class ROIColumn extends TableColumn {

    private _accessor: PropertyColumnAccessorEnum = PropertyColumnAccessorEnum.ROI;
    private _inputType: InputType = InputType.NUMBER;
    private _isUrl: boolean = false;
    private _isDollarAmount: boolean = false;
    private _addSuffix: string = '%';

    constructor(
        showColumn: boolean = true,
        isEditable: boolean = false,
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
        return this.getInitialInvestmentDetails(listingWithScenarios).investmentBreakdown.ROI;
    }

    protected _sort(listingWithScenarios: ListingWithScenariosResponseDTO[], sortDirection: SortDirection): ListingWithScenariosResponseDTO[] {
        return listingWithScenarios.sort((a, b) => {
            const aValue = this.getInitialInvestmentDetails(a).investmentBreakdown.ROI;
            const bValue = this.getInitialInvestmentDetails(b).investmentBreakdown.ROI;
            return this.genericSort(aValue, bValue, sortDirection);
        });
    }

    protected _isValidEdit(value: string): boolean {
        throw new Error("Method not implemented.");
    }
}