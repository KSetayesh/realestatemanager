import { Transformer } from "../transformer";

export class RealEstateCalcTransformer implements Transformer<string, string> {

    toClient(): string {
        throw new Error('Method not implemented');
    }

    toClientArray(photos: string[]): string[] {
        return photos;
    }

}