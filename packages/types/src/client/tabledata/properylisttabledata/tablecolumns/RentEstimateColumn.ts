import { ListingWithScenariosResponseDTO } from "../../../../server/InvestmentTypes";
import { isInteger } from "../../../../utilities/Utility";
import { InputType, SortDirection } from "../../../types/ClientTypes";
import { PropertyColumnAccessorEnum } from "../table/PropertiesTableData";
import { TableHelper } from "../../TableHelper";
import { TableColumn } from "./TableColumn";
import { RENT_ESTIMATE } from "../../TableTitles";

export class RentEstimateColumn extends TableColumn<ListingWithScenariosResponseDTO, PropertyColumnAccessorEnum> {

    protected _title: string = RENT_ESTIMATE;
    protected _accessor: PropertyColumnAccessorEnum = PropertyColumnAccessorEnum.RENT_ESTIMATE;
    protected _inputType: InputType = InputType.NUMBER;
    protected _isUrl: boolean = false;
    protected _isDollarAmount: boolean = true;
    protected _addSuffix: string = '';

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