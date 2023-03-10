import React ,{useEffect, useState} from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import styles from './css/overview.module.css';
import pageStyles from './css/page-wrap.module.css';
import NavigationBar from '../common/NavigationBar';
import MuiDatePicker  from '../common/MuiDatePicker';
import Tooltip from '@mui/material/Tooltip';
import Moment from 'moment';
import Data from '../data/Data';
import * as am4core from "@amcharts/amcharts4/core";
import CreateXYChart, {CreatePieChart, CreatePieSeries, CreateXYSeries, CreateSeriesData} from '../chart/Chart';
import infoImg from './img/INFO_ICON.png';

function Overview(){

    const location = useLocation();

    const [, updateState] = React.useState();
    const [startDate, setStartDate] = useState(Moment().subtract(1, 'month').startOf('day').format('YYYY-MM-DD'));
    const [endDate, setEndDate] = useState(Moment().subtract(1, 'day').startOf('day').format('YYYY-MM-DD'));
    const [loginId, setLoginId] = useState(location.state.userObj.resultMail.substring(0, location.state.userObj.resultMail.indexOf('@')));
    const [employeeId, setEmployeeId] = useState(location.state.userObj.resultMessage);
    const [employeeName, setEmployeeName] = useState(location.state.userObj.resultUserName);
    const [elements, setElements] = useState({});
    const [projects, setProjects] = useState({});
    const [isDateUpdated, setIsDateUpdated] = useState(true);
    const [selectedProject, setSelectedProject] = useState('');
    const [personalTransactions, setPersonalTransactions] = useState({});
    const [teamTransactions, setTeamTransactions] = useState({});
    const [mostWorkedModel, setMostWorkedModel] = useState("-");
    const [mostWorkedAnnotation, setMostWorkedAnnotation] = useState("-");

    const profileImg = "https://hub.haeahn.com/Storage/GW/ImageStorage/Employee/" + loginId + ".jpg";

    useEffect(() => {
        if(isDateUpdated){
            setProjects({});
            GetProjects(employeeId, startDate, endDate).then(projects => {
                if(projects.data.length > 0){
                    let defaultProject = projects.data[0]
                    setProjects(projects);
                    setSelectedProject(defaultProject);
                    UpdateCharts(defaultProject.project_code);
                    setIsDateUpdated(false);
                }
                else{
                    setElements({});
                    UpdateCharts('');
                }
            })
        }
        else{
            UpdateCharts(selectedProject.project_code);
        }
    }, [selectedProject, startDate, endDate]);

    const GetProjects = (employeeId, startDate, endDate) => {
        return Data.GetProjects(employeeId, startDate, endDate);
    }

    const GetElements = (employeeId, projectCode, startDate, endDate) => {
        projectCode = (projectCode === "") ? -1 : projectCode;
        return Data.GetElements(employeeId, projectCode, startDate, endDate);
    }

    function GroupByKey(array, key) {
        return array
            .reduce((hash, obj) => {
            if(obj[key] === undefined) return hash; 
            return Object.assign(hash, { [obj[key]]:( hash[obj[key]] || [] ).concat(obj)})
            }, {})
    }

    function SortArrayByValueDesc(array) {
    array.sort(function(a, b) {return b[1] - a[1];});
    return array;
    }

    const CreateChartTitle = (chart, series, text) => {
        var container = new am4core.Container();
        container.parent = series;
        container.horizontalCenter = "middle";
        container.verticalCenter = "middle";
        container.width = am4core.percent(40) / Math.sqrt(2);
        container.fill = "white";

        // Add bottom label
        let viewLabel = chart.chartContainer.createChild(am4core.Label);
        viewLabel.parent = container;
        viewLabel.text = text;
        viewLabel.horizontalCenter = "middle";
        viewLabel.fontSize = 11;
        viewLabel.textAlign = "middle";
    }

    const GetObjectCount = (data) => {
        let count = 0;

        for(let key in data){
            count += data[key].value;
        }

        return count;
    }

    const UpdateCharts = (projectCode) => {
        GetElements(null, projectCode, startDate, endDate).then(response => {

            setElements(response.data);
            
            //?????? ????????? ?????? ????????? ??????

            let personalTransactions = {};
            let teamTransactions = {};
            let participants = {};
            let averageTransactions = {};
            let models = [];
            let annotations = [];

            if(response!= undefined){
                let elements = response.data;

                for(let i=0; i<elements.length; i++){
                    if(elements[i].employee_id === employeeId){
                        if(!([Moment(elements[i].occurred_on).format('YYYY-MM-DD')] in personalTransactions)){
                            personalTransactions[Moment(elements[i].occurred_on).format('YYYY-MM-DD')] = [];
                        }
                        personalTransactions[Moment(elements[i].occurred_on).format('YYYY-MM-DD')].push(elements[i]);
                    }
                    if(!([Moment(elements[i].occurred_on).format('YYYY-MM-DD')] in teamTransactions)){
                        teamTransactions[Moment(elements[i].occurred_on).format('YYYY-MM-DD')] = [];
                    }
                    teamTransactions[Moment(elements[i].occurred_on).format('YYYY-MM-DD')].push(elements[i]);

                    if(!(elements[i].project_code in participants)){
                        participants[elements[i].project_code] = [];
                        participants[elements[i].project_code].push(elements[i].employee_id);
                    }
                    else{
                        if(!(participants[elements[i].project_code].includes(elements[i].employee_id))){
                            participants[elements[i].project_code].push(elements[i].employee_id);
                        }
                    }
                    if(elements[i].category_type === 'Model'){
                        models.push(elements[i]);
                    }

                    if(elements[i].category_type === 'Annotation'){
                        annotations.push(elements[i]);
                    }
                }

                for(let j=0 ; j<Object.keys(teamTransactions).length; j++){
                    if(!(Object.keys(teamTransactions)[j] in averageTransactions)){
                        averageTransactions[Object.keys(teamTransactions)[j]] = [];
                    }
                    if(selectedProject.project_code != undefined){
                        let averageValue = teamTransactions[Object.keys(teamTransactions)[j]].length / participants[selectedProject.project_code].length;
                        averageTransactions[Object.keys(teamTransactions)[j]].push(parseFloat(averageValue).toFixed(0));
                    }
                }

                //XY ?????? ??????

                let xyChart = CreateXYChart("transaction-xy-chart");
                
                var personalTransactionData = CreateSeriesData(personalTransactions, false);
                var personalTransactionSeries = CreateXYSeries(xyChart, personalTransactionData, false)
                personalTransactionSeries.tooltipText = employeeName + ":{value}"

                var averageTransactionData = CreateSeriesData(averageTransactions, true);
                var averageTransactionSeries = CreateXYSeries(xyChart, averageTransactionData, true)
                averageTransactionSeries.tooltipText = "??? ??????:{value}"

                var teamTransactionData = CreateSeriesData(teamTransactions, false);
                var teamTransactionSeries = CreateXYSeries(xyChart, teamTransactionData, false)
                teamTransactionSeries.tooltipText = "??? ??????:{value}"

                //Pie ?????? ??????
                let modelSliceColors = [ "#e0bbe4","#957dad","#d291bc","#fec8cd","#ffdfd3"]
                let modelData = CreatePieChartData(models, [], "category_name");
                let modelPieChart = CreatePieChart("model-pie-chart", modelData);
                let modelPieSeries = CreatePieSeries(modelPieChart);
                setMostWorkedModel(modelData[0].category);
                let modelCount = GetObjectCount(modelData);
                CreateChartTitle(modelPieChart, modelPieSeries, "Models\n(" + modelCount + ")");

                //Pie ?????? ??????
                //let anotationSliceColors = [ "#f2e30c","#c4cad6","#6950e2","#5742c1","#342ba5"]
                //let modelSliceColors = [ "#e0bbe4","#957dad","#d291bc","#fec8cd","#ffdfd3"]
                let anotationSliceColors = [ "#aaaaaa","#bbbbbb","#cccccc","#dddddd", "#eeeeee"]
                let annotationData = CreatePieChartData(annotations, anotationSliceColors, "category_name");
                let annotationPieChart = CreatePieChart("annotation-pie-chart", annotationData);
                let annotationSeries = CreatePieSeries(annotationPieChart);
                setMostWorkedAnnotation(annotationData[0].category);
                let annotationCount = GetObjectCount(annotationData);
                CreateChartTitle(annotationPieChart, annotationSeries, "Annotations\n(" + annotationCount + ")");
     

                //Pie ?????? ??????
                let viewSliceColors = [ "#fec8cd", "#d291bc", "#e0bbe4", "#957dad", "#ffdfd3"]
                let viewData = CreatePieChartData(elements, viewSliceColors, "view_type");
                let viewPieChart = CreatePieChart("view-pie-chart", viewData);
                let viewPieSeries = CreatePieSeries(viewPieChart);
                let viewCount = GetObjectCount(viewData);
                CreateChartTitle(viewPieChart, viewPieSeries, "Views\n(" + viewCount + ")");
                
            }
        })
    }

    const CreatePieChartData = (data, colors, key) => {
        let groupedModel = GroupByKey(data, key);
        var sortedModel = [];

        for(var model in groupedModel){
            sortedModel.push([model, groupedModel[model].length])
        }

        sortedModel = SortArrayByValueDesc(sortedModel);

        var modelData = [];
        
        var sortedModelLength = 0;

        if(sortedModel.length > 5){
            sortedModelLength = 4;
        }
        else{
            sortedModelLength = sortedModel.length;
        }

        for(let i=0; i<sortedModelLength; i++){
            modelData.push({
                "category": (sortedModel[i][0]),
                "value": sortedModel[i][1],
                "color": colors[i]
            })
        }

        if(sortedModel.length > 5){
            let otherModelValues = 0;

            for(let j=4; j<sortedModel.length; j++){
                otherModelValues += sortedModel[j][1];
            }
            modelData.push({
                "category": "Others",
                "value": otherModelValues,
                "color": colors[4]
            })
        }

        if(modelData.length == 0){
            modelData.push({
                "category": "-",
                "value": 1,
                "color": "#cccccc"
            })
        }

        return modelData;
    }

    const OnProjectClick = (event, props) => {
        setSelectedProject(props);
    }

    return (
        <main className={pageStyles.page_wrapper}>
            <section className={pageStyles.page_container}>
                <NavigationBar/>
                <div className={styles.block_column_wrapper}>
                    <div className={styles.block_row_wrapper} style={{height: '100px'}}>
                        <div className={styles.title_label}>Performance Overview</div>
                        <Tooltip title="?????? 12??? 10??? ?????? ???????????? ?????? ?????????.">
                            <img className={styles.info_img} src={infoImg} alt="info"/>
                        </Tooltip>
                        <MuiDatePicker date={startDate} setDate={setStartDate} setIsDateUpdated={setIsDateUpdated}/>
                        <div style={{height: '10px', paddingTop: '42px', paddingLeft: '20px', paddingRight: '20px'}}>-</div>
                        <MuiDatePicker date={endDate} setDate={setEndDate} setIsDateUpdated={setIsDateUpdated}/>
                        <div className={styles.block_column_wrapper} style={{width: '240px', paddingLeft: '70px'}}>
                            <img className={styles.profile_img} src={profileImg} alt="profile"/>
                            <div className={styles.profile_label}>???????????????, {employeeName} ???</div>
                        </div>
                    </div>
                    <div className={styles.block_row_wrapper} style={{marginLeft: '5px'}}>
                        <div className={styles.block_column_wrapper} >
                            <div className={styles.block_row_wrapper}>
                                <div className={styles.content_wrapper} style={{width: '90px'}}>
                                    <div className={styles.stats_value}>{projects.data != undefined ? projects.data.length : 0}</div>
                                    <div className={styles.stats_title}>??? ???????????? ???</div>
                                </div>
                                <div className={styles.content_wrapper} style={{width: '90px'}}>
                                    <div className={styles.stats_value}>{elements.length === undefined ? 0 : elements.length}</div>
                                    <div className={styles.stats_title}>??? ?????? ???</div>
                                </div>
                                <Tooltip title={mostWorkedModel}>
                                    <div className={styles.content_wrapper} style={{width: '226px'}}>
                                        
                                            <div className={styles.stats_value} >{mostWorkedModel}</div>
                                            <div className={styles.stats_title}>?????? ?????? ????????? ?????? ????????????</div>
                                        
                                    </div>
                                </Tooltip>
                                <Tooltip title={mostWorkedAnnotation}>
                                    <div className={styles.content_wrapper} style={{width: '226px'}}>
                                        
                                            <div className={styles.stats_value}>{mostWorkedAnnotation}</div>
                                            <div className={styles.stats_title}>?????? ?????? ????????? ?????? ????????????</div>
                                        
                                    </div>
                                </Tooltip>
                            </div>
                            <div className={styles.block_column_wrapper} style={{width: '656px'}}>
                                <div className={styles.content_wrapper} style={{textAlign: 'left', height: '250px'}}>
                                    <h2 className={styles.content_title} style={{paddingLeft: '15px'}}>????????????</h2>
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
                                                    <div className={styles.project_content_wrapper} style={{borderRadius:'10px', borderWidth:'1px', border: selectedProject.project_code == project.project_code ? '1px solid #1974d2' : '1px solid #F1F1F1'}} onClick={(e) => OnProjectClick(e, project)}>
                                                        <div className={styles.block_row_wrapper} style={{width: '650px'}}>
                                                            <div className={styles.project_content} style={{lineHeight: "37px", width: "80px"}}>{project.project_code}</div>
                                                            <div className={styles.project_content}  style={{lineHeight: "37px", width: "480px" }}>{project.project_name}</div>
                                                            <div className={styles.project_content}  style={{lineHeight: "37px", width: "170px"}}>{Moment(project.occurred_on).format('YYYY-MM-DD HH:mm')}</div>
                                                        </div>
                                                    </div>
                                                </Tooltip>
                                            );
                                        }) : <div className={styles.project_content} style={{paddingTop: '80px'}} >?????? ?????? ???????????? BIM ??????????????? ???????????? ????????????.</div>
                                    }
                                </div>
                                <div className={styles.content_wrapper} style={{paddingLeft: '15px', textAlign: 'left', height: '330px', overflow: 'hidden'}}>
                                    <h2 className={styles.content_title}>?????? ?????????</h2>
                                    <div className="transaction-xy-chart" style={{top:"-10px", height:"290px"}}></div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.block_column_wrapper}>
                            <div className={styles.content_wrapper} style={{width: '415px', textAlign: 'left', height: '640px'}}>
                                <h2 className={styles.content_title} style={{paddingLeft: '15px'}}>??????</h2>
                                <div className="model-pie-chart" style={{height:"195px", width:'100%', borderWidth:'1px', borderBottom: '1px solid #F1F1F1'}}></div>
                                <div className="annotation-pie-chart" style={{height:"195px", width:'100%', borderWidth:'1px', borderBottom: '1px solid #F1F1F1'}}></div>
                                <div className="view-pie-chart" style={{height:"195px" , width:'100%'}}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
export default Overview;