import { ValueAmountInput, ValueInput, ValueRateInput, ValueType, isValueAmountInput, isValueRateInput } from "@realestatemanager/shared";
import { Calculate } from "./calculate.model"; import { Breakdown } from "./fixed.expenses.breakdown.model";
import { IncomeCalculator } from "../new_calculators/income.calculator";
import { AppreciationCalculator } from "../new_calculators/appreciation.calculator";

export class PurchaseDetail implements Calculate {

    private purchasePrice: Breakdown;
    private downPayment: ValueInput;
    private appreciationCalc: AppreciationCalculator;
    private downPaymentAsString = 'Down Payment';

    constructor(purchasePrice: Breakdown, downPayment: ValueInput) {
        this.purchasePrice = purchasePrice;
        this.downPayment = downPayment;
        this.appreciationCalc = new AppreciationCalculator();
    }

    private getDownPaymentBreakdown(): Breakdown {
        return { value: this.downPayment, growthRate: { rate: 0, type: ValueType.RATE } };
    }

    calculateDownPaymentAmount(): ValueAmountInput {
        return this.calculateAmount(this.getDownPaymentBreakdown(), this.downPaymentAsString);
    }

    calculateDownPaymentPercentage(): ValueRateInput {
        return this.calculateRate(this.getDownPaymentBreakdown(), this.downPaymentAsString);
    }

    getPurchasePrice(): ValueAmountInput {
        const purchasePrice: ValueInput = this.purchasePrice.value;
        if (isValueAmountInput(purchasePrice)) {
            return purchasePrice;
        }
        throw new Error('Purchase Price must be an Amount');
    }

    getAppreciationRate(): ValueRateInput {
        const appreciationRate: ValueInput = this.purchasePrice.growthRate;
        if (isValueRateInput(appreciationRate)) {
            return appreciationRate;
        }
        throw new Error('Appreciation must be a Rate');
    }

    // getPurchasePrice(): ValueAmountInput {
    //     const purchasePrice: ValueInput = this.purchasePrice.value;
    //     if (isValueAmountInput(purchasePrice)) {
    //         return purchasePrice;
    //     }
    //     throw new Error('Purchase Price must be an Amount');
    // }

    // getAppreciationRate(): ValueRateInput {
    //     const appreciationRate: ValueInput = this.purchasePrice.growthRate;
    //     if (isValueRateInput(appreciationRate)) {
    //         return appreciationRate;
    //     }
    //     throw new Error('Appreciation must be a Rate');
    // }

    protected calculateAmount(breakdown: Breakdown, initialCosts: string): ValueAmountInput {
        const breakdownValue: ValueInput = breakdown.value;
        if (isValueAmountInput(breakdownValue)) {
            return this.inititalCostsAmountCalculator.getAmount(
                breakdownValue,
            );
        }
        else if (isValueRateInput(breakdownValue)) {
            return this.inititalCostsRateCalculator.getAmount(
                breakdownValue,
            );
        }
        throw new Error(`${initialCosts} is not a Rate or an Amount`);
    }

    protected calculateRate(breakdown: Breakdown, initialCosts: string): ValueRateInput {
        const breakdownValue: ValueInput = breakdown.value;
        if (isValueAmountInput(breakdownValue)) {
            return this.inititalCostsAmountCalculator.getRate(
                breakdownValue,
            );
        }
        else if (isValueRateInput(breakdownValue)) {
            return this.inititalCostsRateCalculator.getRate(
                breakdownValue,
            );
        }
        throw new Error(`${initialCosts} is not a Rate or an Amount`);
    }

}

export class RentalDetail implements Calculate {

    private rentalBreakdown: Breakdown;
    private incomeCalculator: IncomeCalculator;
    private rentalAmount = 'Rental Amount';

