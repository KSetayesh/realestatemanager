import { HighYeildSavingsResponseDTO } from '@realestatemanager/types';
import { BasicColumn, BasicTable, InputType } from 'react-ui-library-ks-dev';
import { CreateTableInterface } from '../../types/CreateTableInterface';

export class CreateHighYieldSavingsTable implements CreateTableInterface<HighYeildSavingsResponseDTO> {

    createDefaultTable(data: HighYeildSavingsResponseDTO[]): BasicTable<HighYeildSavingsResponseDTO> {

        return new BasicTable<HighYeildSavingsResponseDTO>({
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
                new BasicColumn<HighYeildSavingsResponseDTO>({
                    key: 'year',
                    title: 'Year',
                    accessor: (item: HighYeildSavingsResponseDTO) => item.year,
                    inputType: InputType.NUMBER,
                    isUrl: false,
                    isDollarAmount: false,
                    addSuffix: '',
                    showColumn: true,
                    isEditable: false,
                    isSortable: true,
                    detailedDescription: ''
                }),
                new BasicColumn<HighYeildSavingsResponseDTO>({
                    key: 'month',
                    title: 'Month',
                    accessor: (item: HighYeildSavingsResponseDTO) => item.month,
                    inputType: InputType.NUMBER,
                    isUrl: false,
                    isDollarAmount: false,
                    addSuffix: '',
                    showColumn: true,
                    isEditable: false,
                    isSortable: true,
                    detailedDescription: ''
                }),
                new BasicColumn<HighYeildSavingsResponseDTO>({
                    key: 'date',
                    title: 'Date',
                    accessor: (item: HighYeildSavingsResponseDTO) => item.date,
                    inputType: InputType.DATE,
                    isUrl: false,
                    isDollarAmount: false,
                    addSuffix: '',
                    showColumn: true,
                    isEditable: false,
                    isSortable: true,
                    detailedDescription: ''
                }),
                new BasicColumn<HighYeildSavingsResponseDTO>({
                    key: 'startPrincipal',
                    title: 'Start Principal',
                    accessor: (item: HighYeildSavingsResponseDTO) => item.startPrincipal,
                    inputType: InputType.DATE,
                    isUrl: false,
                    isDollarAmount: true,
                    addSuffix: '',
                    showColumn: true,
                    isEditable: false,
                    isSortable: true,
                    detailedDescription: ''
                }),
                new BasicColumn<HighYeildSavingsResponseDTO>({
                    key: 'startBalance',
                    title: 'Start Balance',
                    accessor: (item: HighYeildSavingsResponseDTO) => item.startBalance,
                    inputType: InputType.NUMBER,
                    isUrl: false,
                    isDollarAmount: true,
                    addSuffix: '',
                    showColumn: true,
                    isEditable: false,
                    isSortable: true,
                    detailedDescription: ''
                }),
                new BasicColumn<HighYeildSavingsResponseDTO>({
                    key: 'interest',
                    title: 'Interest',
                    accessor: (item: HighYeildSavingsResponseDTO) => item.interest,
                    inputType: InputType.NUMBER,
                    isUrl: false,
                    isDollarAmount: true,
                    addSuffix: '',
                    showColumn: true,
                    isEditable: false,
                    isSortable: true,
                    detailedDescription: ''
                }),
                new BasicColumn<HighYeildSavingsResponseDTO>({
                    key: 'accumulatedInterest',
                    title: 'Accumulated Interest',
                    accessor: (item: HighYeildSavingsResponseDTO) => item.accumulatedInterest,
                    inputType: InputType.NUMBER,
                    isUrl: false,
                    isDollarAmount: true,
                    addSuffix: '',
                    showColumn: true,
                    isEditable: false,
                    isSortable: true,
                    detailedDescription: ''
                }),
                new BasicColumn<HighYeildSavingsResponseDTO>({
                    key: 'endBalance',
                    title: 'End Balance',
                    accessor: (item: HighYeildSavingsResponseDTO) => item.endBalance,
                    inputType: InputType.NUMBER,
                    isUrl: false,
                    isDollarAmount: true,
                    addSuffix: '',
                    showColumn: true,
                    isEditable: false,
                    isSortable: true,
                    detailedDescription: ''
                }),
                new BasicColumn<HighYeildSavingsResponseDTO>({
                    key: 'endPrincipal',
                    title: 'End Principal',
                    accessor: (item: HighYeildSavingsResponseDTO) => item.endPrincipal,
                    inputType: InputType.NUMBER,
                    isUrl: false,
                    isDollarAmount: true,
                    addSuffix: '',
                    showColumn: true,
                    isEditable: false,
                    isSortable: true,
                    detailedDescription: ''
                }),
            ]
        });
    }
}