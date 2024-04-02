//-----Enums----

export enum HomeType {
    Condo = "Condo",
    SingleFamilyHome = "Single Family Home",
    TownHome = "Town Home",
    MultiFamilyHome = "Multi Family Home",
};

export enum Country {
    UnitedStates = "US",
};

export enum State {
    AL = "Alabama",
    AK = "Alaska",
    AZ = "Arizona",
    AR = "Arkansas",
    CA = "California",
    CO = "Colorado",
    CT = "Connecticut",
    DE = "Delaware",
    FL = "Florida",
    GA = "Georgia",
    HI = "Hawaii",
    ID = "Idaho",
    IL = "Illinois",
    IN = "Indiana",
    IA = "Iowa",
    KS = "Kansas",
    KY = "Kentucky",
    LA = "Louisiana",
    ME = "Maine",
    MD = "Maryland",
    MA = "Massachusetts",
    MI = "Michigan",
    MN = "Minnesota",
    MS = "Mississippi",
    MO = "Missouri",
    MT = "Montana",
    NE = "Nebraska",
    NV = "Nevada",
    NH = "New Hampshire",
    NJ = "New Jersey",
    NM = "New Mexico",
    NY = "New York",
    NC = "North Carolina",
    ND = "North Dakota",
    OH = "Ohio",
    OK = "Oklahoma",
    OR = "Oregon",
    PA = "Pennsylvania",
    RI = "Rhode Island",
    SC = "South Carolina",
    SD = "South Dakota",
    TN = "Tennessee",
    TX = "Texas",
    UT = "Utah",
    VT = "Vermont",
    VA = "Virginia",
    WA = "Washington",
    WV = "West Virginia",
    WI = "Wisconsin",
    WY = "Wyoming",
};

export enum InterestType {
    FIXED = "Fixed",
    VARIABLE = "Variable",
};

export enum FinancingType {
    MORTGAGE = 'Mortgage',
    SELLER_FINANCING = 'SellerFinancing',
    PRIVATE_LOAN = 'PrivateLoan',
    OTHER = 'Other',
};

export enum ValueType {
    AMOUNT = 'Amount',
    RATE = 'Rate',
};

export enum DefaultInvestmentRates {
    PMI_RATE = 0, // PMI rate expressed as a percentage of the loan amount annually.
    PMI_DROP_OFF_POINT = 0.78,
    ANNUAL_INTEREST_RATE = 7, // Annual Interest rate of loan.
    DOWN_PAYMENT_PERCENTAGE = 20, // Typical down payment percentage for avoiding PMI.
    PROPERTY_MANAGEMENT_RATE = 10, // Percentage of rental income paid for property management.
    VACANCY_RATE = 10, // Percentage of the year that the property is expected to be vacant.
    MAINTENANCE_RATE = 1, // Percentage of the property's value allocated annually for maintenance.
    OTHER_EXPENSES_RATE = 3, // Miscellaneous expenses as a percentage of rental income.
    CAP_EX_RESERVE_RATE = 5, // Capital expenditure reserve as a percentage of rental income.
    LEGAL_AND_PROFESSIONAL_FEES = 1500, // Flat rate for legal and professional fees during purchase, in dollars.
    INITIAL_REPAIR_COST_RATE = 2, //5000, // Estimated initial repair costs in dollars.
    TRAVELING_COSTS = 0,
    OTHER_INITIAL_EXPENSES_RATE = 0,
    CLOSING_COST_RATE = 10, // Estimated closing costs in dollars.
    TERM_IN_YEARS = 30, // Term length of loan in years.
    ANNUAL_APPRECIATION_RATE = 2,
    ANNUAL_TAX_INCREASE_RATE = 1,
    ANNUAL_RENT_INCREASE_RATE = 2,
    ANNUAL_HOME_INSURANCE_INCREASE_RATE = 1,
    ANNUAL_HOA_FEES_INCREASE_RATE = 1,
    ANNUAL_PARKING_FEES_INCREASE_RATE = 0,
    ANNUAL_LAUNDRY_SERVICE_INCREASE_RATE = 0,
    ANNUAL_STORAGE_UNIT_FEES_INCREASE_RATE = 0,
    ANNUAL_OTHER_ADDITIONAL_INCOME_STREAMS_INCREASE_RATE = 0,
    PARKING_FEES = 0,
    LAUNDRY_SERVICES = 0,
    STORAGE_UNIT_FEES = 0,
    OTHER_ADDITIONAL_INCOMES = 0,
    TAX_DEPRECIATION = 0,
    TAX_MORTGAGE_INTEREST = 0,
    TAX_OPERATING_EXPENSES = 0,
    INTEREST_TYPE = InterestType.FIXED,
};

export enum GrowthFrequency {
    YEARLY,
    MONTHLY,
    NONE,
};

export enum TransactionType {
    INITIAL_EXPENSE = 'Initial Expense',
    FIXED_RECURRING_EXPENSE = 'Fixed Recurring Expense',
    OPERATIONAL_RECURRING_EXPENSE = 'Operational Recurring Expense',
    INCOME_STREAMS = 'Income Streams',
    FINANCING = 'Financing',
    MORTGAGE = 'Mortgage',
};

export enum TransactionKey {
    LOAN_AMOUNT = 'Loan Amount',
    PURCHASE_PRICE = 'Purchase Price',

    MORTGAGE = 'Mortgage',

    PROPERTY_TAX = 'Property Tax',
    HOA_FEE = 'Monthly HOA Fee',
    HOME_INSURANCE = 'Monthly Home Insurance',

    RENTAL_INCOME = 'Rental Income',
    PARKING_FEES = 'Parking Fees',
    LAUNDRY_SERVICES = 'Laundry Service',
    STORAGE_UNIT_FEES = 'Storage Unit Fees',
    OTHER_ADDITIONAL_INCOME_STREAMS = 'Other Additional Incomes Streams',

    PROPERTY_MANAGEMENT_EXPENSE = 'Property Management Expense',
    VACANCY_EXPENSE = 'Vacancy Expense',
    MAINTENANCE_EXPENSE = 'Maintenance Expense',
    OTHER_EXPENSES = 'Other Expeneses',
    CAP_EX_RESERVE_EXPENSE = 'Cap Ex Reserve Expense',

    DOWN_PAYMENT = 'Down Payment',
    LEGAL_AND_PROFESSIONAL_FEES = 'Legal And Professional Fees',
    INITIAL_REPAIR_COST = 'Initial Repair Costs',
    CLOSING_COST = 'Closing Costs',
    TRAVELING_COST = 'Traveling Costs',
    OTHER_INITIAL_EXPENSES = 'Other Initial Expenses',
};