// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

// Define the database configuration
const applicationConfig = {
    commit: process.env.COMMIT.toLocaleLowerCase() === 'true',
    calculationsApiUrl: process.env.CALCULATIONS_API_URL,
    enableCacheUpdates: process.env.ENABLE_CACHE_UPDATES.toLocaleLowerCase() === 'true',
    redisUrl: process.env.REDIS_URL,
};

export default applicationConfig;
