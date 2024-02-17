import { ApexOptions } from 'apexcharts';
import React from 'react';
import ReactApexChart from 'react-apexcharts';

const Projections: React.FC = () => {
    const series = [{
        name: 'Revenue',
        data: [45000, 47000, 50000, 55000, 60000, 65000] // Example data
    }];

    const options = {
        chart: {
            type: 'line'
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] // Example months
        },
        yaxis: {
            title: {
                text: 'Amount ($)'
            }
        },
        title: {
            text: 'Financial Projections',
            align: 'left'
        }
    };


    return (
        <div>
            <h2>On Projections Page</h2>
            <div>
                <ReactApexChart options={options as ApexOptions} series={series} type="line" height={650} />
            </div>
        </div>
    );
};

export default Projections;

// import React from "react";
// import ReactApexChart from "react-apexcharts";
// import { ApexOptions } from "apexcharts";

// // Example component using ApexCharts in TypeScript
// class Projections extends React.Component {
//     constructor(props: any) {
//         super(props);

//         this.state = {
//             options: {
//                 chart: {
//                     // Specify the exact chart type as a string literal
//                     type: 'line' as const, // Example: 'line', 'bar', 'area', etc.
//                 },
//                 xaxis: {
//                     categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
//                 },
//                 yaxis: {
//                     title: {
//                         text: 'Amount ($)',
//                     },
//                 },
//                 title: {
//                     text: 'Monthly Revenue',
//                     align: 'left',
//                 },
//             },
//             series: [
//                 {
//                     name: "Revenue",
//                     data: [45000, 48000, 47000, 52000, 54000, 58000],
//                 },
//             ],
//         };
//     }

//     render() {
//         return (
//             <ReactApexChart
//                 options={this.state.options as ApexOptions}
//                 series={this.state.series}
//                 type="line"
//                 width="500"
//             />
//         );
//     }
// }

// export default Projections;



