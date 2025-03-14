// import React, { useState, useEffect } from 'react';
// import { ListingWithScenariosResponseDTO } from '@realestatemanager/types';
// import { BasicTable, TableComponent, CustomAccordion } from 'react-ui-library-ks-dev';
// import { CreatePropertiesTable } from './Tables/PropertiesTable';
// import PropertyForm from './Forms/PropertiesForm';

// // Material-UI imports
// import {
//     Box,
//     Typography,
//     Button,
//     CircularProgress,
//     useTheme
// } from '@mui/material';

// // Icon imports
// import HomeWorkIcon from '@mui/icons-material/HomeWork';
// import AddHomeIcon from '@mui/icons-material/AddHome';

// const PropertiesPage: React.FC = () => {
//     const theme = useTheme();
//     const [isLoading, setIsLoading] = useState(false);
//     const [properties, setProperties] = useState<ListingWithScenariosResponseDTO[]>([]);
//     const [formExpanded, setFormExpanded] = useState(false);

//     // Load properties on component mount
//     useEffect(() => {
//         loadProperties();
//     }, []);

//     // Load properties from API
//     const loadProperties = async () => {
//         // Replace with your actual property service
//         // const propertyService = new PropertyService();

//         setIsLoading(true);
//         try {
//             // Simulate API call with timeout and sample data
//             await new Promise(resolve => setTimeout(resolve, 1000));

//             // Sample data - would be replaced with actual API call
//             // const data = await propertyService.getAllProperties();
//             const data: ListingWithScenariosResponseDTO[] = [];

//             setProperties(data);
//             console.log("Properties loaded:", data);
//         } catch (error) {
//             console.error('Failed to load properties.', error);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     // Handle new property creation
//     const handlePropertyAdded = async (): Promise<boolean> => {
//         // Reload properties after creation
//         try {
//             await loadProperties();
//             setFormExpanded(false); // Collapse form after successful creation
//             return true;
//         } catch (error) {
//             console.error('Failed to refresh properties list.', error);
//             return false;
//         }
//     };

//     // Create table from properties data
//     const createTable = (data: ListingWithScenariosResponseDTO[]): BasicTable<ListingWithScenariosResponseDTO> => {
//         return new CreatePropertiesTable().createDefaultTable(data);
//     };

//     // Toggle form accordion
//     const toggleFormAccordion = () => {
//         setFormExpanded(!formExpanded);
//     };

//     return (
//         <Box sx={{ p: 3, maxWidth: 2200, mx: 'auto' }}>
//             <Box sx={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 mb: 3
//             }}>
//                 <Typography variant="h4" component="h1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                     <HomeWorkIcon fontSize="large" />
//                     Properties
//                 </Typography>
//                 <Button
//                     variant="contained"
//                     color="primary"
//                     startIcon={<AddHomeIcon />}
//                     onClick={toggleFormAccordion}
//                 >
//                     {formExpanded ? 'Hide Form' : 'Add New Property'}
//                 </Button>
//             </Box>

//             <CustomAccordion
//                 title="Add New Property"
//                 subtitle="Fill out the form to add a new property to the system"
//                 icon={<AddHomeIcon />}
//                 defaultExpanded={formExpanded}
//                 headerBackgroundColor={theme.palette.primary.light}
//                 elevation={3}
//             >
//                 <PropertyForm onPropertyAdded={handlePropertyAdded} />
//             </CustomAccordion>

//             <Box sx={{ mt: 4 }}>
//                 {isLoading ? (
//                     <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
//                         <CircularProgress />
//                     </Box>
//                 ) : (
//                     <>
//                         {properties.length > 0 ? (
//                             <TableComponent
//                                 table={createTable(properties)}
//                             />
//                         ) : (
//                             <Box sx={{
//                                 p: 4,
//                                 textAlign: 'center',
//                                 bgcolor: theme.palette.grey[100],
//                                 borderRadius: 1
//                             }}>
//                                 <Typography variant="h6" color="text.secondary">
//                                     No properties found
//                                 </Typography>
//                                 <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
//                                     Use the form above to add a new property to get started.
//                                 </Typography>
//                                 <Button
//                                     variant="outlined"
//                                     color="primary"
//                                     sx={{ mt: 2 }}
//                                     onClick={() => setFormExpanded(true)}
//                                 >
//                                     Add First Property
//                                 </Button>
//                             </Box>
//                         )}
//                     </>
//                 )}
//             </Box>
//         </Box>
//     );
// };

// export default PropertiesPage;
import React, { useState, useEffect } from 'react';
import { ListingWithScenariosResponseDTO, CreateGetAllPropertiesRequest } from '@realestatemanager/types';
import { BasicTable, TableComponent } from 'react-ui-library-ks-dev';

// Material-UI imports
import {
    Box,
    Typography,
    CircularProgress,
    useTheme,
    Paper
} from '@mui/material';

// Icon imports
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import { RealEstateCalcApi } from '../../oldCode/api/realestatecalc/realestatecalcapi';
import { CreatePropertiesTable } from './Tables/PropertiesTable';

const PropertiesPage: React.FC = () => {
    const theme = useTheme();
    const [isLoading, setIsLoading] = useState(false);
    const [properties, setProperties] = useState<ListingWithScenariosResponseDTO[]>([]);

    // Load properties on component mount
    useEffect(() => {
        loadProperties();
    }, []);

    // Pagination state
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);

    // Load properties from API
    const loadProperties = async () => {
        setIsLoading(true);
        try {
            // Create request object for the API
            // const filteredPropertyListRequest = {
            //     // Add any filter parameters here if needed
            //     // For example:
            //     // priceMin: 0,
            //     // priceMax: 1000000,
            //     // bedroomsMin: 0,
            //     // etc.
            // };

            const dataToSubmit: CreateGetAllPropertiesRequest = {
                // filteredPropertyListRequest: filteredPropertyListRequest,
                paginationDetails: {
                    limit: limit,
                    offset: offset,
                },
            };

            // Call the API to get properties
            const realEstateCalcApi: RealEstateCalcApi = new RealEstateCalcApi();
            const properties: ListingWithScenariosResponseDTO[] = await realEstateCalcApi.getAllProperties(dataToSubmit);

            setProperties(properties);
            console.log("Properties loaded:", properties);
        } catch (error) {
            console.error('Failed to load properties.', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Create table from properties data
    const createTable = (data: ListingWithScenariosResponseDTO[]): BasicTable<ListingWithScenariosResponseDTO> => {
        return new CreatePropertiesTable().createDefaultTable(data);
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
                    <HomeWorkIcon fontSize="large" />
                    Properties
                </Typography>
            </Box>

            <Paper elevation={2} sx={{ p: 2 }}>
                {isLoading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
                        {properties.length > 0 ? (
                            <TableComponent
                                table={createTable(properties)}
                            // onPageChange={(page) => {
                            //     setOffset(page * limit);
                            // }}
                            // onRowsPerPageChange={(rowsPerPage) => {
                            //     setLimit(rowsPerPage);
                            //     setOffset(0); // Reset to first page when changing rows per page
                            // }}
                            />
                        ) : (
                            <Box sx={{
                                p: 4,
                                textAlign: 'center',
                                bgcolor: theme.palette.grey[100],
                                borderRadius: 1,
                                mt: 2
                            }}>
                                <Typography variant="h6" color="text.secondary">
                                    No properties found
                                </Typography>
                                <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                                    Properties will appear here once they are added to the system.
                                </Typography>
                            </Box>
                        )}
                    </>
                )}
            </Paper>
        </Box>
    );
};

export default PropertiesPage;