import { AgentResponseDTO } from "@realestatemanager/shared";
import { useEffect, useState } from "react";
import { AgentApi } from "../api/agentapi";
import ReusableTable, { TableColumn, TableDataItem, TableRow } from "../components/ReusableTable";

const AgentsList: React.FC = () => {
    const [agents, setAgents] = useState<AgentResponseDTO[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const agentApi: AgentApi = new AgentApi();

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true); // Set loading state to true before fetching data
                const agentsData: AgentResponseDTO[] = await agentApi.getAllAgents();
                setAgents(agentsData); // Update state with fetched data
                console.log("Fetched data:", agentsData);
            } catch (error) {
                // Error handling if fetchProperties fails
                console.error('Failed to fetch agents:', error);
            } finally {
                setIsLoading(false); // Ensure loading state is updated regardless of success or failure
            }
        })();
    }, []); // Empty dependency array means this effect runs once on mount

    const createRowData = (agent: AgentResponseDTO): TableRow => {
        return {
            firstName: agent.firstName,
            lastName: agent.lastName,
            fullName: agent.fullName,
            website: agent.website,
            companyName: agent.companyName,
            phoneNumber: agent.phoneNumber,
            email: agent.email,
            country: agent.country,
            state: agent.state,
            agentType: agent.agentType,
        };
    };

    const tableData: TableDataItem<AgentResponseDTO>[] = agents.map(agent => ({
        objectData: {
            key: agent,
        },
        rowData: createRowData(agent),
    }
    ));

    const columns: TableColumn[] = [
        {
            header: "First Name",
            accessor: "firstName",
            isURL: false,
            showColumn: true,
            isDollarAmount: false,
            isSortable: true,
        },
        {
            header: "Last Name",
            accessor: "lastName",
            isURL: false,
            showColumn: true,
            isDollarAmount: false,
            isSortable: true,
        },
        {
            header: "Full Name",
            accessor: "fullName",
            isURL: false,
            showColumn: true,
            isDollarAmount: false,
            isSortable: true,
        },
        {
            header: "Website",
            accessor: "website",
            isURL: true,
            showColumn: true,
            isDollarAmount: false,
            isSortable: true,
        },
        {
            header: "Company Name",
            accessor: "companyName",
            isURL: false,
            showColumn: true,
            isDollarAmount: false,
            isSortable: true,
        },
        {
            header: "Phone Number",
            accessor: "phoneNumber",
            isURL: false,
            showColumn: true,
            isDollarAmount: false,
            isSortable: true,
        },
        {
            header: "Email",
            accessor: "email",
            isURL: false,
            showColumn: true,
            isDollarAmount: false,
            isSortable: true,
        },
        {
            header: "Country",
            accessor: "country",
            isURL: false,
            showColumn: true,
            isDollarAmount: false,
            isSortable: true,
        },
        {
            header: "State",
            accessor: "state",
            isURL: false,
            showColumn: true,
            isDollarAmount: false,
            isSortable: true,
        },
        {
            header: "Agent Type",
            accessor: "agentType",
            isURL: false,
            showColumn: true,
            isDollarAmount: false,
            isSortable: true,
        },
    ];

    // Inside PropertiesList component

    // Assuming your ReusableTable component and TableColumn interface are set up to handle this
    return (
        <div>
            <h2> Agents List </h2>
            {isLoading ? (
                <p>Loading properties...</p>
            ) : (
                <>
                    <ReusableTable
                        columns={columns} // Filter columns based on showColumn
                        tableData={tableData}
                    />
                </>
            )}
        </div>
    );
};

export default AgentsList;