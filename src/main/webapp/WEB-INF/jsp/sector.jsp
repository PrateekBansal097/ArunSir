<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
</head>
<body>
<form:form method="POST" action="SectorAdd.do" modelAttribute="Sector" autocomplete="off" >
	<table>
		<tr>
		<td><font size="5"><b>Add Sector</b></font></td>
		</tr>
		<tr><td><b><h2>${message}</h2></b></td></tr>
		</table>
		<table  border="0" cellspacing="1" cellpadding="1" class="form_tbl" width="100%">
		<tr>
		<td><b>Sector Name</b></td>
		<form:hidden  path="sectorId" />
		<td><form:input path="sectorName" maxlength="20" />
		</td>
		</tr>
		<tr><td></td><td><form:errors path="sectorName" cssClass="error"></form:errors></td></tr>
		<tr>
		<td colspan="2">
		<input type="submit" value="Save" />	 
		<input type="button" name="Cancel"	value="Cancel" onclick="window.location ='cancel.do'"/>
		</td>
		</tr>
		</table>
	<div class="scroll_content1">
	<table border="0" cellspacing="1"
					cellpadding="1" class="mid_tbl" width="100%">
	<tr>
	<th>S.NO</th>
	<th>Sector Name</th>
	<th>Edit</th>
	<th>Delete</th>
	</tr>
	<c:set var="count" value="0" scope="page" />
	<c:forEach items="${sectorContent}" var="content">
	
	<c:set var="count" value="${count + 1}" scope="page"/>
	<td>${count}</td>
	<td>${content.sectorName}</td>
	<td><a href="SectorAdd.do?sectorId=${content.sectorId}">Edit</a></td>
	<td><a href="sectorContent/${content.sectorId}.do" onclick="return confirm('Are you sure !!! you want to delete?');">Delete</a></td>
	</tr>
	</c:forEach>
	</table>
	</div>
	</form:form>
</body>
</html>
