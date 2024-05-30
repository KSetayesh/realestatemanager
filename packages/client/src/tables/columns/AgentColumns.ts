import { TableColumn } from "../../components/ReusableTable";
import { InputType } from "../../constants/Constant";

export const agentDefaultColumns: TableColumn[] = [
    {
        header: "First Name",
        accessor: "firstName",
        inputType: InputType.STRING,
        isURL: false,
        showColumn: true,
        isDollarAmount: false,
        isSortable: true,
    },
    {
        header: "Last Name",
        accessor: "lastName",
        inputType: InputType.STRING,
        isURL: false,
        showColumn: true,
        isDollarAmount: false,
        isSortable: true,
    },
    {
        header: "Full Name",
        accessor: "fullName",
        inputType: InputType.STRING,
        isURL: false,
        showColumn: true,
        isDollarAmount: false,
        isSortable: true,
    },
    {
        header: "Website",
        accessor: "website",
        inputType: InputType.STRING,
        isURL: true,
        showColumn: true,
        isDollarAmount: false,
        isSortable: true,
    },
    {
        header: "Company Name",
        accessor: "companyName",
        inputType: InputType.STRING,
        isURL: false,
        showColumn: true,
        isDollarAmount: false,
        isSortable: true,
    },
    {
        header: "Phone Number",
        accessor: "phoneNumber",
        inputType: InputType.STRING,
        isURL: false,
        showColumn: true,
        isDollarAmount: false,
        isSortable: true,
    },
    {
        header: "Email",
        accessor: "email",
        inputType: InputType.STRING,
        isURL: false,
        showColumn: true,
        isDollarAmount: false,
        isSortable: true,
    },
    {
        header: "Country",
        accessor: "country",
        inputType: InputType.STRING,
        isURL: false,
        showColumn: true,
        isDollarAmount: false,
        isSortable: true,
    },
    {
        header: "State",
        accessor: "state",
        inputType: InputType.STRING,
        isURL: false,
        showColumn: true,
        isDollarAmount: false,
        isSortable: true,
    },
    {
        header: "Agent Type",
        accessor: "agentType",
        inputType: InputType.STRING,
        isURL: false,
        showColumn: true,
        isDollarAmount: false,
        isSortable: true,
    },
];