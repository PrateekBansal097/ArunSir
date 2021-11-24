<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>

<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<script type="text/javascript" src="js/jquery-1.9.1.js"></script>
<script type="text/javascript" src="js/jquery-ui.js"></script>
<script type="text/javascript" src="js/jsp-js/city.js"></script>
</head>
<body>
	<form:form method="POST" action="CityAdd.do" modelAttribute="City"
		autocomplete="off">
		<table>
			<tr>
				<td><font size="5"><b>Add City</b></font></td>
			</tr>
			<tr>
				<td><b><h2>${message}</h2></b></td>
			</tr>
		</table>
		<table border="0" cellspacing="1" cellpadding="1" class="form_tbl"
			width="100%">
			<tr>
				<td><b>Country Name</b></td>
				<td><form:select path="state.country.countryId"
						id="countryAjaxId">
						<form:option value="0" label="--Select--" />
						<c:forEach items="${country}" var="refCountry">
							<form:option value="${refCountry.countryId}"
								label="${refCountry.countryName}" />
						</c:forEach>
					</form:select></td>
				<td><b>State Name</b></td>
				<td><form:select path="state.stateId" id="ajaxStateId">
						<form:option value="0" label="--Select--" />
						<c:forEach items="${state}" var="refState">
							<form:option value="${refState.stateId}"
								label="${refState.stateName}" />
						</c:forEach>
					</form:select></td>
			</tr>
			<tr>
				<td></td>
				<td><form:errors path="state.country.countryId"
						cssClass="error"></form:errors></td>
				<td></td>
				<td><form:errors path="state.stateId" cssClass="error"></form:errors></td>
			</tr>
			<tr>
				<td><b>City Name</b></td>
				<%-- <td><form:select path="cityId" id="ajaxCityId">
			<form:option value="0" label="Select"/>
			</form:select>			
		</td> --%>
				<form:hidden path="cityId" />
				<td><form:input path="cityName" maxlength="20" /></td>
			</tr>
			<tr>
				<td></td>
				<td><form:errors path="cityName" cssClass="error"></form:errors></td>
			</tr>
			<tr>
				<td colspan="2"><input type="submit" value="Save" /> <input
					type="button" name="Cancel" value="Cancel"
					onclick="window.location ='cancel.do'" /></td>
			</tr>
		</table>

		<div class="scroll_content1">
			<table border="0" cellspacing="1" cellpadding="1" class="mid_tbl"
				width="100%" id="ajaxCityId">
				<tr>
					<th>S.NO</th>
					<!-- <th>Country Name</th>
	<th>State Name</th> -->
					<th>City Name</th>
					<th>Edit</th>
					<th>Delete</th>
				</tr>
			</table>
		</div>
		
	</form:form>
</body>
</html>


