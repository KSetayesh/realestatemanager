import { ListingWithScenariosDTO } from "@realestatemanager/shared";
import { IDTOConvertible } from "./idtoconvertible.model";
import { InvestmentScenario } from "./investmentscenario.model";
import { ListingDetails } from "./listingdetails.model";

export class ListingWithScenarios implements IDTOConvertible<ListingWithScenariosDTO> {
    private listingDetails: ListingDetails;
    private scenarios: InvestmentScenario[];

    constructor(listingDetails: ListingDetails, scenarios: InvestmentScenario[] = []) {
        this.listingDetails = listingDetails;
        this.scenarios = scenarios;
    }

    addScenario(scenario: InvestmentScenario): void {
        this.scenarios.push(scenario);
    }

    getScenarios(): InvestmentScenario[] {
        return this.scenarios;
    }

    toDTO(): ListingWithScenariosDTO {
        return {
            listingDetails: this.listingDetails.toDTO(),
            scenarios: this.scenarios.map(scenario => scenario.toDTO())
        }
    }

}