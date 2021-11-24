<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<script type="text/javascript" src="js/jsp-js/userRegistration.js"></script>

<title>Insert title here</title>
</head>
<body>
	<form:form method="POST" action="addUser.do" modelAttribute="Registration"
		autocomplete="off">
		<table width="100%" border="0" cellspacing="1" cellpadding="1"
			align="center" class="form_tbl">
			<tr><td><b>${message}</b></td></tr>
			<tr>
				<td>First Name</td>
				<td><form:input path="firstName" maxlength="20" /> 
				</td>
			</tr>
			<tr><td></td><td><form:errors path="firstName" cssClass="error"></form:errors></td></tr>
			<tr>
				<td>Last Name</td>
				<td><form:input path="lastName" maxlength="20" /> 
				</td>
			</tr>
			<tr><td></td><td><form:errors path="lastName" cssClass="error"></form:errors></td></tr>
			<tr>
				<td>Email</td>
				<td><form:input path="email" maxlength="40" />
				</td>
			</tr>
			<tr><td></td><td> <form:errors
						path="email" cssClass="error"></form:errors></td></tr>
			
			<tr>
				<td>Select User Type</td>
				<td><form:select path="userTypeId">
						<form:option value="0" label="--Select--" />
						<c:forEach items="${userType}" var="refUserType">
							<form:option value="${refUserType.userId}"
								label="${refUserType.userType}" />
						</c:forEach>
				</form:select>
				
				</td>
			</tr>
			<tr>
				<td>Sex</td>
				<td><form:radiobutton path="sex" value="Male" checked="checked" />Male
					<form:radiobutton path="sex" value="Female" />Female 
				</td>
			</tr>
			<tr><td></td><td><form:errors
						path="sex"></form:errors></td></tr>
			<tr>
				<td>Address</td>
				<td><form:textarea path="address" rows="4" cols="30"/> 
				</td>
			</tr>
			<tr><td></td><td><form:errors
						path="address" cssClass="error"></form:errors></td></tr>
			<tr>
				<td>Mobile No.</td>
				<td><form:input path="moblieNo" maxlength="11" id="phoneId" placeholder="Only Number Allow" />
					
				</td>
			</tr>
			<tr><td></td><td><form:errors path="moblieNo" cssClass="error"></form:errors></td></tr>
			<tr>
				<td>Password</td>
				<td><form:password path="password" maxlength="20" /> 
				</td>
			</tr>
			<tr><td></td><td><form:errors path="password" cssClass="error"></form:errors></td></tr>
			<tr>
				<td>Confirm Password</td>
				<td><input type="password" id="confirmPassword" maxlength="20" />
				</td>
			</tr>
			<tr>
				<td colspan="2"><input type="submit" value="Save"
					onclick="return validate()" /> <input type="reset" value="Reset" />
					<input type="button" name="Cancel" value="Cancel"
					onclick="window.location ='cancel.do'" /></td>
			</tr>
		</table>
		<div class="scroll_content">
			<table border="0" cellspacing="1" cellpadding="1" class="mid_tbl"
				width="100%">
				<tr>
					<th>First Name </th>
					<th>Last Name</th>
					<th>Email</th>
					<th>User Type</th>
					<th>Delete</th>
			</tr>
				
				<c:forEach items="${registration1}"  var="content">
					<tr>
					
						<td>${content.firstName}</td>
						<td>${content.lastName}</td>
						<td>${content.email}</td>
						<td>${content.user.userType}</td>
						<td><a href="registerdUserData/${content.registrationId}.do">Delete</a></td>
						
					</tr>
				</c:forEach>
			</table>
		</div>
	</form:form>
</body>
</html>