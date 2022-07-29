import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import styles from './css/overview.module.css';
import pageStyles from './css/page-wrap.module.css';
import MuiDatePicker from '../common/MuiDatePicker';
import Moment from 'moment';
import { ResponsiveRadar } from '@nivo/radar'
import { ResponsivePie } from '@nivo/pie'

function OverviewSimple() {

    // 클릭한 row의 user data 받아오기

    // const location = useLocation();

    // const [, updateState] = React.useState();
    // const [loginId, setLoginId] = useState(location.state.userObj.resultMail.substring(0, location.state.userObj.resultMail.indexOf('@')));
    // const [employeeId, setEmployeeId] = useState(location.state.userObj.resultMessage);
    // const [employeeName, setEmployeeName] = useState(location.state.userObj.resultUserName);
    // const profileImg = "https://hub.haeahn.com/Storage/GW/ImageStorage/Employee/" + loginId + ".jpg";
    const [startDate, setStartDate] = useState(Moment().subtract(1, 'month').startOf('day').format('YYYY-MM-DD'));
    const [endDate, setEndDate] = useState(Moment().subtract(1, 'day').startOf('day').format('YYYY-MM-DD'));
    const [isDateUpdated, setIsDateUpdated] = useState(true);
    const data1 = [
        {
            "taste": "fruity",
            "chardonay": 63,
            "carmenere": 99,
            "syrah": 116
        },
        {
            "taste": "bitter",
            "chardonay": 53,
            "carmenere": 51,
            "syrah": 60
        },
        {
            "taste": "heavy",
            "chardonay": 108,
            "carmenere": 109,
            "syrah": 90
        },
        {
            "taste": "strong",
            "chardonay": 38,
            "carmenere": 107,
            "syrah": 103
        },
        {
            "taste": "sunny",
            "chardonay": 120,
            "carmenere": 101,
            "syrah": 81
        }
    ]
    const MyResponsiveRadar = ({ data1 }) => (
        <ResponsiveRadar
            data={data1}
            keys={["syrah"]}
            indexBy="taste"
            maxValue="auto"
            margin={{ top: 40, right: 50, bottom: 40, left: 50 }}
            curve="linearClosed"
            borderWidth={2}
            borderColor={{ from: "color" }}
            gridLevels={5}
            gridShape="circular"
            gridLabelOffset={36}
            enableDots={true}
            dotSize={5}
            dotColor={{ theme: "background" }}
            dotBorderWidth={2}
            dotBorderColor={{ from: "color" }}
            enableDotLabel={true}
            dotLabel="value"
            dotLabelYOffset={-12}
            colors={{ scheme: "nivo" }}
            fillOpacity={0.25}
            blendMode="multiply"
            animate={true}
            motionConfig="wobbly"
            isInteractive={true}
        />
    );

    const data2 = [
        {
          "id": "css",
          "label": "css",
          "value": 467,
          "color": "hsl(270, 70%, 50%)"
        },
        {
          "id": "haskell",
          "label": "haskell",
          "value": 312,
          "color": "hsl(59, 70%, 50%)"
        }
      ]

    const MyResponsivePie = ({ data2 }) => (
        <ResponsivePie
            data={data2}
            margin={{ top: 10, right: 80, bottom: 50, left: 80 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            borderColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        0.2
                    ]
                ]
            }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        2
                    ]
                ]
            }}
            defs={[
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    size: 4,
                    padding: 1,
                    stagger: true
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                }
            ]}
            fill={[
                {
                    match: {
                        id: 'go'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'lisp'
                    },
                    id: 'lines'
                },
            ]}
            legends={[
                {
                    anchor: 'right',
                    direction: 'column',
                    justify: false,
                    translateX: 30,
                    translateY: 80,
                    itemsSpacing: 10,
                    itemWidth: 80,
                    itemHeight: 18,
                    itemTextColor: '#999',
                    itemDirection: 'left-to-right',
                    itemOpacity: 1,
                    symbolSize: 18,
                    symbolShape: 'circle',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemTextColor: '#000'
                            }
                        }
                    ]
                }
            ]}
        />
    )

    // 임시 프로필 이미지
    const profileImg = "https://hub.haeahn.com/Storage/GW/ImageStorage/Employee/" + "jaehkim" + ".jpg";

    return (
        <main className={pageStyles.page_wrapper}>
            <section className={pageStyles.page_container_simple}>
                <div className={styles.block_column_wrapper}>
                    <div className={styles.block_row_wrapper}>
                        <div className={styles.block_column_wrapper}>
                            <div className={styles.block_row_wrapper}>
                                <img className={styles.profile_img_simple} src={profileImg} alt="profile" />
                                <div className={styles.profile_label_simple} style={{ display: 'flex' }}>
                                    <div>IT연구실</div>
                                    <div>김재희B | 선임</div>
                                </div>
                            </div>
                            <div>
                                <h2 className={styles.content_title} style={{ paddingLeft: '15px' }}>프로젝트</h2>
                                <div className={styles.block_row_wrapper} style={{ height: "15px" }}>
                                    <div className={styles.content_sub_title} style={{ width: "70px" }}>
                                        Project Code
                                    </div>
                                    <div className={styles.content_sub_title} style={{ width: "150px" }}>
                                        Project Name
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.block_column_wrapper}>
                            <div className={styles.block_row_wrapper}>
                                <MuiDatePicker date={startDate} setDate={setStartDate} setIsDateUpdated={setIsDateUpdated} />
                                <div style={{ height: '10px', paddingTop: '42px', paddingLeft: '10px', paddingRight: '10px' }}>-</div>
                                <MuiDatePicker date={endDate} setDate={setEndDate} setIsDateUpdated={setIsDateUpdated} />
                            </div>
                            <div>
                                <h2 className={styles.content_title} style={{ paddingLeft: '15px' }}>업무시간/일</h2>
                                <div style={{ width: 455, height: 210 }}>
                                <MyResponsivePie data2={data2}/>
                                </div>                                
                            </div>
                        </div>
                    </div>
                    <div className={styles.block_row_wrapper} style={{ alignItems: 'center'}}>
                        <div className={styles.block_column_wrapper}>
                            <h2 className={styles.content_title} style={{ paddingLeft: '15px' }}>주요 업무</h2>
                            <div style={{ width: 350, height: 240 }}>
                                <MyResponsiveRadar data1={data1} />
                            </div>
                        </div>
                        <div className={styles.block_column_wrapper}>
                            <h2 className={styles.content_title} style={{ paddingLeft: '15px' }}>특화 스킬</h2>
                            <div style={{ width: 350, height: 240 }}>
                                <MyResponsiveRadar data1={data1} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
export default OverviewSimple;