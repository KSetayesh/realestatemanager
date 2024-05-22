import fs from 'fs/promises';  // Use promise-based fs


export class GetAllAddressIds {
    private rentCastSaleFilePath = '/Users/kevinsetayesh/Repos/realestatemanager/packages/server/src/data/latestRentCastSale.json';

    async execute(): Promise<void> {
        let propertyData;
        try {
            propertyData = await fs.readFile(this.rentCastSaleFilePath, { encoding: 'utf8' });
            propertyData = JSON.parse(propertyData);
            console.log();
            let counter = 0;
            for (const property of propertyData) {
                console.log("'" + property.id + "', ");
                counter++;
            }
            console.log();
            console.log(`${counter} properties in json file`);
        } catch (error) {
            console.error('Error reading file:', error);
            return null;
        }
    }
}

const getIds = new GetAllAddressIds();
getIds.execute();