import { InvestmentScenario } from "./investmentscenario.model";
import { ListingDetails } from "./listingdetails.model";

export class ListingWithScenarios {
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

}