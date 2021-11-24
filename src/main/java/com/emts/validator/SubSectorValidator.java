package com.emts.validator;

import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

import com.emts.model.SubSector;
@Component
public class SubSectorValidator implements Validator{
	public boolean supports(Class<?> clazz) {
		return SubSector.class.isAssignableFrom(clazz);
	}

	public void validate(Object target, Errors errors) {
		SubSector subSector=(SubSector)target;
		String subSectorName=subSector.getSubSectorName().trim();
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "subSectorName",
		"error.subSectorName.empty");
		if(!subSectorName.matches("^[0-9a-zA-Z ]+$"))
		{
			errors.rejectValue("subSectorName","error.AlphaNumericOnly.empty");
		}
	}

}
