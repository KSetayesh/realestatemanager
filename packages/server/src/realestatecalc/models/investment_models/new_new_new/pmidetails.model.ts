import { PMIDetailsDTO, Utility } from "@realestatemanager/shared";
import { IDTOConvertible } from "../../idtoconvertible.model";

export class PMIDetails implements IDTOConvertible<PMIDetailsDTO> {

    private pmiRate: number;
    private pmiDropoffPoint: number;

    constructor(
        pmiRate: number,
        pmiDropoffPoint: number) {
        this.pmiRate = pmiRate;
        this.pmiDropoffPoint = pmiDropoffPoint;
    }

    getPmiRate(): number {
        return this.pmiRate;
    }

    toDTO(): PMIDetailsDTO {
        return {
            // pmiAmount: 0, // Come back to this
            pmiRate: Utility.round(this.pmiRate),
            // pmiRateFormula: 'some formula',
            pmiDropoffPoint: this.pmiDropoffPoint,
        };
    }

}