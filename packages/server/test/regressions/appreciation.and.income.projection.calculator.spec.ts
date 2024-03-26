import { ValueAmountInput, ValueRateInput, ValueType } from "@realestatemanager/shared";
import { AppreciationAndIncomeProjectionCalculator } from "src/realestatecalc/models/investment_models/new_calculators/appreciation.and.income.projection.calculator";

describe('AppreciationAndIncomeProjectionCalculator', () => {
    let calculator: AppreciationAndIncomeProjectionCalculator;

    beforeEach(() => {
        // Example values for initialPurchasePrice and appreciationGrowthRate
        const initialPurchasePrice: ValueAmountInput = {
            type: ValueType.AMOUNT,
            amount: 100000, // Initial purchase price of $100,000
        };

        const appreciationGrowthRate: ValueRateInput = {
            type: ValueType.RATE,
            rate: 4, // 4% annual appreciation rate
        };

        calculator = new AppreciationAndIncomeProjectionCalculator(
            initialPurchasePrice,
            appreciationGrowthRate
        );
    });

    it('should be defined', () => {
        expect(calculator).toBeDefined();
    });

    let description = "AppreciationAndIncomeProjectionCalculator \n" +
        "initialPurchasePrice: 100000 \n" +
        "appreciationGrowthRate: 4% \n";

    it(description, async () => {
        console.log("__dirname:", __dirname);
        // const assertionFilePath: string = path.resolve(__dirname, '../assertions/fullstack/fullstack.json');

        const rentalAmount: ValueAmountInput = {
            type: ValueType.AMOUNT,
            amount: 2000,
        };

        const rentalGrowthRate = 3;

        const rentalAmount_year_0: ValueAmountInput =
            calculator.getAmount(rentalAmount, rentalGrowthRate, 0);

        // const actualCommands: CommandType[] = await service.execute(executeScriptCommand);
        // console.log("actualCommands.length:", actualCommands.length);

        // const expectedCommands: CommandType[] = readArrayFromJsonFile(assertionFilePath);
        // console.log("expectedCommands.length:", expectedCommands.length);

        expect(rentalAmount_year_0.amount).toEqual(50);
        expect(rentalAmount_year_0.type).toEqual(ValueType.AMOUNT);

    });

    // Additional tests here
});
