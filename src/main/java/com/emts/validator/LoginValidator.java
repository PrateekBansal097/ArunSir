/**
 * -----------------------------------------------------------------------------
 * Company: Janssen Pharmaceuticals, Inc.
 * -----------------------------------------------------------------------------
 *
 * This file contains trade secrets of Janssen Pharmaceuticals, Inc. No part may
 * be reproduced or transmitted in any form by any means or for any purpose
 * without the express written permission of Janssen Pharmaceuticals, Inc.
 *
 * Copyright: (C) 2013
 */
package com.emts.validator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

import com.emts.dao.MemberRepository;
import com.emts.model.Registration;

@Component
public class LoginValidator implements Validator {

	@Autowired
	MemberRepository memberRepository;
	public boolean supports(Class<?> clazz) {
		return Registration.class.isAssignableFrom(clazz);
	}

	public void validate(Object target, Errors errors) {

		Registration member = (Registration) target;

		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "email","error.email.empty");
		ValidationUtils.rejectIfEmptyOrWhitespace(errors,"password", "error.password.empty");

		if(member.getEmail()!=null && member.getEmail().trim().length()>0){

			boolean b=ValidationUtil.validateEmail(member.getEmail());
			if(member.getEmail().contains("@")!=true && !b){
				errors.rejectValue("email","error.email.first.rule");
			}
			else if(member.getEmail().contains(".com")!=true && member.getEmail().contains(".net")!=true && !b){	
				errors.rejectValue("email","error.email.second.rule");
			}
			else if(!b){
				errors.rejectValue("email",
				"error.email.required");
			}
			else if(memberRepository.findByEmailAndPassword(member.getEmail(),member.getPassword())==null)
			{
				errors.rejectValue("email", "error.email.notexist");
			}
			
		}
	}

	/*	public void setUserRepository(MemberRepository memberRepository) {
		this.memberRepository = memberRepository;
	}*/
}
