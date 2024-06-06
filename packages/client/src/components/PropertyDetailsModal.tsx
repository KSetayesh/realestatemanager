import React from 'react';
import { ListingWithScenariosResponseDTO } from "@realestatemanager/shared";
import { Modal, Box, Typography, Link as MuiLink } from '@mui/material';
import { TableColumn, TableRow } from "./ReusableTable";
import { Link } from 'react-router-dom';
import { ensureAbsoluteUrl, renderCellData } from '../constants/Constant';
import CustomButtonComponent from './BasicButton';

export interface PropertyDetailsModalType<T> {
    data: T | null;
    rowData: TableRow;
    onClose: () => void;
    columns: TableColumn[];
};

const PropertyDetailsModal = <T,>({
    data,
    rowData,
    onClose,
    columns,
}: PropertyDetailsModalType<T>) => {

    if (!data) return null;

    const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

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
                {columns.map((column, colIndex) => {
                    const cellData = renderCellData(rowData[column.accessor as keyof ListingWithScenariosResponseDTO],
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
