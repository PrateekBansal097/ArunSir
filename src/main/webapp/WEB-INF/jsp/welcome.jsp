<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%-- <%@taglib uri="http://www.springframework.org/tags" prefix="spring"%> --%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Welcome Page</title>
<link href="css/style.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="js/jsp-js/welcome.js"></script>
<script type="text/javascript" src="js/jquery-1.9.1.js"></script>
<script type="text/javascript" src="js/jquery-ui.js"></script>
	<script type="text/javascript" src="js/jquery.cookie.js"></script>
<script type="text/javascript" src="js/login.js"></script>
</head>
<body>
	<form:form method="POST" modelAttribute="Member" id="myform" name="myform">
		<table width="100%" border="0" cellspacing="0" cellpadding="0">
			<tr>
				<td height="150">&nbsp;</td>
			</tr>
			<tr>
				<td valign="top" class="index_bg">
					<div class="index_mid">
						<div class="index_logo">
							<img src="images/logo_index.png" width="464" height="137" />
						</div>
						<div class="index_loginbg">
							<div class="login_head">Member Login</div>
							<div class="login_mid">
								<table width="100%" border="0" cellspacing="2" cellpadding="2">

									<tr>
										<td>USER NAME</td>
									</tr>
									<tr>
										<td><form:input path="email" cssClass="txt_box1"  id="username"  maxlength="50"/>
											<form:errors path="email" cssClass="error"></form:errors></td>
									</tr>
									<tr>
										<td>PASSWORD</td>
									</tr>
									<tr>
										<td><form:password path="password" cssClass="txt_box1"  id="pass" maxlength="20" />
											<form:errors path="password" cssClass="error"></form:errors></td>
									</tr>
									<tr>
										<td><table border="0" cellspacing="1" cellpadding="1">
												<tr>
													<td><input type="checkbox"  id="c1" /></td>
													<td style="font-size: 12px; font-weight: normal;">Remember
														me</td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
							</div>
							<div class="login_bottom">
								<table border="0" align="center" cellpadding="2" cellspacing="2">
									<tr>
										<td width="120"><a href="forgotPassword.do">Forgot Password</a>
										</td>
										<td rowspan="2">
										<a href="javascript:void(0);"   id="loginsubmit" onclick="loggedInUser();">
										<img src="images/bt_submit.png"
											width="96" height="34" /></a>
										</td>
									</tr>
									<tr>
										<td><a href="registration.do">New Member</a>
										</td>
									</tr>
								</table>
							</div>
						</div>
					</div></td>
			</tr>
			<tr>
				<td>&nbsp;</td>
			</tr>
		</table>
	</form:form>

</body>
</html>
