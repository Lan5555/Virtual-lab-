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
import { useScore } from '@/app/components/points';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleDown } from '@fortawesome/free-solid-svg-icons/faArrowCircleDown';
import { faAngleDown, faArrowDown, faChartArea, faKitMedical, faSwatchbook, faVirus } from '@fortawesome/free-solid-svg-icons';
import Toast from '@/app/components/toast';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Spinner from '@/app/components/loader';
  
  // Register required Chart.js components
  ChartJS.register(LineElement,BarElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);


//Can you work on this
const Dashboard:React.FC = () => {
  const router = useRouter();
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June','July','August','September','October','November','December'], // X-axis labels
        datasets: [
          {
            label: 'Progress',
            data: [65, 59, 80, 81, 56, 55,33,65,11,56,78,99], // Y-axis data points
            borderColor: 'blueviolet', // Line color
            backgroundColor: 'rgba(75, 192, 192, 0.2)', // Fill color under the line
            tension: 0.4, // Smoothness of the curve (0: sharp lines, 1: very smooth)
            pointBackgroundColor: 'blueviolet', // Color of the points
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
                backgroundColor:'blueviolet',
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
      const {score} = useScore();
      const [toast,setToast] = useState<boolean>(false);
      const [mediaquery, setMediaQuery] = useState('desktop');
      const [loading,isLoading] = useState(false);
    const updateMediaQuery = () => {
        if (window.matchMedia('(max-width: 600px)').matches) {
          setMediaQuery('mobile');
        } else if (window.matchMedia('(min-width: 548px) and (max-width:1140px)').matches) {
          setMediaQuery('tablet');
        } else {
          setMediaQuery('desktop');
        }
      };
    
      useEffect(() => {
        updateMediaQuery();
        window.addEventListener('resize', updateMediaQuery);
        return () => window.removeEventListener('resize', updateMediaQuery);
      }, []);
    return (
        <PageLayout>
               {mediaquery == 'desktop' && <Wrap content={<h3 className='text-white'>Dashboard</h3>} color='blueviolet' classname='-z-10'/>}
            <div>
                <div className={styles.barContainer}>
                    <div className={styles.bars}>
                    <Wrap color='lightgreen' content={<h3 style={{fontSize:'10pt'}}><Icon size1={''}
                        iconName={'wallet'}
                        onPressed={() => { } }
                            color={'green'} /> Points earned</h3>}
                            />
                        <p style={{textAlign:'center',fontSize:'11pt'}}><Icon iconName={'tag'} size1={undefined} onPressed={function (): void {
                            } } color={'red'}/> {score !== null? score : 'No score available:'}pt</p>
                    </div>
                    <div className={styles.bars}>
                    <Wrap color='lightyellow' content={<h3 style={{fontSize:'10pt'}}><Icon size1={''}
                        iconName={'infoCircle'}
                        onPressed={() => { } }
                            color={'black'} /> Current plan</h3>}
                            />
                            <p style={{textAlign:'center',fontSize:'11pt'}}><Icon iconName={'tag'} size1={undefined} onPressed={function (): void {
                            } } color={'orange'}/> Basic plan</p>
                    </div>
                    <div className={styles.bars}>
                    <Wrap color='white' content={<h3 style={{fontSize:'10pt',color:'black'}}><Icon size1={''}
                        iconName={'computer'}
                        onPressed={() => { } }
                            color={'black'} /> Current lab</h3>}
                            />
                            <p style={{textAlign:'center',fontSize:'11pt'}}><Icon iconName={'tag'} size1={undefined} onPressed={function (): void {
                            } } color={'black'}/> Chemistry</p>
                    </div>
                    <div className={styles.bars}>
                    <Wrap color='blue' content={<h3 style={{fontSize:'10pt',color:'white'}}><Icon size1={''}
                        iconName={'wallet'}
                        onPressed={() => { } }
                            color={'white'} />Wallet</h3>}
                            />
                            <p style={{textAlign:'center',fontSize:'11pt'}}><Icon iconName={'wallet'} size1={undefined} onPressed={function (): void {
                            } } color={'blue'}/> NGN 6500.00</p>
                    </div>
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
                    <div className={styles.box1}>
                      {/* <img className='w-full h-full object-cover rounded brightness-75' alt='' src='/misc/competition/images/chem-1.jpg'></img> */}
                      <button className='cursor-pointer w-44 p-2 animate-pulse border-none rounded text-white' style={{backgroundColor:'black'}} onClick={()=>{
                        isLoading(true);
                        setTimeout(()=>{
                        router.push('/pages/lab');
                        },500);
                      }}>{loading ? (<Spinner></Spinner>) : "Continue practical"}</button>
                    </div>
                    <div className={styles.box2}>
                      <div className='w-full h-12 flex justify-between' style={{borderBottom:'1px solid rgba(0,0,0,0.1)'}}>
                        <h4 className='font-bold ml-5 opacity-75'>Subjects Available</h4>
                        <FontAwesomeIcon icon={faAngleDown} className='relative top-6 right-5 text-xxs'></FontAwesomeIcon>
                      </div>
                      <div className='w-full h-auto flex justify-between ml-5'>
                        <div className='flex gap-6'>
                          <FontAwesomeIcon icon={faSwatchbook} className='relative left-2 top-4 opacity-45'></FontAwesomeIcon>
                          <p className='opacity-45 text-sm'>Physics</p>
                        </div>
                            <p className='relative right-10'>1</p>
                      </div>
                      <div className='w-full h-auto flex justify-between ml-5'>
                      <div className='flex gap-6'>
                          <FontAwesomeIcon icon={faKitMedical} className='relative left-2 top-4 opacity-45'></FontAwesomeIcon>
                          <p className='opacity-45 text-sm'>Chemistry</p>
                        </div>
                        <p className='relative right-10'>1</p>
                      </div>
                      <div className='w-full h-auto flex justify-between ml-5'>
                      <div className='flex gap-6'>
                          <FontAwesomeIcon icon={faVirus} className='relative left-2 top-4 opacity-45'></FontAwesomeIcon>
                          <p className='opacity-45 text-sm'>Biology</p>
                        </div>
                        <p className='relative right-10'>1</p>
                      </div>
                      <div className='w-full h-auto flex justify-between ml-5'>
                      <div className='flex gap-6'>
                          <FontAwesomeIcon icon={faChartArea} className='relative left-2 top-4 opacity-45'></FontAwesomeIcon>
                          <p className='opacity-45 text-sm'>Math</p>
                        </div>
                        <p className='relative right-10'>1</p>
                      </div>
                    </div>
                    <div className={styles.box3}>
                      <div className='flex justify-center items-center flex-col gap-5'>
                      <h1 className='text-white text-center'>VR MODE</h1>
                      <button className='text-white bg-black rounded p-2 animate-pulse border-none w-auto cursor-pointer' onClick={()=>{
                        setToast(true);
                        setTimeout(()=>{
                          setToast(false)
                        },3000);
                      }}>Enable</button>
                        {toast && <Toast text='Navigate to lab'></Toast>}
                      </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    )
}

export default Dashboard;