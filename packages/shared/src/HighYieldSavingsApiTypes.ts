export interface HighYeildSavingsRequest {
    initialDeposit: number,
    annualInterestRate: number,
    years: number,
    monthlyDeposit?: number;
};

export interface HighYeildSavingsResponseDTO {
    date: string;
    year: number;
    month: number;
    startPrincipal: number;
    startBalance: number;
    interest: number;
    accumulatedInterest: number;
    endBalance: number;
    endPrincipal: number;
};