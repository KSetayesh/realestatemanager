import { ListingWithScenariosResponseDTO } from "../../../../server/InvestmentTypes";
import { isInteger } from "../../../../utilities/Utility";
import { InputType, SortDirection } from "../../../types/ClientTypes";
import { PropertyColumnAccessorEnum } from "../table/PropertiesTableData";
import { TableHelper } from "../../TableHelper";
import { TableColumn } from "./TableColumn";
import { ZILLOW_MONTHLY_HOME_INSURANCE_AMOUNT } from "../../TableTitles";

export class ZillowMonthlyHomeInsuranceAmountColumn extends TableColumn<ListingWithScenariosResponseDTO, PropertyColumnAccessorEnum> {

    protected _title: string = ZILLOW_MONTHLY_HOME_INSURANCE_AMOUNT;
    protected _accessor: PropertyColumnAccessorEnum = PropertyColumnAccessorEnum.ZILLOW_MONTHLY_HOME_INSURANCE_AMOUNT;
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

    value(listingWithScenarios: ListingWithScenariosResponseDTO): string | number | boolean {
        return TableHelper.getListingDetails(listingWithScenarios).zillowMarketEstimates.zillowMonthlyHomeInsuranceAmount;
    }

    protected _sort(listingWithScenarios: ListingWithScenariosResponseDTO[], sortDirection: SortDirection): ListingWithScenariosResponseDTO[] {
        return listingWithScenarios.sort((a, b) => {
            const aValue = TableHelper.getListingDetails(a).zillowMarketEstimates.zillowMonthlyHomeInsuranceAmount;
            const bValue = TableHelper.getListingDetails(b).zillowMarketEstimates.zillowMonthlyHomeInsuranceAmount;
            return this.genericSort(aValue, bValue, sortDirection);
        });
    }

    protected _isValidEdit(value: string): boolean {
        return isInteger(value);
    }

}