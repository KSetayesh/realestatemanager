import { join } from 'path';

export class PathUtil {

    static getIndexHtmlPath(): string {
        return join(__dirname, '..', '..', '..', '..', 'packages', 'client', 'dist', 'index.html');
    }

    static getStaticAssetsPath(): string {
        return join(__dirname, '..', '..', '..', '..', 'packages', 'client', 'dist');
    }

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
