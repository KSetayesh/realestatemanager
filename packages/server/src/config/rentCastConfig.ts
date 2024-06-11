// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

// Define the database configuration
const rentCastConfig = {
    rentCastApiUrl: process.env.RENT_CAST_API_URL,
    rentCastApiKey: process.env.RENTCAST_API_KEY,
    backUpRentCastApiKey: process.env.BACK_UP_RENTCAST_API_KEY,
    backUpbackUpRentCastApiKey: process.env.BACK_UP_BACK_UP_RENTCASE_API_KEY,
    canMakeRentCastApiCall: process.env.CAN_MAKE_RENTCAST_API_CALL.toLocaleLowerCase() === 'true',
};

export default rentCastConfig;
