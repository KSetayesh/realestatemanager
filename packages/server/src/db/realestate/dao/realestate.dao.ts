import { Pool } from 'pg';

export abstract class RealEstateDAO {

    protected async genericInsertQuery(
        pool: Pool,
        query: string,
        values: any[],
        uniqueColumn?: string
    ): Promise<number> {

        let insertString = ' VALUES (';
        for (let i = 0; i < values.length; i++) {
            insertString += `$${i + 1}`;
            if (i < values.length - 1) {
                insertString += ', ';
            }
        }
        if (uniqueColumn) {
            insertString += `) ON CONFLICT(${uniqueColumn}) DO NOTHING RETURNING id;`;
        }
        else {
            insertString += ') RETURNING id;';
        }

        const fullQuery = `${query} ${insertString}`;
        console.log(`Insert Query: ${fullQuery}`);
        console.log(`Values: ${values}`);

        try {
            const res = await pool.query(`${fullQuery}`, values);
            if (res.rowCount === 0) {
                console.log(`No new row was added - duplicate ${uniqueColumn} id found`);
                return -1;
            } else {
                const newId = res.rows[0].id;
                console.log(`New row added successfully, ID: ${newId}`);
                return newId;
            }
        } catch (err) {
            console.error('Error executing insert query:', err);
        }

    }

}

