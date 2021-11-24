<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<head>
<script type="text/javascript" src="js/jquery-1.9.1.js"></script>
<script type="text/javascript" src="js/jquery-ui.js"></script>
<script type="text/javascript" src="js/jsp-js/advPDFReport.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<script type="text/javascript">
$(function() {
		$('#stateAjaxId')
				.change(
						function() {
							$('#channel').text("");
							$('#channel').append(
									$("<option value='"+0+"'></option>").text(
											"--Select--"));
							var shId = $("#stateAjaxId").val();

							$
									.ajax({
										url : 'channelByStateID.do?stateId='
												+ shId,
										type : 'GET',
										contentType : "application/json; charset=utf-8",
										success : function(response) {
											var channelValues = response.channelListByStateID;
											for (i = 0; i < channelValues.length; i++) {
												$('#channel')
														.append(
																$(
																		"<option value='"+channelValues[i].channelId+"'></option>")
																		.text(
																				channelValues[i].channelName));
											}
										},
										error : function(error) {

										}
									});
						});
	});
</script>
</head>
<body>
	<form:form method="POST" action="ADVPDFReport.do"
		modelAttribute="PieChart" target="_blank"><!-- i am only change in this jsp for openning new tab, this tag is target="_blank" only  -->
		<table>
			<tr>
				<td><font size="5"><b>Advertisement PDF Report</b></font></td>
			</tr>
		</table>
		<table width="100%" border="0" cellspacing="1" cellpadding="1"
			class="form_tbl">
			<tr>

				<td><b>Date From</b></td>
				<td><input type="text" id="datepicker" readonly="readonly" /> <form:hidden
						path="fromDate" id="dateField" /></td>
				<td><b>To</b></td>
				<td><input type="text" id="datepicker1" readonly="readonly" />
					<form:hidden path="toDate" id="dateField1" /></td>
			</tr>
			<tr>
				<td></td>
				<td><form:errors path="fromDate" cssClass="error"></form:errors></td>
				<td></td>
				<td><form:errors path="fromDate" cssClass="error"></form:errors></td>
			</tr>
			<tr>
				<td>Client Name</td>
				<td><form:select path="client.clientId">
						<form:option value="0" label="--Select--" />
						<c:forEach items="${client}" var="refClient">
							<form:option value="${refClient.clientId}"
								label="${refClient.clientName}" />
						</c:forEach>
					</form:select></td>
				</tr>
					<tr>
					<td>State</td>
				<td><form:select path="state.stateId" id="stateAjaxId">
						<form:option value="0" label="--Select--" />
						<c:forEach items="${state}" var="refState">
							<form:option value="${refState.stateId}"
								label="${refState.stateName}" />
						</c:forEach>
					</form:select></td>
				<td>Channel</td>
				<td><form:select path="chanel.channelId" id="channel">
						<form:option value="0" label="--Select--" />
						<c:forEach items="${chanel}" var="refChanel">
							<form:option value="${refChanel.channelId}"
								label="${refChanel.channelName}" />
						</c:forEach>
					</form:select></td>
			</tr>
			<tr>
				<td></td>
				<td><form:errors path="client.clientId" cssClass="error"></form:errors></td>
				<td></td>
				<td><form:errors path="chanel.channelId" cssClass="error"></form:errors></td>
			</tr>
			<tr>
				<td colspan="2"><input type="submit"
					value="Generate PDF Report" onclick="return submitOnSave()" /> <input
					type="button" name="Cancel" value="Cancel"
					onclick="window.location ='cancel.do'" /></td>
			</tr>
		</table>
	</form:form>
</body>
</html>
