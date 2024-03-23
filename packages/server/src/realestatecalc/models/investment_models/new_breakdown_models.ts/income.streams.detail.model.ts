import { IncomesDTO, ValueAmountInput, ValueRateInput, ValueType, isValueAmountInput } from "@realestatemanager/shared";
import { IncomeStreamsBreakdown } from "./income.streams.breakdown.model";
import { Breakdown } from "./fixed.expenses.breakdown.model";
import { Calculate } from "./calculate.model";
import { IDTOConvertible } from "../../idtoconvertible.model";
import { IncomeCalculator } from "../new_calculators/income.calculator";

export class IncomeStreamsDetail implements Calculate, IDTOConvertible<IncomesDTO> {

    private appreciationGrowthRate: ValueRateInput;
    private purchasePrice: ValueAmountInput;
    private incomesStreamsBreakdown: IncomeStreamsBreakdown;
    private incomeCalculator: IncomeCalculator;

    private rentalAmount = 'Rental Amount';
    private parkingFees = 'Parking Fees';
    private laundryServices = 'Laundry Services';
    private storageUnitFees = 'Storage Unit Fees';
    private otherAdditionalIncomeStreams = 'Other Additional Income Streams';

    constructor(
        appreciationGrowthRate: ValueRateInput,
        purchasePrice: ValueAmountInput,
        incomesStreamsBreakdown: IncomeStreamsBreakdown,
    ) {
        this.appreciationGrowthRate = appreciationGrowthRate;
        this.incomesStreamsBreakdown = incomesStreamsBreakdown;
        this.purchasePrice = purchasePrice;
        this.incomeCalculator = new IncomeCalculator(this.appreciationGrowthRate, this.purchasePrice);
    }

    getTotalAmount(numberOfYears: number = 0): ValueAmountInput {
        const rentalAmount = this.calculateRentalAmount(numberOfYears).amount;
        const parkingFees = this.calculateParkingFees(numberOfYears).amount;
        const laundryServices = this.calculateLaundryServices(numberOfYears).amount;
        const storageUnitFees = this.calculateStorageUnitFees(numberOfYears).amount;
        const otherAdditionalIncomeStreams = this.calculateOtherAdditionalIncomeStreams(numberOfYears).amount;
        return {
            type: ValueType.AMOUNT,
            amount: rentalAmount + parkingFees + laundryServices + storageUnitFees + otherAdditionalIncomeStreams,
        };
    }

    calculateRentalAmount(numberOfYears: number = 0): ValueAmountInput {
        const rentalAmount: Breakdown = this.incomesStreamsBreakdown.getRentalAmount();
        return this.calculate(rentalAmount, this.rentalAmount, numberOfYears);
    }

    calculateParkingFees(numberOfYears: number = 0): ValueAmountInput {
        const parkingFees: Breakdown = this.incomesStreamsBreakdown.getParkingFees();
        return this.calculate(parkingFees, this.parkingFees, numberOfYears);
    }

    calculateLaundryServices(numberOfYears: number = 0): ValueAmountInput {
        const laundryServices: Breakdown = this.incomesStreamsBreakdown.getLaundryService();
        return this.calculate(laundryServices, this.laundryServices, numberOfYears);
    }

    calculateStorageUnitFees(numberOfYears: number = 0): ValueAmountInput {
        const storageUnitFees: Breakdown = this.incomesStreamsBreakdown.getLaundryService();
        return this.calculate(storageUnitFees, this.storageUnitFees, numberOfYears);
    }

    calculateOtherAdditionalIncomeStreams(numberOfYears: number = 0): ValueAmountInput {
        const otherAdditionalIncomeStreams: Breakdown =
            this.incomesStreamsBreakdown.getOtherAdditionalIncomeStreams();
        return this.calculate(
            otherAdditionalIncomeStreams,
            this.otherAdditionalIncomeStreams,
            numberOfYears
        );
    }

    toDTO(): IncomesDTO {
        return {
            rentalIncome: this.calculateRentalAmount().amount,
            additionalIncomeStreams: {
                parkingFees: this.calculateParkingFees().amount,
                laundryServices: this.calculateLaundryServices().amount,
                storageUnitFees: this.calculateStorageUnitFees().amount,
                otherAdditionalIncomeStreams: this.calculateOtherAdditionalIncomeStreams().amount,
            }
        };
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