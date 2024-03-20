const { exec } = require('child_process');
import { Pool } from 'pg';
import dbConfig from '../config/dbConfig';
import fs from 'fs';

export const pool = new Pool(dbConfig);

enum SQLTable {
    CREATE_SCHOOL_RATING_TABLE = 'CreateSchoolRatingTable',
    CREATE_ADDRESS_TABLE = 'CreateAddressTable',
    CREATE_PROPERTY_DETAILS_TABLE = 'CreatePropertyDetailsTable',
    CREATE_ZILLOW_MARKET_ESTIMATES_TABLE = 'CreateZillowMarketEstimatesTable',
    CREATE_LISTING_DETAILS_TABLE = 'CreateListingDetailsTable',
    CREATE_AGENTS_TABLE = 'CreateAgentsTable',
};

const dbschemaFile = `${__dirname}/../../src/db/dbschema.sql`;

// Function to create the database if it doesn't exist
function createDatabase() {
    return new Promise((resolve, reject) => {
        const user = dbConfig.user;
        const dbName = dbConfig.database;
        console.log(`user: ${user}`);
        console.log(`dbName: ${dbName}`);
        exec(`createdb -U ${user} ${dbName}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error creating database: ${error}`);
                return reject(error);
            }
            console.log(`Database ${dbName} created or already exists.`);
            resolve(stdout);
        });
    });
}

async function loadSqlStatementToExecute(): Promise<void> {
    const sqlContent = await readSqlFile(); // Adjust the path according to your project structure
    const client = await pool.connect();

    try {
        for (const query of Object.values(SQLTable)) {
            await createTable(sqlContent, query, client);
        }
    } catch (err) {
        console.error('Could not create database', err);
    } finally {
        client.release();
    }

}

async function createTable(sqlContent: string, table: string, client) {
    const tableQuery = extractQuery(sqlContent, table);
    console.log(tableQuery);
    await client.query(tableQuery);
    // return pool.query(tableQuery);
};

async function readSqlFile(): Promise<string> {
    // const absolutePath = path.join(__dirname, filePath);
    try {
        return await fs.promises.readFile(dbschemaFile, 'utf-8');
    } catch (error) {
        console.error('Error reading the SQL file:', error);
        throw error;
    }
}

function extractQuery(sqlContent: string, queryName: string): string {
    const queryRegex = new RegExp(`-- Query: ${queryName}\\s*([\\s\\S]*?)-- EndQuery`, 'm');
    const match = queryRegex.exec(sqlContent);
    if (match && match[1]) {
        return match[1].trim();
    }
    throw Error(`${queryName} does not exist`);
}

async function executeScript() {
    try {
        // Create the database
        try {
            await createDatabase();
        }
        catch (err) {
            console.log(err);
        }

        // Continue with the rest of your script, such as creating tables
        console.log("Proceeding to create tables or run other SQL statements...");

        await loadSqlStatementToExecute();

    } catch (error) {
        console.error('An error occurred:', error);
    }
}

executeScript().then(() => {
    console.log("Tables have been created or already exists");
}).catch((err) => {
    console.error("Error creating tables", err);
});


// export const query = (text: string, params?: any[]) => pool.query(text, params);


