<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
</head>
<body>
<form:form method="POST" action="StoryCode.do" modelAttribute="PieChart" >
	<table>
		<tr>
		<td><font size="5"><b>Search</b></font></td>
		</tr>
		</table>
		<table width="100%" border="0" cellspacing="1" cellpadding="1" class="form_tbl" >
		<tr>
		<td><b>Story Code</b></td>
		<td><form:input path="storyCode" maxlength="30"  />
		</td>
		</tr>
		<tr>
		<td colspan="2">
		<input type="submit" value="Search" />	 
		<input type="button" name="Cancel"	value="Cancel" onclick="window.location ='cancel.do'"/>
		</td>
		</tr>
		</table>
		<c:if  test="${!empty trackingStoryCodeList}">
		<table border="0" cellspacing="1" cellpadding="1" class="mid_tbl" width="100%">
		<tr>
	<th>S.NO</th>
	<th>Slug</th>
	<th>City</th>
	<th>Time</th>
	<th>News Type</th>
	<th>Sector</th>
	<th>Sub Sector</th>
	<th>News Trend</th>
	<th>Story Code</th>
	</tr>
	<c:forEach items="${trackingStoryCodeList}" var="content">
	<tr>
	<td>${content.trackingId}</td>
	<td>${content.textArea}</td>
	<td>${content.city.cityName}</td>
	<td>${content.time}</td>
	<td>${content.newsType.newsTypeName}</td>
	<td>${content.sector.sectorName}</td>
	<td>${content.subSector.subSectorName}</td>
	<td>${content.newsTrend}</td>
	<td>${content.storyCode}</td>
	</tr>
	</c:forEach>
	</table>
	</c:if>
	<c:if  test="${!empty publicationStoryCodeList}">
	<table border="0" cellspacing="1" cellpadding="1" class="mid_tbl" width="100%">
	<tr>
	<th>S.NO</th>
	<th>Slug</th>
	<th>Page</th>
	<th>City</th>
	<th>News Size(in Column)</th>
	<th>With photo</th>
	<th>Sector</th>
	<th>Sub Sector</th>
	<th>News Trend</th>
	<th>Story Code</th>
	</tr>
	<c:forEach items="${publicationStoryCodeList}" var="content">
	<tr>
	<td>${content.printTrackingId}</td>
	<td>${content.textArea}</td>
	<td>${content.pageNumber}</td>
	<td>${content.city.cityName}</td>
	<td>${content.newsColumn}</td>
	<td>${content.photo}</td>
	<td>${content.sector.sectorName}</td>
	<td>${content.subSector.subSectorName}</td>
	<td>${content.newsTrend}</td>
	<td>${content.storyCode}</td>
	</tr>
	</c:forEach>
	</table>
	</c:if>
	</form:form>
</body>
</html>
