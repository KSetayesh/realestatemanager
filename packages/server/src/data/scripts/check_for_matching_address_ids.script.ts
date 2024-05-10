import fs from 'fs/promises';  // Use promise-based fs

export class CheckForMatchingAddressIds {
    private rentCastPropertyFilePath = '/Users/kevinsetayesh/Repos/realestatemanager/packages/server/src/data/latestRentCastProperty.json';
    private rentCastSaleFilePath = '/Users/kevinsetayesh/Repos/realestatemanager/packages/server/src/data/latestRentCastSale.json';

    async execute(): Promise<void> {
        let propertyData;
        try {
            propertyData = await fs.readFile(this.rentCastPropertyFilePath, { encoding: 'utf8' });
            propertyData = JSON.parse(propertyData);
        } catch (error) {
            console.error('Error reading file:', error);
            return null;
        }

        let saleData;
        try {
            saleData = await fs.readFile(this.rentCastSaleFilePath, { encoding: 'utf8' });
            saleData = JSON.parse(saleData);
        } catch (error) {
            console.error('Error reading file:', error);
            return null;
        }

        const propertyIdSet = new Set<string>();

        const saleIdSet = new Set<string>();

        for (const listing of propertyData) {
            propertyIdSet.add(listing.id);
        }

        for (const listing of saleData) {
            saleIdSet.add(listing.id);
        }

        let matches = 0;
        for (const listingId of propertyIdSet.keys()) {
            if (saleIdSet.has(listingId)) {
                console.log('Match Found!');
                console.log('Matching id:', listingId);
                matches++;
            }
        }

        console.log("Number of matches found: ", matches);

    }
}

const checkForMatchingAddressIds = new CheckForMatchingAddressIds();
checkForMatchingAddressIds.execute();