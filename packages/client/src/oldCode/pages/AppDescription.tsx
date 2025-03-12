import { Box, CircularProgress, Container, Paper, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { ProjectDescription } from "@realestatemanager/types";
import { AppDescriptionService } from "../../api/appdescription/appdescriptionservice";

const AppDescription: React.FC = () => {

    const appDescriptionService: AppDescriptionService = new AppDescriptionService();
    const [appDescription, setAppDescription] = useState<ProjectDescription>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [tabValue, setTabValue] = useState(0);

    useEffect(() => {
        const fetchAppDetails = async () => {
            try {
                const appDescriptionFromServer: ProjectDescription = await appDescriptionService.getAppDescription();

                setAppDescription(appDescriptionFromServer);
            } catch (err) {
                console.log('In catch block');
                setError('Failed to fetch project descriptions');
            } finally {
                setLoading(false);
            }
        };

        fetchAppDetails();
    }, []);

    const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        console.log(event);
        setTabValue(newValue);
    };

    return (
        <Container>
            {loading && <CircularProgress />}
            {error && <Typography color="error">{error}</Typography>}
            {appDescription && (
                <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
                    <Tabs value={tabValue} onChange={handleTabChange} centered>
                        <Tab label="App Description" />
                        <Tab label="Technical Description" />
                    </Tabs>
                    {tabValue === 0 && (
                        <Box p={3}>
                            <Typography variant="h6" gutterBottom>
                                App Description
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                {appDescription?.appDescription}
                            </Typography>
                        </Box>
                    )}
                    {tabValue === 1 && (
                        <Box p={3}>
                            <Typography variant="h6" gutterBottom>
                                Technical Description
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                {appDescription?.technicalDescription}
                            </Typography>
                        </Box>
                    )}
                </Paper>
            )}
        </Container>
    );
}

export default AppDescription;