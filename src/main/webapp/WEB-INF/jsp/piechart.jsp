<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<head>
<script type="text/javascript" src="js/jquery-1.9.1.js"></script>
<script type="text/javascript" src="js/jquery-ui.js"></script>
<script type="text/javascript" src="js/jsp-js/pieChart.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<script>
function submitOnSave()
{
    var str = document.getElementById("datepicker").value;
    var str1 = document.getElementById("datepicker1").value;
    var client=document.getElementById("client").value;
    <%if(request.getParameter("param").equals("Channel")||request.getParameter("param").equals("ChannelSector")) {%>
    var channel=document.getElementById("channel").value;
    <%}%>
    var newdate = str.split("/").reverse().join("-");
    var newdate11 = str1.split("/").reverse().join("-");
	 if(str != ""){
			$("#datepicker").val(newdate);
		}
     if(str1 != ""){
		 	$("#datepicker1").val(newdate11); 
		}
     if(str.length<1)
		{
		   alert("Please Enter From Date");
		   return false;
		}
     if(str1.length<1)
		{
		   alert("Please Enter To Date");
		   return false;
		}
     if(client==0)
     {
     alert("Please Select Client Name");
     return false;
     }
     <%if(request.getParameter("param").equals("Channel")||request.getParameter("param").equals("ChannelSector")) {%>
     if(channel==0)
     {
     alert("Please Select Channel Name");
     return false;
     }
     <%}%>
}
</script>
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
	<form:form method="POST" action="PieChartReport.do?param=${param}"
		modelAttribute="PieChart" name="piechart" autocomplete="off" target="_blank">
		<table>
			<tr>
				<td><font size="5"><b> <%if((request.getParameter("param")).equals("AllChannel")){%>
							All Channel Negative Positive Report <%}%> <%if((request.getParameter("param")).equals("Channel")){%>
							Individual Channel Wise Negative Positive Report <%}%> <%if((request.getParameter("param")).equals("Sector")){%>

							Sector wise All Channel Negative Positive Report <%}%> <%if((request.getParameter("param")).equals("ChannelSector")){%>
							Sector Wise Negative Positive Report Based On Channel <%}%> <%if((request.getParameter("param")).equals("AllChannelNegativePositive")){%>
							Channel Wise Negative Positive Report <%}%>
					</b></font></td>
			</tr>
		</table>
		<table width="100%" border="0" cellspacing="1" cellpadding="1"
			class="form_tbl">
			<tr>

				<td><b>Date From</b></td>
				<td><form:input path="fromDate" id="datepicker" maxlength="12"
						readonly="readonly" /></td>
				<td><b>To</b></td>
				<td><form:input path="toDate" id="datepicker1" maxlength="12"
						readonly="readonly" /> <%-- <input type="text" id="datepicker1" />
				<form:hidden path="toDate" id="dateField1"/>  --%></td>
			</tr>
			<tr>
				<td></td>
				<td><form:errors path="fromDate" cssClass="error"></form:errors></td>
				<td></td>
				<td><form:errors path="fromDate" cssClass="error"></form:errors></td>
			</tr>
			<tr>
				<td>Client Name</td>
				<td><form:select path="client.clientId" id="client">
						<form:option value="0" label="--Select--" />
						<c:forEach items="${client}" var="refClient">
							<form:option value="${refClient.clientId}"
								label="${refClient.clientName}" />
						</c:forEach>
					</form:select></td>
					</tr>
					<tr>
				<%if(request.getParameter("param").equals("Channel")||request.getParameter("param").equals("ChannelSector")) {%>
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
			<%} %>
			<tr>
				<td></td>
				<td><form:errors path="client.clientId" cssClass="error"></form:errors></td>
				<td></td>
				<td><form:errors path="chanel.channelId" cssClass="error"></form:errors></td>
			</tr>
			<tr>
				<td colspan="2"><input type="submit" value="Generate Pie Chart"
					onclick="return submitOnSave()" /> <input type="button"
					name="Cancel" value="Cancel" onclick="window.location ='cancel.do'" />
				</td>
			</tr>
		</table>
	</form:form>
</body>
</html>
