package com.emts.validator;

import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

import com.emts.model.Sector;
@Component
public class SectorValidator implements Validator{
	public boolean supports(Class<?> clazz) {
		return Sector.class.isAssignableFrom(clazz);
	}

	public void validate(Object target, Errors errors) {
		Sector sector=(Sector)target;
		String sectorName=sector.getSectorName().trim();
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "sectorName",
		"error.sectorName.empty");
		if(!sectorName.matches("^[0-9a-zA-Z ]+$"))
		{
			errors.rejectValue("sectorName","error.AlphaNumericOnly.empty");
		}
	}

}
