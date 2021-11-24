package com.emts.validator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

import com.emts.model.Chanel;
import com.emts.service.ChanelService;

@Component
public class ChanelValidator implements Validator {
	@Autowired
	ChanelService chanelservice;
	public boolean supports(Class<?> clazz) {
		return Chanel.class.isAssignableFrom(clazz);
	}

	public void validate(Object target, Errors errors) {
	Chanel chanel=(Chanel)target;
	String channelName=chanel.getChannelName().trim();
	String shortChannelName=chanel.getShortChannelName().trim(); 
		ValidationUtils.rejectIfEmptyOrWhitespace(errors,"channelName","error.channelName.empty");
		ValidationUtils.rejectIfEmptyOrWhitespace(errors,"shortChannelName","error.shortChannelName.empty");
		if(chanel.getState().getStateId()==0)
		{
			errors.rejectValue("state.stateId","error.stateName.select");
		}
		if(!channelName.matches("^[0-9a-zA-Z ]+$"))
		{
			errors.rejectValue("channelName","error.AlphaNumericOnly.empty");
		}
		if(!shortChannelName.matches("^[0-9a-zA-Z ]+$"))
		{
			errors.rejectValue("shortChannelName","error.scn_AlphaNumericOnly.empty");
		}
	}

}
