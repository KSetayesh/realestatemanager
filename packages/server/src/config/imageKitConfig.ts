// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

// Define the database configuration
const imageKitConfig = {
    imageKitId: process.env.IMAGE_KIT_ID,
    imageKitPrivateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
    imageKitPublicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
};

export default imageKitConfig;
