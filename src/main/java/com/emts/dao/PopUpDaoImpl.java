package com.emts.dao;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.stereotype.Repository;

import com.emts.model.PopUp;
import com.emts.util.IConstant;
@Repository
public class PopUpDaoImpl implements PopUpDao {
	@Autowired
	private HibernateTemplate hibernateTemplate;
	public void addPop(PopUp popUp) {
		hibernateTemplate.save(popUp);
	}
	@SuppressWarnings("unchecked")
	public List<PopUp> getmessage() {
		List<PopUp> popupContent=null;
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		  Date date = new Date();
		   String todayDate=dateFormat.format(date);
		popupContent=hibernateTemplate.find("from PopUp p where p.isDeleted=1 and p.date='"+todayDate.toString()+"' order by p.textArea desc");
		   return popupContent;
	}
	}

