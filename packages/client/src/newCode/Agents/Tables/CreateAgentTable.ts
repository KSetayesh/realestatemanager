import { AgentResponseDTO } from '@realestatemanager/types';
import { BasicColumn, BasicTable, InputType } from 'react-ui-library-ks-dev';
import { CreateTableInterface } from '../../types/CreateTableInterface';

export class CreateAgentsTable implements CreateTableInterface<AgentResponseDTO> {

    createDefaultTable(data: AgentResponseDTO[]): BasicTable<AgentResponseDTO> {

        return new BasicTable<AgentResponseDTO>({
            data: data,
            title: 'Agent',
            description: 'Agent',
            isSortable: true,
            isFilterable: true,
            isEditable: true,
            isDeletable: true,
            isPageable: true,
            isSelectable: true,
            isMultiSelectable: false,
            isSearchable: true,
            columns: [
                new BasicColumn<AgentResponseDTO>({
                    key: 'firstName',
                    title: 'First Name',
                    accessor: (item: AgentResponseDTO) => item.firstName,
                    inputType: InputType.TEXT,
                    isUrl: false,
                    isDollarAmount: false,
                    addSuffix: '',
                    showColumn: true,
                    isEditable: true,
                    isSortable: true,
                    detailedDescription: ''
                }),
                new BasicColumn<AgentResponseDTO>({
                    key: 'lastName',
                    title: 'Last Name',
                    accessor: (item: AgentResponseDTO) => item.lastName,
                    inputType: InputType.TEXT,
                    isUrl: false,
                    isDollarAmount: false,
                    addSuffix: '',
                    showColumn: true,
                    isEditable: true,
                    isSortable: true,
                    detailedDescription: ''
                }),
                new BasicColumn<AgentResponseDTO>({
                    key: 'fullName',
                    title: 'Full Name',
                    accessor: (item: AgentResponseDTO) => item.fullName,
                    inputType: InputType.TEXT,
                    isUrl: false,
                    isDollarAmount: false,
                    addSuffix: '',
                    showColumn: true,
                    isEditable: true,
                    isSortable: true,
                    detailedDescription: ''
                }),
                new BasicColumn<AgentResponseDTO>({
                    key: 'website',
                    title: 'Website',
                    accessor: (item: AgentResponseDTO) => item.website,
                    inputType: InputType.URL,
                    isUrl: true,
                    isDollarAmount: false,
                    addSuffix: '',
                    showColumn: true,
                    isEditable: true,
                    isSortable: true,
                    detailedDescription: ''
                }),
                new BasicColumn<AgentResponseDTO>({
                    key: 'companyName',
                    title: 'Company Name',
                    accessor: (item: AgentResponseDTO) => item.companyName,
                    inputType: InputType.TEXT,
                    isUrl: false,
                    isDollarAmount: false,
                    addSuffix: '',
                    showColumn: true,
                    isEditable: true,
                    isSortable: true,
                    detailedDescription: ''
                }),
                new BasicColumn<AgentResponseDTO>({
                    key: 'phoneNumber',
                    title: 'Phone Number',
                    accessor: (item: AgentResponseDTO) => item.phoneNumber,
                    inputType: InputType.PHONE,
                    isUrl: false,
                    isDollarAmount: false,
                    addSuffix: '',
                    showColumn: true,
                    isEditable: true,
                    isSortable: true,
                    detailedDescription: ''
                }),
                new BasicColumn<AgentResponseDTO>({
                    key: 'email',
                    title: 'Email',
                    accessor: (item: AgentResponseDTO) => item.email,
                    inputType: InputType.EMAIL,
                    isUrl: false,
                    isDollarAmount: false,
                    addSuffix: '',
                    showColumn: true,
                    isEditable: true,
                    isSortable: true,
                    detailedDescription: ''
                }),
                new BasicColumn<AgentResponseDTO>({
                    key: 'country',
                    title: 'Country',
                    accessor: (item: AgentResponseDTO) => item.country,
                    inputType: InputType.TEXT,
                    isUrl: false,
                    isDollarAmount: false,
                    addSuffix: '',
                    showColumn: true,
                    isEditable: true,
                    isSortable: true,
                    detailedDescription: ''
                }),
                new BasicColumn<AgentResponseDTO>({
                    key: 'state',
                    title: 'State',
                    accessor: (item: AgentResponseDTO) => item.state,
                    inputType: InputType.TEXT,
                    isUrl: false,
                    isDollarAmount: false,
                    addSuffix: '',
                    showColumn: true,
                    isEditable: true,
                    isSortable: true,
                    detailedDescription: ''
                }),
                new BasicColumn<AgentResponseDTO>({
                    key: 'agentType',
                    title: 'Agent Type',
                    accessor: (item: AgentResponseDTO) => item.agentType,
                    inputType: InputType.TEXT,
                    isUrl: false,
                    isDollarAmount: false,
                    addSuffix: '',
                    showColumn: true,
                    isEditable: true,
                    isSortable: true,
                    detailedDescription: ''
                }),
            ]
        });
    }
}