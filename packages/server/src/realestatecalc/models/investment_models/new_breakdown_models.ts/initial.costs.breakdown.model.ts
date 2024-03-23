import { Breakdown } from "./fixed.expenses.breakdown.model";

export class PurchaseBreakdown {
    private purchasePrice: Breakdown;
    private downPayment: Breakdown; //ValueInput;

    constructor(purchasePrice: Breakdown, downPayment: Breakdown) {
        this.purchasePrice = purchasePrice;
        this.downPayment = downPayment;
    }

    getPurchasePrice(): Breakdown {
        return this.purchasePrice;
    }

    getDownPayment(): Breakdown {
        return this.downPayment;
    }

}

export class InitialCostsBreakdown {
    // private downPayment: Breakdown; //ValueInput;
    private legalAndProfessionalFees: Breakdown; //ValueInput;
    private initialRepairCosts: Breakdown; //ValueInput; // Can be RateTransaction or AmountTransaction
    private closingCosts: Breakdown; //ValueInput; // Can be RateTransaction or AmountTransaction
    private travelingCosts: Breakdown; //ValueInput;
    private otherInitialExpenses: Breakdown;// ValueInput; // Can be RateTransaction or AmountTransaction

    constructor(
        // downPayment: Breakdown,
        legalAndProfessionalFees: Breakdown,
        initialRepairCosts: Breakdown,
        closingCosts: Breakdown,
        travelingCosts: Breakdown,
        otherInitialExpenses: Breakdown) {

        // this.downPayment = downPayment;
        this.legalAndProfessionalFees = legalAndProfessionalFees;
        this.initialRepairCosts = initialRepairCosts;
        this.closingCosts = closingCosts;
        this.travelingCosts = travelingCosts;
        this.otherInitialExpenses = otherInitialExpenses;
    }

    // getDownPayment(): Breakdown {
    //     return this.downPayment;
    // }

    getLegalAndProfessionalFees(): Breakdown {
        return this.legalAndProfessionalFees;
    }

    getInitialRepairCosts(): Breakdown {
        return this.initialRepairCosts;
    }

    getClosingCosts(): Breakdown {
        return this.closingCosts;
    }

    getTravelingCosts(): Breakdown {
        return this.travelingCosts;
    }

    getOtherInitialExpenses(): Breakdown {
        return this.otherInitialExpenses;
    }

}