import { ValueAmountInput } from "@realestatemanager/shared";

export interface Calculate {
    getTotalAmount(numberOfYears?: number): ValueAmountInput;
}