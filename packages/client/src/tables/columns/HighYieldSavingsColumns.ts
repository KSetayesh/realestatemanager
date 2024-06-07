import { AddHighYieldSavingsTitlesAndLabelsGetter } from "@realestatemanager/shared";
import { TableColumn } from "../../components/ReusableTable";
import { InputType } from "../../constants/Constant";

const getterInstance: AddHighYieldSavingsTitlesAndLabelsGetter = new AddHighYieldSavingsTitlesAndLabelsGetter();

export const highYieldSavingsDefaultColumns: TableColumn[] = [
    {
        header: getterInstance.yearsTitle,
        accessor: getterInstance.yearsName,
        inputType: InputType.NUMBER,
        isURL: false,
        showColumn: true,
        isDollarAmount: false,
        isSortable: false,
    },
    {
        header: "Month",    // Come back to this
        accessor: "month",
        inputType: InputType.NUMBER,
        isURL: false,
        showColumn: true,
        isDollarAmount: false,
        isSortable: false,
    },
    {
        header: "Date",     // Come back to this
        accessor: "date",
        inputType: InputType.STRING,
        isURL: false,
        showColumn: true,
        isDollarAmount: false,
        isSortable: false,
    },

    {
        header: "Start Principal",
        accessor: "startPrincipal",
        inputType: InputType.NUMBER,
        isURL: false,
        showColumn: true,
        isDollarAmount: true,
        isSortable: false,
    },
    {
        header: "Start Balance",
        accessor: "startBalance",
        inputType: InputType.NUMBER,
        isURL: false,
        showColumn: true,
        isDollarAmount: true,
        isSortable: false,
    },
    {
        header: "Interest",
        accessor: "interest",
        inputType: InputType.NUMBER,
        isURL: false,
        showColumn: true,
        isDollarAmount: true,
        isSortable: false,
    },
    {
        header: "Accumulated Interest",
        accessor: "accumulatedInterest",
        inputType: InputType.NUMBER,
        isURL: false,
        showColumn: true,
        isDollarAmount: true,
        isSortable: false,
    },
    {
        header: "End Balance",
        accessor: "endBalance",
        inputType: InputType.NUMBER,
        isURL: false,
        showColumn: true,
        isDollarAmount: true,
        isSortable: false,
    },
    {
        header: "End Principal",
        accessor: "endPrincipal",
        inputType: InputType.NUMBER,
        isURL: false,
        showColumn: true,
        isDollarAmount: true,
        isSortable: false,
    },
];