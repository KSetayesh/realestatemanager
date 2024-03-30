import { Calculate } from "./calculate";

export class InvestmentCalculator {

    private calculate: Calculate;

    constructor(calculate: Calculate) {
        this.calculate = calculate;
    }

    createInvestmentMetrics(): any {
        console.log("In createInvestmentMetrics");
        return;
    }
}