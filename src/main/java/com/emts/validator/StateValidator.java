package com.emts.validator;

import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

import com.emts.model.State;
@Component
public class StateValidator implements Validator{
	public boolean supports(Class<?> clazz) {
		return State.class.isAssignableFrom(clazz);
	}

	public void validate(Object target, Errors errors) {
		State state=(State)target;
		String stateName=state.getStateName().trim();
		ValidationUtils.rejectIfEmptyOrWhitespace(errors,"stateName","error.stateName.empty");
		if(state.getCountry().getCountryId()==0)
		{
			errors.rejectValue("country.countryId","error.countryName.select");
			
		}
		if(!stateName.matches("[a-zA-Z][a-zA-Z ]+"))
		{
			errors.rejectValue("stateName","error.AlphabetsOnly.empty");
		}
	}

}
