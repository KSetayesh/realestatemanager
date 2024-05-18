import { SchoolRatingResponseDTO } from "@realestatemanager/shared";
import { IDTOConvertible } from "../idtoconvertible.model";
import { Entity } from "src/shared/entity";

export class SchoolRating extends Entity implements IDTOConvertible<SchoolRatingResponseDTO> {
    private _elementarySchoolRating?: number;
    private _middleSchoolRating?: number;
    private _highSchoolRating?: number;

    constructor(
        id: number,
        elementarySchoolRating?: number,
        middleSchoolRating?: number,
        highSchoolRating?: number,
    ) {
        super(id);
        this._elementarySchoolRating = elementarySchoolRating;
        this._middleSchoolRating = middleSchoolRating;
        this._highSchoolRating = highSchoolRating;
    }

    get elementarySchoolRating(): number {
        return this._elementarySchoolRating;
    }

    get middleSchoolRating(): number {
        return this._middleSchoolRating;
    }

    get highSchoolRating(): number {
        return this._highSchoolRating;
    }

    toDTO(): SchoolRatingResponseDTO {
        return {
            elementarySchoolRating: this.elementarySchoolRating,
            middleSchoolRating: this.middleSchoolRating,
            highSchoolRating: this.highSchoolRating,
        }
    }

}