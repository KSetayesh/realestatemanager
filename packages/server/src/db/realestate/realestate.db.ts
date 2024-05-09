import { Pool } from 'pg';
import dbConfig from '../../config/dbConfig';


export abstract class RealEstateManager {

    //protected pool = new Pool(dbConfig);
    // protected pool: Pool;

    // constructor(pool: Pool) {
    //     this.pool = pool;
    // }

    protected async genericInsertQuery(pool: Pool, query: string, values: any[]): Promise<number> {
        let insertString = ' VALUES (';
        for (let i = 0; i < values.length; i++) {
            insertString += `$${i + 1}`;
            if (i < values.length - 1) {
                insertString += ', ';
            }
        }
        insertString += ') RETURNING id;'

        console.log(insertString);

        const res = await pool.query(`${query} ${insertString}`, values);
        return res.rows[0].id;
    }

}

