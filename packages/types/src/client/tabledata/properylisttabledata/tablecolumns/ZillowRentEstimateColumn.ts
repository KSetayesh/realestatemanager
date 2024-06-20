import { ListingWithScenariosResponseDTO } from "../../../../server/InvestmentTypes";
import { isInteger } from "../../../../utilities/Utility";
import { InputType, SortDirection } from "../../../types/ClientTypes";
import { PropertyColumnAccessorEnum } from "../table/PropertiesTableData";
import { TableHelper } from "../../TableHelper";
import { TableColumn } from "./TableColumn";
import { ZILLOW_RENT_ESTIMATE } from "../../TableTitles";

export class ZillowRentEstimateColumn extends TableColumn<ListingWithScenariosResponseDTO, PropertyColumnAccessorEnum> {

    protected _title: string = ZILLOW_RENT_ESTIMATE;
    protected _accessor: PropertyColumnAccessorEnum = PropertyColumnAccessorEnum.ZILLOW_RENT_ESTIMATE;
    protected _inputType: InputType = InputType.NUMBER;
    protected _isUrl: boolean = false;
    protected _isDollarAmount: boolean = true;
    protected _addSuffix: string = '';

    constructor(
        showColumn: boolean = false,
        isEditable: boolean = true,
        isSortable: boolean = true,
    ) {
        super(showColumn, isEditable, isSortable);
    }

    get addSuffix(): string {
        return this._addSuffix;
    }

    value(listingWithScenarios: ListingWithScenariosResponseDTO): string | number | boolean {
        return TableHelper.getListingDetails(listingWithScenarios).zillowMarketEstimates.zillowRentEstimate;
    }

    protected _sort(listingWithScenarios: ListingWithScenariosResponseDTO[], sortDirection: SortDirection): ListingWithScenariosResponseDTO[] {
        return listingWithScenarios.sort((a, b) => {
            const aValue = TableHelper.getListingDetails(a).zillowMarketEstimates.zillowRentEstimate;
            const bValue = TableHelper.getListingDetails(b).zillowMarketEstimates.zillowRentEstimate;
            return this.genericSort(aValue, bValue, sortDirection);
        });
    }

    protected _isValidEdit(value: string): boolean {
        return isInteger(value);
    }
}