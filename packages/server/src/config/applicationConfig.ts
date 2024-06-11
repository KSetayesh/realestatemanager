// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

// Define the database configuration
const applicationConfig = {
    commit: process.env.COMMIT.toLocaleLowerCase() === 'true',
    calculationsApiUrl: process.env.CALCULATIONS_API_URL,
    hitCalcCache: process.env.HIT_CALC_CACHE.toLocaleLowerCase() === 'true',
};

export default applicationConfig;
