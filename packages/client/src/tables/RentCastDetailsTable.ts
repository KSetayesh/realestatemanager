import { RentCastDetailsResponseDTO } from "@realestatemanager/shared";
import { AbstractTable, TablesConfig } from "./AbstractTable";
import { TableColumn, TableRow } from "../components/ReusableTable";
import { DefaultTableType } from "../constants/Constant";
import { rentCastDetailsColumns } from "./columns/RentCastDetailsColumns";

export class RentCastDetailsTable extends AbstractTable<RentCastDetailsResponseDTO, DefaultTableType> {

    getDefaultTableType(): DefaultTableType {
        return DefaultTableType.DEFAULT;
    }

    getTablesConfig(): TablesConfig<RentCastDetailsResponseDTO> {
        return {
            [DefaultTableType.DEFAULT]: {
                columns: this.getDefaultColumns(),
                data: (data: RentCastDetailsResponseDTO): TableRow => {
                    return data;
                },
            },
        };
    }

    getDefaultColumns(): TableColumn[] {
        return rentCastDetailsColumns;
    }

}