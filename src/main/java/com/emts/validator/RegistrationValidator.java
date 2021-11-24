package com.emts.validator;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

import com.emts.model.Registration;
@Component
public class RegistrationValidator implements Validator{
	public boolean supports(Class<?> clazz) {
		return Registration.class.isAssignableFrom(clazz);
	}

	public void validate(Object target, Errors errors) {
		Registration registration=(Registration)target;
		String firstName=registration.getFirstName().trim();
		String lastName=registration.getLastName().trim();
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "firstName","error.firstName.empty");
		ValidationUtils.rejectIfEmptyOrWhitespace(errors,"lastName", "error.lastName.empty");
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "email","error.email.empty");
		ValidationUtils.rejectIfEmptyOrWhitespace(errors,"address", "error.address.empty");
		ValidationUtils.rejectIfEmptyOrWhitespace(errors,"password", "error.password.empty");
		ValidationUtils.rejectIfEmptyOrWhitespace(errors,"moblieNo", "error.moblieNo.empty");
		ValidationUtils.rejectIfEmptyOrWhitespace(errors,"userTypeId", "error.userTypeId.empty");
		if(registration.getEmail()!=null && registration.getEmail().trim().length()>0){

			boolean b=ValidationUtil.validateEmail(registration.getEmail());
			if(registration.getEmail().contains("@")!=true && !b){
				errors.rejectValue("email","error.email.first.rule");
			}
			else if(registration.getEmail().contains(".com")!=true && registration.getEmail().contains(".net")!=true && !b){	
				errors.rejectValue("email","error.email.second.rule");
			}
			else if(!b){
				errors.rejectValue("email",
				"error.email.required");
			}	
		}
		if(!firstName.matches("^[a-zA-Z]+$"))
		{
			errors.rejectValue("firstName","error.AlphabetsOnly.empty");
		}
		if(!lastName.matches("^[a-zA-Z]+$"))
		{
			errors.rejectValue("lastName","error.AlphabetsOnly.empty");
		}
		if (registration.getUserTypeId()==0){
			errors.rejectValue("userTypeId","error.userTypeId.empty");
		}
	}
}
