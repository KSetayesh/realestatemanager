import { TableType } from "./TableColumnConfig";

export type TableDetailType = {
    title: string;
    tableType: TableType;
    isEditable: boolean;
    canDeleteFromTable: boolean;
    isSortable: boolean;
    pageable: boolean;
};

export type TableDetailsType = {
    [key in TableType]: TableDetailType;
};

export const tableDetails: TableDetailsType = {
    [TableType.PROPERTY_LIST_TABLE]: {
        title: '',
        tableType: TableType.PROPERTY_LIST_TABLE,
        isEditable: true,
        canDeleteFromTable: true,
        isSortable: true,
        pageable: true,
    },
    [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
        title: '',
        tableType: TableType.INVESTMENT_BREAKDOWN_TABLE,
        isEditable: false,
        canDeleteFromTable: false,
        isSortable: false,
        pageable: true,
    },
    [TableType.AGENT_TABLE]: {
        title: '',
        tableType: TableType.AGENT_TABLE,
        isEditable: true,
        canDeleteFromTable: true,
        isSortable: true,
        pageable: true,
    },
    [TableType.HIGH_YIELD_SAVINGS_TABLE]: {
        title: '',
        tableType: TableType.HIGH_YIELD_SAVINGS_TABLE,
        isEditable: false,
        canDeleteFromTable: false,
        isSortable: false,
        pageable: true,
    },
};