import React from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

function CreateXYSeries(chart, data){
    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "value";
    series.dataFields.dateX = "date";
    series.tooltip.pointerOrientation = "vertical";
    series.strokeWidth = 2;
    let circleBullet = series.bullets.push(new am4charts.CircleBullet());
    circleBullet.circle.strokeWidth = 0.1;
    series.data = data;
    return series; 
}

function CreateSeriesData(data){
    var transactions = [];

    for(let i=0; i<transactions; i++){
        let year = transactions[i].Year;
        let month = transactions[i].Month;
        let day = transactions[i].Day < 10 ? '0' + transactions[i].Day : transactions[i].Day;

        transactions.push({ 
            "date": year + '-' + month + '-' + day,
            "value": transactions[i].TransactionCount
        })
    }
    return transactions;
}

function TransactionsPerDayChart(props) {
    var chart = am4core.create(props.div, am4charts.XYChart);
    

    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.baseInterval = {timeUnit:"day", count:1}
    dateAxis.dateFormats.setKey("day", "MM/dd");
    dateAxis.periodChangeDateFormats.setKey("day", "MM/dd");
    dateAxis.renderer.minGridDistance = 60;
    
    chart.yAxes.push(new am4charts.ValueAxis());
    chart.scrollbarX = new am4core.Scrollbar();
    chart.cursor.xAxes = dateAxis;
    chart.cursor = new am4charts.XYCursor();
}

export {TransactionsPerDayChart as default}