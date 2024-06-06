import { AbstractTable, TablesConfig } from "./AbstractTable";
import { TableColumn, TableRow } from "../components/ReusableTable";
import { DefaultTableType } from "../constants/Constant";
import { DummyCSVDataType } from "../pages/PropertyForm";
import { dummyDataDefaultColumns } from "./columns/DummyCSVDataColumns";

export class DummyCSVDataTable extends AbstractTable<DummyCSVDataType, DefaultTableType> {

    getDefaultTableType(): DefaultTableType {
        return DefaultTableType.DEFAULT;
    }

    getTablesConfig(): TablesConfig<DummyCSVDataType> {
        return {
            [DefaultTableType.DEFAULT]: {
                columns: this.getDefaultColumns(),
                data: (dummyData: DummyCSVDataType): TableRow => {
                    return dummyData;
                },
            },
        };
    }

    getDefaultColumns(): TableColumn[] {
        return dummyDataDefaultColumns;
    }

}