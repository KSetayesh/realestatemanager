import { SchoolRatingDTO } from "@realestatemanager/shared";
import { IDTOConvertible } from "../idtoconvertible.model";

export class SchoolRating implements IDTOConvertible<SchoolRatingDTO> {
    private _elementarySchoolRating?: number;
    private _middleSchoolRating?: number;
    private _highSchoolRating?: number;

    constructor(
        elementarySchoolRating?: number,
        middleSchoolRating?: number,
        highSchoolRating?: number
    ) {
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

    toDTO(): SchoolRatingDTO {
        return {
            elementarySchoolRating: this.elementarySchoolRating,
            middleSchoolRating: this.middleSchoolRating,
            highSchoolRating: this.highSchoolRating,
        }
    }

}