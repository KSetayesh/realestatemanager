import { ApexOptions } from 'apexcharts';
import React from 'react';
import ReactApexChart from 'react-apexcharts';

const Projections: React.FC = () => {

    const state = {
        options: {
            chart: {
                type: 'line',
                toolbar: {
                    show: true
                }
            },
            colors: ['#FF4560', '#00E396', '#008FFB'], // Different colors for each line
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


    // const series = [{
    //     name: 'Revenue',
    //     data: [45000, 47000, 50000, 55000, 60000, 65000] // Example data
    // }];

    // const options = {
    //     chart: {
    //         type: 'line'
    //     },
    //     xaxis: {
    //         categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] // Example months
    //     },
    //     yaxis: {
    //         title: {
    //             text: 'Amount ($)'
    //         }
    //     },
    //     title: {
    //         text: 'Financial Projections',
    //         align: 'left'
    //     }
    // };


    // return (
    //     <div>
    //         <h2>On Projections Page</h2>
    //         <div>
    //             <ReactApexChart options={options as ApexOptions} series={series} type="line" height={650} />
    //         </div>
    //     </div>
    // );
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



