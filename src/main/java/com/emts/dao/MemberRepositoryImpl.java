/**
 * 
 */
package com.emts.dao;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.stereotype.Repository;
/**
 * @author ajay.jirati
 *
 */
@Repository
public class MemberRepositoryImpl implements MemberRepository {
	@Autowired
	private HibernateTemplate hibernateTemplate;
	@SuppressWarnings("unchecked")
	public List<Object> findByEmailAndPassword(String email, String password) {
		List<Object> member = null;
		member=hibernateTemplate.find("from Registration p where p.email = ? and p.password = ? ",email,password);
		return member;
	}
}
