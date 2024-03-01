import { PMIDetailsDTO } from "@realestatemanager/shared";
import { IDTOConvertible } from "./idtoconvertible.model";

export class PMIDetails implements IDTOConvertible<PMIDetailsDTO> {

    private pmiAmount: number;
    private pmiRate: number;
    private pmiRateFormula: string;
    private pmiDropoffPoint: number;

    constructor(pmiAmount: number,
        pmiRate: number,
        pmiRateFormula: string,
        pmiDropoffPoint: number) {

        this.pmiAmount = pmiAmount;
        this.pmiRate = pmiRate;
        this.pmiRateFormula = pmiRateFormula;
        this.pmiDropoffPoint = pmiDropoffPoint;
    }

    getPMIAmount(): number {
        return this.pmiAmount;
    }

    toDTO(): PMIDetailsDTO {
        return {
            pmiAmount: this.pmiAmount,
            pmiRate: this.pmiRate,
            pmiRateFormula: this.pmiRateFormula,
            pmiDropoffPoint: this.pmiDropoffPoint,
        }
    }

}