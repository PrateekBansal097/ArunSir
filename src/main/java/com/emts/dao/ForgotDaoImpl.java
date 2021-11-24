package com.emts.dao;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.stereotype.Repository;
import com.emts.util.IConstant;
@Repository
public class ForgotDaoImpl implements ForgotDao{
@Autowired
private HibernateTemplate hibernateTemplate;
@SuppressWarnings("rawtypes")
public List getPassword(String email) {
	List password=null;
	password=hibernateTemplate.find("select password from Registration  where IS_DELETED="+IConstant.IS_DELETED_ACTIVE+"and email=?",email);
	System.out.println("Forgot Password Dao---"+password);
	return password;
}
}
