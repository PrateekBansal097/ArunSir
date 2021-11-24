/*function confirmDelete(t){var e='"Are you sure !!! you want to delete?"?';action=confirm(e)?!0:t.preventDefault()}$(function(){$("#countryAjaxId").change(function(){$("#ajaxStateId").text(""),$("#ajaxStateId").append($("<option value='0'></option>").text("--Select--"));var t=$("#countryAjaxId").val();$.ajax({url:"stateByCountryID.do?countryId="+t,type:"GET",contentType:"application/json; charset=utf-8",success:function(t){var e=t.stateListByCountryID;for(i=0;i<e.length;i++)$("#ajaxStateId").append($("<option value='"+e[i].stateId+"'></option>").text(e[i].stateName))},error:function(){}})}),$(function(){$("#ajaxStateId").change(function(){$("#ajaxCityId").text(""),$("#ajaxCityId").append($("<tr><td><b>S.NO</b></td><td><b>City Name</b></td><td><b>Edit</b></td><td><b>Delete</b></td></tr>"));var t=$("#ajaxStateId").val();$.ajax({url:"cityViaStateId.do?stateId="+t,type:"GET",contentType:"application/json; charset=stf-8",success:function(t){var e=t.cityListByStateID,a=1;for(j=0;j<e.length;j++)$("#ajaxCityId").append($("<tr><td>"+a++ +"</td><td>"+e[j].cityName+"</td><td><a href=CityAdd.do?cityId="+e[j].cityId+">Edit</a></td><td><a href=cityContent/"+e[j].cityId+'.do onclick="confirmDelete(event)">Delete</a></td></tr>'))},error:function(){}})})})});*/
function confirmDelete(t) {
	var e = '"Are you sure !!! you want to delete?"?';
	action = confirm(e) ? !0 : t.preventDefault()
}
$(function() {
			$("#countryAjaxId").change(
					
					function() {
						$("#ajaxStateId").text(""), $("#ajaxStateId").append(
								$("<option value='0'></option>").text(
										"--Select--"));
						var t = $("#countryAjaxId").val();
						
						$.ajax({
							url : "stateByCountryID.do?countryId=" + t,
							type : "GET",
							contentType : "application/json; charset=utf-8",
							success : function(t) {
								var e = t.stateListByCountryID;
								for (i = 0; i < e.length; i++)
									$("#ajaxStateId").append(
											$(
													"<option value='"
															+ e[i].stateId
															+ "'></option>")
													.text(e[i].stateName))
							},
							error : function() {
							}
						})
					}),
			$(function() {
				$("#ajaxStateId")
						.change(
								function() {
											$("#ajaxCityId").text(""),
											$("#ajaxCityId")
													.append(
															$("<tr><td><b>S.NO</b></td><td><b>City Name</b></td><td><b>Edit</b></td><td><b>Delete</b></td></tr>"));
									var t = $("#ajaxStateId").val();
									$
											.ajax({
												url : "cityViaStateId.do?stateId="
														+ t,
												type : "GET",
												contentType : "application/json; charset=stf-8",
												success : function(t) {
													var e = t.cityListByStateID, a = 1;
													for (j = 0; j < e.length; j++)
														$("#ajaxCityId")
																.append(
																		$("<tr><td>"
																				+ a++
																				+ "</td><td>"
																				+ e[j].cityName
																				+ "</td><td><a href=CityAdd.do?cityId="
																				+ e[j].cityId
																				+ ">Edit</a></td><td><a href=cityContent/"
																				+ e[j].cityId
																				+ '.do onclick="confirmDelete(event)">Delete</a></td></tr>'))
												},
												error : function() {
												}
											})
								})
			})
});


$(function() {
	$("#ajaxStateId")
			.ready(
					function() {
								$("#ajaxCityId").text(""),
								$("#ajaxCityId")
										.append(
												$("<tr><td><b>S.NO</b></td><td><b>City Name</b></td><td><b>Edit</b></td><td><b>Delete</b></td></tr>"));
						var t = $("#ajaxStateId").val();
						$
								.ajax({
									url : "cityViaStateId.do?stateId="
											+ t,
									type : "GET",
									contentType : "application/json; charset=stf-8",
									success : function(t) {
										var e = t.cityListByStateID, a = 1;
										for (j = 0; j < e.length; j++)
											$("#ajaxCityId")
													.append(
															$("<tr><td>"
																	+ a++
																	+ "</td><td>"
																	+ e[j].cityName
																	+ "</td><td><a href=CityAdd.do?cityId="
																	+ e[j].cityId
																	+ ">Edit</a></td><td><a href=cityContent/"
																	+ e[j].cityId
																	+ '.do onclick="confirmDelete(event)">Delete</a></td></tr>'))
									},
									error : function() {
									}
								})
					})
});