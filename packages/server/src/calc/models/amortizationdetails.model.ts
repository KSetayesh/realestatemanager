import { AmortizationDetailsDTO } from "@realestatemanager/shared";

export class AmortizationDetails {
    month: number;
    year: number;
    monthlyPayment: number;
    interestPayment: number;
    principalPayment: number;
    remainingBalance: number;
    equityWithDownPayment: number;
    equityWithoutDownPayment: number;
    equityWithAppreciation: number;
    appreciationValue: number;

    constructor() { }

    toDTO(): AmortizationDetailsDTO {
        return {
            month: this.month,
            year: this.year,
            monthlyPayment: this.monthlyPayment,
            interestPayment: this.interestPayment,
            principalPayment: this.principalPayment,
            remainingBalance: this.remainingBalance,
            equityWithDownPayment: this.equityWithDownPayment,
            equityWithoutDownPayment: this.equityWithoutDownPayment,
            equityWithAppreciation: this.equityWithAppreciation,
            appreciationValue: this.appreciationValue,
        };
    }
}
