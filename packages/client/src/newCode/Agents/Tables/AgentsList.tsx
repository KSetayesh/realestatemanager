// // import { AgentResponseDTO, CreateUpdateAgentRequest } from "@realestatemanager/types";
// import { AgentResponseDTO } from "@realestatemanager/types";
// import { useEffect, useState } from "react";
// // import ReusableTable, { TableDataItem } from "../components/ReusableTable";
// import { AgentService } from "../../../oldCode/api/agent/agentservice";
// import { BasicTable, TableComponent } from "react-ui-library-ks-dev";
// import { CreateAgentsTable } from "./CreateAgentTable";
// // import { AgentTable } from "../tables/AgentTable";

// const AgentsList: React.FC = () => {
//     const agentService: AgentService = new AgentService();
//     // const agentTable: AgentTable = new AgentTable();
//     const [agents, setAgents] = useState<AgentResponseDTO[]>([]);
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         (async () => {
//             try {
//                 setIsLoading(true); // Set loading state to true before fetching data
//                 const agentsData: AgentResponseDTO[] = await agentService.getAllAgents();
//                 setAgents(agentsData); // Update state with fetched data
//                 console.log("Fetched data:", agentsData);
//             } catch (error) {
//                 // Error handling if fetchProperties fails
//                 console.error('Failed to fetch agents:', error);
//             } finally {
//                 setIsLoading(false); // Ensure loading state is updated regardless of success or failure
//             }
//         })();
//     }, []); // Empty dependency array means this effect runs once on mount

//     const createTable = (data: AgentResponseDTO[]): BasicTable<AgentResponseDTO> => {
//         return new CreateAgentsTable().createDefaultTable(data);
//     };

//     // const handleUpdate = async (tableDataItem: TableDataItem<AgentResponseDTO>): Promise<AgentResponseDTO> => {
//     //     const createUpdateAgentRequest: CreateUpdateAgentRequest =
//     //         agentTable.createUpdateAgentRequest(tableDataItem);
//     //     return agentApi.updateAgent(createUpdateAgentRequest);
//     // };

//     // const handleDeleteUpdate = async (tableDataItem: TableDataItem<AgentResponseDTO>): Promise<boolean> => {
//     //     return agentApi.deleteAgent(tableDataItem.objectData.key.id);
//     // };

//     // Inside PropertiesList component

//     // Assuming your ReusableTable component and TableColumn interface are set up to handle this
//     return (
//         <div>
//             <h2> Agents List </h2>
//             {isLoading ? (
//                 <p>Loading agents...</p>
//             ) : (
//                 <>
//                     <TableComponent
//                         table={createTable(agents)}
//                     />
//                     {/* <ReusableTable
//                         data={agents}
//                         tableHandler={agentTable}
//                         onRowClick={undefined}
//                         tableSeperatorDetails={undefined}
//                     // exportIntoCSV={{
//                     //     buttonTitle: 'Export CSV'
//                     // }}
//                     // tableActions={{
//                     //     handleEditUpdate: handleUpdate,
//                     //     handleDeleteUpdate: handleDeleteUpdate,
//                     // }} //{true}
//                     //handleUpdate={handleUpdate}
//                     /> */}
//                 </>
//             )}
//         </div>
//     );
// };

// export default AgentsList;