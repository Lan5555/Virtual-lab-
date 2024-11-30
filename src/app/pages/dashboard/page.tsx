'use client'
import styles from '@/app/css/dashboard.module.css';
import Icon from '@/app/components/icons';
import Wrap from '@/app/components/wrapper';
import PageLayout from '@/app/page-layouts/page-layout';
import { Bar, Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    BarElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
    plugins,
  } from 'chart.js';
  
  // Register required Chart.js components
  ChartJS.register(LineElement,BarElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);


//Can you work on this
const Dashboard:React.FC = () => {
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June','July','August','September','October','November','December'], // X-axis labels
        datasets: [
          {
            label: 'Progress',
            data: [65, 59, 80, 81, 56, 55,33,65,11,56,78,99], // Y-axis data points
            borderColor: 'rgba(75, 192, 192, 1)', // Line color
            backgroundColor: 'rgba(75, 192, 192, 0.2)', // Fill color under the line
            tension: 0.4, // Smoothness of the curve (0: sharp lines, 1: very smooth)
            pointBackgroundColor: 'rgba(75, 192, 192, 1)', // Color of the points
            pointBorderColor: '#fff', // Border color of the points
            pointHoverRadius: 5, // Size of the points when hovered
          },
        ],
      };
    
      // Chart options
      const options:any = {
        responsive: true,
        maintainAspectRatio:false,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            enabled: true,
            backgroundColor: '#333',
            titleColor: '#fff',
            bodyColor: '#fff',
            displayColors: false,
          },
        },
        scales: {
          x: {
            grid: {
              display: false, // Hide vertical grid lines
            },
          },
          y: {
            beginAtZero: true, // Start the Y-axis at 0
          },
        },
      };

      const barData:any = {
        labels:['Chemistry','Physics','Biology','Maths'],
        datasets:[
            {
                label:'Progress',
                data:[50,200,100,400],
                backgroundColor:'rgba(75,192,192,0.6)',
            },
        ],
      };
      const barOptions:any = {
        responsive:true,
        maintainAspectRatio:false,
        plugins:{
            legend:{position:'top'},
            tooltip:{enabled:true},
        },
        scales:{
            x:{grid:{display:false}},
            y:{beginAtZero:true}
        },
      };

    return (
        <PageLayout>
                <Wrap content={<h3 className='text-white'>Dashboard</h3>} color='rgba(75,192,192,0.6)' classname='-z-10'/>
            <div>
                <div className={styles.barContainer}>
                    <div className={styles.bars}>
                    <Wrap color='white' content={<h3 style={{fontSize:'10pt'}}><Icon size1={''}
                        iconName={'wallet'}
                        onPressed={() => { } }
                            color={'grey'} /> Points earned</h3>}
                            />
                        <p style={{textAlign:'center',fontSize:'11pt'}}><Icon iconName={'tag'} size1={undefined} onPressed={function (): void {
                            } } color={'rgba(23,5,51,0.2)'}/> 15.0pt</p>
                    </div>
                    <div className={styles.bars}></div>
                    <div className={styles.bars}></div>
                    <div className={styles.bars}></div>
                </div>
                <div className={styles.secContainer}>
                    <div className={styles.item1}>
                        <Line data={data} options={options}></Line>
                    </div>
                    <div className={styles.item2}>
                        <Bar data={barData} options={barOptions}></Bar>
                    </div>
                </div>
                <div className={styles.thirdContainer}>
                    <div className={styles.box1}></div>
                    <div className={styles.box2}></div>
                    <div className={styles.box3}></div>
                </div>
            </div>
        </PageLayout>
    )
}

export default Dashboard;