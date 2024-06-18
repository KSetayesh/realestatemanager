// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

// Define the database configuration
const s3Config = {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
};

export default s3Config;
