package com.emts.service;



import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.emts.dao.RegistrationDao;

import com.emts.model.Registration;
import com.emts.model.Tracking;
import com.emts.model.User;
import com.emts.util.IConstant;

@Service
public class RegistrationServiceIml implements RegistrationService{
	@Autowired
	private RegistrationDao regdao;

	@Transactional
	public void addUser(Registration reg) 
	{
		reg.setIsDeleted(IConstant.IS_DELETED_ACTIVE);
		reg.setUserTypeId(IConstant.USER_TYPE);
		regdao.addUser(reg);
	}

	public void addUserType(Registration registration) {
		registration.setIsDeleted(IConstant.IS_DELETED_ACTIVE);
		regdao.addUserType(registration);
	}

	public List<Registration> getRegisterdUserData() {
	    List<Registration> registerdUserData=(List)regdao.getRegisterdUserData();
	    return registerdUserData;
	}

	public void deleteRegisterdUser(Integer id) {
	   regdao.deleteRegisterdUser(id);
	    
	}

	public List<User> getUserType() {
	    List<User> userType=(List)regdao.getUserType();
	    return userType;
	}
	
		
}