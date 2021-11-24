package com.emts.service;

import java.util.List;

public interface ForgotService {
	@SuppressWarnings("rawtypes")
	public List getPassword(String email);
	public void sendMail(final String pass,final String email);
}
