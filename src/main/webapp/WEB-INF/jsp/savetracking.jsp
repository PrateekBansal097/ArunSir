<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@page import="com.emts.model.Registration"%>
<%@page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<script type="text/javascript" src="js/jquery-1.9.1.js"></script>
<script type="text/javascript" src="js/jquery-ui.js"></script>
<link rel="stylesheet" type="text/css" href="css/jquery-ui.css" />
<script type="text/javascript" src="js/jquery.timeentry.js"></script>
<script type="text/javascript" src="js/selectLang.js"></script>
<script type="text/javascript" src="js/newHindi.js"></script>
<script type="text/javascript" src="http://www.google.com/jsapi"></script>
<script type="text/javascript" src="js/show_ads.js"></script>
<script type="text/javascript">
<%Registration member = (Registration) session.getAttribute("member");%>
$(function () {
	$('#time').timeEntry();
	
});
google.load("elements", "1", {
    packages: "transliteration"
  });
function onLoad() {
var currValue = document.getElementById("transliterateDiv2"); 
var options =
{
    sourceLanguage:
        google.elements.transliteration.LanguageCode.ENGLISH,
    destinationLanguage:
        [google.elements.transliteration.LanguageCode.HINDI],
    shortcutKey: 'ctrl+g',
    transliterationEnabled: true
};

var control =
    new google.elements.transliteration.TransliterationControl(options);

control.makeTransliteratable(['slug']);
control.makeTransliteratable(['transliterateDiv2']);
}
google.setOnLoadCallback(onLoad);
</script>
<script type="text/javascript">
 function codeAddress() {
   show1();
 }
  window.onload = codeAddress;
 </script>
<script type="text/javascript">
 function hindivalue() 
 {
 	   var _gaq = _gaq || [];
      _gaq.push(['_setAccount', 'UA-12196237-3']);
      _gaq.push(['_trackPageview']);

      (function() {
      var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
      ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
      })();
 }
</script>
<script>
$(function() {
$( "#datepicker" ).datepicker({showOn: 'button', buttonImage: 'images/calender.png', buttonImageOnly: true});
});

