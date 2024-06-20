import { ListingWithScenariosResponseDTO } from "../../../../server/InvestmentTypes";
import { isBoolean } from "../../../../utilities/Utility";
import { SortDirection, TableColumnDetailsType } from "../../../types/ClientTypes";
import { TableHelper } from "../../TableHelper";
import { TableColumn } from "./TableColumn";
import { tableColumnDetailsMap } from "../../TableTitles";

export class HasGarageColumn extends TableColumn<ListingWithScenariosResponseDTO> {

    protected tableColumnDetails: TableColumnDetailsType = tableColumnDetailsMap.HAS_GARAGE;

    constructor(
        showColumn: boolean = false,
        isEditable: boolean = true,
        isSortable: boolean = true,
    ) {
        super(showColumn, isEditable, isSortable);
    }

    value(listingWithScenarios: ListingWithScenariosResponseDTO): string | number | boolean {
        return TableHelper.getListingDetails(listingWithScenarios).propertyDetails.hasGarage;
    }

    protected _sort(listingWithScenarios: ListingWithScenariosResponseDTO[], sortDirection: SortDirection): ListingWithScenariosResponseDTO[] {
        return listingWithScenarios.sort((a, b) => {
            const aValue = TableHelper.getListingDetails(a).propertyDetails.hasGarage;
            const bValue = TableHelper.getListingDetails(b).propertyDetails.hasGarage;
            return this.genericSort(aValue, bValue, sortDirection);
        });
    }

    protected _isValidEdit(value: string): boolean {
        return isBoolean(value);
    }
}