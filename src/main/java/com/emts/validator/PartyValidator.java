package com.emts.validator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

import com.emts.model.Party;
import com.emts.service.PartyService;
@Component
public class PartyValidator implements Validator{
    @Autowired
    PartyService partyService;
	public boolean supports(Class<?> clazz) {
		return Party.class.isAssignableFrom(clazz);
	}
	public void validate(Object target, Errors errors) {
		Party party = (Party) target;
		String partyName=party.getPartyName().trim();
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "partyName",
		"error.partyName.empty");
		if(!partyName.matches("[a-zA-Z][a-zA-Z ]+"))
		{
			errors.rejectValue("partyName","error.AlphabetsOnly.empty");
		}
	}
}
