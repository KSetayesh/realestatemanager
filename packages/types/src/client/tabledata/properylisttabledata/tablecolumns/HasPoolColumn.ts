import { ListingWithScenariosResponseDTO } from "../../../../server/InvestmentTypes";
import { isBoolean } from "../../../../utilities/Utility";
import { InputType, SortDirection } from "../../../types/ClientTypes";
import { PropertyColumnAccessorEnum } from "../table/PropertiesTableData";
import { TableHelper } from "../../TableHelper";
import { TableColumn } from "./TableColumn";
import { HAS_POOL } from "../../TableTitles";

export class HasPoolColumn extends TableColumn<ListingWithScenariosResponseDTO, PropertyColumnAccessorEnum> {

    protected _title: string = HAS_POOL;
    protected _accessor: PropertyColumnAccessorEnum = PropertyColumnAccessorEnum.HAS_POOL;
    protected _inputType: InputType = InputType.STRING;
    protected _isUrl: boolean = false;
    protected _isDollarAmount: boolean = false;
    protected _addSuffix: string = '';

    constructor(
        showColumn: boolean = false,
        isEditable: boolean = true,
        isSortable: boolean = true,
    ) {
        super(showColumn, isEditable, isSortable);
    }

    value(listingWithScenarios: ListingWithScenariosResponseDTO): string | number | boolean {
        return TableHelper.getListingDetails(listingWithScenarios).propertyDetails.hasPool;
    }

    protected _sort(listingWithScenarios: ListingWithScenariosResponseDTO[], sortDirection: SortDirection): ListingWithScenariosResponseDTO[] {
        return listingWithScenarios.sort((a, b) => {
            const aValue = TableHelper.getListingDetails(a).propertyDetails.hasPool;
            const bValue = TableHelper.getListingDetails(b).propertyDetails.hasPool;
            return this.genericSort(aValue, bValue, sortDirection);
        });
    }

    protected _isValidEdit(value: string): boolean {
        return isBoolean(value);
    }
}