export interface Transformer<T, Y> {
    toClient(dto: T): Y;
    toClientArray(dtos: T[]): Y[];
};