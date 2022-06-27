import React from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { maxWidth } from '@mui/system';

function CreateXYSeries(chart, data, isAverage){
    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "value";
    series.dataFields.dateX = "date";
    series.tooltip.pointerOrientation = "vertical";
    series.strokeWidth = 2;
    let circleBullet = series.bullets.push(new am4charts.CircleBullet());
    circleBullet.circle.strokeWidth = 0.1;
    series.data = data;

    if(isAverage){
        series.strokeDasharray = "8,4";
        series.tooltipText = "팀 평균:{value}"
        series.tooltip.getFillFromObject = false;
        series.tooltip.background.fill = am4core.color("#ff00ff");
        series.stroke = am4core.color("#ff00ff");

        let seriesCircleBullet = series.bullets.push(new am4charts.CircleBullet());
        seriesCircleBullet.circle.strokeWidth = 0.4;
        seriesCircleBullet.stroke = am4core.color("#ff00ff");
        seriesCircleBullet.fill = am4core.color("#ff00ff");
    }

    return series; 
}

function CreateSeriesData(data, isAverage){
    var transactions = [];
    var keys = Object.keys(data);

    for(let i=0; i<keys.length; i++){
        transactions.push({ 
            "date": keys[i],
            "value": isAverage ? data[keys[i]] : data[keys[i]].length
        })
    }
    
    return transactions;
}


function CreateXYChart(div) {
    var chart = am4core.create(div, am4charts.XYChart);

    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.baseInterval = {timeUnit:"day", count:1}
    dateAxis.dateFormats.setKey("day", "MM/dd");
    dateAxis.periodChangeDateFormats.setKey("day", "MM/dd");
    dateAxis.renderer.minGridDistance = 60;
    
    chart.yAxes.push(new am4charts.ValueAxis());
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.xAxes = dateAxis;

    return chart;

}

function CreatePieChart(div, data){
    var chart = am4core.create(div, am4charts.PieChart3D);
    chart.hiddenState.properties.opacity = 0;
    chart.innerRadius = am4core.percent(40);
    chart.legend = new am4charts.Legend();
    chart.legend.position = "right";
    chart.legend.labels.template.truncate = true;
    chart.legend.width = 190;
    chart.data = data;
    chart.legend.fontSize = 11;
    chart.legend.fontWeight = 500;
    chart.legend.dy = -8;
    return chart;
}

function CreatePieSeries(chart){
    var series = chart.series.push(new am4charts.PieSeries3D());
    series.dataFields.value = "value";
    series.dataFields.depthValue = "value";
    series.dataFields.category = "category";
    series.slices.template.cornerRadius = 0;
    /* Disable labels */
    series.labels.template.disabled = true;
    series.ticks.template.disabled = true;
    series.colors.step = 1;
    series.slices.template.propertyFields.fill = "color";
    series.slices.template.tooltipText = "{category} ({value})";
    series.tooltip.label.maxWidth = 300;
    series.tooltip.label.wrap = true;

    let slice = series.slices.template;
    slice.states.getKey("hover").properties.scale = 1;
    slice.states.getKey("active").properties.shiftRadius = 0;

    return series;
}

export {CreateXYChart as default, CreatePieChart, CreatePieSeries, CreateXYSeries, CreateSeriesData}