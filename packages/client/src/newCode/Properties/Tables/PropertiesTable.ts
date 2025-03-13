import { ListingWithScenariosResponseDTO } from '@realestatemanager/types';
import { BasicColumn, BasicTable, InputType } from 'react-ui-library-ks-dev';
import { CreateTableInterface } from '../../types/CreateTableInterface';

export class CreatePropertiesTable implements CreateTableInterface<ListingWithScenariosResponseDTO> {

    createDefaultTable(data: ListingWithScenariosResponseDTO[]): BasicTable<ListingWithScenariosResponseDTO> {
        return new BasicTable<ListingWithScenariosResponseDTO>({
            data: data,
            title: 'High Yield Savings',
            description: 'High Yield Savings',
            isSortable: false,
            isFilterable: false,
            isEditable: false,
            isDeletable: false,
            isPageable: true,
            isSelectable: false,
            isMultiSelectable: false,
            isSearchable: false,
            columns: [
                new BasicColumn<ListingWithScenariosResponseDTO>({
                    key: 'price',
                    title: 'Price',
                    accessor: 'listingDetails',
                    inputType: InputType.MONEY,
                    isUrl: false,
                    isDollarAmount: true,
                    addSuffix: '',
                    showColumn: true,
                    isEditable: true,
                    isSortable: true,
                    detailedDescription: ''
                }),
                new BasicColumn<ListingWithScenariosResponseDTO>({
                    key: 'initialCosts',
                    title: 'Initial Costs',
                    accessor: 'listingDetails',
                    inputType: InputType.MONEY,
                    isUrl: false,
                    isDollarAmount: true,
                    addSuffix: '',
                    showColumn: true,
                    isEditable: false,
                    isSortable: true,
                    detailedDescription: ''
                }),
                new BasicColumn<ListingWithScenariosResponseDTO>({
                    key: 'loanAmount',
                    title: 'Loan Amount',
                    accessor: 'listingDetails',
                    inputType: InputType.MONEY,
                    isUrl: false,
                    isDollarAmount: true,
                    addSuffix: '',
                    showColumn: true,
                    isEditable: false,
                    isSortable: true,
                    detailedDescription: ''
                }),
                new BasicColumn<ListingWithScenariosResponseDTO>({
                    key: 'downPaymentAmount',
                    title: 'Down Payment',
                    accessor: 'listingDetails',
                    inputType: InputType.MONEY,
                    isUrl: false,
                    isDollarAmount: true,
                    addSuffix: '',
                    showColumn: true,
                    isEditable: false,
                    isSortable: true,
                    detailedDescription: ''
                }),
                new BasicColumn<ListingWithScenariosResponseDTO>({
                    key: 'downPaymentAmount',
                    title: 'Down Payment',
                    accessor: 'listingDetails',
                    inputType: InputType.PERCENTAGE,
                    isUrl: false,
                    isDollarAmount: false,
                    addSuffix: '%',
                    showColumn: true,
                    isEditable: false,
                    isSortable: true,
                    detailedDescription: ''
                }),
                new BasicColumn<ListingWithScenariosResponseDTO>({
                    key: 'recurringCosts',
                    title: 'Recurring Costs',
                    accessor: 'listingDetails',
                    inputType: InputType.MONEY,
                    isUrl: false,
                    isDollarAmount: true,
                    addSuffix: '',
                    showColumn: true,
                    isEditable: false,
                    isSortable: true,
                    detailedDescription: ''
                }),
                new BasicColumn<ListingWithScenariosResponseDTO>({
                    key: 'initialMonthlyAmount',
                    title: 'Initial Monthly Amount',
                    accessor: 'listingDetails',
                    inputType: InputType.MONEY,
                    isUrl: false,
                    isDollarAmount: true,
                    addSuffix: '',
                    showColumn: true,
                    isEditable: false,
                    isSortable: true,
                    detailedDescription: ''
                }),
                new BasicColumn<ListingWithScenariosResponseDTO>({
                    key: 'yearlyCashFlow',
                    title: 'Yearly Cash Flow',
                    accessor: 'listingDetails',
                    inputType: InputType.MONEY,
                    isUrl: false,
                    isDollarAmount: true,
                    addSuffix: '',
                    showColumn: true,
                    isEditable: false,
                    isSortable: true,
                    detailedDescription: ''
                }),
                new BasicColumn<ListingWithScenariosResponseDTO>({
                    key: 'dateListed',
                    title: 'Date Listed',
                    accessor: 'listingDetails',
                    inputType: InputType.DATE,
                    isUrl: false,
                    isDollarAmount: false,
                    addSuffix: '',
                    showColumn: true,
                    isEditable: false,
                    isSortable: true,
                    detailedDescription: ''
                }),
                new BasicColumn<ListingWithScenariosResponseDTO>({
                    key: 'dateCreated',
                    title: 'Date Created',
                    accessor: 'listingDetails',
                    inputType: InputType.DATE,
                    isUrl: false,
                    isDollarAmount: false,
                    addSuffix: '',
                    showColumn: true,
                    isEditable: false,
                    isSortable: true,
                    detailedDescription: ''
                }),
                new BasicColumn<ListingWithScenariosResponseDTO>({
                    key: 'creationType',
                    title: 'Creation Type',
                    accessor: 'listingDetails',
                    inputType: InputType.TEXT,
                    isUrl: false,
                    isDollarAmount: false,
                    addSuffix: '',
                    showColumn: false,
                    isEditable: false,
                    isSortable: false,
                    detailedDescription: ''
                }),
                new BasicColumn<ListingWithScenariosResponseDTO>({
                    key: 'investmentBreakdown',
                    title: 'Investment Breakdown',
                    accessor: 'listingDetails',
                    inputType: InputType.TEXT,
                    isUrl: false,
                    isDollarAmount: false,
                    addSuffix: '',
                    showColumn: true,
                    isEditable: false,
                    isSortable: false,
                    detailedDescription: ''
                }),
            ]
        });
    }

}