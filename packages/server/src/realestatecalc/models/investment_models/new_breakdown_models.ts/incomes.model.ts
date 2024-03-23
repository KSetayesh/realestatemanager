import { IncomesDTO, ValueAmountInput } from "@realestatemanager/shared";
import { IDTOConvertible } from "../../idtoconvertible.model";
import { Calculate } from "./calculate.model";
import { IncomeStreamsDetail } from "./income.streams.detail.model";

export class Incomes implements Calculate, IDTOConvertible<IncomesDTO> {

    private incomeStreams: IncomeStreamsDetail;

    constructor(incomeStreams: IncomeStreamsDetail) {
        this.incomeStreams = incomeStreams;
    }

    getTotalAmount(numberOfYears: number = 0): ValueAmountInput {
        return this.incomeStreams.getTotalAmount(numberOfYears);
    }

    getRentalAmount(numberOfYears: number = 0): ValueAmountInput {
        return this.incomeStreams.calculateRentalAmount(numberOfYears);
    }

    toDTO(): IncomesDTO {
        return this.incomeStreams.toDTO();
    }

}
