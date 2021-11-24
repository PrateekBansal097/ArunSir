package com.emts.service;



import java.util.List;

import com.emts.model.User;
import com.emts.model.Registration;


public interface RegistrationService {
	public void addUser(Registration reg);

	public void addUserType(Registration registration);
		
	public List<Registration> getRegisterdUserData() ;
	
	public void deleteRegisterdUser(Integer id) ;

	public List<User> getUserType();
	
		
	/*public List<Registration> getRegistrationID();*/
}
