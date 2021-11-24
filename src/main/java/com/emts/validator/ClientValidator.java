package com.emts.validator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

import com.emts.model.Client;
import com.emts.service.ClientService;
@Component
public class ClientValidator  implements Validator{
	@Autowired
    ClientService clientService;
	public boolean supports(Class<?> clazz) {
		return  Client.class.isAssignableFrom(clazz);
	}
	public void validate(Object target, Errors errors) {
		Client client = (Client)target;
		String clientName=client.getClientName().trim();
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "clientName",
		"error.clientName.empty");
		if(!clientName.matches("[a-zA-Z][a-zA-Z ]+"))
		{
			errors.rejectValue("clientName","error.AlphabetsOnly.empty");
		}
	}

}
