package com.emts.validator;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;
import com.emts.model.AdvType;
@Component
public class AdvTypeValidator implements Validator{
	public boolean supports(Class<?> clazz) {
		return AdvType.class.isAssignableFrom(clazz);
	}
	public void validate(Object target, Errors errors) {
		AdvType advType=(AdvType)target;
		String advtypeName=advType.getAdvtypeName().trim();
		ValidationUtils.rejectIfEmptyOrWhitespace(errors,"advtypeName","error.advtypeName.empty");
		if(!advtypeName.matches("^[0-9a-zA-Z ]+$"))
		{
			errors.rejectValue("advtypeName","error.AlphabetsOnly.empty");
		}
	}

}
