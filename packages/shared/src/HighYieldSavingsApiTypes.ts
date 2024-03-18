export interface HighYeildSavingsRequest {
    initialDeposit: number,
    annualInterestRate: number,
    years: number,
    monthlyDeposit?: number;
};

export interface HighYeildSavingsDTO {
    date: string;
    year: number;
    month: number;
    startPrincipal: number;
    startBalance: number;
    interest: number;
    endBalance: number;
    endPrincipal: number;
};