import { Breakdown } from "./fixed.expenses.breakdown.model";

export class RecurringExpensesBreakdown {

    private propertyManagementRate: Breakdown; //ValueRateInput;
    private vacancyRate: Breakdown; //ValueRateInput;
    private maintenanceRate: Breakdown; //ValueRateInput;
    private otherExpensesRate: Breakdown; //ValueRateInput;
    private capExReserveRate: Breakdown; //ValueRateInput;

    constructor(
        propertyManagementRate: Breakdown, //ValueRateInput,
        vacancyRate: Breakdown, //ValueRateInput,
        maintenanceRate: Breakdown, //ValueRateInput,
        otherExpensesRate: Breakdown, //ValueRateInput,
        capExReserveRate: Breakdown, //ValueRateInput,
    ) {
        this.propertyManagementRate = propertyManagementRate;
        this.vacancyRate = vacancyRate;
        this.maintenanceRate = maintenanceRate;
        this.otherExpensesRate = otherExpensesRate;
        this.capExReserveRate = capExReserveRate;
    }

    getPropertyManagementRate(): Breakdown {
        return this.propertyManagementRate;
    }

    getVacancyRate(): Breakdown {
        return this.vacancyRate;
    }

    getMaintenanceRate(): Breakdown {
        return this.maintenanceRate;
    }

    getOtherExpensesRate(): Breakdown {
        return this.otherExpensesRate;
    }

    getCapExReserveRate(): Breakdown {
        return this.capExReserveRate;
    }

}