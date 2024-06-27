import { AgentResponseDTO, AgentTable1, CreateUpdateAgentRequest, TableType } from "@realestatemanager/types";
import { useEffect, useState } from "react";
import { AgentApi } from "../api/agentapi";
import ReusableTable, { TableDataItem } from "../components/ReusableTable";
import { AgentTable } from "../tables/AgentTable";
import NewNewReusableTable from "../newcomponents/NewNewReusableTable";

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

    const handleUpdate = async (tableDataItem: TableDataItem<AgentResponseDTO>): Promise<AgentResponseDTO> => {
        const createUpdateAgentRequest: CreateUpdateAgentRequest =
            agentTable.createUpdateAgentRequest(tableDataItem);
        return agentApi.updateAgent(createUpdateAgentRequest);
    };

    const handleDeleteUpdate = async (tableDataItem: TableDataItem<AgentResponseDTO>): Promise<boolean> => {
        return agentApi.deleteAgent(tableDataItem.objectData.key.id);
    };

    // Inside PropertiesList component

    // Assuming your ReusableTable component and TableColumn interface are set up to handle this
    return (
        <div>
            <h2> Agents List </h2>
            {isLoading ? (
                <p>Loading agents...</p>
            ) : (
                <>
                    {<NewNewReusableTable
                        data={agents}
                        tableHandler={new AgentTable1()}
                    />}
                    {/* <ReusableTable
                        data={agents}
                        tableHandler={agentTable}
                        onRowClick={undefined}
                        tableSeperatorDetails={undefined}
                        exportIntoCSV={{
                            buttonTitle: 'Export CSV'
                        }}
                        tableActions={{
                            handleEditUpdate: handleUpdate,
                            handleDeleteUpdate: handleDeleteUpdate,
                        }}  
                    /> */}
                </>
            )}
        </div>
    );
};

export default AgentsList;