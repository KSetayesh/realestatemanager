import { RentCastDetails, RentCastDetailsResponseDTO } from "@realestatemanager/types";
import { Transformer } from "../transformer";
import { DateUtility } from "../../utilities/DateUtility";

export class RentCastTransformer implements Transformer<RentCastDetailsResponseDTO, RentCastDetails> {

    toClient(rentCastDetailsResponseDTO: RentCastDetailsResponseDTO): RentCastDetails {
        return {
            ...rentCastDetailsResponseDTO,
            mostRecentBillingDate: DateUtility.retrieveAndParseDate(rentCastDetailsResponseDTO.mostRecentBillingDate),
            firstBilledOn: DateUtility.retrieveAndParseDate(rentCastDetailsResponseDTO.firstBilledOn),
        };
    }

    toClientArray(rentCastDetailsResponseDTOs: RentCastDetailsResponseDTO[]): RentCastDetails[] {
        return rentCastDetailsResponseDTOs.map(data => this.toClient(data));
    }

}