import { SchoolRatingDTO } from "@realestatemanager/shared";
import { IDTOConvertible } from "../../models/idtoconvertible.model";

export class SchoolRating implements IDTOConvertible<SchoolRatingDTO> {
    private elementarySchoolRating?: number;
    private middleSchoolRating?: number;
    private highSchoolRating?: number;

    constructor(elementarySchoolRating?: number, middleSchoolRating?: number, highSchoolRating?: number) {
        this.elementarySchoolRating = elementarySchoolRating;
        this.middleSchoolRating = middleSchoolRating;
        this.highSchoolRating = highSchoolRating;
    }

    toDTO(): SchoolRatingDTO {
        return {
            elementarySchoolRating: this.elementarySchoolRating,
            middleSchoolRating: this.middleSchoolRating,
            highSchoolRating: this.highSchoolRating,
        }
    }

}