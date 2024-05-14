import fs from 'fs/promises';  // Use promise-based fs


export class GetAllAddressIds {
    private rentCastSaleFilePath = '/Users/kevinsetayesh/Repos/realestatemanager/packages/server/src/data/latestRentCastSale.json';

    async execute(): Promise<void> {
        let propertyData;
        try {
            propertyData = await fs.readFile(this.rentCastSaleFilePath, { encoding: 'utf8' });
            propertyData = JSON.parse(propertyData);
            for (const property of propertyData) {
                console.log("'" + property.id + "', ");
            }
        } catch (error) {
            console.error('Error reading file:', error);
            return null;
        }
    }
}

const getIds = new GetAllAddressIds();
getIds.execute();