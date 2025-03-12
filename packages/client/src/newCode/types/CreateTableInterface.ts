import { BasicTable } from "react-ui-library-ks-dev";

export interface CreateTableInterface<T> {
    createDefaultTable: (data: T[]) => BasicTable<T>;
};