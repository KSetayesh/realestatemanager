
export interface Transaction {
    isIncome(): boolean;
    isExpense(): boolean;
};

export interface Income extends Transaction {
    totalIncomes(): number;
};

export interface Expense extends Transaction {
    totalExpenses(): number;
};