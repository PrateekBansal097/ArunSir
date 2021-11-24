<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@page import="java.util.ArrayList"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<script src="js/amcharts.js" type="text/javascript"></script>
<script type="text/javascript" src="js/jquery-1.9.1.js"></script>
<script type="text/javascript" src="js/jquery-ui.js"></script>
<link rel="stylesheet" type="text/css" href="css/jquery-ui.css" />
<style type="text/css">
@media print {
    #printbtn {
        display :  none;
    }
}
</style>
<% int size=((ArrayList)session.getAttribute("sectorPositiveList")).size();
System.out.println("jsp---------"+size);
%>
<script type="text/javascript">
/* using this url create pie chart
http://jsfiddle.net/gh/get/jquery/1.9.1/highslide-software/highcharts.com/tree/master/samples/highcharts/demo/pie-basic/ */
<%if(size>=5){%>
var chart;
var legend;
var chartData = [{
    country: "Positive",
    value:Math.abs(${sectorPositiveList.get(4)[1]})},
 {
    country: "Negative",
    value: Math.abs(${sectorNegativeList.get(4)[1]})
  }];
AmCharts.ready(function() {
    // PIE CHART
    // colour at line no 6572 inside amcharts.js
    // height and weigth on line no - 7423
    chart = new AmCharts.AmPieChart();
    chart.dataProvider = chartData; 
    chart.titleField = "country";
    chart.valueField = "value";
    chart.outlineColor = "#FFFFFF";
    chart.outlineAlpha = 0.8;
    chart.outlineThickness = 1;
    // this makes the chart 3D
    chart.depth3D = 10;
    chart.angle = 55;
    
    chart.addTitle("${sectorList[4].getSectorName()}");
    chart.addTitle("Total No Of  News:${sectorPositiveList.get(4)[1]-sectorNegativeList.get(4)[1]}"); 
    // this line makes the chart to show image in the background
    chart.backgroundImage = "images/logo_inner_vertical.png";      
    // LEGEND
    legend = new AmCharts.AmLegend();
    legend.align = "center";
    // Amcharts.js line no 1853
    legend.markerType = "circle";
    chart.addLegend(legend);

    // WRITE
    chart.write("chartdiv");
});
<%}%>
</script>
<script type="text/javascript">
/* using this url create pie chart
http://jsfiddle.net/gh/get/jquery/1.9.1/highslide-software/highcharts.com/tree/master/samples/highcharts/demo/pie-basic/ */
	<%if(size>=6){%>
var chart;
var legend;
var chartData1 = [{
    country: "Positive",
    value:Math.abs(${sectorPositiveList.get(5)[1]})},
 {
    country: "Negative",
    value: Math.abs(${sectorNegativeList.get(5)[1]})
  }];
AmCharts.ready(function() {
    // PIE CHART
    // colour at line no 6572 inside amcharts.js
    // height and weigth on line no - 7423
    chart = new AmCharts.AmPieChart();
    chart.dataProvider = chartData1; 
    chart.titleField = "country";
    chart.valueField = "value";
    chart.outlineColor = "#FFFFFF";
    chart.outlineAlpha = 0.8;
    chart.outlineThickness = 1;
    // this makes the chart 3D
    chart.depth3D = 10;
    chart.angle = 55;
    // this line makes the chart to show image in the background
    /* chart.backgroundImage = "../images/logo_inner.png";  */   
    // LEGEND
    chart.addTitle("${sectorList[5].getSectorName()}");
    chart.addTitle("Total No Of  News:${sectorPositiveList.get(5)[1]-sectorNegativeList.get(5)[1]}"); 
    legend = new AmCharts.AmLegend();
    legend.align = "center";
    // Amcharts.js line no 1853
    legend.markerType = "circle";
    chart.addLegend(legend);

    // WRITE
    chart.write("chartdiv1");
});
<%}%>
</script>
<script type="text/javascript">
/* using this url create pie chart
http://jsfiddle.net/gh/get/jquery/1.9.1/highslide-software/highcharts.com/tree/master/samples/highcharts/demo/pie-basic/ */
<%if(size>=7){%>
var chart;
var legend;
var chartData2 = [{
    country: "Positive",
    value:Math.abs(${sectorPositiveList.get(6)[1]})},
 {
    country: "Negative",
    value: Math.abs(${sectorNegativeList.get(6)[1]})
  }];
AmCharts.ready(function() {
    // PIE CHART
    // colour at line no 6572 inside amcharts.js
    // height and weigth on line no - 7423
    chart = new AmCharts.AmPieChart();
    chart.dataProvider = chartData2; 
    chart.titleField = "country";
    chart.valueField = "value";
    chart.outlineColor = "#FFFFFF";
    chart.outlineAlpha = 0.8;
    chart.outlineThickness = 1;
    // this makes the chart 3D
    chart.depth3D = 10;
    chart.angle = 55;
    chart.addTitle("${sectorList[6].getSectorName()}");
    chart.addTitle("Total No Of  News:${sectorPositiveList.get(6)[1]-sectorNegativeList.get(6)[1]}"); 
    // this line makes the chart to show image in the background
    /* chart.backgroundImage = "../images/logo_inner.png"; */    
    // LEGEND
    legend = new AmCharts.AmLegend();
    legend.align = "center";
    // Amcharts.js line no 1853
    legend.markerType = "circle";
    chart.addLegend(legend);
    // WRITE
    chart.write("chartdiv2");
});
<%}%>
</script>
<script type="text/javascript">
/* using this url create pie chart
http://jsfiddle.net/gh/get/jquery/1.9.1/highslide-software/highcharts.com/tree/master/samples/highcharts/demo/pie-basic/ */
<%if(size>=8){%>
var chart;
var legend;

var chartData3 = [{
    country: "Positive",
    value:Math.abs(${sectorPositiveList.get(7)[1]})},
 {
    country: "Negative",
    value: Math.abs(${sectorNegativeList.get(7)[1]})
  }];
AmCharts.ready(function() {
    // PIE CHART
    // colour at line no 6572 inside amcharts.js
    // height and weigth on line no - 7423
    chart = new AmCharts.AmPieChart();
    chart.dataProvider = chartData3; 
    chart.titleField = "country";
    chart.valueField = "value";
    chart.outlineColor = "#FFFFFF";
    chart.outlineAlpha = 0.8;
    chart.outlineThickness = 1;
    // this makes the chart 3D
    chart.depth3D = 10;
    chart.angle = 55;
    // this line makes the chart to show image in the background
    /* chart.backgroundImage = "../images/logo_inner.png"; */    
    chart.addTitle("${sectorList[7].getSectorName()}");
    chart.addTitle("Total No Of  News:${sectorPositiveList.get(7)[1]-sectorNegativeList.get(7)[1]}"); 
    // LEGEND
    legend = new AmCharts.AmLegend();
    legend.align = "center";
    // Amcharts.js line no 1853
    legend.markerType = "circle";
    chart.addLegend(legend);

    // WRITE
    chart.write("chartdiv3");
});
<%}%>
</script> 
</head>
<body>
<table align="center">
<tr>
<td align="center">
<font size="5"><b>Sector Wise Negative Positive Report Based On Channel</b></font>
</td>
</tr>
<tr>
  <td align="center"><font size="3"><b>Client Name</b></font>&nbsp;&nbsp;&nbsp;
  <font size="3"><c:out value='${clientName.get(0)}' /></font>&nbsp;&nbsp;&nbsp; 
 <font size="3"><b>From :</b></font>&nbsp;&nbsp;&nbsp;
   <font size="3"><c:out value='${fromdate}' /></font>&nbsp;&nbsp;&nbsp;
  <font size="3"><b>To :</b></font>&nbsp;&nbsp;&nbsp;
   <font size="3"><c:out value='${todate}' /></font> </td>
  </tr>
  <tr></tr>
  <tr></tr>
   <tr></tr>
  <tr></tr>
</table>
				<table>
					<tr>
						<div id="chartdiv" style="width: 50%; height: 300px; float: left"></div>
						<div id="chartdiv1" style="width: 50%; height: 300px; float: left"></div>
					</tr>
					<tr>
						<div id="chartdiv2" style="width: 50%; height: 300px; float: left"></div>
						<div id="chartdiv3" style="width: 50%; height: 300px; float: left"></div>
					</tr>
				</table>
<table><tr><td>
<a href="PieChartReport.do?param=ChannelSector2&clientId=${clientId}&todate=${todate}&fromdate=${fromdate}&channelId=${channelId}">Previous</a>
</td>
</tr>
<tr>
<td>
<input class="noContentPrint" type="button" id="printbtn" value="Print" onclick="window.print()" />
</td>
</tr>
</table>
</body>
</html>
