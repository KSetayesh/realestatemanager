import fs from 'fs/promises';  // Use promise-based fs

export class ModifyLatestRentCastFiles {

    private rentCastPropertyFilePath = '/Users/kevinsetayesh/Repos/realestatemanager/packages/server/src/data/latestRentCastProperty.json';
    private rentCastSaleFilePath = '/Users/kevinsetayesh/Repos/realestatemanager/packages/server/src/data/latestRentCastSale.json';

    async execute() {
        await this.modifyFile(this.rentCastPropertyFilePath);
        await this.modifyFile(this.rentCastSaleFilePath);
    }

    async modifyFile(filePath: string): Promise<void> {
        try {
            // Step 1: Read the existing JSON file
            const data = await fs.readFile(filePath, { encoding: 'utf8' });
            const json = JSON.parse(data);

            // Step 2: Modify each 'id' to append 'X' 
            const updatedJson = json.map((item: any) => ({
                ...item,
                id: item.id + 'X'
            }));

            console.log('updatedJson:', updatedJson);

            // Step 3: Write the updated JSON back to the file
            await fs.writeFile(filePath, JSON.stringify(updatedJson, null, 2), 'utf8');
            console.log('JSON file has been updated successfully.');
        } catch (error) {
            console.error('Error processing the JSON file:', error);
        }
    }
}

const modifyLatestRentCastFiles: ModifyLatestRentCastFiles = new ModifyLatestRentCastFiles();
modifyLatestRentCastFiles.execute();