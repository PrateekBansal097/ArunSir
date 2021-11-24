<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<style type="text/css">
@media print {
    #printbtn {
        display :  none;
    }
}
</style>
<script src="js/amcharts.js" type="text/javascript"></script>
<script>
var chart;
var chartData = [];
var chartCursor;
// generate some random data, quite different range
/* function generateChartData() {
    var firstDate = new Date();
    firstDate.setDate(firstDate.getDate() - 500);

    for (var i = 0; i < 500; i++) {
        var newDate = new Date(firstDate);
        newDate.setDate(newDate.getDate() + i);

        var visits = Math.round(Math.random() * 40) - 20;

        chartData.push({
            date: newDate,
            visits: visits
        });
    }
} */

function generateChartData()
{
   var i=0;
   var dateList ="${dateList}";
   var markingList="${markingList}";
   var size="${dateListSize}";
   dateList=dateList.replace("[","");
   dateList=dateList.replace("]","");
   markingList=markingList.replace("[","");
   markingList=markingList.replace("]","");
   /* for(var j=0;j<size;j++)
	  	{
	       	var splitDateList = dateList.split(",");
	  	   	alert("splitDateList="+splitDateList[j]);
	  	   	var splitMarkingList=markingList.split(",");
	  	  	alert("splitMarkingList="+splitMarkingList[j]);
		     var firstDate = Date.parse(splitDateList[j]);
			alert("firstDate="+firstDate); 
	  	}  */ 
 for(var j=0;j<size;j++){
  var splitDateList = dateList.split(",");
  var splitMarkingList=markingList.split(",");
  var firstDate = Date.parse(splitDateList[j]);
  firstDate = new Date(firstDate);
 
        var visits = splitMarkingList[j];//Math.round(Math.random() * 20)
   i++;
        chartData.push({
        	  date: firstDate,
              visits: visits
        });
   } 
}
// this method is called when chart is first inited as we listen for "dataUpdated" event
function zoomChart() {
    // different zoom methods can be used - zoomToIndexes, zoomToDates, zoomToCategoryValues
    chart.zoomToIndexes(chartData.length - 40, chartData.length - 1);
}
// changes cursor mode from pan to select
function setPanSelect() {
    if (document.getElementById("rb1").checked) {
        chartCursor.pan = false;
        chartCursor.zoomable = true;

    } else {
        chartCursor.pan = true;
    }
    chart.validateNow();
}
// create chart
AmCharts.ready(function() {
    // generate some data first
    generateChartData();
    // SERIAL CHART    
    chart = new AmCharts.AmSerialChart();
   // chart.pathToImages = "http://www.amcharts.com/lib/images/";
    chart.marginTop = 0;
    chart.marginRight = 10;
    chart.autoMarginOffset = 5;
    chart.zoomOutButton = {
        backgroundColor: '#000000',
        backgroundAlpha: 0.15
    };
    chart.dataProvider = chartData;
    chart.categoryField = "date";

    // listen for "dataUpdated" event (fired when chart is rendered) and call zoomChart method when it happens
    chart.addListener("dataUpdated", zoomChart);

    // AXES
    // category
    var categoryAxis = chart.categoryAxis;
    categoryAxis.parseDates = true; // as our data is date-based, we set parseDates to true
    categoryAxis.minPeriod = "DD"; // our data is daily, so we set minPeriod to DD
    categoryAxis.dashLength = 1;
    categoryAxis.gridAlpha = 0.15;
    categoryAxis.axisColor = "#DADADA";

    // value                
    var valueAxis = new AmCharts.ValueAxis();
    valueAxis.axisAlpha = 30;
    valueAxis.dashLength = 1;
    chart.addValueAxis(valueAxis);

    // GRAPH
    var graph = new AmCharts.AmGraph();
    graph.title = "red line";
    graph.valueField = "visits";
    graph.bullet = "round";
    graph.bulletBorderColor = "#FFFFFF";
    graph.bulletBorderThickness = 2;
    graph.lineThickness = 2;
    graph.lineColor ="#008000" /* "#0352b5" */;
    graph.negativeLineColor = " #b5030d";
    graph.hideBulletsCount = 50; // this makes the chart to hide bullets when there are more than 50 series in selection
    chart.addGraph(graph);

    // CURSOR
    chartCursor = new AmCharts.ChartCursor();
    chartCursor.cursorPosition = "mouse";
    chart.addChartCursor(chartCursor);
    chart.addTitle("Image Sensex");
    
    // this line makes the chart to show image in the background
    //chart.backgroundImage = "../images/logo_inner_vertical.png";    
    // SCROLLBAR
    var chartScrollbar = new AmCharts.ChartScrollbar();
    chartScrollbar.graph = graph;
    chartScrollbar.scrollbarHeight = 40;
    chartScrollbar.color = "#000000";
    chartScrollbar.autoGridCount = true;
    chart.addChartScrollbar(chartScrollbar);

    // WRITE
    chart.write("chartdiv");
});
</script>
</head>
<body>
<table align="center">
<tr>
<td>
<img align="left" style="height: 75px;width: 215px" src="images/logo_inner_2.png"></td>
<td></td></tr><tr>
<td>
<table align="center"><tr><td>
     <font size="4"><b>Client Name:</b></font>
      &nbsp;&nbsp;&nbsp;<font size="4"> <c:out value='${clientName.get(0)}' /></font>
      &nbsp;&nbsp;&nbsp;<font size="4"><b>From :</b></font>
       &nbsp;&nbsp;&nbsp;<font size="4"><c:out value='${pieChart.fromDate}' /></font>
       &nbsp;&nbsp;&nbsp;<font size="4"><b>To :</b></font>
       &nbsp;&nbsp;&nbsp;<font size="4"><c:out value='${pieChart.toDate}' /></font></td></tr></table></td>
  </tr>
<tr><td>
<div id="chartdiv" style="min-width: 1350px; height: 340px;"></div>
</td>
</tr>
</table>
<table align="center">
<tr>
  <td><b>Report Based On:</b></td><td></td><td></td><td></td>
</tr>
   <tr>
   <td></td>
       <td><b>Channel Name:</b></td>
       <td></td>
       <td>${channelList}</td>
 </tr>
</table>
 <table align="right">	
																 <tr>
																 </tr><tr></tr><tr></tr><tr></tr><tr></tr>
	<tr>
                                                                 <td align="right">
																 <img width="135" height="120" border="0" alt="Pulpit rock" src="images/sealWithName.jpg">
																 </td>
																 </tr>
																</table>
<input class="noContentPrint" type="button" id="printbtn" value="Print" onclick="window.print()" />
</body>
</html>
