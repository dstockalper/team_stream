var chartData = generatechartData();

function generatechartData() {
    var chartData = [];
    var firstDate = new Date();
    firstDate.setDate(firstDate.getDate() - 150);

    for (var i = 0; i < 150; i++) {
        // we create date objects here. In your data, you can have date strings
        // and then set format of your dates using chart.dataDateFormat property,
        // however when possible, use date objects, as this will speed up chart rendering.
        var newDate = new Date(firstDate);
        newDate.setDate(newDate.getDate() + i);

        var visits = Math.round(Math.random() * 100 - 50);

        chartData.push({
            date: newDate,
            visits: visits
        });
    }
    return chartData;
}


var chart_line = AmCharts.makeChart("chartdiv-line", {
    "theme": "none",	
    "type": "serial",
		"autoMargins": false,
		"marginLeft":8,
		"marginRight":8,
		"marginTop":10,
		"marginBottom":26,
    "pathToImages": "http://www.amcharts.com/lib/3/images/",
    "dataProvider": chartData,
    "valueAxes": [{
        "axisAlpha": 0,
        "inside": true
    }],
    "graphs": [{
        "balloonText": "[[category]]<br><b>value: [[value]]</b>",
        "bullet": "round",
        "bulletBorderAlpha": 1,
        "bulletBorderColor": "#FFFFFF",
        "hideBulletsCount": 50,
        "lineThickness": 2,
        "lineColor": "#fdd400",
        "negativeLineColor": "#67b7dc",
        "valueField": "visits"
    }],
    "chartScrollbar": {
    },
    "chartCursor": {
    },
    "categoryField": "date",
    "categoryAxis": {
        "parseDates": true,
        "axisAlpha": 0,
        "minHorizontalGap":60
    }
});

chart_line.addListener("dataUpdated", zoomChart);
//zoomChart();

function zoomChart(){
  if(chart_line.zoomToIndexes){
    chart_line.zoomToIndexes(130, chartData.length - 1);
  }
}
