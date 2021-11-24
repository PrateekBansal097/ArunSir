package com.emts.dao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.stereotype.Repository;
import com.emts.model.Message;
@Repository
public class MessageDaoImpl implements MessageDao {
	@Autowired
	private HibernateTemplate hibernateTemplate;
	public void addPop(Message message) {
		hibernateTemplate.save(message);
	}
}
