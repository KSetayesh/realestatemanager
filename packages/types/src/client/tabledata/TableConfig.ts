import { ColumnDetail } from "../types/ClientTypes";


export enum TableType {
    PROPERTY_LIST_TABLE = 'PROPERTY_LIST_TABLE',
    INVESTMENT_BREAKDOWN_TABLE = 'INVESTMENT_BREAKDOWN_TABLE',
    AGENT_TABLE = 'AGENT_TABLE',
    HIGH_YIELD_SAVINGS_TABLE = 'HIGH_YIELD_SAVINGS_TABLE',
}

export enum InvestmentBreakdownTableType {
    STANDARD_BREAKDOWN = "STANDARD_BREAKDOWN",
    MORTGAGE_BREAKDOWN = "MORTGAGE_BREAKDOWN",
    EXPENSES_BREAKDOWN = "EXPENSES_BREAKDOWN",
    INVESTMENT_BREAKDOWN = "INVESTMENT_BREAKDOWN",
}

export enum PropertiesListTableType {
    ALL = 'ALL',
    STANDARD_BREAKDOWN = "STANDARD_BREAKDOWN",
}

export enum DefaultTableType {
    DEFAULT = 'DEFAULT',
}

export type TableTypeMapping = {
    [TableType.PROPERTY_LIST_TABLE]: {
        [key in PropertiesListTableType]: ColumnDetail[]
    };
    [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
        [key in InvestmentBreakdownTableType]: ColumnDetail[]
    };
    [TableType.AGENT_TABLE]: {
        [key in DefaultTableType]: ColumnDetail[]
    };
    [TableType.HIGH_YIELD_SAVINGS_TABLE]: {
        [key in DefaultTableType]: ColumnDetail[]
    };
};

export type TableDetailType<T extends keyof TableTypeMapping> = {
    title: string;
    tableType: T;
    isEditable: boolean;
    canDeleteFromTable: boolean;
    isSortable: boolean;
    pageable: boolean;
    subTables: TableTypeMapping[T];
};

type TableDetailsType = {
    [K in TableType]: TableDetailType<K>;
};

export const tableDetails: TableDetailsType = {
    [TableType.PROPERTY_LIST_TABLE]: {
        title: 'Property List',
        tableType: TableType.PROPERTY_LIST_TABLE,
        isEditable: true,
        canDeleteFromTable: true,
        isSortable: true,
        pageable: true,
        subTables: {
            [PropertiesListTableType.ALL]: [],
            [PropertiesListTableType.STANDARD_BREAKDOWN]: [],
        },
    },
    [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
        title: 'Investment Breakdown',
        tableType: TableType.INVESTMENT_BREAKDOWN_TABLE,
        isEditable: false,
        canDeleteFromTable: false,
        isSortable: false,
        pageable: true,
        subTables: {
            [InvestmentBreakdownTableType.STANDARD_BREAKDOWN]: [],
            [InvestmentBreakdownTableType.EXPENSES_BREAKDOWN]: [],
            [InvestmentBreakdownTableType.MORTGAGE_BREAKDOWN]: [],
            [InvestmentBreakdownTableType.INVESTMENT_BREAKDOWN]: [],
        },
    },
    [TableType.AGENT_TABLE]: {
        title: 'Agent',
        tableType: TableType.AGENT_TABLE,
        isEditable: true,
        canDeleteFromTable: true,
        isSortable: true,
        pageable: true,
        subTables: {
            [DefaultTableType.DEFAULT]: [],
        },
    },
    [TableType.HIGH_YIELD_SAVINGS_TABLE]: {
        title: 'High Yield Savings',
        tableType: TableType.HIGH_YIELD_SAVINGS_TABLE,
        isEditable: false,
        canDeleteFromTable: false,
        isSortable: false,
        pageable: true,
        subTables: {
            [DefaultTableType.DEFAULT]: [],
        },
    },
};
