package com.emts.dao;



import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.stereotype.Repository;

import com.emts.model.Registration;
import com.emts.model.Tracking;
import com.emts.model.User;
import com.emts.util.IConstant;


@Repository
public class RegistrationDaoIml implements RegistrationDao{
	@Autowired
	private HibernateTemplate hibernateTemplate;

	public void addUser(Registration reg) 
	{
		hibernateTemplate.save(reg);
	}

	public void addUserType(Registration registration) {
		hibernateTemplate.save(registration);
	}

	public List<Object> getRegisterdUserData() {
	    	    List<Object> registerdUserData=hibernateTemplate.find("from Registration r where r.isDeleted="+IConstant.IS_DELETED_ACTIVE + "order by r.id  desc");
	    return registerdUserData;
	}

	public void deleteRegisterdUser(Integer id) {
	    Registration registration = (Registration) hibernateTemplate
			.get(Registration.class, id);
	    registration.setIsDeleted(IConstant.IS_DELETED_DEACTIVE);
	if (null != registration) {
		hibernateTemplate.update(registration);
	    
	}
	
	
}

	public List<Object> getUserType() {
	 
	List<Object> userTypeList=hibernateTemplate.find("from User u where u.isDeleted="+IConstant.IS_DELETED_ACTIVE);
	    return userTypeList;
	}
}
