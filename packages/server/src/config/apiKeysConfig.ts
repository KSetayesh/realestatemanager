// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

// Define the database configuration
const apiKeysConfig = {
    rentCastApiKey: process.env.RENTCAST_API_KEY,
    canMakeRentCastApiCall: process.env.CAN_MAKE_RENTCAST_API_CALL.toLocaleLowerCase() === 'true',
};

export default apiKeysConfig;
