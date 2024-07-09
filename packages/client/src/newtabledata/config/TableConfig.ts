import {
    DefaultTableType,
    InvestmentBreakdownTableType,
    PropertiesListTableType,
    TableColumnDetailsEnum,
    TableDetailsType,
    TableType
} from "@realestatemanager/types";

export const tableDetails: TableDetailsType = {
    [TableType.PROPERTY_LIST_TABLE]: {
        title: 'Property List',
        tableType: TableType.PROPERTY_LIST_TABLE,
        isEditable: true,
        canDeleteFromTable: true,
        isSortable: true,
        pageable: true,
        exportToCSV: {
            buttonName: 'Export CSV',
            enabled: true,
        },
        subTables: {
            [PropertiesListTableType.ALL]: [
                TableColumnDetailsEnum.PROPERTY_TYPE,
                TableColumnDetailsEnum.PROPERTY_STATUS,
                TableColumnDetailsEnum.FULL_ADDRESS,
                TableColumnDetailsEnum.STATE,
                TableColumnDetailsEnum.ZIP_CODE,
                TableColumnDetailsEnum.ZILLOW_URL,
                TableColumnDetailsEnum.PRICE,
                TableColumnDetailsEnum.RENT_ESTIMATE,
                TableColumnDetailsEnum.INITIAL_COSTS,
                TableColumnDetailsEnum.LOAN_AMOUNT,
                TableColumnDetailsEnum.DOWN_PAYMENT_AMOUNT,
                TableColumnDetailsEnum.ANNUAL_INTEREST_RATE,
                TableColumnDetailsEnum.ROI,
                TableColumnDetailsEnum.CAP_RATE,
                TableColumnDetailsEnum.RECURRING_COSTS,
                TableColumnDetailsEnum.MONTHLY_PAYMENT,
                TableColumnDetailsEnum.MORTGAGE,
                TableColumnDetailsEnum.MONTHLY_CASH_FLOW,
                TableColumnDetailsEnum.YEARLY_CASH_FLOW,
                TableColumnDetailsEnum.NUMBER_OF_DAYS_ON_MARKET,
                TableColumnDetailsEnum.DATE_LISTED,
                TableColumnDetailsEnum.DATE_CREATED,
                TableColumnDetailsEnum.CITY,
                TableColumnDetailsEnum.COUNTY,
                TableColumnDetailsEnum.COUNTRY,
                TableColumnDetailsEnum.STREET_ADDRESS,
                TableColumnDetailsEnum.APARTMENT_NUMBER,
                TableColumnDetailsEnum.LONGITUDE,
                TableColumnDetailsEnum.LATITUDE,
                TableColumnDetailsEnum.ELEMENTARY_SCHOOL_RATING,
                TableColumnDetailsEnum.MIDDLE_SCHOOL_RATING,
                TableColumnDetailsEnum.HIGH_SCHOOL_RATING,
                TableColumnDetailsEnum.NUMBER_OF_BEDROOMS,
                TableColumnDetailsEnum.NUMBER_OF_FULL_BATHROOMS,
                TableColumnDetailsEnum.NUMBER_OF_HALF_BATHROOMS,
                TableColumnDetailsEnum.SQUARE_FEET,
                TableColumnDetailsEnum.ACRES,
                TableColumnDetailsEnum.YEAR_BUILT,
                TableColumnDetailsEnum.HAS_GARAGE,
                TableColumnDetailsEnum.HAS_POOL,
                TableColumnDetailsEnum.HAS_BASEMENT,
                TableColumnDetailsEnum.LISTING_PRICE,
                TableColumnDetailsEnum.ZESTIMATE,
                TableColumnDetailsEnum.ZILLOW_RENT_ESTIMATE,
                TableColumnDetailsEnum.ZESTIMATE_RANGE_LOW,
                TableColumnDetailsEnum.ZESTIMATE_RANGE_HIGH,
                TableColumnDetailsEnum.ZILLOW_MONTHLY_PROPERTY_TAX_AMOUNT,
                TableColumnDetailsEnum.ZILLOW_MONTHLY_HOME_INSURANCE_AMOUNT,
                TableColumnDetailsEnum.ZILLOW_MONTHLY_HOA_FEES_AMOUNT,
                TableColumnDetailsEnum.CREATION_TYPE,
                TableColumnDetailsEnum.DESCRIPTION,
                TableColumnDetailsEnum.INVESTMENT_BREAKDOWN_COLUMN,
            ],
            [PropertiesListTableType.STANDARD_BREAKDOWN]: [
                TableColumnDetailsEnum.PROPERTY_TYPE,
                TableColumnDetailsEnum.FULL_ADDRESS,
                TableColumnDetailsEnum.STATE,
                TableColumnDetailsEnum.ZIP_CODE,
                TableColumnDetailsEnum.ZILLOW_URL,
                TableColumnDetailsEnum.PRICE,
                TableColumnDetailsEnum.RENT_ESTIMATE,
                TableColumnDetailsEnum.INITIAL_COSTS,
                TableColumnDetailsEnum.LOAN_AMOUNT,
                TableColumnDetailsEnum.DOWN_PAYMENT_AMOUNT,
                TableColumnDetailsEnum.ANNUAL_INTEREST_RATE,
                TableColumnDetailsEnum.ROI,
                TableColumnDetailsEnum.CAP_RATE,
                TableColumnDetailsEnum.RECURRING_COSTS,
                TableColumnDetailsEnum.MONTHLY_PAYMENT,
                TableColumnDetailsEnum.MORTGAGE,
                TableColumnDetailsEnum.MONTHLY_CASH_FLOW,
                TableColumnDetailsEnum.YEARLY_CASH_FLOW,
                TableColumnDetailsEnum.NUMBER_OF_DAYS_ON_MARKET,
                TableColumnDetailsEnum.DATE_LISTED,
                TableColumnDetailsEnum.DATE_CREATED,
                TableColumnDetailsEnum.INVESTMENT_BREAKDOWN_COLUMN,
            ],
        },
    },
    [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
        title: 'Investment Breakdown',
        tableType: TableType.INVESTMENT_BREAKDOWN_TABLE,
        isEditable: false,
        canDeleteFromTable: false,
        isSortable: false,
        pageable: true,
        exportToCSV: {
            buttonName: 'Export CSV',
            enabled: true,
        },
        subTables: {
            [InvestmentBreakdownTableType.STANDARD_BREAKDOWN]: [
                TableColumnDetailsEnum.YEAR,
                TableColumnDetailsEnum.MONTH,
                TableColumnDetailsEnum.DATE,
                TableColumnDetailsEnum.MORTGAGE,
                TableColumnDetailsEnum.TOTAL_INTEREST_PAID,
                TableColumnDetailsEnum.TOTAL_PRINCIPAL_PAID,
                TableColumnDetailsEnum.REMAINING_BALANCE,
                TableColumnDetailsEnum.RENT_ESTIMATE,
                TableColumnDetailsEnum.MONTHLY_INCOME,
                TableColumnDetailsEnum.MONTHLY_EXPENSES,
                TableColumnDetailsEnum.MONTHLY_CASH_FLOW,
                TableColumnDetailsEnum.ACCUMULATED_CASH_FLOW,
                TableColumnDetailsEnum.APPRECIATION_AMOUNT,
            ],
            [InvestmentBreakdownTableType.EXPENSES_BREAKDOWN]: [
                TableColumnDetailsEnum.YEAR,
                TableColumnDetailsEnum.MONTH,
                TableColumnDetailsEnum.DATE,
                TableColumnDetailsEnum.PROPERTY_MANAGEMENT_AMOUNT,
                TableColumnDetailsEnum.VACANCY_AMOUNT,
                TableColumnDetailsEnum.MAINTENANCE_AMOUNT,
                TableColumnDetailsEnum.CAP_EX_RESERVE_AMOUNT,
                TableColumnDetailsEnum.OTHER_EXPENSE_AMOUNT,
                TableColumnDetailsEnum.OPERATIONAL_COSTS,
                TableColumnDetailsEnum.PROPERTY_TAX_AMOUNT,
                TableColumnDetailsEnum.MONTHLY_HOME_INSURANCE_AMOUNT,
                TableColumnDetailsEnum.MONTHLY_HOA_FEES_AMOUNT,
                TableColumnDetailsEnum.FIXED_COSTS,
                TableColumnDetailsEnum.MORTGAGE,
                TableColumnDetailsEnum.PMI_AMOUNT,
                TableColumnDetailsEnum.MONTHLY_PAYMENT,
                TableColumnDetailsEnum.MONTHLY_PAYMENT_AND_OPERATIONAL_COSTS,
            ],
            [InvestmentBreakdownTableType.MORTGAGE_BREAKDOWN]: [
                TableColumnDetailsEnum.YEAR,
                TableColumnDetailsEnum.MONTH,
                TableColumnDetailsEnum.DATE,
                TableColumnDetailsEnum.MORTGAGE,
                TableColumnDetailsEnum.PMI_AMOUNT,
                TableColumnDetailsEnum.INTEREST_PAYMENT,
                TableColumnDetailsEnum.PRINCIPAL_PAYMENT,
                TableColumnDetailsEnum.PERCENTAGE_OF_INTEREST,
                TableColumnDetailsEnum.PERCENTAGE_OF_PRINCIPAL,
                TableColumnDetailsEnum.TOTAL_INTEREST_PAID,
                TableColumnDetailsEnum.TOTAL_PRINCIPAL_PAID,
                TableColumnDetailsEnum.REMAINING_BALANCE,
            ],
            [InvestmentBreakdownTableType.INVESTMENT_BREAKDOWN]: [
                TableColumnDetailsEnum.YEAR,
                TableColumnDetailsEnum.MONTH,
                TableColumnDetailsEnum.DATE,
                TableColumnDetailsEnum.RENT_ESTIMATE,
                TableColumnDetailsEnum.MONTHLY_INCOME,
                TableColumnDetailsEnum.MONTHLY_EXPENSES,
                TableColumnDetailsEnum.MONTHLY_CASH_FLOW,
                TableColumnDetailsEnum.ACCUMULATED_CASH_FLOW,
                TableColumnDetailsEnum.EQUITY_AMOUNT,
                TableColumnDetailsEnum.NET_OPERATING_INCOME,
                TableColumnDetailsEnum.ACCUMULATED_NET_OPERATING_INCOME,
                TableColumnDetailsEnum.CAP_RATE,
                TableColumnDetailsEnum.ROI,
                TableColumnDetailsEnum.CASH_ON_CASH_RETURN,
                TableColumnDetailsEnum.MONTHLY_NET_INCOME,
                TableColumnDetailsEnum.ACCUMULATED_NET_INCOME,
                TableColumnDetailsEnum.APPRECIATION_AMOUNT,
            ],
        },
    },
    [TableType.AGENT_TABLE]: {
        title: 'Agent',
        tableType: TableType.AGENT_TABLE,
        isEditable: true,
        canDeleteFromTable: true,
        isSortable: true,
        pageable: true,
        exportToCSV: {
            buttonName: 'Export CSV',
            enabled: true,
        },
        subTables: {
            [DefaultTableType.DEFAULT]: [
                TableColumnDetailsEnum.FIRST_NAME,
                TableColumnDetailsEnum.LAST_NAME,
                TableColumnDetailsEnum.FULL_NAME,
                TableColumnDetailsEnum.WEBSITE,
                TableColumnDetailsEnum.COMPANY_NAME,
                TableColumnDetailsEnum.PHONE_NUMBER,
                TableColumnDetailsEnum.EMAIL,
                TableColumnDetailsEnum.COUNTRY,
                TableColumnDetailsEnum.STATE,
                TableColumnDetailsEnum.AGENT_TYPE,
            ],
        },
    },
    [TableType.HIGH_YIELD_SAVINGS_TABLE]: {
        title: 'High Yield Savings',
        tableType: TableType.HIGH_YIELD_SAVINGS_TABLE,
        isEditable: false,
        canDeleteFromTable: false,
        isSortable: false,
        pageable: true,
        exportToCSV: {
            buttonName: 'Export CSV',
            enabled: true,
        },
        subTables: {
            [DefaultTableType.DEFAULT]: [
                TableColumnDetailsEnum.YEAR,
                TableColumnDetailsEnum.MONTH,
                TableColumnDetailsEnum.DATE,
                TableColumnDetailsEnum.START_PRINCIPAL,
                TableColumnDetailsEnum.START_BALANCE,
                TableColumnDetailsEnum.INTEREST,
                TableColumnDetailsEnum.ACCUMULATED_INTEREST,
                TableColumnDetailsEnum.END_BALANCE,
                TableColumnDetailsEnum.END_PRINCIPAL,
            ],
        },
    },
    [TableType.RENT_CAST_DETAILS_TABLE]: {
        title: 'Rent Cast Details',
        tableType: TableType.RENT_CAST_DETAILS_TABLE,
        isEditable: false,
        canDeleteFromTable: false,
        isSortable: true,
        pageable: true,
        exportToCSV: {
            buttonName: 'Export CSV',
            enabled: false,
        },
        subTables: {
            [DefaultTableType.DEFAULT]: [
                TableColumnDetailsEnum.API_KEY_NAME,
                TableColumnDetailsEnum.CAN_MAKE_API_CALL,
                TableColumnDetailsEnum.API_CALLS_MAKE_THIS_MONTH,
                TableColumnDetailsEnum.REMAINING_NUMBER_OF_FREE_API_CALLS,
                TableColumnDetailsEnum.DAYS_INTO_BILLING_PERIOD,
                TableColumnDetailsEnum.BILLING_PERIOD,
                TableColumnDetailsEnum.MOST_RECENT_BILLING_DATE,
                TableColumnDetailsEnum.FIRST_BILLED_ON,
            ],
        },
    },
    [TableType.DUMMY_CSV_DATA_TABLE]: {
        title: 'Dummy CSV Data',
        tableType: TableType.DUMMY_CSV_DATA_TABLE,
        isEditable: false,
        canDeleteFromTable: false,
        isSortable: false,
        pageable: false,
        exportToCSV: {
            buttonName: 'Export CSV',
            enabled: false,
        },
        subTables: {
            [DefaultTableType.DEFAULT]: [
                TableColumnDetailsEnum.ZILLOW_URL,
                TableColumnDetailsEnum.FULL_ADDRESS,
                TableColumnDetailsEnum.STATE,
                TableColumnDetailsEnum.ZIP_CODE,
                TableColumnDetailsEnum.CITY,
                TableColumnDetailsEnum.COUNTY,
                TableColumnDetailsEnum.COUNTRY,
                TableColumnDetailsEnum.STREET_ADDRESS,
                TableColumnDetailsEnum.APARTMENT_NUMBER,
                TableColumnDetailsEnum.LONGITUDE,
                TableColumnDetailsEnum.LATITUDE,
                TableColumnDetailsEnum.NUMBER_OF_DAYS_ON_MARKET,
                TableColumnDetailsEnum.ELEMENTARY_SCHOOL_RATING,
                TableColumnDetailsEnum.MIDDLE_SCHOOL_RATING,
                TableColumnDetailsEnum.HIGH_SCHOOL_RATING,
                TableColumnDetailsEnum.NUMBER_OF_BEDROOMS,
                TableColumnDetailsEnum.NUMBER_OF_FULL_BATHROOMS,
                TableColumnDetailsEnum.NUMBER_OF_HALF_BATHROOMS,
                TableColumnDetailsEnum.SQUARE_FEET,
                TableColumnDetailsEnum.ACRES,
                TableColumnDetailsEnum.HAS_GARAGE,
                TableColumnDetailsEnum.HAS_POOL,
                TableColumnDetailsEnum.HAS_BASEMENT,
                TableColumnDetailsEnum.PROPERTY_TYPE,
                TableColumnDetailsEnum.PROPERTY_STATUS,
                TableColumnDetailsEnum.LISTING_PRICE,
                TableColumnDetailsEnum.ZESTIMATE,
                TableColumnDetailsEnum.ZILLOW_RENT_ESTIMATE,
                TableColumnDetailsEnum.ZESTIMATE_RANGE_LOW,
                TableColumnDetailsEnum.ZESTIMATE_RANGE_HIGH,
                TableColumnDetailsEnum.ZILLOW_MONTHLY_PROPERTY_TAX_AMOUNT,
                TableColumnDetailsEnum.ZILLOW_MONTHLY_HOME_INSURANCE_AMOUNT,
                TableColumnDetailsEnum.ZILLOW_MONTHLY_HOA_FEES_AMOUNT,
                TableColumnDetailsEnum.DESCRIPTION,
            ],
        },
    }
};
