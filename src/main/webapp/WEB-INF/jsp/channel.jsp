<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
</head>
<body>
<form:form method="POST" action="ChanelAdd.do" modelAttribute="Chanel" autocomplete="off" >
	<table>
		<tr>
		<td><font size="5"><b>Add Channel</b></font></td>
		</tr>
		<tr><td><h2>${message}</h2></td></tr>
	</table>
	<table border="0" cellspacing="1" cellpadding="1" class="form_tbl" width="100%" >
		<tr>
		<td><b>Channel Name</b></td>
		<form:hidden  path="channelId"  />
		<td><form:input path="channelName" maxlength="20" />
		</td>
		<td><b>Short Channel Name</b></td>
		<td><form:input path="shortChannelName" maxlength="20" />
		</td>
		</tr>
		<tr><td></td><td> <form:errors path="channelName" cssClass="error"></form:errors> </td>
		<td></td><td><form:errors path="shortChannelName" cssClass="error"></form:errors> </td></tr>
		<tr>
		<td><b>State Name</b></td>
		<td><form:select path="state.stateId">
			<form:option value="0" label="--Select--"/>
						<c:forEach items="${state}" var="refState">
							<form:option value="${refState.stateId}" label="${refState.stateName}" />
						</c:forEach>
			</form:select>			
		</td>
		</tr>
		<tr><td></td><td><form:errors path="state.stateId" cssClass="error"></form:errors></td></tr>
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
	<th>Channel Name</th>
	<th>Channel Short Name</th>
	<th>State Name</th>
	<th>Edit</th>
	<th>Delete</th>
	</tr>
	<c:set var="count" value="0" scope="page" />
	<c:forEach items="${chanelContent}" var="content">
	<c:set var="count" value="${count + 1}" scope="page"/>
	<tr><td>${count}</td>
	<td>${content.channelName}</td>
	<td>${content.shortChannelName}</td>
	<td>${content.state.stateName}</td>
	<td><a href="ChanelAdd.do?chanelId=${content.channelId}">Edit</a></td>
	<td><a href="chanelContent/${content.channelId}.do" onclick="return confirm('Are you sure !!! you want to delete?');">Delete</a></td>
	</tr>
	</c:forEach>
	</table>
	</div>
	</form:form>
</body>
</html>
