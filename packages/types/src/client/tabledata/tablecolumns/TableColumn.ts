import { GrowthProjectionsResponseDTO, InitialInvestmentBreakdownResponseDTO, ListingWithScenariosResponseDTO, TaxImplicationsResponseDTO } from "../../../server/InvestmentTypes";
import { ListingDetailsResponseDTO } from "../../../server/ListingTypes";
import { InputType } from "../../types/ClientTypes";
import { PropertyColumnAccessorEnum, SortDirection } from "../PropertiesTableData";
import { TableTitles } from "../TableTitles";

export abstract class TableColumn {
    private _showColumn: boolean;
    private _isEditable: boolean;
    private _isSortable: boolean;
    private _detailedDescription?: string;

    constructor(
        showColumn: boolean,
        isEditable: boolean,
        isSortable: boolean,
        detailedDescription?: string,
    ) {
        this._showColumn = showColumn;
        this._isEditable = isEditable;
        this._isSortable = isSortable;
        this._detailedDescription = detailedDescription;
    }

    protected abstract _sort(listingWithScenarios: ListingWithScenariosResponseDTO[], sortDirection: SortDirection): ListingWithScenariosResponseDTO[];

    protected abstract _isValidEdit(value: string): boolean;

    abstract value(listingWithScenarios: ListingWithScenariosResponseDTO): number | string | boolean;

    abstract get accessor(): PropertyColumnAccessorEnum;

    abstract get inputType(): InputType;

    abstract get isUrl(): boolean;

    abstract get isDollarAmount(): boolean;

    abstract get addSuffix(): string;

    protected genericSort(
        aValue: number | string | boolean,
        bValue: number | string | boolean,
        sortDirection: SortDirection
    ): number {
        if (typeof aValue === 'string' && typeof bValue === 'string') {
            return sortDirection === SortDirection.ASCENDING
                ? aValue.localeCompare(bValue)
                : bValue.localeCompare(aValue);
        }

        if (typeof aValue === 'number' && typeof bValue === 'number') {
            return sortDirection === SortDirection.ASCENDING
                ? aValue - bValue
                : bValue - aValue;
        }

        if (typeof aValue === 'boolean' && typeof bValue === 'boolean') {
            return sortDirection === SortDirection.ASCENDING
                ? (aValue === bValue ? 0 : aValue ? -1 : 1)
                : (aValue === bValue ? 0 : aValue ? 1 : -1);
        }

        // For mixed types or unhandled types, treat as equal
        return 0;
    }

    protected getInitialInvestmentDetails(property: ListingWithScenariosResponseDTO): InitialInvestmentBreakdownResponseDTO {
        return property.metrics.initialInvestmentDetails;
    }

    protected getGrowthProjections(property: ListingWithScenariosResponseDTO): GrowthProjectionsResponseDTO {
        return property.metrics.growthProjections;
    }

    protected getTaxImplications(property: ListingWithScenariosResponseDTO): TaxImplicationsResponseDTO {
        return property.metrics.taxImplications;
    }

    protected getListingDetails(property: ListingWithScenariosResponseDTO): ListingDetailsResponseDTO {
        return property.listingDetails;
    }

    sort(listingWithScenarios: ListingWithScenariosResponseDTO[], sortDirection: SortDirection): ListingWithScenariosResponseDTO[] {
        if (!this.isSortable) {
            return listingWithScenarios;
        }
        this._sort(listingWithScenarios, sortDirection);
    }

    isValidEdit(value: string): boolean {
        if (!this.isEditable) {
            return false;
        }
        this._isValidEdit(value);
    }

    get title(): string {
        return TableTitles[this.accessor];
    }

    get showColumn(): boolean {
        return this._showColumn;
    }

    get isEditable(): boolean {
        return this._isEditable;
    }

    get isSortable(): boolean {
        return this._isSortable;
    }

    get detailedDescription(): string {
        return this._detailedDescription;
    }

}