// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

// Define the database configuration
const applicationConfig = {
    useCache: process.env.USE_PROPERTY_CACHE.toLocaleLowerCase() === 'true',
    redisUrl: process.env.REDIS_URL,
};

export default applicationConfig;
