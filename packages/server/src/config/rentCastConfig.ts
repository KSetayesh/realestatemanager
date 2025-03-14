// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

// Define the database configuration
const rentCastConfig = {
    rentCastApiUrl: process.env.RENT_CAST_API_URL,
    canMakeRentCastApiCall: process.env.CAN_MAKE_RENTCAST_API_CALL.toLocaleLowerCase() === 'true',
};

export default rentCastConfig;
