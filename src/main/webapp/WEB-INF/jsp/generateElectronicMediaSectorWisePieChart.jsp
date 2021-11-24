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

<script type="text/javascript">
/* using this url create pie chart
http://jsfiddle.net/gh/get/jquery/1.9.1/highslide-software/highcharts.com/tree/master/samples/highcharts/demo/pie-basic/ */
var chart;
var legend;
 function generateChartData1 () 
 {
    var chartData1 = [];
    <c:forEach var="sectorPositiveList" items="${sectorPositiveList}">       chartData1.push({
            	 country: '${sectorPositiveList[1]}',
            	    value: Math.abs(${sectorPositiveList[0]})
            	 });
    </c:forEach>          
    return chartData1;
} 
AmCharts.ready(function() {
    // PIE CHART
    // colour at line no 6572 inside amcharts.js
    // height and weigth on line no - 7423
    chart = new AmCharts.AmPieChart();
    chart.dataProvider = generateChartData1();
    chart.titleField = "country";
    chart.valueField = "value";
    chart.outlineColor = "#FFFFFF";
    chart.outlineAlpha = 0.8;
    chart.outlineThickness = 1;
    // this makes the chart 3D
    chart.depth3D = 10;
    chart.angle = 50;
    // this line makes the chart to show image in the background
   chart.backgroundImage = "images/logo_inner_vertical.png";   
    // LEGEND
    legend = new AmCharts.AmLegend();
    legend.align = "center";
    // Amcharts.js line no 1853
    legend.markerType = "circle";
    chart.addLegend(legend);
    chart.addTitle("Sector wise All Channel Positive Report");
    // WRITE
    chart.write("chartdiv");
});
</script>
<script type="text/javascript">
/* using this url create pie chart
http://jsfiddle.net/gh/get/jquery/1.9.1/highslide-software/highcharts.com/tree/master/samples/highcharts/demo/pie-basic/ */
var chart;
var legend;
 function generateChartData () 
 {
    var chartData = [];
   
    <c:forEach var="sectorNegativeList" items="${sectorNegativeList}">       chartData.push({
            	 country: '${sectorNegativeList[1]}',
            	    value: Math.abs(${sectorNegativeList[0]})
            	 });
    </c:forEach>          
    return chartData;
} 
AmCharts.ready(function() {
    // PIE CHART
    // colour at line no 6572 inside amcharts.js
    // height and weigth on line no - 7423
    chart = new AmCharts.AmPieChart();
    chart.dataProvider = generateChartData();
    chart.titleField = "country";
    chart.valueField = "value";
    chart.outlineColor = "#FFFFFF";
    chart.outlineAlpha = 0.8;
    chart.outlineThickness = 1;
    // this makes the chart 3D
    chart.depth3D = 10;
    chart.angle = 50;
    // this line makes the chart to show image in the background
    // LEGEND
    legend = new AmCharts.AmLegend();
    legend.align = "center";
    // Amcharts.js line no 1853
    legend.markerType = "circle";
    chart.addLegend(legend);
    chart.addTitle(" Sector wise All Channel Negative Report");
    // WRITE
    chart.write("chartdiv1");
   
});
</script>
</head>
<body>
<c:forEach var="sectorPositiveList" items="${sectorPositiveList}"> 
<c:forEach var="sectorNegativeList" items="${sectorNegativeList}">
</c:forEach>
</c:forEach>
<c:choose>
<c:when test="${sectorPositiveList[0]!=null || sectorNegativeList[0]!=null }">
<form:form method="POST"  >
<table align="center">
<tr>
<td align="center">
<font size="6"><b>Sector wise All Channel Negative Positive Report </b></font>
</td>
</tr>
<tr>
 <td align="center"><font size="4"><b>Client Name</b></font>&nbsp;&nbsp;&nbsp;
   <font size="4"><c:out value='${clientName.get(0)}' /></font>&nbsp;&nbsp;&nbsp; 
 <font size="4"><b>From :</b></font>&nbsp;&nbsp;&nbsp;
        <font size="4"><c:out value='${pieChart.fromDate}' /></font>&nbsp;&nbsp;&nbsp;
  <font size="4"><b>To :</b></font>&nbsp;&nbsp;&nbsp;
        <font size="4"><c:out value='${pieChart.toDate}' /></font> </td>
  </tr>
  <tr></tr>
  <tr></tr>
   <tr></tr>
  <tr></tr>
</table>
<table>
<tr>
<div id="chartdiv" style="width: 50%; height: 300px;float:left "></div>
<div id="chartdiv1" style="width: 50%; height: 300px;float:left "></div>
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
       <td>[<c:forEach var="channelListList" items="${channelListList}">       
            	<c:out value="${channelListList},"></c:out>
    </c:forEach>]</td>
  </tr>
</table>
<table align="right">	
																 <tr>
                                                                 <td align="right">
																 <img width="135" height="120" border="0" alt="Pulpit rock" src="images/sealWithName.jpg">
																 </td>
																 </tr>
																</table>
<input class="noContentPrint" type="button" id="printbtn" value="Print" onclick="window.print()" />
	</form:form>
	</c:when>
<c:otherwise>
     <h1>Data Not Found...</h1>
</c:otherwise>
</c:choose>
</body>
</html>
