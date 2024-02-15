// src/config/dbConfig.ts
import { PoolConfig } from 'pg';

// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

// Define the database configuration
const dbConfig: PoolConfig = {
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: parseInt(process.env.PGPORT || '5432'),
    // Additional configuration parameters can be added here
    // For example: idleTimeoutMillis, connectionTimeoutMillis, etc.
};

export default dbConfig;
