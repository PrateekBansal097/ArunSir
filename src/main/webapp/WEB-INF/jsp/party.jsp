<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
</head>
<body>
	<form:form method="POST" modelAttribute="Party" action="partyAdd.do"
		autocomplete="off">
		<table>
			<tr>
				<td><font size="5"><b>Add Party</b></font></td>
			</tr>
			<tr>
				<td><b><h2>${message}</h2></b></td>
			</tr>
		</table>
		<table width="100%" border="0" cellspacing="1" cellpadding="1"
			class="form_tbl">
			<tr>
				<td><b>Party Name</b></td>
				<form:hidden path="partyId" />
				<td><form:input path="partyName" maxlength="20" /></td>
			</tr>
			<tr>
				<td></td>
				<td><form:errors path="partyName" cssClass="error"></form:errors>
				</td>
			</tr>
			<tr>
				<td colspan="2"><input type="submit" value="Save" /> <input
					type="button" name="Cancel" value="Cancel"
					onclick="window.location ='cancel.do'" /></td>
			</tr>
		</table>
		<div class="scroll_content1">
			<table border="0" cellspacing="1" cellpadding="1" class="mid_tbl"
				width="100%">
				<tr>
					<th>S.NO</th>
					<th>Party Name</th>
					<th>Edit</th>
					<th>Delete</th>
				</tr>
				<c:set var="count" value="0" scope="page" />
				<c:forEach items="${partyContent}" var="content">
					<tr>
						<c:set var="count" value="${count + 1}" scope="page"/>
						<td>${count}</td>
						<td>${content.partyName}</td>
						<td><a href="partyAdd.do?partyId=${content.partyId}">Edit</a></td>
						<td><a href="partyContent/${content.partyId}.do"
							onclick="return confirm('Are you sure !!! you want to delete?');">Delete</a></td>
					</tr>
				</c:forEach>
			</table>
		</div>
	</form:form>
</body>
</html>
