package com.emts.validator;

import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

import com.emts.model.PieChart;

@Component
public class PieChartValidator implements Validator{

	public boolean supports(Class<?> clazz) {
		return PieChart.class.isAssignableFrom(clazz);
	}

	public void validate(Object target, Errors errors) {
		PieChart pieChart=(PieChart)target;
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "fromDate",
		"error.fromDate.empty");
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "toDate",
		"error.toDate.empty");
		if(pieChart.getClient().getClientId()==0)
		{
			errors.rejectValue("client.clientId","error.clientName.select");
		}
		if(pieChart.getChanel().getChannelId()==0)
		{
			errors.rejectValue("chanel.channelId","error.channelName.select");
		}
	}

}
