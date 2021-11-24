<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@page import="java.util.ArrayList"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<script src="js/amcharts.js" type="text/javascript"></script>
<style type="text/css">
@media print {
    #printbtn {
        display :  none;
    }
}
</style>
<script type="text/javascript">
/* using this url create pie chart
http://jsfiddle.net/gh/get/jquery/1.9.1/highslide-software/highcharts.com/tree/master/samples/highcharts/demo/pie-basic/ */
var chart;
var legend;    
 function generatePieChartData () 
 {
	 var pieChartData = [];
	 <c:forEach var="advList" items="${advList}">  
	 pieChartData.push({
		    country: '${advList[1]}',
 	               value: Math.abs(${advList[3]/10})
            	 });
                
	 </c:forEach>     
    return pieChartData;
} 
AmCharts.ready(function(){
    // PIE CHART
    // colour at line no 6572 inside amcharts.js
    // height and weigth on line no - 7423
    chart = new AmCharts.AmPieChart();
    chart.dataProvider = generatePieChartData();
    chart.titleField = "country";
    chart.valueField = "value";
    chart.outlineColor = "#FFFFFF";
    chart.outlineAlpha = 0.8;
    chart.outlineThickness = 2;
    // this makes the chart 3D
    chart.depth3D = 25;
    chart.angle = 55;
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
</script> 
</head>
<body>
<c:forEach var="advList" items="${advList}">
</c:forEach>
<c:choose>
<c:when test="${advList[3]!=null || advList[1]!=null }">
<form:form method="POST" >
<table><tr>
<td width="90"></td><td width="90"></td><td width="90"></td>
<td>
<table>
<tr>
  <td align="center">
     <font size="6"><b>All Channel Negative Positive Report</b></font>
  </td>
  </tr>
<tr>
    <td align="center"> <font size="4"><b>Client Name:</b></font>&nbsp;&nbsp;&nbsp;
       <font size="4"><c:out value='${clientName.get(0)}' /></font>&nbsp;&nbsp;&nbsp;
  <font size="4"><b>From :</b></font>&nbsp;&nbsp;&nbsp;
  <font size="4"><c:out value='${pieChart.fromDate}' /></font>&nbsp;&nbsp;&nbsp;
  <font size="4"><b>To :</b></font>&nbsp;&nbsp;&nbsp;
  <font size="4"><c:out value='${pieChart.toDate}' /></font></td>
  </tr>
</table></td>
</tr></table>
<div id="chartdiv" style="width: 85%; height: 285px;float:center "></div>
<table><tr>
<td width="120"></td><td width="90"></td><td width="90"></td>
<td>
<table align="center">
<tr>
  <td><b>Report Based On:</b></td>
</tr>
 <tr><td><b>[Seconds]</b>&nbsp;&nbsp;
<c:forEach var="advList" items="${advList}">  
		    ${advList[1]}:${advList[3]}
 </c:forEach> 
</td>
</tr> 
   <tr><td><b><!-- Total Seconds:&nbsp;&nbsp; --> </b></td></tr>
 <tr><td><b>Channel Name:</b>&nbsp;&nbsp; 
 [<c:forEach var="advList" items="${advList}">  
 	              ${advList[2]},
</c:forEach>] 
 </td>
 
 </tr>   
</table>
</td>
</tr></table>
<table align="right">	
	<tr>															
                                                                 <td align="right">
																 <img border="0" src="images/sealWithName.jpg" alt="Pulpit rock" width="110" height="100">
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
