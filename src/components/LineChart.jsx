import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = ( { data, name }) => {

    const chartData = {
        labels: data.map(point => point.Date), // x-axis: dates
        datasets: [{
            label: `${name} Weekly Adjusted Close Results Over 20 Years`,
            data: data.map(point => point.Close), //y-axis: open prices
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    };

    const options = {
        scales: {
            x: {
                type: 'category', //x-axis type
                title: {
                    display: true,
                    text: 'Date',
                    font:{
                        size: 16,
                        weight: 'bold',
                    },
                    padding: { top: 10 },
                }
            },
            y: {
                beginAtZero: false,
                title: {
                    display: true,
                    text: 'Price in Dollars per Share',
                    font:{
                        size: 16,
                        weight: 'bold',
                    },
                    padding: {right: 10},
                },

            }
        }
    };

    return(
        <div className='chart-container'> 
            <Line data={chartData} options={options} />
        </div>
    )
};

export default LineChart;