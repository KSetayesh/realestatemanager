import { ListingWithScenariosResponseDTO } from "../../../../server/InvestmentTypes";
import { InputType, SortDirection } from "../../../types/ClientTypes";
import { PropertyColumnAccessorEnum } from "../table/PropertiesTableData";
import { TableHelper } from "../../TableHelper";
import { TableColumn } from "./TableColumn";
import { CAP_RATE } from "../../TableTitles";

export class CapRateColumn extends TableColumn<ListingWithScenariosResponseDTO, PropertyColumnAccessorEnum> {

    protected _title: string = CAP_RATE;
    protected _accessor: PropertyColumnAccessorEnum = PropertyColumnAccessorEnum.CAP_RATE;
    protected _inputType: InputType = InputType.NUMBER;
    protected _isUrl: boolean = false;
    protected _isDollarAmount: boolean = false;
    protected _addSuffix: string = '%';

    constructor(
        showColumn: boolean = true,
        isEditable: boolean = false,
        isSortable: boolean = true,
    ) {
        super(showColumn, isEditable, isSortable);
    }

    value(listingWithScenarios: ListingWithScenariosResponseDTO): string | number | boolean {
        return TableHelper.getInitialInvestmentDetails(listingWithScenarios).investmentBreakdown.capRate;
    }

    protected _sort(listingWithScenarios: ListingWithScenariosResponseDTO[], sortDirection: SortDirection): ListingWithScenariosResponseDTO[] {
        return listingWithScenarios.sort((a, b) => {
            const aValue = TableHelper.getInitialInvestmentDetails(a).investmentBreakdown.capRate;
            const bValue = TableHelper.getInitialInvestmentDetails(b).investmentBreakdown.capRate;
            return this.genericSort(aValue, bValue, sortDirection);
        });
    }

    protected _isValidEdit(value: string): boolean {
        throw new Error("Method not implemented.");
    }
}