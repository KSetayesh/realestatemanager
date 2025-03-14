import { ListingWithScenariosResponseDTO } from '@realestatemanager/types';
import { BasicColumn, BasicTable, InputType } from 'react-ui-library-ks-dev';
import { CreateTableInterface } from '../../types/CreateTableInterface';
import { PropertiesListTableHelper } from './PropertiesListTableHelper';

export class CreatePropertiesTable implements CreateTableInterface<ListingWithScenariosResponseDTO> {

    createDefaultTable(data: ListingWithScenariosResponseDTO[]): BasicTable<ListingWithScenariosResponseDTO> {
        console.log(data);
        return new BasicTable<ListingWithScenariosResponseDTO>({
            data: data,
            title: 'Properties',
            description: 'Properties',
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
                    // accessor: 'listingDetails',
                    accessor: (item: ListingWithScenariosResponseDTO) => PropertiesListTableHelper.getPrice(item),
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
                    accessor: (item: ListingWithScenariosResponseDTO) => PropertiesListTableHelper.getInitialCosts(item),
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
                    accessor: (item: ListingWithScenariosResponseDTO) => PropertiesListTableHelper.getLoanAmount(item),
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
                    accessor: (item: ListingWithScenariosResponseDTO) => PropertiesListTableHelper.getDownPaymentAmount(item),
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
                    accessor: (item: ListingWithScenariosResponseDTO) => PropertiesListTableHelper.getDownPaymentPercentage(item),
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
                    accessor: (item: ListingWithScenariosResponseDTO) => PropertiesListTableHelper.getRecurringCosts(item),
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
                    accessor: (item: ListingWithScenariosResponseDTO) => PropertiesListTableHelper.getInitialMonthlyAmount(item),
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
                    accessor: (item: ListingWithScenariosResponseDTO) => PropertiesListTableHelper.getYearlyCashFlow(item),
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
                    accessor: (item: ListingWithScenariosResponseDTO) => PropertiesListTableHelper.getDateListed(item),
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
                    accessor: (item: ListingWithScenariosResponseDTO) => PropertiesListTableHelper.getDateCreated(item),
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
                    accessor: (item: ListingWithScenariosResponseDTO) => PropertiesListTableHelper.getCreationType(item),
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
                    accessor: (item: ListingWithScenariosResponseDTO) => undefined, // Come back to this
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