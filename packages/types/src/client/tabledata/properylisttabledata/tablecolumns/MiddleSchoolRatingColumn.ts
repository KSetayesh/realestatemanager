import { ListingWithScenariosResponseDTO } from "../../../../server/InvestmentTypes";
import { isInteger } from "../../../../utilities/Utility";
import { InputType, SortDirection } from "../../../types/ClientTypes";
import { PropertyColumnAccessorEnum } from "../table/PropertiesTableData";
import { TableHelper } from "../../TableHelper";
import { TableColumn } from "./TableColumn";
import { MIDDLE_SCHOOL_RATING } from "../../TableTitles";

export class MiddleSchoolRatingColumn extends TableColumn<ListingWithScenariosResponseDTO, PropertyColumnAccessorEnum> {

    protected _title: string = MIDDLE_SCHOOL_RATING;
    protected _accessor: PropertyColumnAccessorEnum = PropertyColumnAccessorEnum.MIDDLE_SCHOOL_RATING;
    protected _inputType: InputType = InputType.NUMBER;
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
        return TableHelper.getListingDetails(listingWithScenarios).propertyDetails.schoolRating.middleSchoolRating;
    }

    protected _sort(listingWithScenarios: ListingWithScenariosResponseDTO[], sortDirection: SortDirection): ListingWithScenariosResponseDTO[] {
        return listingWithScenarios.sort((a, b) => {
            const aValue = TableHelper.getListingDetails(a).propertyDetails.schoolRating.middleSchoolRating;
            const bValue = TableHelper.getListingDetails(b).propertyDetails.schoolRating.middleSchoolRating;
            return this.genericSort(aValue, bValue, sortDirection);
        });
    }

    protected _isValidEdit(value: string): boolean {
        return isInteger(value) && (Number(value) > 0 && Number(value) <= 10);
    }
}