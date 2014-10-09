$(document).ready(function(){

	// Load images into an array
	var ui_logos = [
	"assets/49ers.gif",
	"http://content.sportslogos.net/logos/7/161/thumbs/9ebzja2zfeigaziee8y605aqp.gif",
	"http://content.sportslogos.net/logos/7/162/thumbs/857.gif",
	"http://content.sportslogos.net/logos/7/163/thumbs/g9mgk6x3ge26t44cccm9oq1vl.gif",
	"http://content.sportslogos.net/logos/7/153/thumbs/318.gif",
	"http://content.sportslogos.net/logos/7/155/thumbs/2ioheczrkmc2ibc42c9r.gif",
	"http://content.sportslogos.net/logos/7/154/thumbs/403.gif",
	"http://content.sportslogos.net/logos/7/156/thumbs/970.gif",
	"http://content.sportslogos.net/logos/7/149/thumbs/n0fd1z6xmhigb0eej3323ebwq.gif",
	"http://content.sportslogos.net/logos/7/150/thumbs/15041052013.gif",
	"http://content.sportslogos.net/logos/7/151/thumbs/y71myf8mlwlk8lbgagh3fd5e0.gif",
	"http://content.sportslogos.net/logos/7/152/thumbs/v7tehkwthrwefgounvi7znf5k.gif",
	"http://content.sportslogos.net/logos/7/157/thumbs/570.gif",
	"http://content.sportslogos.net/logos/7/158/thumbs/593.gif",
	"http://content.sportslogos.net/logos/7/159/thumbs/15988562013.gif",
	"http://content.sportslogos.net/logos/7/160/thumbs/1053.gif"
	]

	// Create empty slots for images to go in
	for(var i=0; i<ui_logos.length; i++){
		$('<img class="ui_team" draggable="true" src="">').appendTo("#team_container");
	}

	// Put images in emtpy slots
	$('.ui_team').each(function(i){
		$(this).attr("src", ui_logos[i]);
	})
	
	// Make the display div droppable
	$('#ui_display').droppable({
		accept: '.ui_team',
		drop: handleDrop
	});

	// Make the imgs draggable, with its clone being dragged, and snap back to position if not dropped on target
	$('.ui_team').draggable({
		helper: 'clone',
		revert: true
	});

	// Change the display image src to the dropped image src
	function handleDrop(e, ui){
		var selected_src = ui.draggable.attr('src');
		$('#ui_display').attr("src", selected_src);
		ui.helper.hide();
		
	}

		
		// Make empty gauge chart on page load, so user doesn't wait for setInterval before seeing anything
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
			            "endValue": 0,
			            "startValue": -1
			        }, {
			            "color": "#fdd400",
			            "endValue": .2,
			            "startValue": -.2
			        }, {
			            "color": "#84b761",
			            "endValue": 1,
			            "innerRadius": "95%",
			            "startValue": .2
			        }],
			        "bottomText": "sentiment",
			        "bottomTextYOffset": -1,
			        "startValue": -1,
			        "endValue": 1
			    }],
			    "arrows": [{}]
			});

		fire_ajax_line_chart();
		setInterval(fire_ajax_gauge_chart, 2000);
		get_latest_tweet_for_display();
		setInterval(get_latest_tweet_for_display, 5000);
	})


	// LINE CHART *************************************************************
	function fire_ajax_line_chart(){

		var request = $.ajax({
		  url: "/get_data",
		 	dataType: "json"
		});

		request.done(function(data){

			var chartData = generatechartData();

			function generatechartData() {
			    var chartData = [];
			    // var firstDate = new Date();
			    // firstDate.setDate(firstDate.getDate() - 1);
			    for (var i = 0; i < data.length; i++) {
			        // we create date objects here. In your data, you can have date strings
			        // and then set format of your dates using chart.dataDateFormat property,
			        // however when possible, use date objects, as this will speed up chart rendering.
			        // var newDate = new Date(firstDate);
			        // newDate.setDate(newDate.getDate() + i);

			        var time_of_tweet = data[i].created_at;
			        var sentiment_score = data[i].score;

			        chartData.push({
			            date: time_of_tweet,
			            visits: sentiment_score
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
			    "dataDateFormat": "YYYY-MM-DD HH:NN",
			    "categoryAxis": {
			    	"minPeriod": "mm",
			        "parseDates": true,
			        "axisAlpha": 0,
			        "minHorizontalGap":60
			    }
			});

			chart_line.addListener("dataUpdated", zoomChart);

			function zoomChart(){
			  if(chart_line.zoomToIndexes){
			    chart_line.zoomToIndexes(130, chartData.length - 1);
			  }
			}

		}); 

	} 


	// GAUGE CHART**************************************************
	function fire_ajax_gauge_chart(){
		// Create gauge chart template
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
			            "endValue": 0,
			            "startValue": -1
			        }, {
			            "color": "#fdd400",
			            "endValue": .2,
			            "startValue": -.2
			        }, {
			            "color": "#84b761",
			            "endValue": 1,
			            "innerRadius": "95%",
			            "startValue": .2
			        }],
			        "bottomText": "sentiment",
			        "bottomTextYOffset": -1,
			        "startValue": -1,
			        "endValue": 1
			    }],
			    "arrows": [{}]
			});


		var request = $.ajax({
		  url: "/get_data",
		 	dataType: "json"
		});

		request.done(function(data){

			function getMostRecentTweet() {
			    var value = data[data.length-1].score;
			    var display_sentiment = data[data.length-1].sentiment
			    chart_gauge.arrows[0].setValue(value);
			    chart_gauge.axes[0].setBottomText(display_sentiment + " sentiment");
			}

			getMostRecentTweet();	
		}); 

	} 


	// SCROLLING TWEET **************************************************
	function get_latest_tweet_for_display(){
		// Start ajax call
		var request = $.ajax({
		  url: "/get_data",
		 	dataType: "json"
		});

		request.done(function(data){
			var recent_tweet = data[data.length-1].body;
			$('#tweet_span').attr("data-typer-targets", recent_tweet);
		});
	}
