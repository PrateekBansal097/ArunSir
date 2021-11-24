package com.emts.dao;

import java.util.List;

import javassist.runtime.Desc;

import javax.mail.Session;

import org.hibernate.criterion.DetachedCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.stereotype.Repository;

import com.emts.model.Chanel;
import com.emts.model.Registration;
import com.emts.model.Tracking;
import com.emts.util.DateFormat;
import com.emts.util.IConstant;

@SuppressWarnings("all")
@Repository
public class SaveTrackDaoImpl implements SaveTrackDao {
	@Autowired
	private HibernateTemplate hibernateTemplate;

	public void addSaveTracking(Tracking saveTracking) {
		Chanel chanel1 = (Chanel) hibernateTemplate.get(Chanel.class,
				saveTracking.getChanel().getChannelId());
		saveTracking.setChanel(chanel1);
		
		
		/*
		 * String storyCode=""; StringTokenizer st = new
		 * StringTokenizer(saveTracking.getDate(),"-");
		 * while(st.hasMoreTokens()) { storyCode=storyCode+st.nextToken(); }
		 */

		if (saveTracking.getTrackingId() == null) {
			List<Integer> results = hibernateTemplate
					.find("select max(a.trackingId) from Tracking a");
			int id;
			if (results.get(0) == null) {
				id = 1;
			} else {
				id = results.get(0) + 1;
			}

			saveTracking.setStoryCode(saveTracking.getChanel()
					.getShortChannelName()
					+ "-"
					+ DateFormat.generateStoryCode(saveTracking.getDate())
					+ "-" + id);
		} else {
			saveTracking.setStoryCode(saveTracking.getChanel()
					.getShortChannelName()
					+ "-"
					+ DateFormat.generateStoryCode(saveTracking.getDate())
					+ "-" + saveTracking.getTrackingId());
		}
		if (saveTracking.getNewsTrend().equals("POSITIVE")
				|| saveTracking.getNewsTrend().equals("Positive")) {
			int value = saveTracking.getNewsType().getNewTypeId();
			int valuetest = value * 1;
			saveTracking.setMarking(valuetest);
		} else {
			int value = saveTracking.getNewsType().getNewTypeId();
			int valuetest = value * -1;
			saveTracking.setMarking(valuetest);
		}
		hibernateTemplate.saveOrUpdate(saveTracking);
	}

	public List<Object> getAllNewsType() {
		List<Object> newsType = null;
		newsType = hibernateTemplate.find("from NewsType where IS_DELETED="
				+ IConstant.IS_DELETED_ACTIVE);
		return newsType;
	}

	public List<Object> getContent(Integer id) {
		List<Object> trackingContent = null;
//		"and t.state.isDeleted="+IConstant.IS_DELETED_ACTIVE +"																								
		trackingContent = hibernateTemplate
				.find("from Tracking t where t.isDeleted="
						+ IConstant.IS_DELETED_ACTIVE
						+ "and t.state.isDeleted="
						+ IConstant.IS_DELETED_ACTIVE
						+ "and t.chanel.isDeleted="
						+ IConstant.IS_DELETED_ACTIVE 
						+ "and t.city.isDeleted="
						+ IConstant.IS_DELETED_ACTIVE
						+ "and t.subSector.isDeleted="
						+ IConstant.IS_DELETED_ACTIVE
						+ "and t.sector.isDeleted="
						+ IConstant.IS_DELETED_ACTIVE
						+ "and t.client.isDeleted="
						+ IConstant.IS_DELETED_ACTIVE+
						"and t.registration.registrationId="+id
						+ "order by t.trackingId desc");
		return trackingContent;
	}

	public void deleteTracking(Integer Id) {
		Tracking tracking = (Tracking) hibernateTemplate
				.get(Tracking.class, Id);
		tracking.setIsDeleted(IConstant.IS_DELETED_DEACTIVE);
		if (null != tracking) {
			hibernateTemplate.update(tracking);
		}

	}

	public List<Object> updateTracking(Integer Id) {
		List<Object> tracking = null;
		tracking = hibernateTemplate.find(
				"from Tracking tracking where tracking.trackingId=?", Id);
		return tracking;
	}
}
