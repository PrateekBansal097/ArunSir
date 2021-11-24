<%@ page language="java" contentType="text/html; utf-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<script type="text/javascript" src="js/jquery-1.9.1.js"></script>
<script type="text/javascript" src="js/jquery-ui.js"></script>
<link rel="stylesheet" type="text/css" href="css/jquery-ui.css" />
<meta http-equiv="Content-Type" content="text/html; utf-8">
<title><tiles:insertAttribute name="title" ignore="true" /></title>
</head>
<body>

<table width="100%" border="0" cellpadding="0" cellspacing="0" align="left">
     <tr>
        <td colspan="2" align="center">
            <tiles:insertAttribute name="header"/>
        </td>
    </tr>
       <tr>
        <td height="250" width="230" align="left" bgcolor="#FFFFFF">
            <tiles:insertAttribute name="menu" />
        </td>
        <td valign="top" bgcolor="#FFFFFF">
            <tiles:insertAttribute name="body"  />
        </td>
    </tr>
        <tr>
        <td colspan="2"  align="center">
            <tiles:insertAttribute name="footer" />
        </td>
    </tr>
</table>
</body>
</html>