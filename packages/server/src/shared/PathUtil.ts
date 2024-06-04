import { join } from 'path';

export class PathUtil {
    static getLatestRentCastSalePath(): string {
        return join(__dirname, '..', 'data', 'latestRentCastSale.json');
    }

    static getLatestRentCastPropertyPath(): string {
        return join(__dirname, '..', 'data', 'latestRentCastProperty.json');
    }

    static getDbSchemaPath(): string {
        return join(__dirname, '..', 'db', 'dbschema.sql');
    }
}
