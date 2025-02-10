import { parse } from "date-fns";

export class DateUtility {

    // Adjust to match your server's date string format
    private static _format = "M/d/yyyy";

    static retrieveAndParseDate(dateString: string, format: string = this._format): Date {
        return parse(dateString, format, new Date());
    }

}