    constructor(
        rentalBreakdown: Breakdown,
        purchasePriceBreakdown: PurchaseDetail,
    ) {
        this.rentalBreakdown = rentalBreakdown;
        this.incomeCalculator = new IncomeCalculator(
            purchasePriceBreakdown.getAppreciationRate(),
            purchasePriceBreakdown.getPurchasePrice(),
        );
    }

    getTotalAmount(numberOfYears: number = 0): ValueAmountInput {
        return this.calculate(this.rentalBreakdown, this.rentalAmount, numberOfYears);
    }

    private calculate(breakdown: Breakdown, income: string, numberOfYears: number = 0) {
        // const rentalAmount: Breakdown = this.incomesStreamsBreakdown.getRentalAmount();
        if (isValueAmountInput(breakdown.value)) {
            return this.incomeCalculator.getAmount(
                breakdown.value,
                breakdown.growthRate.rate,
                numberOfYears
            );
        }
        throw new Error(`${income} is not an "Amount"`);
    }

}

// export abstract class PurchaseExpenses {
//     private purchasePriceBreakdown: Breakdown;
//     private inititalCostsRateCalculator: InititalCostsRateCalculator;
//     private inititalCostsAmountCalculator: InititalCostsAmountCalculator;

//     constructor(purchasePriceBreakdown: Breakdown) {
//         this.purchasePriceBreakdown = purchasePriceBreakdown;
//         const purchasePrice = this.getPurchasePrice();
//         this.inititalCostsRateCalculator = new InititalCostsRateCalculator(purchasePrice);
//         this.inititalCostsAmountCalculator = new InititalCostsAmountCalculator(purchasePrice);
//     }

//     getPurchasePrice(): ValueAmountInput {
//         const purchasePrice: ValueInput = this.purchasePriceBreakdown.value;
//         if (isValueAmountInput(purchasePrice)) {
//             return purchasePrice;
//         }
//         throw new Error('Purchase Price must be an Amount');
//     }

//     getAppreciationRate(): ValueRateInput {
//         const appreciationRate: ValueInput = this.purchasePriceBreakdown.growthRate;
//         if (isValueRateInput(appreciationRate)) {
//             return appreciationRate;
//         }
//         throw new Error('Appreciation must be a Rate');
//     }

//     protected calculateAmount(breakdown: Breakdown, initialCosts: string): ValueAmountInput {
//         const breakdownValue: ValueInput = breakdown.value;
//         if (isValueAmountInput(breakdownValue)) {
//             return this.inititalCostsAmountCalculator.getAmount(
//                 breakdownValue,
//             );
//         }
//         else if (isValueRateInput(breakdownValue)) {
//             return this.inititalCostsRateCalculator.getAmount(
//                 breakdownValue,
//             );
//         }
//         throw new Error(`${initialCosts} is not a Rate or an Amount`);
//     }

//     protected calculateRate(breakdown: Breakdown, initialCosts: string): ValueRateInput {
//         const breakdownValue: ValueInput = breakdown.value;
//         if (isValueAmountInput(breakdownValue)) {
//             return this.inititalCostsAmountCalculator.getRate(
//                 breakdownValue,
//             );
//         }
//         else if (isValueRateInput(breakdownValue)) {
//             return this.inititalCostsRateCalculator.getRate(
//                 breakdownValue,
//             );
//         }
//         throw new Error(`${initialCosts} is not a Rate or an Amount`);
//     }
// }

// export class PurchaseDetail extends PurchaseExpenses implements Calculate {

//     // private purchaseBreakdown: PurchaseBreakdown;
//     private appreciationCalculator: AppreciationCalculator;
//     private downPaymentBreakdown: Breakdown;
//     private downPayment = 'Down Payment';

//     constructor(
//         purchaseBreakdown: PurchaseBreakdown,
//     ) {
//         super(purchaseBreakdown.getPurchasePrice());
//         this.downPaymentBreakdown = purchaseBreakdown.getDownPayment();
//         this.appreciationCalculator = new AppreciationCalculator();
//     }

