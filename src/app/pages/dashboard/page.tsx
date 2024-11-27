'use client'
import styles from '@/app/css/dashboard.module.css';
import Icon from '@/app/components/icons';
import Wrap from '@/app/components/wrapper';
import PageLayout from '@/app/page-layouts/page-layout';

const Dashboard:React.FC = () => {
    return (
        <PageLayout>
            <div className="">
                <h3>Dashboard</h3>
            </div>
            <div>
                <div className={styles.barContainer}>
                    <div className={styles.bars}>
                    <Wrap color='white' content={<h3 style={{fontSize:'13pt'}}><Icon size1={''}
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
                    <div className={styles.item1}></div>
                    <div className={styles.item2}></div>
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