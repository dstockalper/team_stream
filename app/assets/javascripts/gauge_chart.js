var chart_gauge = AmCharts.makeChart("chartdiv-gauge", {
    "type": "gauge",
	"theme": "none",    
    "axes": [{
        "axisThickness":1,
         "axisAlpha":0.2,
         "tickAlpha":0.2,
         "valueInterval":.5,
        "bands": [{
            "color": "#cc4748",
            "endValue": .4,
            "startValue": 0
        }, {
            "color": "#fdd400",
            "endValue": .6,
            "startValue": .4
        }, {
            "color": "#84b761",
            "endValue": 1,
            "innerRadius": "95%",
            "startValue": .6
        }],
        "bottomText": "0 km/h",
        "bottomTextYOffset": -1,
        "endValue": 1
    }],
    "arrows": [{}]
});

setInterval(randomValue, 2000);

 // set random value
function randomValue() {
    var value = Math.round(Math.random());
    chart_gauge.arrows[0].setValue(value);
    chart_gauge.axes[0].setBottomText(value + " km/h");
}