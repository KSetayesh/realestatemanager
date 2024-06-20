import { ListingWithScenariosResponseDTO } from "../../../../server/InvestmentTypes";
import { isInteger } from "../../../../utilities/Utility";
import { SortDirection, TableColumnDetailsType } from "../../../types/ClientTypes";
import { TableHelper } from "../../TableHelper";
import { TableColumn } from "./TableColumn";
import { tableColumnDetailsMap } from "../../TableTitles";

export class NumberOfHalfBathroomsColumn extends TableColumn<ListingWithScenariosResponseDTO> {

    protected tableColumnDetails: TableColumnDetailsType = tableColumnDetailsMap.NUMBER_OF_HALF_BATHROOMS;

    constructor(
        showColumn: boolean = false,
        isEditable: boolean = true,
        isSortable: boolean = true,
    ) {
        super(showColumn, isEditable, isSortable);
    }

    value(listingWithScenarios: ListingWithScenariosResponseDTO): string | number | boolean {
        return TableHelper.getListingDetails(listingWithScenarios).propertyDetails.numberOfHalfBathrooms;
    }

    protected _sort(listingWithScenarios: ListingWithScenariosResponseDTO[], sortDirection: SortDirection): ListingWithScenariosResponseDTO[] {
        return listingWithScenarios.sort((a, b) => {
            const aValue = TableHelper.getListingDetails(a).propertyDetails.numberOfHalfBathrooms;
            const bValue = TableHelper.getListingDetails(b).propertyDetails.numberOfHalfBathrooms;
            return this.genericSort(aValue, bValue, sortDirection);
        });
    }

    protected _isValidEdit(value: string): boolean {
        return isInteger(value);
    }
}