//     calculateDownPaymentAmount(): ValueAmountInput {
//         const downPayment: Breakdown = this.downPaymentBreakdown;
//         return this.calculateAmount(downPayment, this.downPayment);
//     }

//     calculateDownPaymentPercentage(): ValueRateInput {
//         const downPayment: Breakdown = this.downPaymentBreakdown;
//         return this.calculateRate(downPayment, this.downPayment);
//     }

//     // private getPurchaseBreakdown(): Breakdown {
//     //     return this.purchaseBreakdown.getPurchasePrice();
//     // }

//     // getPurchasePrice(): ValueAmountInput {
//     //     const purchasePrice: ValueInput = this.getPurchaseBreakdown().value;
//     //     if (isValueAmountInput(purchasePrice)) {
//     //         return purchasePrice;
//     //     }
//     //     throw new Error('Purchase Price must be an Amount');
//     // }

//     // getAppreciationRate(): ValueRateInput {
//     //     const appreciationRate: ValueInput = this.getPurchaseBreakdown().growthRate;
//     //     if (isValueRateInput(appreciationRate)) {
//     //         return appreciationRate;
//     //     }
//     //     throw new Error('Appreciation must be a Rate');
//     // }



//     getTotalAmount(numberOfYears: number = 0): ValueAmountInput {
//         const purchasePrice: ValueAmountInput = this.getPurchasePrice();
//         const appreciationRate: number = this.getAppreciationRate().rate;
//         return this.appreciationCalculator.getAmount(
//             purchasePrice,
//             appreciationRate,
//             numberOfYears
//         );
//     }

//     // getLoanAmount() {
//     //     this.getPurchasePrice().amount - this.downPayment.
//     // }


// }

// import { InitialCostsDTO, ValueType, } from "@realestatemanager/shared";
// import { InitialCostsBreakdown, PurchaseBreakdown } from "./initial.costs.breakdown.model";
// import { IDTOConvertible } from "../../idtoconvertible.model";
// import { InititalCostsRateCalculator } from "../new_calculators/initital.costs.rate.calculator";
// import { InititalCostsAmountCalculator } from "../new_calculators/initital.costs.amount.calculator";
// import { IncomeCalculator } from "../new_calculators/income.calculator";
// import { RentalIncomeBreakdown } from "../breakdown_models/rental.income.breakdown.model";
// import { Breakdown } from "./fixed.expenses.breakdown.model";

// export class InitialCostsDetail extends PurchaseExpenses implements Calculate, IDTOConvertible<InitialCostsDTO> {

//     // private purchasePrice: ValueAmountInput;
//     private initialCostsBreakdown: InitialCostsBreakdown;
//     private legalAndProfessionalFees = 'Legal And Professional Fees';
//     private initialRepairCosts = 'Initial Repair Costs'
//     private closingCosts = 'Closing Costs';
//     private travelingCosts = 'Traveling Costs';
//     private otherInitialExpenses = 'Other Initial Expenses';

//     constructor(
//         purchasePriceBreakdown: Breakdown, //ValueAmountInput,
//         initialCostsBreakdown: InitialCostsBreakdown,
//     ) {
//         super(purchasePriceBreakdown);
//         // this.purchasePrice = purchasePrice;
//         this.initialCostsBreakdown = initialCostsBreakdown;

//     }

//     getTotalAmount(): ValueAmountInput {
//         // const downPaymentAmount = this.calculateDownPaymentAmount().amount;
//         const legalAndProfessionalFees = this.calculateLegalAndProfessionalFees().amount;
//         const initialRepairCosts = this.calculateInitialRepairCosts().amount;
//         const closingCosts = this.calculateClosingCosts().amount;
//         const travelingCosts = this.calculateTravelingCosts().amount;
//         const initialExpenses = this.calculateOtherInitialExpenses().amount;
//         return {
//             type: ValueType.AMOUNT,
//             amount: legalAndProfessionalFees +
//                 initialRepairCosts +
//                 closingCosts +
//                 travelingCosts +
//                 initialExpenses,
//             // amount: downPaymentAmount +
//             //     legalAndProfessionalFees +
//             //     initialRepairCosts +
//             //     closingCosts +
//             //     travelingCosts +
//             //     initialExpenses,
//         };
//     }

