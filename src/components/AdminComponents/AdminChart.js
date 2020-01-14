import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Chart from 'chart.js';

const AdminChart = () => {

    const trips = useSelector(state => state.trips.trips);
    const barChartData = [];
    const barChartLabels = [];
    let myChart ={};

    useEffect(() => {
        if (trips && trips.length)
        {   
            
            trips.forEach( (trip) => {
                if (trip.followers_num) {
                    barChartData.push(trip.followers_num);
                    barChartLabels.push(trip.vacation_id);
                }
            })
        }
    }, [trips, barChartData, barChartLabels, myChart])
    useEffect(()=>{
        setTimeout(()=>{
            const  ctx = document.getElementById("barChartCanvas")
            // eslint-disable-next-line react-hooks/exhaustive-deps
            
            if (ctx)
            {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                myChart = new Chart(ctx, 
                    {
                        type:"horizontalBar",
                        data:{
                            labels:barChartLabels,
                            datasets:[{
                                backgroundColor: 'rgb(255, 99, 132)',
                                borderColor: 'rgb(255, 99, 132)',
                                data: barChartData
                            }],
                        },
                        options: {
                            // Elements options apply to all of the options unless overridden in a dataset
                            // In this case, we are setting the border of each horizontal bar to be 2px wide
                            elements: {
                                rectangle: {
                                    borderWidth: 2,
                                }
                            },
                            responsive: true,
                            legend: {
                                position: 'right',
                            },
                            title: {
                                display: true,
                                text: 'Followers by Vacation Id'
                            }
                        }
                })
                console.log(myChart);
                
            }
        }, 30);
    },[barChartData, barChartLabels]);

    return (
    <div>
        <canvas id = "barChartCanvas"/>
    </div>
    )

	
}
export default AdminChart;   