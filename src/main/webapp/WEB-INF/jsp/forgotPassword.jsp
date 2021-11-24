<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
</head>
<body>
	<form:form method="POST" action="ForgotPassword.do"
		modelAttribute="PieChart">
		<table>
			<tr>
				<td><font size="3"><b>Enter your registered email id
							to get your password !</b></font></td>
			</tr>
		</table>
		<table width="100%" border="0" cellspacing="1" cellpadding="1"
			class="form_tbl">
			<tr>
				<td><b>Email Id :</b></td>
				<td><form:input path="email" maxlength="20" /></td>
			</tr>
			<tr>
				<td colspan="2"><input type="submit" value="Submit" /> <input
					type="button" name="Cancel" value="Cancel"
					onclick="window.location ='welcome.do'" /></td>
			</tr>
		</table>
		<p>&nbsp;</p>
		<p>&nbsp;</p>
		<p>&nbsp;</p>
		<p>&nbsp;</p>
		<p>&nbsp;</p>
		<p>&nbsp;</p>
		<p>&nbsp;</p>
		<p>&nbsp;</p>
		<p>&nbsp;</p>
		<p>&nbsp;</p>
	</form:form>
</body>
</html>
