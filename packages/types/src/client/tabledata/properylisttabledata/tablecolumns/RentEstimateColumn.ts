import { ListingWithScenariosResponseDTO } from "../../../../server/InvestmentTypes";
import { isInteger } from "../../../../utilities/Utility";
import { SortDirection, TableColumnDetailsType } from "../../../types/ClientTypes";
import { TableHelper } from "../../TableHelper";
import { TableColumn } from "./TableColumn";
import { tableColumnDetailsMap } from "../../TableTitles";

export class RentEstimateColumn extends TableColumn<ListingWithScenariosResponseDTO> {

    protected tableColumnDetails: TableColumnDetailsType = tableColumnDetailsMap.RENT_ESTIMATE;

    constructor(
        showColumn: boolean = true,
        isEditable: boolean = true,
        isSortable: boolean = true,
    ) {
        super(showColumn, isEditable, isSortable);
    }

    value(listingWithScenarios: ListingWithScenariosResponseDTO): string | number | boolean {
        return TableHelper.getInitialInvestmentDetails(listingWithScenarios).transactions["Income Streams"].breakdown["Rental Income"].amount;
    }

    protected _sort(listingWithScenarios: ListingWithScenariosResponseDTO[], sortDirection: SortDirection): ListingWithScenariosResponseDTO[] {
        return listingWithScenarios.sort((a, b) => {
            const aValue = TableHelper.getInitialInvestmentDetails(a).transactions["Income Streams"].breakdown["Rental Income"].amount;
            const bValue = TableHelper.getInitialInvestmentDetails(b).transactions["Income Streams"].breakdown["Rental Income"].amount;
            return this.genericSort(aValue, bValue, sortDirection);
        });
    }

    protected _isValidEdit(value: string): boolean {
        return isInteger(value);
    }

}