import { ValueInput } from "@realestatemanager/shared";
import { Transaction } from "./transaction";
import { PurchasePrice } from "./purchase.price";
import { CalcHelper } from "./calc.helper";

export class OtherInitialExpenses implements Transaction {
    private otherInitialExpenses: ValueInput;

    getOtherInititalExpensesAmount(purchasePrice: PurchasePrice): number {
        return new CalcHelper().getTransactionAmount(
            this.otherInitialExpenses,
            purchasePrice.getInitialPurchasePrice()
        );
    }

    getOtherInititalExpensesPercentage(purchasePrice: PurchasePrice): number {
        return new CalcHelper().getTransactionPercent(
            this.otherInitialExpenses,
            purchasePrice.getInitialPurchasePrice()
        );
    }

    toDTO() {

    }
}