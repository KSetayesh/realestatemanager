import { ApexOptions } from 'apexcharts';
import React from 'react';
import ReactApexChart from 'react-apexcharts';

const Projections: React.FC = () => {

    enum LineColor {
        BLUE = '#FF4560',
        GREEN = '#00E396',
        ORANGE = '#008FFB'
    };

    const state = {
        options: {
            chart: {
                type: 'line',
                toolbar: {
                    show: true
                }
            },
            colors: [LineColor.BLUE, LineColor.GREEN, LineColor.ORANGE], // Different colors for each line
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
            },
            yaxis: {
                title: {
                    text: 'Value'
                }
            },
            stroke: {
                width: [3, 3, 3], // Line thickness
                curve: 'straight' // Style of the line (can be 'straight', 'smooth', etc.)
            },
            legend: {
                position: 'top', // Position of the legend
                horizontalAlign: 'right', // Alignment of the legend
            },
            title: {
                text: 'Monthly Data',
                align: 'left'
            }
        },
        series: [
            {
                name: 'Dataset 1',
                data: [30, 40, 45, 50, 49, 60, 70, 91, 125]
            },
            {
                name: 'Dataset 2',
                data: [45, 70, 60, 75, 80, 95, 100, 110, 120]
            },
            {
                name: 'Dataset 3',
                data: [10, 20, 30, 40, 50, 60, 70, 80, 90]
            }
        ],
    };

    return (
        <div>
            <h2>On Projections Page</h2>
            <div>
                <ReactApexChart options={state as ApexOptions} series={state.series} type="line" height={650} />
            </div>
        </div>
    );


};

export default Projections;

