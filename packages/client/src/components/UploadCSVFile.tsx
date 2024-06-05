import React, { useState } from 'react';
import Papa from 'papaparse';
import '../styles/UploadCSVFile.css';

interface UploadCSVFileProps {
    onFileUpload: (data: Record<string, string | number>[]) => Promise<void>;
}

const UploadCSVFile: React.FC<UploadCSVFileProps> = ({ onFileUpload }) => {
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<Record<string, string | number>[]>([]);
    const [viewCSV, setViewCSV] = useState<boolean>(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
            setError(null);
            setViewCSV(false);
        }
    };

    const handleFileUpload = () => {
        if (!file) {
            setError('No file selected');
            return;
        }

        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: async function (results) {
                try {
                    await onFileUpload(results.data as Record<string, string | number>[]);
                } catch (err) {
                    setError('Failed to upload data');
                }
            },
            error: function (error) {
                setError(error.message);
            }
        });
    };

    const handleViewCSVFile = () => {
        if (!file) {
            setError('No file selected');
            return;
        }

        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
                setData(results.data as Record<string, string | number>[]); // Explicitly type the data
                setViewCSV(true);
            },
            error: function (error) {
                setError(error.message);
            }
        });
    }

    return (
        <div>
            <h2>Upload CSV File</h2>
            <div style={{ marginBottom: '10px' }}>
                <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                    className={'fileInput'}
                />
            </div>
            <button onClick={handleViewCSVFile} className={'uploadButton'}>
                View CSV File
            </button>
            <button onClick={handleFileUpload} className={'uploadButton'}>
                Upload Properties
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {viewCSV && data.length > 0 && (
                <div style={{ marginTop: '20px' }}>
                    <h3>Uploaded Data:</h3>
                    <table className="properties-table">
                        <thead>
                            <tr>
                                {Object.keys(data[0]).map((key) => (
                                    <th key={key}>{key}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, index) => (
                                <tr key={index}>
                                    {Object.values(row).map((value, i) => (
                                        <td key={i}>{String(value)}</td> // Typecast value to string
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default UploadCSVFile;
