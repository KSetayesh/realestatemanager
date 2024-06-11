// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

// Define the database configuration
const applicationConfig = {
    commit: process.env.COMMIT.toLocaleLowerCase() === 'true',
    useCache: process.env.USE_PROPERTY_CACHE.toLocaleLowerCase() === 'true',
    calculationsApiUrl: process.env.CALCULATIONS_API_URL,
};

export default applicationConfig;
