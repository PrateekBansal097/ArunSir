<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<head>
<script type="text/javascript" src="js/jquery-1.9.1.js"></script>
<script type="text/javascript" src="js/jquery-ui.js"></script>
<script type="text/javascript" src="js/jsp-js/printPDFReport.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

</head>
<body>
<form:form method="POST" action="PrintPDFReport.do"  modelAttribute="PieChart" target="_blank" autocomplete="off" >
	<table>
		<tr>
		<td><font size="5"><b>Print Media PDF Report(Excel Report)</b></font></td>
		</tr>
		</table>
		<table width="100%" border="0" cellspacing="1" cellpadding="1" class="form_tbl" >
		<tr>
		<td><b>Date From</b></td>
		<td>
		<input type="text" id="datepicker" readonly="readonly" maxlength="20"/>
				<form:hidden path="fromDate" id="dateField"/> 
			<form:errors path="fromDate" cssClass="error"></form:errors>
		</td>
		<td><b>To</b></td>
		<td>
		<input type="text" id="datepicker1" readonly="readonly" maxlength="20" />
				<form:hidden path="toDate" id="dateField1"/> 
			<form:errors path="fromDate" cssClass="error"></form:errors>
		</td>
		</tr>
		<tr>
				<td>Client Name</td>
				<td>
				<form:select path="client.clientId">
				<form:option value="0" label="--Select--"/>
						<c:forEach items="${client}" var="refClient">
						<form:option value="${refClient.clientId}" label="${refClient.clientName}" />
						</c:forEach>
				</form:select>
				</td>
              <td>Publication</td>
				<td><form:select path="publication.publicationId">
				<form:option value="0" label="--Select--"/>
						<c:forEach items="${publication}" var="refPublication">
						<form:option value="${refPublication.publicationId}" label="${refPublication.publicationName}" />
						</c:forEach>
					</form:select>	
					</td>
              </tr>
              
		<tr>
		<td colspan="2">
		<input type="submit" value="Generate PDF Report" onclick="return submitOnSave()" />	 
		<input type="button" name="Cancel"	value="Cancel" onclick="window.location ='cancel.do'"/>
		</td>
		</tr>
		</table>
	</form:form>
</body>
</html>
