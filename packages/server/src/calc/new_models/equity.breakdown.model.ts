import { EquityBreakdownDTO } from "@realestatemanager/shared";
import { IDTOConvertible } from "./idtoconvertible.model";

export class EquityBreakdown implements IDTOConvertible<EquityBreakdownDTO> {

    private equityAmountWithDownPayment: number;
    private equityAmountWithoutDownPayment: number;
    private equityAmountWithAppreciation: number;
    private appreciationAmount: number;

    constructor(equityAmountWithDownPayment: number,
        equityAmountWithoutDownPayment: number,
        equityAmountWithAppreciation: number,
        appreciationAmount: number) {

        this.equityAmountWithDownPayment = equityAmountWithDownPayment;
        this.equityAmountWithoutDownPayment = equityAmountWithoutDownPayment;
        this.equityAmountWithAppreciation = equityAmountWithAppreciation;
        this.appreciationAmount = appreciationAmount;
    }

    toDTO(): EquityBreakdownDTO {
        return {
            equityAmountWithDownPayment: this.equityAmountWithDownPayment,
            equityAmountWithoutDownPayment: this.equityAmountWithoutDownPayment,
            equityAmountWithAppreciation: this.equityAmountWithAppreciation,
            appreciationAmount: this.appreciationAmount,
        }
    }
}