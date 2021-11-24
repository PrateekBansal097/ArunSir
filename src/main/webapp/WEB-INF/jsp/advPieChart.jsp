<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<head>
<script type="text/javascript" src="js/jquery-1.9.1.js"></script>
<script type="text/javascript" src="js/jquery-ui.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<script type="text/javascript" src="js/selectAll.js"></script>
<script>
$(function() {
$( "#datepicker,#datepicker1").datepicker({showOn: 'button', buttonImage: 'images/calender.png', buttonImageOnly: true});
});
function submitOnSave()
{
    var str = document.getElementById("datepicker").value;
    var str1 = document.getElementById("datepicker1").value;
    var client=document.getElementById("client").value;
    var newdate = str.split("/").reverse().join("-");
    var newdate11 = str1.split("/").reverse().join("-");
	 if(str != ""){
			$("#dateField").val(newdate);
		}
     if(str1 != ""){
		 	$("#dateField1").val(newdate11); 
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
}
</script>
</head>
<body>
<form:form method="POST" action="ADVPieChartReport.do?param=${param}"  modelAttribute="PieChart" target="_blank">
	<table>
		<tr>
		<td><font size="5"><b>Advertisement Pie Chart</b></font></td>
		</tr>
		</table>
		<table width="100%" border="0" cellspacing="1" cellpadding="1" class="form_tbl" >
		<tr>
		<td><b>Date From</b></td>
		<td>
		<input type="text" id="datepicker" readonly="readonly" />
				<form:hidden path="fromDate" id="dateField"/> 
			<form:errors path="fromDate" cssClass="error"></form:errors>
			
		</td>
		<td><b>To</b></td>
		<td>
		<input type="text" id="datepicker1" readonly="readonly"/>
				<form:hidden path="toDate" id="dateField1"/> 
			<form:errors path="toDate" cssClass="error"></form:errors>
		</td>
		</tr>
		<tr>
				<td>Client Name</td>
				<td>
				<form:select path="client.clientId" id="client" >
				<form:option value="0" label="--Select--"/>
						<c:forEach items="${client}" var="refClient">
						<form:option value="${refClient.clientId}" label="${refClient.clientName}" />
						</c:forEach>
				</form:select>
				</td>
              </tr>
              <tr>
              <td>Party</td>
              <td>
              <input type="checkbox" id="selectall" maxlength="20"/> All</td></tr><tr><td></td><td>
              <c:forEach items="${party}" var="party" >
           	  <form:checkbox path="partyId" class="case" label="${party.partyName}" value="${party.partyId}"  />
           	  </c:forEach>
              </td>
              </tr>
		<tr>
		<td colspan="2">
		<input type="submit" value="Generate Pie Chart" onclick="return submitOnSave()" />	 
		<input type="button" name="Cancel"	value="Cancel" onclick="window.location ='cancel.do'"/>
		</td>
		</tr>
		</table>
	</form:form>
</body>
</html>
