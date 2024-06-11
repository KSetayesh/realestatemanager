import { EndpointDetails } from "src/shared/endpoint.details.interface";
import { PathUtil } from "src/utility/PathUtil";

export enum RentCastEndPoint {
    SALE = 'SALE',
    PROPERTIES = 'PROPERTIES',
};


export class RentCastApiEndPointManager {
    private endPointMap: Record<RentCastEndPoint, EndpointDetails> = {
        [RentCastEndPoint.SALE]: {
            endPoint: `listings/sale`,
            responseFilePath: PathUtil.getLatestRentCastSalePath(),
        },
        [RentCastEndPoint.PROPERTIES]: {
            endPoint: `properties`,
            responseFilePath: PathUtil.getLatestRentCastPropertyPath(),
        },
    };

    getEndPointDetails(baseUrl: string, rentCastApiEndPoint: RentCastEndPoint): EndpointDetails {
        const endPointDetails: EndpointDetails = this.endPointMap[rentCastApiEndPoint];
        endPointDetails.endPoint = `${baseUrl}/${endPointDetails.endPoint}`;
        return endPointDetails;
    }


}