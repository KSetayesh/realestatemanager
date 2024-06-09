import React from 'react';
import { Modal, Box, Typography, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';
import { ensureAbsoluteUrl, renderCellData } from '../constants/Constant';
import CustomButtonComponent from '../basicdatadisplaycomponents/ButtonComponent';
import { AbstractTable, TablesConfig } from '../tables/AbstractTable';
import { TableColumn, TableDataItem, TableRow } from './ReusableTable';

export interface PropertyDetailsModalProps<Y, X extends keyof TablesConfig<Y>> {
    data: Y | null;
    tableHandler: AbstractTable<Y, X>;
    onClose: () => void;
};

const PropertyDetailsModal = <Y, X extends keyof TablesConfig<Y>>({
    data,
    tableHandler,
    onClose,
}: PropertyDetailsModalProps<Y, X>) => {

    if (!data) return null;

    const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

    const tableType: X = tableHandler.getDefaultTableType();

    const getTableColumns = (): TableColumn[] => {
        const tablesConfig: TablesConfig<Y> = tableHandler.getTablesConfig();
        return tablesConfig[tableType].columns;
    };

    const getTableData = (): TableDataItem<Y> => {
        if (!data) {
            throw Error('Data missing for modal');
        }
        const tableData: TableDataItem<Y>[] = tableHandler.getTableData([data], tableType);
        return tableData[0];
    };

    return (
        <Modal
            open={!!data}
            onClose={onClose}
            onClick={onClose}
            aria-labelledby="property-details-title"
            aria-describedby="property-details-description"
        >
            <Box
                onClick={stopPropagation}
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 900,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 1,
                    maxHeight: '80vh',
                    overflowY: 'auto',
                }}
            >
                <Box
                    sx={{
                        textAlign: 'center', // Center the title
                    }}
                >
                    <Typography id="property-details-title" variant="h4" component="h2" gutterBottom>
                        Property Details
                    </Typography>
                    <hr />
                </Box>
                {getTableColumns().map((column, colIndex) => {
                    const rowData: TableRow = getTableData().rowData;
                    const cellData = renderCellData(rowData[column.accessor],
                        column.isDollarAmount,
                        column.addSuffix);

                    let content;
                    if (column.routeTo) {
                        content = (
                            <MuiLink component={Link} to={`/${column.routeTo}/${cellData}`} state={{ data: data }}>
                                {column.routeTo}
                            </MuiLink>
                        );
                    } else if (column.isURL) {
                        const formattedUrl = ensureAbsoluteUrl(cellData);
                        content = <MuiLink href={formattedUrl} target="_blank" rel="noopener noreferrer">View</MuiLink>;
                    } else {
                        content = <Typography component="span"> {cellData}</Typography>;
                    }
                    return (
                        <Typography key={colIndex} variant="body1" paragraph>
                            <strong>{column.header}: </strong>
                            {content}
                        </Typography>
                    );
                })}
                <CustomButtonComponent
                    buttonTitle={'Close'}
                    onClick={onClose}
                    style={{ display: 'block', margin: '20px auto 0' }}
                />
            </Box>
        </Modal>
    );
};

export default PropertyDetailsModal;
