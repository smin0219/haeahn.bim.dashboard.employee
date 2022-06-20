import React ,{useEffect, useState} from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import styles from './css/overview.module.css';
import pageStyles from './css/page-wrap.module.css';
import NavigationBar from '../common/NavigationBar';
import MuiDatePicker  from '../common/MuiDatePicker';
import Tooltip from '@mui/material/Tooltip';
import Moment from 'moment';
import Data from '../data/Data';
import TransactionsPerDayChart from '../chart/Chart'

function Overview(){
    const [startDate, setStartDate] = useState(Moment().subtract(1, 'month').startOf('day').format('YYYY-MM-DD'));
    const [endDate, setEndDate] = useState(Moment().subtract(1, 'day').startOf('day').format('YYYY-MM-DD'));
    const [employeeId, setEmployeeId] = useState('sj.min');
    const [employeeCode, setEmployeeCode] = useState('20210916');
    const [employeeName, setEmployeeName] = useState('민성재');
    const [elements, setElements] = useState({});
    const [projects, setProjects] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);
    const [selectedProject, setSelectedProject] = useState('');
    const [, updateState] = React.useState();

    const profileImg = "https://hub.haeahn.com/Storage/GW/ImageStorage/Employee/" + employeeId + ".jpg";

    useEffect(() => {
        if(!isLoaded){
            SetProjects();
            setIsLoaded(true);
        }
    });

    const SetProjects = () => {
        var test1 = Moment(startDate).format('YYYY-MM-DD');
        var test2 = Moment(endDate).format('YYYY-MM-DD');

        Data.GetElements(employeeCode, test1, test2)
        .then(response => {
            setProjects(response);
            setSelectedProject(response.data[0].project_code);
        })
    }

    const OnProjectClick = (event, props) => {
        setSelectedProject(props.project_code);
    }

    return (
        <main className={pageStyles.page_wrapper}>
            <section className={pageStyles.page_container}>
                <NavigationBar/>
                <div className={styles.block_column_wrapper}>
                    <div className={styles.block_row_wrapper} style={{height: '100px'}}>
                        <div className={styles.title_label}>Performance Overview</div>
                        <MuiDatePicker date={startDate} setDate={setStartDate} />
                        <div style={{height: '10px', paddingTop: '42px', paddingLeft: '20px', paddingRight: '20px'}}>-</div>
                        <MuiDatePicker date={endDate} setDate={setEndDate}/>
                        <div className={styles.block_column_wrapper} style={{width: '240px', paddingLeft: '70px'}}>
                            <img className={styles.profile_img} src={profileImg} alt="profile"/>
                            <div className={styles.profile_label}>환영합니다, {employeeName} 님</div>
                        </div>
                    </div>
                    <div className={styles.block_row_wrapper} style={{marginLeft: '5px'}}>
                        <div className={styles.block_column_wrapper} >
                            <div className={styles.block_row_wrapper}>
                                <div className={styles.content_wrapper} style={{width: '90px'}}>
                                    <div className={styles.stats_value}>{projects.data != undefined ? projects.data.length : 0}</div>
                                    <div className={styles.stats_title}>총 프로젝트 수</div>
                                </div>
                                <div className={styles.content_wrapper} style={{width: '90px'}}>
                                    <div className={styles.stats_value}>4</div>
                                    <div className={styles.stats_title}>총 객체 수</div>
                                </div>
                                <div className={styles.content_wrapper} style={{width: '226px'}}>
                                    <div className={styles.stats_value}>Wall</div>
                                    <div className={styles.stats_title}>가장 많이 작업한 모델 카테고리</div>
                                </div>
                                <div className={styles.content_wrapper} style={{width: '226px'}}>
                                    <div className={styles.stats_value}>Wall</div>
                                    <div className={styles.stats_title}>가장 많이 작업한 도면 카테고리</div>
                                </div>
                            </div>
                            <div className={styles.block_column_wrapper} style={{width: '656px'}}>
                                <div className={styles.content_wrapper} style={{textAlign: 'left', height: '250px'}}>
                                    <h2 className={styles.content_title} style={{paddingLeft: '15px'}}>프로젝트</h2>
                                    <div className={styles.block_row_wrapper} style={{height: "15px"}}>
                                        <div className={styles.content_sub_title} style={{width: "80px"}}>
                                            Project Code 
                                        </div>
                                        <div className={styles.content_sub_title} style={{width: "480px"}}>
                                            Project Name
                                        </div>
                                        <div className={styles.content_sub_title} style={{width: "174px"}}>
                                            Last Modified
                                        </div>
                                    </div>
                                    {projects.data != undefined ? projects.data.map((project, i) => {
                                            return (
                                                <Tooltip key={i} title={project.project_name}>
                                                    <div className={styles.project_content_wrapper} style={{borderRadius:'10px', borderWidth:'1px', border: selectedProject == project.project_code ? '1px solid #1974d2' : '1px solid #F1F1F1'}} onClick={(e) => OnProjectClick(e, project)}>
                                                        <div className={styles.block_row_wrapper} style={{width: '650px'}}>
                                                            <div className={styles.project_content} style={{lineHeight: "37px", width: "80px"}}>{project.project_code}</div>
                                                            <div className={styles.project_content}  style={{lineHeight: "37px", width: "480px" }}>{project.project_name}</div>
                                                            <div className={styles.project_content}  style={{lineHeight: "37px", width: "170px"}}>{Moment(project.occurred_on).format('YYYY-MM-DD HH:mm')}</div>
                                                        </div>
                                                    </div>
                                                </Tooltip>
                                            );
                                        }) : <div className={styles.project_content} style={{paddingTop: '80px'}} >기간 내에 참여하신 BIM 프로젝트가 존재하지 않습니다.</div>
                                    }
                                </div>
                                <div className={styles.content_wrapper} style={{paddingLeft: '15px', textAlign: 'left', height: '330px'}}>
                                    <h2 className={styles.content_title}>일일 작업량</h2>
                                    <TransactionsPerDayChart/>
                                </div>
                            </div>
                        </div>
                        <div className={styles.block_column_wrapper}>
                            <div className={styles.content_wrapper} style={{width: '400px', paddingLeft: '15px', textAlign: 'left', height: '638px'}}>
                                <h2 className={styles.content_title}>통계</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
export default Overview;