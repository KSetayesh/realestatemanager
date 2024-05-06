// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

// Define the database configuration
const apiKeysConfig = {
    rentCastApiKey: process.env.RENTCAST_API_KEY,
};

export default apiKeysConfig;
