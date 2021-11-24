<%@page import="com.emts.model.Registration"%>
<%@page import="java.util.Date"%>
<%@page import="java.util.Locale"%>
<%@page import="java.text.SimpleDateFormat"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<script type="text/javascript" src="js/jsp-js/home.js"></script>
<script type="text/javascript" src="js/jsp-js/home.js"></script>
<%
Registration member = (Registration)session.getAttribute("member");
if(member==null)
{
System.out.println("===if Block of Header===");
response.sendRedirect("welcome.do");
}
%>
<script type="text/javascript" src="js/ddlevelsmenu.js"></script>
<link href="css/style.css" rel="stylesheet" type="text/css" />
<script src="http://jqueryjs.googlecode.com/files/jquery-1.2.6.min.js"
	type="text/javascript"></script>

</head>
<body>

	<c:if  test="${!empty trackingStoryCodeList}">
		<table border="0" cellspacing="1" cellpadding="1" class="mid_tbl" width="100%">
		<tr><td><td></td><font size="5"><b>Search Result Based on Story code....</b></font></td></tr>
		<tr>
	<th>Slug</th>
	<th>City</th>
	<th>Time</th>
	<th>Date</th>
	<th>News Type</th>
	<th>Channel Name</th>
	<th>News Trend</th>
	<th>Story Code</th>
	</tr>
	<c:forEach items="${trackingStoryCodeList}" var="content">
	<c:set var="now" value="${content.date}" />
     <fmt:parseDate value="${now}" var="parsedEmpDate"  pattern="yyyy-MM-dd" />
     <fmt:formatDate value="${parsedEmpDate}" var="startFormat" pattern="dd-MM-yyyy"/>
	<tr>
	<td width="300">${content.textArea}</td>
	<td>${content.city.cityName}</td>
	<td>${content.time}</td>
	<td><c:out value="${startFormat}" /></td>
	<td>${content.newsType.newsTypeName}</td>
	<td>${content.chanel.channelName}</td>
	<td>${content.newsTrend}</td>
	<td>${content.storyCode}</td>
	</tr>
	</c:forEach>
	</table>
	</c:if>
	<c:if  test="${!empty publicationStoryCodeList}">
	<table border="0" cellspacing="1" cellpadding="1" class="mid_tbl" width="100%">
	<tr><td><td></td><font size="5"><b>Search Result Based on Story code....</b></font></td></tr>
	<tr>
	<th>S.NO</th>
	<th>Slug</th>
	<th>Page</th>
	<th>City</th>
	<th>News Size(in Column)</th>
	<th>With photo</th>
	<th>News Trend</th>
	<th>Story Code</th>
	</tr>
	<c:forEach items="${publicationStoryCodeList}" var="content">
	<tr>
	<td>${content.printTrackingId}</td>
	<td width="300">${content.textArea}</td>
	<td>${content.pageNumber}</td>
	<td>${content.city.cityName}</td>
	<td>${content.newsColumn}</td>
	<td>${content.photo}</td>
	<td>${content.newsTrend}</td>
	<td>${content.storyCode}</td>
	</tr>
	</c:forEach>
	</table>
	</c:if>
	<table width="100%" border="0" cellspacing="0" cellpadding="0" align="center">
					<tr><td valign="top" align="center">
						<table width="100%" border="0" cellspacing="0" cellpadding="0"  >
						<tr><td valign="top" align="center"><img src="images/images.jpg" width="546" height="528" /></td></tr></table></td>
					</tr>
	</table>
	<%if (member.getUserTypeId()==2 || member.getUserTypeId()==1) { %>
	<div id="popup_box">
		<h1 id="popupBoxHead">
			Welcome,
			<%= member.getFirstName() %></h1>
		<a id="popupBoxClose"
			style="color: sienna; hover: FF0000; cursor: pointer;">Close</a>
		<%! String news=null;
			String date1=null;
		%>
		<c:if  test="${empty popupList}">
			<h3 id="popupBoxHead1"><%=new SimpleDateFormat("dd-MM-yyyy", Locale.US).format(new Date())%>:-Good Morning</h3>
		</c:if>
     <br/>
    <%-- <c:set var="string2" value="${fn:split(popupList,',')}" /> --%>
		<c:set var="count" value="0" scope="page" />
				
						
		<c:forEach items="${popupList}" var="content">
		<ul type="circle" style="list-style-type: none; height: 10px;padding: 0;">

		<h3 id="popupBoxHead1"><%=new SimpleDateFormat("dd-MM-yyyy", Locale.US).format(new Date())%>:-</h3><br />
		                      
		     <c:set var="count" value="${count + 1}" scope="page"/>
		     	<li style="display: inline;">${count}.</li>
		     	<li style="display: inline;"><c:out value="${content.textArea}"/></li>
			</ul>
		</c:forEach>	
	</div>
	<%}%>
</body>
</html>
