<%@page import="com.emts.model.Registration"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>header</title>
<link href="css/style.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="css/ddlevelsmenu-base.css" />
<link rel="stylesheet" type="text/css" href="css/ddlevelsmenu-topbar.css" />
<link rel="stylesheet" type="text/css" href="css/ddlevelsmenu-sidebar.css" />
<script type="text/javascript" src="js/ddlevelsmenu.js"></script>
<%
Registration member = (Registration)session.getAttribute("member");
if(member==null)
{
response.sendRedirect("welcome.do");
}
%>
</head>
<body>

<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td valign="top">
    <div class="inner_logo"><img src="images/logo_inner.png" width="458" height="131" /></div>
    <div class="inner_rightmain">
    <table border="0" cellspacing="2" cellpadding="2">
  <tr>
    <td><%-- <c:out value="${userName}"></c:out> --%>Welcome:  <%= member.getFirstName() %> </td>
  </tr>
  <tr>
     <td><a href="cancel.do">Home</a> |
    	 <%
									if (member.getUserTypeId()==1) {
								%>
									
    	 <a href="userRegistration.do">Register User</a>  <%} %> | <a href="logout.do">Logout</a></td>
			 
		  </tr>
</table>
</div>
</td>
  </tr>
  <tr>
   <!--  <td valign="top" class="pagehead">Page Heading</td> -->
   <td valign="top" class="pagehead">
     <table  align="right" >
     <tr>
     <form:form method="POST" action="StoryCode.do" >
     <td valign="top">
     <input type='text' name='storyCode'   style="border:2px solid #F7730E;" placeholder="Enter Story Code" />
       <input type="submit" value='Search' /></td>
     </form:form>
     </tr>
     </table>
  </tr>
  </table>
</body>
</html>