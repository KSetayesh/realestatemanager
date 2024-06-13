// server/src/database.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { PathUtil } from 'src/utility/PathUtil';

@Injectable()
export class DatabaseService { //implements OnModuleInit {

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

    // async onModuleInit() {
    //     await this.initializeDatabase();
    //     // await this.databaseListenerDAO.onModuleInit();
    // }

    async initializeDatabase() {
        const sqlFilePath = PathUtil.getDbSchemaPath();  //join(__dirname, this.dbSchema);
        console.log('sqlFilePath:', sqlFilePath);
        const sql = readFileSync(sqlFilePath).toString();
        try {
            console.log('Running dbschema.sql script...');
            const client = await this.pool.connect();
            await client.query(sql);
            client.release();
            console.log('Database initialized successfully.');
        } catch (err) {
            console.error('Error initializing database:', err);
        }
    }
}
