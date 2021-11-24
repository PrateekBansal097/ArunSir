package com.emts.validator;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;
import com.emts.model.Country;
@Component
public class CountryValidator implements Validator{
	public boolean supports(Class<?> clazz) {
		return Country.class.isAssignableFrom(clazz);
	}

	public void validate(Object target, Errors errors) {
		Country country=(Country)target;
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "countryName",
		"error.countryName.empty");
		if(country!=null && country.getCountryName()!=null)
		{
			String countryName=country.getCountryName().trim();
			if(!countryName.matches("[a-zA-Z][a-zA-Z ]+"))
			{
				errors.rejectValue("countryName","error.AlphabetsOnly.empty");
			}
		}
	}
}
