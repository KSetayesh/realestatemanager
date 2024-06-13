import { join } from 'path';

export class PathUtil {

    static getIndexHtmlPath(): string {
        return join(__dirname, '..', '..', '..', '..', 'packages', 'client', 'dist', 'index.html');
    }

    static getStaticAssetsPath(): string {
        return join(__dirname, '..', '..', '..', '..', 'packages', 'client', 'dist');
    }

    static getLatestRentCastSalePath(): string {
        return join(__dirname, '..', '..', 'src', 'data', 'latestRentCastSale.json');
    }

    static getLatestRentCastPropertyPath(): string {
        return join(__dirname, '..', '..', 'src', 'data', 'latestRentCastProperty.json');
    }

    static getDbSchemaPath(): string {
        return join(__dirname, '..', 'db', 'schemas', 'dbschema.sql');
    }

    static getDbTriggersPath(): string {
        return join(__dirname, '..', 'db', 'schemas', 'dbtriggers.sql');
    }

}

