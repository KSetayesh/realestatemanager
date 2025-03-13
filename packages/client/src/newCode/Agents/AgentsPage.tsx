// import React, { useState, useEffect } from 'react';
// import { AgentResponseDTO } from '@realestatemanager/types';
// import { BasicTable, TableComponent } from 'react-ui-library-ks-dev';
// import { CreateAgentsTable } from './Tables/CreateAgentTable';
// import { AgentService } from '../../oldCode/api/agent/agentservice';
// import AgentForm from './Forms/AgentForm';

// const AgentsPage: React.FC = () => {
//     const [isLoading, setIsLoading] = useState(false);
//     const [agents, setAgents] = useState<AgentResponseDTO[]>([]);
//     const [showForm, setShowForm] = useState(false);

//     // Load agents on component mount
//     useEffect(() => {
//         loadAgents();
//     }, []);

//     // Load agents from API
//     const loadAgents = async () => {
//         const agentService = new AgentService();

//         setIsLoading(true);
//         try {
//             const data = await agentService.getAllAgents();
//             setAgents(data);
//             console.log("Agents loaded:", data);
//         } catch (error) {
//             console.error('Failed to load agents.', error);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     // Handle new agent creation
//     const handleAgentCreated = async (): Promise<boolean> => {
//         // Reload agents after creation
//         try {
//             await loadAgents();
//             setShowForm(false); // Hide form after successful creation
//             return true;
//         } catch (error) {
//             console.error('Failed to refresh agents list.', error);
//             return false;
//         }
//     };

//     // Create table from agents data
//     const createTable = (data: AgentResponseDTO[]): BasicTable<AgentResponseDTO> => {
//         return new CreateAgentsTable().createDefaultTable(data);
//     };

//     // Toggle form visibility
//     const toggleForm = () => {
//         setShowForm(!showForm);
//     };

//     return (
//         <div className="agents-page">
//             <div className="header-actions">
//                 <h2>Real Estate Agents</h2>
//                 <button
//                     onClick={toggleForm}
//                     className="toggle-form-button"
//                 >
//                     {showForm ? 'Hide Form' : 'Add New Agent'}
//                 </button>
//             </div>

//             {showForm && (
//                 <div className="form-container">
//                     <AgentForm onAgentCreated={handleAgentCreated} />
//                     <br />
//                     <hr />
//                     <br />
//                 </div>
//             )}

//             {isLoading ? (
//                 <p>Loading agents...</p>
//             ) : (
//                 <>
//                     {agents.length > 0 ? (
//                         <TableComponent
//                             table={createTable(agents)}
//                         />
//                     ) : (
//                         <p>No agents found. Add a new agent to get started.</p>
//                     )}
//                 </>
//             )}
//         </div>
//     );
// };

// export default AgentsPage;

import React, { useState, useEffect } from 'react';
import { AgentResponseDTO } from '@realestatemanager/types';
import { BasicTable, TableComponent, CustomAccordion } from 'react-ui-library-ks-dev';
import { CreateAgentsTable } from './Tables/CreateAgentTable';
import { AgentService } from '../../oldCode/api/agent/agentservice';
import AgentForm from './Forms/AgentForm';

// Material-UI imports
import {
    Box,
    Typography,
    Button,
    CircularProgress,
    useTheme
} from '@mui/material';

// Icon imports
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PeopleIcon from '@mui/icons-material/People';

const AgentsPage: React.FC = () => {
    const theme = useTheme();
    const [isLoading, setIsLoading] = useState(false);
    const [agents, setAgents] = useState<AgentResponseDTO[]>([]);
    const [formExpanded, setFormExpanded] = useState(false);

    // Load agents on component mount
    useEffect(() => {
        loadAgents();
    }, []);

    // Load agents from API
    const loadAgents = async () => {
        const agentService = new AgentService();

        setIsLoading(true);
        try {
            const data = await agentService.getAllAgents();
            setAgents(data);
            console.log("Agents loaded:", data);
        } catch (error) {
            console.error('Failed to load agents.', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Handle new agent creation
    const handleAgentCreated = async (): Promise<boolean> => {
        // Reload agents after creation
        try {
            await loadAgents();
            setFormExpanded(false); // Collapse form after successful creation
            return true;
        } catch (error) {
            console.error('Failed to refresh agents list.', error);
            return false;
        }
    };

    // Create table from agents data
    const createTable = (data: AgentResponseDTO[]): BasicTable<AgentResponseDTO> => {
        return new CreateAgentsTable().createDefaultTable(data);
    };

    // Toggle form accordion
    const toggleFormAccordion = () => {
        setFormExpanded(!formExpanded);
    };

    return (
        <Box sx={{ p: 3, maxWidth: 2200, mx: 'auto' }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3
            }}>
                <Typography variant="h4" component="h1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PeopleIcon fontSize="large" />
                    Real Estate Agents
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<PersonAddIcon />}
                    onClick={toggleFormAccordion}
                >
                    {formExpanded ? 'Hide Form' : 'Add New Agent'}
                </Button>
            </Box>

            <CustomAccordion
                title="Add New Agent"
                subtitle="Fill out the form to create a new agent profile"
                icon={<PersonAddIcon />}
                defaultExpanded={formExpanded}
                headerBackgroundColor={theme.palette.primary.light}
                elevation={3}
            // sx={{ mb: 4 }}
            >
                <AgentForm onAgentCreated={handleAgentCreated} />
            </CustomAccordion>

            <Box sx={{ mt: 4 }}>
                {isLoading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
                        {agents.length > 0 ? (
                            <TableComponent
                                table={createTable(agents)}
                            />
                        ) : (
                            <Box sx={{
                                p: 4,
                                textAlign: 'center',
                                bgcolor: theme.palette.grey[100],
                                borderRadius: 1
                            }}>
                                <Typography variant="h6" color="text.secondary">
                                    No agents found
                                </Typography>
                                <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                                    Use the form above to add a new agent to get started.
                                </Typography>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    sx={{ mt: 2 }}
                                    onClick={() => setFormExpanded(true)}
                                >
                                    Add First Agent
                                </Button>
                            </Box>
                        )}
                    </>
                )}
            </Box>
        </Box>
    );
};

export default AgentsPage;