<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://displaytag.sf.net" prefix="display"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<jsp:useBean id="date" class="java.util.Date" />
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<script type="text/javascript" src="js/jquery-1.9.1.js"></script>
<script type="text/javascript" src="js/jquery-ui.js"></script>
<link href="css/tooltip.css" rel="stylesheet" type="text/css" />
<link href="css/displaytag.css" rel="stylesheet" type="text/css" />

<style type="text/css">
@media print {
    #printbtn {
        display :  none;
    }
    #excelbtn {
        display :  none;
    }
    #downloadexcelbtn {
        display :  none;
    }
}
</style>

<script type="text/javascript">
		function generateXLS(event) {
		var getreportfromDate='${PieChart.fromDate}';
		var getreporttoDate='${PieChart.toDate}';
		var getreportchannelId='${PieChart.chanel.channelId}';
		var getStringClientName='${clientName}';
$.ajax({
	        type: "POST",
	        url: "ExcelReport.do",
	        data: "getreportfromDate=" + getreportfromDate + "&getreporttoDate=" + getreporttoDate +"&getreportchannelId="+ getreportchannelId +"&getStringClientName="+ getStringClientName ,
	        success: function(response){
	        	$('#info').html(response); 
	        	${PieChart.fromDate};
	        	${PieChart.toDate};
	        	${PieChart.chanel.channelId};
	        	${getStringClientName};
		        },
	        error: function(e){
	         }
			});
		}
		
</script>

</head>
<body >
<table width="100%" border="0" cellspacing="1" cellpadding="1">
<tr>
<td>
<img border="0" src="images/logo_index.png" alt="Pulpit rock" width="250" height="55" >
 <td>Client Name:<b><c:out value='${clientName.get(0)}' /></b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</td> 
<td>Channel Name:<b><c:out value='${channelName.get(0)}' /></b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<b></b></td> 

<td>Date:<b><c:set var="now" value="<%=new java.util.Date()%>"/><fmt:formatDate value="${now}" pattern="dd/MM/yyyy" /></b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</td>
</tr>
<tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr>
</table>
<table align="center" height="60"><tr><td><font size="2"><b>Electronic Media Tracking</b></font></td></tr></table>
<c:set var="count" value="0" scope="page" />
	<display:table name="pdfTracking" pagesize="25" class="mid_tbl" export="false" requestURI="EMTorPDFReport.do"  >
	<c:set var="count" value="${count + 1}" scope="page" />
		<%-- <display:column property="trackingId" title="S.NO" sortable="true" /> --%>
		<display:column title="S.NO" style="font-size:.80em;width:10px ">
		${count}
		</display:column>
		<display:column property="textArea" title="Slug" style="font-size:1.2em;width:350px" />
		<!-- Check for Reference values -->
		 <display:column property="city.cityName" title="City" style="font-size:1.2em"/> 
		<display:column property="time" title="Time" style="font-size:1.2em"/>
		<display:column property="newsType.newsTypeName" title="News Type" style="font-size:1.2em" /> 
		 <display:column property="sector.sectorName" title="Sector" style="font-size:1.2em"/>
		 <display:column property="subSector.subSectorName" title="Sub Sector" style="font-size:1.2em"/>
		<display:column property="newsTrend" title="News Trend" style="font-size:1.2em"/>
		<display:column property="storyCode" title="Story Code" style="font-size:1.2em"/>
		<%-- <display:setProperty name="export.pdf" value="true" /> --%>
		<%-- <display:setProperty name="decorator.media.pdf" value="org.displaytag.sample.decorators.ItextTotalWrapper" /> --%>
	</display:table>
	 <table align="right">	
								
								
																 <tr>
                                                                  <td align="right">
																 <img border="0" src="images/images.jpg" alt="Pulpit rock" width="70" height="70">
																 </td>
																 </tr>
                                                                </table>
<table class="buttom"><tr> <td > <input class="noContentPrint" type="button" id="printbtn" value="Print" onclick="window.print()" /> </td><td ><button data-tooltip="Please click on the excel button to generate a fresh report" id="excelbtn" onclick=generateXLS(event)>Excel</button></td><td id="info"></td>

<td ><td>
	<!-- <input type="button" id="excelbtn" value="Excel" onclick=generateXLS(event)></input> -->
    <!--  <a href="downloadExcelReport.do"><input type="button" id="downloadexcelbtn" value="Download Excel" /> </a>-->
     
<a href="downloadExcelReport.do" data-tooltip="Please clcik on the excel button to generate a fresh report before download."><input type="button" id="downloadexcelbtn" value="Download Excel" /></a>
 </td> <td id="info"></td>


<!-- <table class="buttom"><tr> <td > <input class="noContentPrint" type="button" value="Print" onclick="window.print()" /> </td>   -->
</tr> 


</table>
</body>
</html>