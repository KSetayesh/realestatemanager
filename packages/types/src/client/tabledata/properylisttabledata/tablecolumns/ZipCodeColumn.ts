import { ListingWithScenariosResponseDTO } from "../../../../server/InvestmentTypes";
import { InputType, SortDirection } from "../../../types/ClientTypes";
import { PropertyColumnAccessorEnum } from "../table/PropertiesTableData";
import { TableHelper } from "../../TableHelper";
import { TableColumn } from "./TableColumn";
import { ZIP_CODE } from "../../TableTitles";

export class ZipCodeColumn extends TableColumn<ListingWithScenariosResponseDTO, PropertyColumnAccessorEnum> {

    protected _title: string = ZIP_CODE;
    protected _accessor: PropertyColumnAccessorEnum = PropertyColumnAccessorEnum.ZIP_CODE;
    protected _inputType: InputType = InputType.STRING;
    protected _isUrl: boolean = false;
    protected _isDollarAmount: boolean = false;
    protected _addSuffix: string = '';

    constructor(
        showColumn: boolean = true,
        isEditable: boolean = false,
        isSortable: boolean = true,
    ) {
        super(showColumn, isEditable, isSortable);
    }

    value(listingWithScenarios: ListingWithScenariosResponseDTO): string | number | boolean {
        return TableHelper.getListingDetails(listingWithScenarios).propertyDetails.address.zipcode;
    }

    protected _sort(listingWithScenarios: ListingWithScenariosResponseDTO[], sortDirection: SortDirection): ListingWithScenariosResponseDTO[] {
        return listingWithScenarios.sort((a, b) => {
            const aValue = TableHelper.getListingDetails(a).propertyDetails.address.zipcode;
            const bValue = TableHelper.getListingDetails(b).propertyDetails.address.zipcode;
            return this.genericSort(aValue, bValue, sortDirection);
        });
    }

    protected _isValidEdit(value: string): boolean {
        throw new Error("Method not implemented.");
    }

}