//     // calculateDownPaymentAmount(): ValueAmountInput {
//     //     const downPayment: Breakdown = this.initialCostsBreakdown.getDownPayment();
//     //     return this.calculateAmount(downPayment, this.downPayment);
//     // }

//     // calculateDownPaymentPercentage(): ValueRateInput {
//     //     const downPayment: Breakdown = this.initialCostsBreakdown.getDownPayment();
//     //     return this.calculateRate(downPayment, this.downPayment);
//     // }

//     calculateLegalAndProfessionalFees(): ValueAmountInput {
//         const legalAndProfessionalFees: Breakdown = this.initialCostsBreakdown.getLegalAndProfessionalFees();
//         return this.calculateAmount(legalAndProfessionalFees, this.legalAndProfessionalFees);
//     }

//     calculateInitialRepairCosts(): ValueAmountInput {
//         const initialRepairCosts: Breakdown = this.initialCostsBreakdown.getInitialRepairCosts();
//         return this.calculateAmount(initialRepairCosts, this.initialRepairCosts);
//     }

//     getInitialRepairRate(): ValueRateInput {
//         const initialRepairCosts: Breakdown = this.initialCostsBreakdown.getInitialRepairCosts();
//         return this.calculateRate(initialRepairCosts, this.initialRepairCosts);
//     }

//     calculateClosingCosts(): ValueAmountInput {
//         const closingCosts: Breakdown = this.initialCostsBreakdown.getClosingCosts();
//         return this.calculateAmount(closingCosts, this.closingCosts);
//     }

//     getClosingCostsRate(): ValueRateInput {
//         const closingCosts: Breakdown = this.initialCostsBreakdown.getClosingCosts();
//         return this.calculateRate(closingCosts, this.closingCosts);
//     }

//     calculateTravelingCosts(): ValueAmountInput {
//         const travelingCosts: Breakdown = this.initialCostsBreakdown.getTravelingCosts();
//         return this.calculateAmount(travelingCosts, this.travelingCosts);
//     }

//     calculateOtherInitialExpenses(): ValueAmountInput {
//         const otherInitialExpenses: Breakdown = this.initialCostsBreakdown.getOtherInitialExpenses();
//         return this.calculateAmount(otherInitialExpenses, this.otherInitialExpenses);
//     }

//     getOtherInitialExpensesRate(): ValueRateInput {
//         const otherInitialExpenses: Breakdown = this.initialCostsBreakdown.getOtherInitialExpenses();
//         return this.calculateRate(otherInitialExpenses, this.otherInitialExpenses);
//     }

//     toDTO(): InitialCostsDTO {
//         return {
//             totalAmount: this.getTotalAmount().amount,
//             breakdown: {
//                 downPaymentAmount: this.calculateDownPaymentAmount().amount,
//                 legalAndProfessionalFees: this.calculateLegalAndProfessionalFees().amount,
//                 initialRepairCosts: {
//                     amount: this.calculateInitialRepairCosts().amount,
//                     percentage: this.getInitialRepairRate().rate,
//                 },
//                 closingCosts: {
//                     amount: this.calculateClosingCosts().amount,
//                     percentage: this.getClosingCostsRate().rate,
//                 },
//                 travelingCosts: this.calculateTravelingCosts().amount,
//                 otherExpenses: {
//                     amount: this.calculateOtherInitialExpenses().amount,
//                     percentage: this.getOtherInitialExpensesRate().rate,
//                 }
//             }
//         };
//     }

// }