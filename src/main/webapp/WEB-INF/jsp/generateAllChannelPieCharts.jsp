<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
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
var chartData = [{
    country: "Positive",
    value:Math.abs(${obj2.get(1)})},
 {
    country: "Negative",
    value:Math.abs(${obj1.get(1)}) }];
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
   // chart.addLegend(legend);

    // WRITE
    chart.write("chartdiv");
});
</script> 
</head>
<body>
<c:choose>
<c:when test="${obj2.get(1)!=null || obj1.get(1)!=null }">
<table><tr>
<td width="130"></td><td width="90"></td><td width="90"></td>
<td>
<table>
<tr>
  <td align="center">
     <font size="6"><b>All Channel Negative Positive Report</b></font>
  </td>
  </tr>
<tr>
    <td align="center"> <font size="4"><b>Client Name:</b></font>&nbsp;&nbsp;&nbsp;
       <font size="4"> <c:out value='${clientName.get(0)}' /></font>&nbsp;&nbsp;&nbsp;
  <font size="4"><b>From :</b></font>&nbsp;&nbsp;&nbsp;
  <font size="4"><c:out value='${pieChart.fromDate}' /></font>&nbsp;&nbsp;&nbsp;
  <font size="4"><b>To :</b></font>&nbsp;&nbsp;&nbsp;
  <font size="4"><c:out value='${pieChart.toDate}' /></font></td>
  </tr>
</table></td>
</tr></table>
<table><tr>
<div id="chartdiv" style="width: 90%; height: 290px;float:left; "></div></tr></table>
<table><tr>
<td width="130"></td><td width="100"></td><td width="100"></td>
<td>
<table>
<tr>
  <td><b>Report Based On:</b></td><td></td><td></td><td></td>
</tr>
    <tr>
    <td></td>
       <td> Total No Of News:<b>${obj2.get(1)-obj1.get(1)} </b></td>
	<td></td>
       <td> Total No Of Positive News:<b>${obj2.get(1)}</b></td>
   </tr>
   <tr>
   <td></td>
      <td></td><td></td> <td> Total No Of Negative News:<b>${-obj1.get(1)}</b></td>
   </tr>
   <tr>
   <td></td>
       <td><b>Channel Name:</b></td>
       <td></td>
       <td>[<c:forEach var="i" begin="0" end="${obj3.size()-1}" >
       <c:out value="${obj3.get(i)}"></c:out>
       </c:forEach> ]</td>
       </tr>
</table></td>
</tr></table>
<table align="right">	
	<tr>															
																
                                                                 <td align="right">
																 <img border="0" src="images/sealWithName.jpg" alt="Pulpit rock" width="110" height="100">
																 </td>
																 </tr>
																</table>
<input class="noContentPrint" type="button" id="printbtn" value="Print" onclick="window.print()" />
</c:when>
<c:otherwise>
     <h1>Data Not Found...</h1>
</c:otherwise>
</c:choose>
</body>
</html>
