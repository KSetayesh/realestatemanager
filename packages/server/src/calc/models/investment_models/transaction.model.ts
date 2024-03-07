export interface Transaction {
    isIncome(): boolean;
    isExpense(): boolean;
};

export interface Incomes extends Transaction {
    totalIncomes(): number;
};

export interface Expenses extends Transaction {
    totalExpenses(): number;
};