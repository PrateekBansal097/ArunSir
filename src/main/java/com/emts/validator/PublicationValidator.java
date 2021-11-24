package com.emts.validator;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;
import com.emts.model.Publication;
@Component
public class PublicationValidator implements Validator {
	public boolean supports(Class<?> clazz) {
		return Publication.class.isAssignableFrom(clazz);
	}

	public void validate(Object target, Errors errors) {
		Publication publication = (Publication)target;
		String publicationName=publication.getPublicationName().trim();
		String shortPublicationName=publication.getShortPublicationName().trim();
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "publicationName",
		"error.publicationName.empty");
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "shortPublicationName",
		"error.shortPublicationName.empty");
		if(publication.getState().getStateId()==0)
		{
			errors.rejectValue("state.stateId","error.stateName.select");
		}
		if(!publicationName.matches("[a-zA-Z][a-zA-Z ]+"))
		{
			errors.rejectValue("publicationName","error.AlphabetsOnly.empty");
		}
		if(!shortPublicationName.matches("[a-zA-Z][a-zA-Z ]+")){
			errors.rejectValue("shortPublicationName","error.spn_AlphabetsOnly.empty");
			
		}
	}
}
