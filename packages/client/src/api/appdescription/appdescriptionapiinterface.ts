export interface AppDescriptionApiInterface<T> {
    getAppDescription(): Promise<T>;
}