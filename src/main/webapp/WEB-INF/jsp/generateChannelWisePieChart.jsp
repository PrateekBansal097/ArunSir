<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@page import="javax.persistence.criteria.CriteriaBuilder.In"%>
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
<% int size=((ArrayList)session.getAttribute("ChannelPositiveList")).size(); %>
<%if(size==0){ out.print("Data Not Found...");%><%}else{ %>
<script type="text/javascript">
var size=${ChannelPositiveList.size()};
var i=0;
/* using this url create pie chart
http://jsfiddle.net/gh/get/jquery/1.9.1/highslide-software/highcharts.com/tree/master/samples/highcharts/demo/pie-basic/ */
<%if(size>=1){%>
var chart;
var legend;

var chartData = [{
    country: "Positive",
    value:Math.abs(${ChannelPositiveList.get(0)[1]})},
 {
    country: "Negative",
    value:Math.abs(${ChannelNegativeList.get(0)[1]})
  }];

AmCharts.ready(function() {
    // PIE CHART
    // colour at line no 6572 inside amcharts.js
    // height and weigth on line no - 7423
    chart = new AmCharts.AmPieChart();
   
    chart.dataProvider = chartData; 
    
    chart.titleField = "country";
    chart.valueField = "value";
    //chart.labelText = "[[value]]";
    chart.outlineColor = "#FFFFFF";
    chart.outlineAlpha = 0.8;
    chart.outlineThickness = 1;
    // this makes the chart 3D
    chart.depth3D = 10;
    chart.angle = 55;
    
    //chart.labelText = "[[percents]]%";
    //chart.balloonText = "[[value]] ([[percents]]%)";
    
/*     
    chart.autoMargins = false;
    chart.marginLeft = 0;
    chart.marginRight = 0;
    chart.marginTop = 30;
    chart.marginBottom = 40; */
    
    chart.addTitle("${ChannelList[0].getChannelName()}");
    chart.addTitle("Total No Of  News:${ChannelPositiveList.get(0)[1]-ChannelNegativeList.get(0)[1]}");

    // this line makes the chart to show image in the background
    chart.backgroundImage = "images/logo_inner_vertical.png";    
    
    // LEGEND
    legend = new AmCharts.AmLegend();
    legend.align = "center";
    // Amcharts.js line no 1853
    /*  legend.switchType = "v"; */
    legend.markerType = "circle";
    chart.addLegend(legend);
    
    // WRITE
    chart.write("chartdiv");
   
}   );
<%}%>

<%if(size>=2){%>
var chart1;
var legend1;

var chartData1 = [{
    country: "Positive",
    value:Math.abs(${ChannelPositiveList.get(1)[1]})},
 {
    country: "Negative",
    value:Math.abs(${ChannelNegativeList.get(1)[1]})
  }];

AmCharts.ready(function() {
    // PIE CHART
    // colour at line no 6572 inside amcharts.js
    // height and weigth on line no - 7423
    chart1 = new AmCharts.AmPieChart();
   
    chart1.dataProvider = chartData1; 
    
    chart1.titleField = "country";
    chart1.valueField = "value";
    //chart.labelText = "[[value]]";
    chart1.outlineColor = "#FFFFFF";
    chart1.outlineAlpha = 0.8;
    chart1.outlineThickness = 1;
    // this makes the chart 3D
    chart1.depth3D = 10;
    chart1.angle = 55;
    
    //chart.labelText = "[[percents]]%";
    //chart.balloonText = "[[value]] ([[percents]]%)";
    
/*     
    chart.autoMargins = false;
    chart.marginLeft = 0;
    chart.marginRight = 0;
    chart.marginTop = 30;
    chart.marginBottom = 40; */
    
    chart1.addTitle("${ChannelList[1].getChannelName()}");
    chart1.addTitle("Total No Of  News:${ChannelPositiveList.get(1)[1]-ChannelNegativeList.get(1)[1]}"); 

    // this line makes the chart to show image in the background
    
    // LEGEND
    legend1 = new AmCharts.AmLegend();
    legend1.align = "center";
    // Amcharts.js line no 1853
    /*  legend.switchType = "v"; */
    legend1.markerType = "circle";
    chart1.addLegend(legend1);
    
    // WRITE
    chart1.write("chartdiv1");
   
}   );
<%}%>
<%if(size>=3)
	{%>
var chart2;
var legend2;

var chartData2 = [{
    country: "Positive",
    value:Math.abs(${ChannelPositiveList.get(2)[1]})},
 {
    country: "Negative",
    value:Math.abs(${ChannelNegativeList.get(2)[1]})
  }];

AmCharts.ready(function() {
    // PIE CHART
    // colour at line no 6572 inside amcharts.js
    // height and weigth on line no - 7423
    chart2 = new AmCharts.AmPieChart();
   
    chart2.dataProvider = chartData2; 
    
    chart2.titleField = "country";
    chart2.valueField = "value";
    //chart.labelText = "[[value]]";
    chart2.outlineColor = "#FFFFFF";
    chart2.outlineAlpha = 0.8;
    chart2.outlineThickness = 1;
    // this makes the chart 3D
    chart2.depth3D = 10;
    chart2.angle = 55;
    
    //chart.labelText = "[[percents]]%";
    //chart.balloonText = "[[value]] ([[percents]]%)";
    
/*     
    chart.autoMargins = false;
    chart.marginLeft = 0;
    chart.marginRight = 0;
    chart.marginTop = 30;
    chart.marginBottom = 40; */
    
     chart2.addTitle("${ChannelList[2].getChannelName()}");
    chart2.addTitle("Total No Of  News:${ChannelPositiveList.get(2)[1]-ChannelNegativeList.get(2)[1]}"); 

    // this line makes the chart to show image in the background
    chart2.backgroundImage = "../images/logo_inner_vertical.png";    
    
    // LEGEND
    legend2 = new AmCharts.AmLegend();
    legend2.align = "center";
    // Amcharts.js line no 1853
    /*  legend.switchType = "v"; */
    legend2.markerType = "circle";
    chart2.addLegend(legend2);
    
    // WRITE
    chart2.write("chartdiv2");
   
}   );
	<%}%>
<%if(size>=4){%>
var chart3;
var legend3;

var chartData3 = [{
country: "Positive",
value:Math.abs(${ChannelPositiveList.get(3)[1]})},
{
country: "Negative",
value:Math.abs(${ChannelNegativeList.get(3)[1]})
}];

AmCharts.ready(function() {
// PIE CHART
// colour at line no 6572 inside amcharts.js
// height and weigth on line no - 7423
chart3= new AmCharts.AmPieChart();

chart3.dataProvider = chartData3; 

chart3.titleField = "country";
chart3.valueField = "value";
//chart.labelText = "[[value]]";
chart3.outlineColor = "#FFFFFF";
chart3.outlineAlpha = 0.8;
chart3.outlineThickness = 1;
// this makes the chart 3D
chart3.depth3D = 10;
chart3.angle = 55;

//chart.labelText = "[[percents]]%";
//chart.balloonText = "[[value]] ([[percents]]%)";

/*     
chart.autoMargins = false;
chart.marginLeft = 0;
chart.marginRight = 0;
chart.marginTop = 30;
chart.marginBottom = 40; */

 chart3.addTitle("${ChannelList[3].getChannelName()}");
 chart3.addTitle("Total No Of  News:${ChannelPositiveList.get(3)[1]-ChannelNegativeList.get(3)[1]}");  

// this line makes the chart to show image in the background
chart3.backgroundImage = "../images/logo_inner_vertical.png";    

// LEGEND
legend3 = new AmCharts.AmLegend();
legend3.align = "center";
// Amcharts.js line no 1853
/*  legend.switchType = "v"; */
legend3.markerType = "circle";
chart3.addLegend(legend3);

// WRITE
chart3.write("chartdiv3");

}   );
<%}%>
</script>		
</head>
<body>
<form:form method="POST" >
<table align="center">
<tr>
<td align="center">
<font size="5"><b>Channel Wise Negative Positive Report</b></font>
</td>
</tr>
<tr>
<c:if test="${empty clientId}">
 <td align="center"><font size="3"><b>Client Name</b></font>&nbsp;&nbsp;&nbsp;
   <font size="3"><c:out value='${clientName.get(0)}' /></font>&nbsp;&nbsp;&nbsp; 
 <font size="3"><b>From :</b></font>&nbsp;&nbsp;&nbsp;
   <font size="3"><c:out value='${pieChart.fromDate}' /></font>&nbsp;&nbsp;&nbsp;
  <font size="3"><b>To :</b></font>&nbsp;&nbsp;&nbsp;
   <font size="3"><c:out value='${pieChart.toDate}' /></font> </td>
  </c:if>
  <c:if test="${not empty clientId}">
  <td align="center"><font size="3"><b>Client Name</b></font>&nbsp;&nbsp;&nbsp;
  <font size="3"><c:out value='${clientName.get(0)}' /></font>&nbsp;&nbsp;&nbsp; 
 <font size="3"><b>From :</b></font>&nbsp;&nbsp;&nbsp;
   <font size="3"><c:out value='${fromdate}' /></font>&nbsp;&nbsp;&nbsp;
  <font size="3"><b>To :</b></font>&nbsp;&nbsp;&nbsp;
   <font size="3"><c:out value='${todate}' /></font> </td>
  </c:if>
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
<c:if test="${fn:length(ChannelList) >4 && empty clientId}">
<a href="PieChartReport.do?param=AllChannelNegativePositive1&clientId=${pieChart.getClient().getClientId()}&todate=${pieChart.toDate}&fromdate=${pieChart.fromDate}">Next</a>
</c:if>
<c:if test="${fn:length(ChannelList) >4 && not empty clientId}">
<a href="PieChartReport.do?param=AllChannelNegativePositive1&clientId=${clientId}&todate=${todate}&fromdate=${fromdate}">Next</a>
</c:if>  
</td></tr><tr><td>   
<input class="noContentPrint" type="button" id="printbtn" value="Print" onclick="window.print()" />
</td></tr></table>	
</form:form>
</body>
</html><%}%>
