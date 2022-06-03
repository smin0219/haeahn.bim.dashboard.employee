import React ,{useEffect, useState} from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import styles from './css/overview.module.css';
import pageStyles from './css/page-wrap.module.css';
import NavigationBar from '../common/NavigationBar';
import MuiDatePicker  from '../common/MuiDatePicker';
import Tooltip from '@mui/material/Tooltip';
import Moment from 'moment';
import Data from '../data/Data';

function Overview(){
    const [startDate, setStartDate] = useState(Moment().subtract(1, 'month').startOf('day').format('YYYY-MM-DD'));
    const [endDate, setEndDate] = useState(Moment().subtract(1, 'day').startOf('day').format('YYYY-MM-DD'));
    const [employeeId, setEmployeeId] = useState('sj.min');
    const [empolyeeCode, setEmployeeCode] = useState('20210916');
    const [employeeName, setEmployeeName] = useState('민성재');
    const [elements, setElements] = useState({});

    const profileImg = "https://hub.haeahn.com/Storage/GW/ImageStorage/Employee/" + employeeId + ".jpg";

    useEffect(() => {
    },[])

    const ProjectList = () => {
        Data.GetElements(empolyeeCode, startDate, endDate)
        .then(response => {
            var elements = response.data;
            if(elements.length > 0){
                // elements.map((element, i) => {
                //     return (
                //         <div className={styles.block_column_wrapper} onClick={(e) => this.onProjectClicked(e, project.project_code)}>
                //             <Tooltip title={project.project_code}><div className='project-content-wrapper' style={{lineHeight: "37px", width: "60px"}}>{project.project_code}</div></Tooltip>
                //             <Tooltip title={project.project_name}><div className='project-list-content' style={{lineHeight: "37px", width: "253px" }}>{project.project_name}</div></Tooltip>
                //             <Tooltip title={Moment(project.occurred_on).format('YYYY-MM-DD HH:mm')}><div className='project-list-content' style={{lineHeight: "37px", width: "120px"}}>{Moment(project.occurred_on).format('YYYY-MM-DD HH:mm')}</div></Tooltip>
                //         </div>
                //     );
                // })
            }
        });
    }

    return (
        <main className={pageStyles.page_wrapper}>
            <section className={pageStyles.page_container}>
                <NavigationBar/>
                <div className={styles.block_column_wrapper}>
                    <div className={styles.block_row_wrapper} style={{height: '100px'}}>
                        <div className={styles.title_label}>Performance Overview</div>
                        <MuiDatePicker date={startDate} setDate={setStartDate}/>
                        <div style={{height: '10px', paddingTop: '40px', paddingLeft: '20px', paddingRight: '20px'}}>-</div>
                        <MuiDatePicker date={endDate} setDate={setEndDate}/>
                        <div className={styles.profile_label}>환영합니다, {employeeName}</div>
                        <img className={styles.profile_img} src={profileImg} alt="profile"/>
                    </div>
                    <div className={styles.block_row_wrapper} style={{marginLeft: '5px'}}>
                        <div className={styles.block_column_wrapper} >
                            <div className={styles.block_row_wrapper}>
                                <div className={styles.content_wrapper} >
                                    <div className={styles.stats_value}>3</div>
                                    <div className={styles.stats_title}>number of projects</div>
                                </div>
                                <div className={styles.content_wrapper}>
                                    <div className={styles.stats_value}>4</div>
                                    <div className={styles.stats_title}>total elements</div>
                                </div>
                                <div className={styles.content_wrapper} style={{width: '300px'}}>
                                    <div className={styles.stats_value}>Wall</div>
                                    <div className={styles.stats_title}>major element category</div>
                                </div>
                            </div>
                            <div className={styles.block_column_wrapper}>
                                <div className={styles.content_wrapper} style={{ paddingLeft: '15px', textAlign: 'left', height: '250px'}}>
                                    <h2 className={styles.content_title}>ONGOING PROJECTS</h2>
                                    <ProjectList/>
                                </div>
                                <div className={styles.content_wrapper} style={{paddingLeft: '15px', textAlign: 'left', height: '330px'}}>
                                    <h2 className={styles.content_title}>WORK RATIO</h2>
                                </div>
                            </div>
                        </div>
                        <div className={styles.block_column_wrapper}>
                            <div className={styles.content_wrapper} style={{width: '565px', paddingLeft: '15px', textAlign: 'left', height: '500px'}}>
                                <h2 className={styles.content_title}>STATISTICS</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
export default Overview;