import { AgentResponseDTO } from "@realestatemanager/shared";
import { useEffect, useState } from "react";
import { AgentApi } from "../api/agentapi";
import ReusableTable, { TableColumn, TableDataItem } from "../components/ReusableTable";
import { AgentTable } from "../tables/AgentTable";
import { DefaultTableType } from "../constants/Constant";

const AgentsList: React.FC = () => {
    const agentApi: AgentApi = new AgentApi();
    const agentTable: AgentTable = new AgentTable();
    const [agents, setAgents] = useState<AgentResponseDTO[]>([]);
    const [isLoading, setIsLoading] = useState(true);

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

    const getTableData = (): TableDataItem<AgentResponseDTO>[] => {
        return agentTable.getTableData(agents, DefaultTableType.DEFAULT);
    };

    const getTableColumns = (): TableColumn[] => {
        return agentTable.getTablesConfig()[DefaultTableType.DEFAULT].columns;
    }

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
                        columns={getTableColumns()} // Filter columns based on showColumn
                        tableData={getTableData()}
                        tableHandler={agentTable}
                        tableType={DefaultTableType.DEFAULT}
                        onRowClick={undefined}
                        includeTableSeparator={false}
                        canExportIntoCSV={true}
                    />
                </>
            )}
        </div>
    );
};

export default AgentsList;