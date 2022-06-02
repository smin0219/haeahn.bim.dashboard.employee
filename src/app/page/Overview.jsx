import React ,{useEffect, useState} from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import styles from './css/overview.module.css';
import pageStyles from './css/page-wrap.module.css';
import NavigationBar from '../common/NavigationBar';
import MuiDatePicker  from '../common/MuiDatePicker';

function Overview(){
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [userId, setUserId] = useState('sj.min');
    const [username, setUsername] = useState('민성재');

    const profileImg = "https://hub.haeahn.com/Storage/GW/ImageStorage/Employee/" + userId + ".jpg";

    return (
        <main className={pageStyles.page_wrapper}>
            <section className={pageStyles.page_container}>
                <NavigationBar/>
                <div className={styles.block_wrapper}>
                    <div className={styles.sub_block_wrapper} style={{height: '100px'}}>
                        <div className={styles.title_label}>Performance Overview</div>
                        <MuiDatePicker date={fromDate} setDate={setFromDate}/>
                        <div style={{height: '10px', paddingTop: '40px', paddingLeft: '20px', paddingRight: '20px'}}>-</div>
                        <MuiDatePicker date={toDate} setDate={setToDate}/>
                        <div className={styles.profile_label}>환영합니다, {username}</div>
                        <img className={styles.profile_img} src={profileImg} alt="profile"/>
                    </div>
                    <div className={styles.sub_block_wrapper}>
                       <div className={styles.content_wrapper} style={{marginLeft: '10px'}}>
                           <div className={styles.stats_value}>3</div>
                           <div className={styles.stats_title}>number of projects</div>
                       </div>
                       <div className={styles.content_wrapper}>
                           <div className={styles.stats_value}>4</div>
                           <div className={styles.stats_title}>total elements</div>
                       </div>
                       <div className={styles.content_wrapper}>
                           <div className={styles.stats_value}>31231232131asdfasdfsadfasdfsadfasdfsadfasdfsadfasdfsadfsadfsadfasdfasdf23123123123123123123</div>
                           <div className={styles.stats_title}>category master</div>
                       </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
export default Overview;