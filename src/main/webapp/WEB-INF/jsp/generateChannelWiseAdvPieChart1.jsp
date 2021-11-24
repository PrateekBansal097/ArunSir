<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@page import="java.util.ArrayList"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<script src="js/amcharts.js" type="text/javascript"></script>
<% int size=((ArrayList)session.getAttribute("advList")).size();%>
<%if(size==0){ out.print("Data Not Found");%><%}else{ %>
<script type="text/javascript">
/* using this url create pie chart
http://jsfiddle.net/gh/get/jquery/1.9.1/highslide-software/highcharts.com/tree/master/samples/highcharts/demo/pie-basic/ */
<%if(size>=5){%>
var chart;
var legend;    
 function generatePieChartData () 
 {
	var pieChartData = [];
	<c:forEach var="advList1" items="${advList.get(4)}">  pieChartData.push({
            	  country: '${advList1[1]}',
            	   value: Math.abs(${advList1[3]/10})
            	 });
	</c:forEach>
    return pieChartData;
} 
AmCharts.ready(function(){
    // PIE CHART
    // colour at line no 6572 inside amcharts.js
    // height and weigth on line no - 7423
    chart = new AmCharts.AmPieChart();
    <%-- <%if(param.equals("AllChennal")||param.equals("Channel")){%>
    chart.dataProvider = chartData; 
    <%}else --%>
    chart.dataProvider = generatePieChartData();
    chart.titleField = "country";
    chart.valueField = "value";
    chart.outlineColor = "#FFFFFF";
    chart.outlineAlpha = 0.8;
    chart.outlineThickness = 1;
    // this makes the chart 3D
    chart.depth3D = 10;
    chart.angle = 55;
    chart.addTitle("${advList.get(4)[0][2]}");
    chart.addTitle("Total Seconds:${advList.get(4)[3]}");
    <%-- chart.addTitle("<%=channelNameListIterator.next()%>");
    chart.addTitle("Total Seconds:<%=noOfAdv%>");
    chart.addTitle("Party Wise Seconds:<%=noOfAdvList%>"); --%>

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
 function generatePieChartData1 () 
 {
	 var pieChartData1 = [];
	 <c:forEach var="advList1" items="${advList.get(5)}">  pieChartData1.push({
		 			country: '${advList1[1]}',
		 			 value: Math.abs(${advList1[3]/10})
             	 });
	 </c:forEach>
    return pieChartData1;
} 
AmCharts.ready(function(){
    // PIE CHART
    // colour at line no 6572 inside amcharts.js
    // height and weigth on line no - 7423
    chart = new AmCharts.AmPieChart();
    <%-- <%if(param.equals("AllChennal")||param.equals("Channel")){%>
    chart.dataProvider = chartData; 
    <%}else --%>
   
    chart.dataProvider = generatePieChartData1();
    
    chart.titleField = "country";
    chart.valueField = "value";
    chart.outlineColor = "#FFFFFF";
    chart.outlineAlpha = 0.8;
    chart.outlineThickness = 1;
    // this makes the chart 3D
    chart.depth3D = 10;
    chart.angle = 55;
    chart.addTitle("${advList.get(5)[0][2]}");
    chart.addTitle("Total Seconds:${advList.get(5)[3]}");
   <%--  chart.addTitle("<%=channelNameListIterator.next()%>");
    chart.addTitle("Total Seconds:<%=noOfAdv%>");
    chart.addTitle("Party Wise Second:<%= noOfAdvList%>"); --%>
    // this line makes the chart to show image in the background
   // chart.backgroundImage = "../images/logo_inner_vertical.png";    
    
    // LEGEND
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
 function generatePieChartData2 () 
 {
	 var pieChartData2 = [];
	 <c:forEach var="advList1" items="${advList.get(6)}">   pieChartData2.push({
		 country: '${advList1[1]}',
		 value: Math.abs(${advList1[3]/10})
             	 });
	 </c:forEach>
    return pieChartData2;
} 
AmCharts.ready(function(){
    // PIE CHART
    // colour at line no 6572 inside amcharts.js
    // height and weigth on line no - 7423
    chart = new AmCharts.AmPieChart();
    <%-- <%if(param.equals("AllChennal")||param.equals("Channel")){%>
    chart.dataProvider = chartData; 
    <%}else --%>
   
    chart.dataProvider = generatePieChartData2();
    
    chart.titleField = "country";
    chart.valueField = "value";
    chart.outlineColor = "#FFFFFF";
    chart.outlineAlpha = 0.8;
    chart.outlineThickness = 1;
    // this makes the chart 3D
    chart.depth3D = 10;
    chart.angle = 55;
    chart.addTitle("${advList.get(6)[0][2]}");
    chart.addTitle("Total Seconds:${advList.get(6)[3]}");
   <%--  chart.addTitle("<%=channelNameListIterator.next()%>");
    chart.addTitle("Total Seconds:<%=noOfAdv%>");
    chart.addTitle("Party Wise Second:<%= noOfAdvList%>"); --%>
    // this line makes the chart to show image in the background
   // chart.backgroundImage = "../images/logo_inner_vertical.png";    
    
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
 function generatePieChartData3 () 
 {
	 var pieChartData3 = [];
	 <c:forEach var="advList1" items="${advList.get(7)}">  pieChartData3.push({
		  country: '${advList1[1]}',
		  value: Math.abs(${advList1[3]/10})
             	 });
	 </c:forEach>
    return pieChartData3;
} 
AmCharts.ready(function(){
    // PIE CHART
    // colour at line no 6572 inside amcharts.js
    // height and weigth on line no - 7423
    chart = new AmCharts.AmPieChart();
    <%-- <%if(param.equals("AllChennal")||param.equals("Channel")){%>
    chart.dataProvider = chartData; 
    <%}else --%>
   
    chart.dataProvider = generatePieChartData3();
    
    chart.titleField = "country";
    chart.valueField = "value";
    chart.outlineColor = "#FFFFFF";
    chart.outlineAlpha = 0.8;
    chart.outlineThickness = 1;
    // this makes the chart 3D
    chart.depth3D = 10;
    chart.angle = 55;
    chart.addTitle("${advList.get(7)[0][2]}");
    chart.addTitle("Total Seconds:${advList.get(7)[3]}");
   <%--  chart.addTitle("<%=channelNameListIterator.next()%>");
    chart.addTitle("Total Seconds:<%=noOfAdv%>");
    chart.addTitle("Party Wise Second:<%= noOfAdvList%>"); --%>
    // this line makes the chart to show image in the background
   // chart.backgroundImage = "../images/logo_inner_vertical.png";    
    
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

function loggedInUser()
{
	document.generateChannel.action ="ADVPieChartReport.do?param=Channel2&clientId=${clientId}";
    document.generateChannel.submit();  
}
</script>   
</head>
<body>
<form:form method="POST"   modelAttribute="PieChart" name="generateChannel" >
<table align="center">
<tr>
<td align="center">
<font size="4"><b>Channel Wise Advertisement Ratio Report</b></font>
</td>
</tr>
<tr>
 <td align="center"><font size="3"><b>Client Name</b></font>&nbsp;&nbsp;&nbsp;
 <font size="3"><c:out value='${clientName.get(0)}' /></font>&nbsp;&nbsp;&nbsp; 
 <font size="3"><b>From :</b></font>&nbsp;&nbsp;&nbsp;
   <font size="3"><c:out value='${pieChart.fromDate}' /></font>&nbsp;&nbsp;&nbsp;
  <font size="3"><b>To :</b></font>&nbsp;&nbsp;&nbsp;
       <font size="3"><c:out value='${pieChart.toDate}' /></font> </td>
  </tr>
  <tr></tr>
  <tr></tr>
   <tr></tr>
  <tr></tr>
</table>
<table>
<tr>
<div id="chartdiv" style="width: 50%; height: 300px;float:left "></div>
<div id="chartdiv1" style="width: 50%; height: 300px;float: right;"></div>
</tr>
<tr><div id="chartdiv2" style="width: 50%; height: 300px;float:left "></div>
<div id="chartdiv3" style="width: 50%; height: 300px;float: right;"></div></tr>
</table>
<form:hidden path="toDate" /> 
<form:hidden path="fromDate" />
<form:hidden path="client"/> 
<form:hidden path="partyId" /> 
<a href="javascript:void(0);"  onclick="loggedInUser();">Previous</a>
</form:form>
</body>
</html><%}%>
