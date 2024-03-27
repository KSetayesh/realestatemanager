import { ValueInput } from "@realestatemanager/shared";
import { Transaction } from "./transaction";
import { PurchasePrice } from "./purchase.price";
import { CalcHelper } from "./calc.helper";

export class TravelingCosts implements Transaction {

    private travelingCosts: ValueInput;

    getTravelingCostsAmount(purchasePrice: PurchasePrice): number {
        return new CalcHelper().getTransactionAmount(
            this.travelingCosts,
            purchasePrice.getInitialPurchasePrice()
        );
    }

    getTravelingCostsPercentage(purchasePrice: PurchasePrice): number {
        return new CalcHelper().getTransactionPercent(
            this.travelingCosts,
            purchasePrice.getInitialPurchasePrice()
        );
    }

    toDTO() {
        throw new Error("Method not implemented.");
    }
}