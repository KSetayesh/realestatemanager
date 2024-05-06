import { Pool } from 'pg';
import dbConfig from '../../config/dbConfig';


export class RealEstateManager {

    protected pool = new Pool(dbConfig);

    protected async genericInsertQuery(query: string, values: any[]): Promise<number> {
        let insertString = ' VALUES (';
        for (let i = 0; i < values.length; i++) {
            insertString += `$${i + 1}`;
            if (i < values.length - 1) {
                insertString += ', ';
            }
        }
        insertString += ') RETURNING id;'

        console.log(insertString);

        const res = await this.pool.query(`${query} ${insertString}`, values);
        return res.rows[0].id;
    }

}