function submitOnSave()
{
    var str = document.getElementById("datepicker").value;
    var newdate = str.split("/").reverse().join("-");
     if(str != ""){
			$("#datepicker").val(newdate);
		}
}
</script>
<script type="text/javascript">
$(function() {
		$('#stateAjaxId')
				.change(
						function() {
							$('#ajaxChannelId').text("");
							$('#ajaxCityId').text("");
							$('#ajaxChannelId').append(
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
												$('#ajaxChannelId')
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
							$('#ajaxCityId').append(
									$("<option value='"+0+"'></option>").text(
											"--Select--"));
							var shId = $("#stateAjaxId").val();
							$
									.ajax({

										url : 'cityByStateID.do?stateId='
												+ shId,
										type : 'GET',
										contentType : "application/json; charset=utf-8",
										success : function(response) {
											var cityValues = response.cityListByStateID;
											for (i = 0; i < cityValues.length; i++) {
												$('#ajaxCityId')
														.append(
																$(
																		"<option value='"+cityValues[i].cityId+"'></option>")
																		.text(
																				cityValues[i].cityName));
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
	<form:form method="POST" action="SaveTrackAdd.do"
		modelAttribute="Tracking" name="form1" autocomplete="off">
		<table align="center">
			<tr>
				<td><font size="5"><b>Electronic Media Tracking</b></font></td>
			</tr>
		</table>
		<table width="100%" border="0" cellspacing="1" cellpadding="1"
			class="form_tbl">
			<tr>
				<td>Client Name</td>
				<form:hidden path="isRepeat" />
				<form:hidden path="trackingId" />
				<td><form:select path="client.clientId">
						<form:option value="0" label="--Select--" />
						<c:forEach items="${client}" var="refClient">
							<form:option value="${refClient.clientId}"
								label="${refClient.clientName}" />
						</c:forEach>
					</form:select></td>
				<td>Date</td>
				<td><form:input path="date" id="datepicker" /></td>
			</tr>
			<tr>
				<td></td>
				<td><form:errors path="client.clientId" cssClass="error"></form:errors></td>
				<td></td>
				<td><form:errors path="date" cssClass="error"></form:errors></td>
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
				<td><form:select path="chanel.channelId" id="ajaxChannelId">
						<form:option value="0" label="--Select--" />
						<c:forEach items="${chanel}" var="refChanel">
							<form:option value="${refChanel.channelId}"
								label="${refChanel.channelName}" />
						</c:forEach>
					</form:select></td>
			</tr>
			<tr>
				<td></td>
				<td><form:errors path="state.stateId" cssClass="error"></form:errors></td>
				<td></td>
				<td><form:errors path="chanel.channelId" cssClass="error"></form:errors></td>
			</tr>
			<tr>
				<td>Slug</td>
				<td><form:textarea onkeyup="changeVal()" path="textArea"
						rows="4" cols="30" id="area" /> <form:textarea path="textArea"
						rows="4" cols="30" id="slug" /> <form:textarea path="textArea"
						rows="4" cols="30" id="area2" /> <form:errors path="textArea"
						rows="4" cols="30" cssClass="error"></form:errors></td>
				<td width="25%"><INPUT TYPE=RADIO NAME="X" VALUE="L"
					checked="checked" onclick="show1();">Hinglish <INPUT
					TYPE=RADIO NAME="X" VALUE="H" onclick="show();">Hindi <INPUT
					TYPE=RADIO NAME="X" VALUE="LL" onclick="show2();">English</td>
			</tr>
			<tr>
				<td>News Type</td>
				<td><form:select path="newsType.newTypeId">
						<form:option value="0" label="--Select--" />
						<c:forEach items="${newsType}" var="refnewsType">
							<form:option value="${refnewsType.newTypeId}"
								label="${refnewsType.newsTypeName}" />
						</c:forEach>
					</form:select></td>
				<td>Time</td>
				<td><form:input path="time" id="time" />(HH:MM:SS:AM/PM)</td>
			</tr>
			<tr>
				<td></td>
				<td><form:errors path="newsType.newTypeId" cssClass="error"></form:errors></td>
				<td></td>
				<td><form:errors path="time" cssClass="error"></form:errors></td>
			</tr>
			<tr>
				<td>City</td>
				<td><form:select path="city.cityId" id="ajaxCityId">
						<form:option value="0" label="--Select--" />
						<c:forEach items="${city}" var="refCity">
							<form:option value="${refCity.cityId}"
								label="${refCity.cityName}" />
						</c:forEach>
					</form:select></td>
				<td>Sector</td>
				<td><form:select path="sector.sectorId">
						<form:option value="0" label="--Select--" />
						<c:forEach items="${sector}" var="refSector">
							<form:option value="${refSector.sectorId}"
								label="${refSector.sectorName}" />
						</c:forEach>
					</form:select></td>
			</tr>
			<tr>
				<td></td>
				<td><form:errors path="city.cityId" cssClass="error"></form:errors></td>
				<td></td>
				<td><form:errors path="sector.sectorId" cssClass="error"></form:errors></td>
			</tr>
			<tr>
				<td>News Trend</td>
				<td><form:select path="newsTrend">
						<form:option value="0" label="--Select--" />
						<form:option value="Positive" label="Positive" />
						<form:option value="Negative" label="Negative" />
					</form:select></td>
				<td>Sub Sector</td>
				<td><form:select path="subSector.subSectorId">
						<form:option value="0" label="--Select--" />
						<c:forEach items="${subsector}" var="refSubSector">
							<form:option value="${refSubSector.subSectorId}"
								label="${refSubSector.subSectorName}" />
						</c:forEach>
					</form:select></td>
			</tr>
			<tr>
				<td></td>
				<td><form:errors path="newsTrend" cssClass="error"></form:errors></td>
				<td></td>
				<td><form:errors path="subSector.subSectorId" cssClass="error"></form:errors></td>
			</tr>
			<tr>
				<td colspan="2"><input type="submit" value="Save"
					onclick="return submitOnSave()" /> <input type="button"
					name="Cancel" value="Cancel" onclick="window.location ='cancel.do'" />
				</td>
			</tr>
		</table>
		<div class="scroll_content">
			<table border="0" cellspacing="1" cellpadding="1" class="mid_tbl"
				width="100%">
				<tr>
					<th>S.NO</th>
					<th>Slug</th>
					<th>City</th>
					<th>Time</th>
					<th>News Type</th>
					<th>Sector</th>
					<th>Sub Sector</th>
					<th>News Trend</th>
					<th>Story Code</th>
					<th>Edit</th>
					<th>Repeat</th>
					<%if (member.getUserTypeId() == 1) {%>

					<th>Delete</th>
					<%}%>
				</tr>
				<c:set var="count" value="0" scope="page" />
				<c:forEach items="${trackingContent}" var="content">
				<c:set var="count" value="${count + 1}" scope="page"/>
					<tr>
						<td>${count}</td>
						<td>${content.textArea}</td>
						<td>${content.city.cityName}</td>
						<td>${content.time}</td>
						<td>${content.newsType.newsTypeName}</td>
						<td>${content.sector.sectorName}</td>
						<td>${content.subSector.subSectorName}</td>
						<td>${content.newsTrend}</td>
						<td>${content.storyCode}</td>
						<td><a
							href="SaveTrackAdd.do?trackingId=${content.trackingId}">Edit</a></td>
						<td><a
							href="SaveTrackAdd.do?trackingId=${content.trackingId}&isRepeat=Y">Repeat</a></td>
						<%if (member.getUserTypeId() == 1) {%>
						<td><a href="trackingContent/${content.trackingId}.do"
							onclick="return confirm('Are you sure !!! you want to delete?');">Delete</a></td>
						<%}%>
					</tr>
				</c:forEach>
			</table>
		</div>
	</form:form>
</body>
</html>