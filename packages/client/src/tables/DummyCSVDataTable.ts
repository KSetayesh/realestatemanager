import { AbstractTable, TablesConfig } from "./AbstractTable";
import { TableColumn, TableDataItem, TableRow } from "../components/ReusableTable";
import { DefaultTableType } from "../constants/Constant";
import { DummyCSVDataType } from "../pages/PropertyForm";
import { dummyDataDefaultColumns } from "./columns/DummyCSVDataColumns";

export class DummyCSVDataTable implements AbstractTable<DummyCSVDataType, DefaultTableType> {

    getRowData(
        dummyData: DummyCSVDataType,
        tableType: DefaultTableType
    ): TableDataItem<DummyCSVDataType> {
        const tablesConfig = this.getTablesConfig();
        return {
            objectData: {
                key: dummyData,
            },
            rowData: tablesConfig[tableType].data(dummyData),
        };
    }

    getTableData(listOfData: DummyCSVDataType[], tableType: DefaultTableType): TableDataItem<DummyCSVDataType>[] {
        const tablesConfig = this.getTablesConfig();
        return listOfData.map(data => ({
            objectData: {
                key: data,
            },
            rowData: tablesConfig[tableType].data(data),
        }));
    }

    getTablesConfig(): TablesConfig<DummyCSVDataType> {
        return {
            [DefaultTableType.DEFAULT]: {
                columns: this.getDefaultColumns(),
                data: (dummyData: DummyCSVDataType): TableRow => {
                    return this.createRowData(dummyData);
                },
            },
        };
    }

    getDefaultColumns(): TableColumn[] {
        return dummyDataDefaultColumns;
    }

    private createRowData(dummyData: DummyCSVDataType) {
        return {
            firstName: dummyData.firstName,
            lastName: dummyData.lastName,
            fullName: dummyData.fullName,
            website: dummyData.website,
            companyName: dummyData.companyName,
            phoneNumber: dummyData.phoneNumber,
            email: dummyData.email,
            country: dummyData.country,
            state: dummyData.state,
            agentType: dummyData.agentType,
        };
    }

}