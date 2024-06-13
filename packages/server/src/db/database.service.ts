// server/src/database.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { PathUtil } from 'src/utility/PathUtil';

@Injectable()
export class DatabaseService { 

    private pool: Pool;

    constructor() {
        dotenv.config();
        const isProduction = process.env.NODE_ENV === 'production';
        this.pool = new Pool({
            connectionString: process.env.DATABASE_URL,
            ssl: isProduction ? { rejectUnauthorized: false } : false,
        });
    }

    getPool(): Pool {
        return this.pool;
    }

    async initializeDatabase() {
        const sqlFilePaths = [
            PathUtil.getDbSchemaPath(),   
            PathUtil.getDbTriggersPath(),  
        ];

        try {
            const client = await this.pool.connect();

            for (const sqlFilePath of sqlFilePaths) {
                const sql = readFileSync(sqlFilePath).toString();
                console.log(`Running ${sqlFilePath} script...`);
                await client.query(sql);
            }

            client.release();
            console.log('Database initialized successfully.');
        } catch (err) {
            console.error('Error initializing database:', err);
        }
    }


 
}
