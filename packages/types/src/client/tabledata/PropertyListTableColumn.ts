import { ListingWithScenariosResponseDTO } from "../../server/InvestmentTypes";
import { SortDirection } from "../types/ClientTypes";
import { TableColumn } from "./TableColumn";
import { TableType, TableTypeDetails, ValueType, columnDetails } from "./TableColumnConfig";

export class PropertyListTableColumn extends TableColumn<TableType.PROPERTY_LIST_TABLE> {

    sort(list: ListingWithScenariosResponseDTO[], sortDirection: SortDirection): ListingWithScenariosResponseDTO[] {
        return this.getTableTypeDetails().sortFunction(list, sortDirection);
    }

    value(item: ListingWithScenariosResponseDTO): ValueType {
        return this.getTableTypeDetails().value(item);
    }

    protected getTableTypeDetails(): TableTypeDetails<TableType.PROPERTY_LIST_TABLE> {
        return columnDetails[this.tableColumnDetail][TableType.PROPERTY_LIST_TABLE];
    }


}