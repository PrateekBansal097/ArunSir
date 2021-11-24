<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://displaytag.sf.net" prefix="display" %>
<jsp:useBean id="date" class="java.util.Date" />
<html>
<head>

<link href="css/displaytag.css" rel="stylesheet" type="text/css" />
<link href="css/tooltip.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="js/jquery-1.9.1.js"></script>
<script type="text/javascript" src="js/jquery-ui.js"></script>

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
	function generateAdvXLS(event) {
		
			
		var getAdvReportfromDate='${pieChart.fromDate}';
		var getAdvReporttoDate='${pieChart.toDate}';
		var getAdvReportchanelid='${pieChart.chanel.channelId}';
		var getAdvReportclientId='${pieChart.client.clientId}';
		var getStringClientName='${clientName}';
			$.ajax({
		        type: "POST",
		        url: "AdvExcelReport.do",
		        data: "getAdvReportfromDate=" + getAdvReportfromDate + "&getAdvReporttoDate=" + getAdvReporttoDate +"&getAdvReportchanelid="+ getAdvReportchanelid + "&getAdvReportclientId=" + getAdvReportclientId +"&getStringClientName="+ getStringClientName ,
		        success: function(response){
		        	$('#info').html(response); 
		        	${pieChart.fromDate};
		        	${pieChart.toDate};
		        	${pieChart.chanel.channelId};
		        	${pieChart.client.clientId};
		        	${getStringClientName};
			        },
		        error: function(e){
		         }
				});
			}

</script>
</head>
<body>
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
<table height="60"></table>
<c:set var="count" value="0" scope="page" />
	<display:table name="advertisementTracking" pagesize="25" class="mid_tbl" export="false" requestURI="ADVPDFReport.do" >
		<c:set var="count" value="${count + 1}" scope="page" />
		<%-- <display:column property="advertismentId" title="S.NO" sortable="true" /> --%>
		<display:column title="S.NO" style="font-size:1.2em;width:10px ">
		${count}
		</display:column>
		<display:column property="textArea" title="Slug" style="font-size:1.2em;width:400px " />
		 <display:column property="advType.advtypeName" title="Advertisement Type Name" style="font-size:1.2em;width:200px "/> 
		 <display:column property="party.partyName" title="Party" style="font-size:1.2em"/>
		 <display:column property="city.cityName" title="City" style="font-size:1.2em"/>
		<display:column property="startTime" title="Start Time" style="font-size:1.2em"/>
		<display:column property="endTime" title="End Time" style="font-size:1.2em"/>
		<display:column property="duration" title="Duration" style="font-size:1.2em;width:80px"/>
		<display:setProperty name="export.pdf" value="true" />
		
	</display:table>
	<table align="right">	
															<%
	int totalDuration=(Integer)request.getAttribute("totalDuration");
	if(totalDuration>0){
	%>	
																  <tr>
																 <td align="right" style="width: 130px;font-size: 13px;text-align: left;font-weight: bold;   ">
																 Total duration<br/>(in seconds)
																 </td>
																 <td align="right" style="width: 85px;font-size: 14px;text-align:left ">
																 <%= request.getAttribute("totalDuration")%>
																 </td>
																 </tr>
																 <tr>
																  <td align="right" style="width: 130px;font-size: 13px;text-align: left;font-weight: bold;   ">
																 
																 </td>
                                                                  <td align="right">
																 <img border="0" src="images/images.jpg" alt="Pulpit rock" width="70" height="70">
																 </td>
																 </tr>
																<%
	}
	else{
									
				%>
																<tr>
																<td align="right">
																 <img border="0" src="images/images.jpg" alt="Pulpit rock" width="70" height="70">
																 </td>
																 </tr>
			 <%} %>
                                                                </table>
<table class="buttom"><tr> <td > <input class="noContentPrint" type="button" id ="printbtn" value="Print" onclick="window.print()" /> <td > <button data-tooltip="Please click on the excel button to generate a fresh report" id="excelbtn" onclick=generateAdvXLS(event)>Excel</button></td><td id="info"></td></td>
 <td>
<a href="downloadAdvExcelReport.do" data-tooltip="Please clcik on the excel button to generate a fresh report before download."><input type="button" id="downloadexcelbtn" value="Download Excel" /></a>
</td> 
 </tr> </table>
</body>
</html>
	