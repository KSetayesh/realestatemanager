import fs from 'fs/promises';  // Use promise-based fs



/*
    Grab a list of addressIds from the database and it will compare it against the addressIds in "latestRentCastSale.json". 
    It will return the addressIds in "latestRentCastSale.json" that were not found in the persisted set of addressIds.
*/

export class PropertiesThatWereNotPersisted {

    private rentCastSaleFilePath = '/Users/kevinsetayesh/Repos/realestatemanager/packages/server/src/data/latestRentCastSale.json';

    /*
    */
    private persistedAddressIds = [
        '370-Clayton-Rd,-Scarsdale,-NY-10583',
        '3-Vandalay-Ct,-Scarsdale,-NY-10583',
        '2-Cooper-Rd,-Scarsdale,-NY-10583',
        '17-Heathcote-Rd,-Scarsdale,-NY-10583',
        '154-Lee-Rd,-Scarsdale,-NY-10583',
        '40-Hampton-Rd,-Scarsdale,-NY-10583',
        '44-Paddington-Rd,-Scarsdale,-NY-10583',
        '40-Cushman-Rd,-Scarsdale,-NY-10583',
        '153-Morris-Ln-S,-Scarsdale,-NY-10583',
        '9-Dobbs-Ter,-Scarsdale,-NY-10583',
        '5-Heathcote-Rd,-Scarsdale,-NY-10583',
        '242-Boulevard,-Scarsdale,-NY-10583',
        '6-Cooper-Rd,-Scarsdale,-NY-10583',
        '239-Rock-Creek-Ln,-Scarsdale,-NY-10583',
        '85-Birchall-Dr,-Scarsdale,-NY-10583',
        '22-Meadow-Rd,-Scarsdale,-NY-10583',
        '7-Winding-Ln,-Scarsdale,-NY-10583',
        '8-Cooper-Rd,-Scarsdale,-NY-10583',
        '1-Quaker-Ctr,-Scarsdale,-NY-10583',
        '2-Myrtledale-Rd,-Scarsdale,-NY-10583',
        '241-Nelson-Rd,-Scarsdale,-NY-10583',
        '13-Olmsted-Rd,-Scarsdale,-NY-10583',
        '21-Stratton-Rd,-Scarsdale,-NY-10583',
        '233-Nelson-Rd,-Scarsdale,-NY-10583',
        '39-Penny-Ln,-Scarsdale,-NY-10583',
        '4-Hampton-Rd,-Scarsdale,-NY-10583',
        '85-Spier-Rd,-Scarsdale,-NY-10583',
        '16-Greenvale-Pl,-Scarsdale,-NY-10583',
        '64-Griffen-Ave,-Scarsdale,-NY-10583',
        '16-Lebanon-Rd,-Scarsdale,-NY-10583',
        '10-Kelwynne-Rd,-Scarsdale,-NY-10583',
        '174-Boulevard,-Scarsdale,-NY-10583',
        '41-Wildwood-Rd,-Scarsdale,-NY-10583',
        '34-Greenacres-Ave,-Scarsdale,-NY-10583',
        '4-Sherbrooke-Rd,-Scarsdale,-NY-10583',
        '8-Park-Rd,-Scarsdale,-NY-10583',
        '90-Sheridan-Rd,-Scarsdale,-NY-10583',
        '21-Greenville-Rd,-Scarsdale,-NY-10583',
        '272-Wyndcliffe-Rd,-Scarsdale,-NY-10583',
        '6-Old-Lyme-Rd,-Scarsdale,-NY-10583',
        '300-Boulevard,-Scarsdale,-NY-10583',
        '22-Romney-Pl,-Scarsdale,-NY-10583',
        '91-Garden-Rd,-Scarsdale,-NY-10583',
        '138-Saxon-Woods-Rd,-Scarsdale,-NY-10583',
        '124-Thornbury-Rd-E,-Scarsdale,-NY-10583',
        '137-Bell-Rd,-Scarsdale,-NY-10583',
        '15-Fenimore-Rd,-Scarsdale,-NY-10583',
        '10-Overlook-Rd,-Scarsdale,-NY-10583',
        '158-Fox-Meadow-Rd,-Scarsdale,-NY-10583',
    ];

    async execute(): Promise<void> {
        const rentCastFileAddressIdsSet = new Set<string>();
        let counter = 0
        const rentCastFileAddressIds: string[] = await this.getAddressIdsFromRentCastSaleFilePath();
        for (const addressId of rentCastFileAddressIds) {

            if (rentCastFileAddressIdsSet.has(addressId)) {
                console.log(`${addressId} is a duplicate adderssId found in the json file`);
            }
            rentCastFileAddressIdsSet.add(addressId);

            let found = false;
            for (const persistedAddressId of this.persistedAddressIds) {
                if (addressId === persistedAddressId) {
                    found = true;
                    break;
                }
            }
            if (found) {
                counter++;
                continue;
            }
            else {
                console.log(`${addressId} did not persist in database`);
            }
        }
        console.log(`There were ${counter} properties found in database`);
    }


    async getAddressIdsFromRentCastSaleFilePath(): Promise<string[]> {
        let propertyData;
        const addressIds: string[] = [];
        try {
            propertyData = await fs.readFile(this.rentCastSaleFilePath, { encoding: 'utf8' });
            propertyData = JSON.parse(propertyData);
            console.log();

            for (const property of propertyData) {
                addressIds.push(property.id);
            }

            return addressIds;
        } catch (error) {
            console.error('Error reading file:', error);
            return null;
        }
    }

}

const propertiesThatWereNotPersisted: PropertiesThatWereNotPersisted = new PropertiesThatWereNotPersisted();
propertiesThatWereNotPersisted.execute();