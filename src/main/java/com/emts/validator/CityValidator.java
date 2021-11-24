package com.emts.validator;

import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

import com.emts.model.City;
@Component
public class CityValidator implements Validator{
	public boolean supports(Class<?> clazz) {
		return City.class.isAssignableFrom(clazz);
	}

	public void validate(Object target, Errors errors) {
		City city=(City)target;
		String cityName=city.getCityName().trim();
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "cityName",
		"error.cityName.empty");
		if(city.getState().getCountry().getCountryId()==0)
		{
			errors.rejectValue("state.country.countryId","error.countryName.select");
			
		}
		if(city.getState().getStateId()==0)
		{
			errors.rejectValue("state.stateId","error.stateName.select");
		}
		if(!cityName.matches("[a-zA-Z][a-zA-Z ]+"))
		{
			errors.rejectValue("cityName","error.AlphabetsOnly.empty");
		}
	}

}
