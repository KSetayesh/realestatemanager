import { AmortizationDetailsDTO } from "@realestatemanager/shared";
import { IDTOConvertible } from "./idtoconvertible.model";

export class AmortizationDetails implements IDTOConvertible<AmortizationDetailsDTO>{
    private month: number;
    private year: number;
    private monthlyPayment: number;
    private interestPayment: number;
    private principalPayment: number;
    private remainingBalance: number;
    private equityWithDownPayment: number;
    private equityWithoutDownPayment: number;
    private equityWithAppreciation: number;
    private appreciationValue: number;

    constructor(month: number,
        year: number,
        monthlyPayment: number,
        interestPayment: number,
        principalPayment: number,
        remainingBalance: number,
        equityWithDownPayment: number,
        equityWithoutDownPayment: number,
        equityWithAppreciation: number,
        appreciationValue: number) {

        this.month = month;
        this.year = year;
        this.monthlyPayment = monthlyPayment;
        this.interestPayment = interestPayment;
        this.principalPayment = principalPayment;
        this.remainingBalance = remainingBalance;
        this.equityWithDownPayment = equityWithDownPayment;
        this.equityWithoutDownPayment = equityWithoutDownPayment;
        this.equityWithAppreciation = equityWithAppreciation;
        this.appreciationValue = appreciationValue;
    }

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
