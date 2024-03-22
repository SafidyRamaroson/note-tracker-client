import Chart from 'chart.js/auto';
import { useEffect, useState } from "react";
import { Typography } from '@mui/material';


function ChartAverage({data}) {

    const [chartInstance, setChartInstance] = useState(null);
    const [averageData,setAverageData] = useState(null);

    useEffect(()=>{
        setAverageData(data);
    },[data]);


    useEffect(() => {
        if (averageData !== null) {
            if (chartInstance) {
                chartInstance.destroy();
            }
            const ctx = document.getElementById('chart');
            const newChartInstance = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: [
                        'Average :[0-5]',
                        'Average :[6-10]',
                        'Average : [11-15]',
                        'Average : [16-20]',
                        ],
                    datasets: [{
                        label: 'Number of Students:',
                        data: averageData,
                        backgroundColor: [
                            'rgb(255, 99, 132)',
                            'rgb(54, 162, 235)',
                            'rgb(255, 205, 86)',
                            '#9dfad3',
                          ],
                          hoverOffset: 2
                    }]
                }
            });
            setChartInstance(newChartInstance);
        }
    }, [averageData]);

    return (
        <>
        <Typography variant="h4" color="primary">Average Note Chart</Typography>
        <canvas id="chart" style={{display:"flex",alignItems:"center"}}></canvas>
        </>
    );
}

export default ChartAverage;