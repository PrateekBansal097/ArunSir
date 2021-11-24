package com.emts.dao;


import java.util.List;

import com.emts.model.Registration;
import com.emts.model.Tracking;
import com.emts.model.User;
public interface RegistrationDao {
	public void addUser(Registration reg);
	public void addUserType(Registration registration); 
	public List<Object> getRegisterdUserData() ;
	public void deleteRegisterdUser(Integer id) ;
	public List<Object> getUserType();
}
