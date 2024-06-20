import { ListingWithScenariosResponseDTO } from "../../../../server/InvestmentTypes";
import { SortDirection, TableColumnDetailsType } from "../../../types/ClientTypes";
import { TableHelper } from "../../TableHelper";
import { TableColumn } from "./TableColumn";
import { tableColumnDetailsMap } from "../../TableTitles";

export class StreetAddressColumn extends TableColumn<ListingWithScenariosResponseDTO> {

    protected tableColumnDetails: TableColumnDetailsType = tableColumnDetailsMap.STREET_ADDRESS;

    constructor(
        showColumn: boolean = false,
        isEditable: boolean = false,
        isSortable: boolean = true,
    ) {
        super(showColumn, isEditable, isSortable);
    }

    value(listingWithScenarios: ListingWithScenariosResponseDTO): string | number | boolean {
        return TableHelper.getListingDetails(listingWithScenarios).propertyDetails.address.country;
    }

    protected _sort(listingWithScenarios: ListingWithScenariosResponseDTO[], sortDirection: SortDirection): ListingWithScenariosResponseDTO[] {
        return listingWithScenarios.sort((a, b) => {
            const aValue = TableHelper.getListingDetails(a).propertyDetails.address.streetAddress;
            const bValue = TableHelper.getListingDetails(b).propertyDetails.address.streetAddress;
            return this.genericSort(aValue, bValue, sortDirection);
        });
    }
}