package com.emts.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.stereotype.Repository;

import com.emts.model.AdvertisementTracking;
import com.emts.util.IConstant;
@Repository
public class AdvTrackingDaoImpl implements AdvTrackingDao{
	@Autowired
	private HibernateTemplate hibernateTemplate;
	public void addAdvTracking(AdvertisementTracking advTracking) {
		hibernateTemplate.saveOrUpdate(advTracking);
	}
	@SuppressWarnings("unchecked")
	public List<Object> getAllParty() {
		List<Object> party=null;
		party=hibernateTemplate.find("from Party where IS_DELETED="+IConstant.IS_DELETED_ACTIVE);
		return party;
	}
	@SuppressWarnings("unchecked")
	public List<Object> getAlladvType() {
		List<Object> advType=null;
		advType=hibernateTemplate.find("from AdvType where IS_DELETED="+IConstant.IS_DELETED_ACTIVE);
		return advType;
	}
	@SuppressWarnings("unchecked")
	public List<Object> getContent(Integer id) {
		List<Object> advTrackingContent=null;
		advTrackingContent = hibernateTemplate
				.find("from AdvertisementTracking adv where adv.isDeleted="
						+ IConstant.IS_DELETED_ACTIVE
						+ "and adv.state.isDeleted="
						+ IConstant.IS_DELETED_ACTIVE
						+ "and adv.client.isDeleted="
						+ IConstant.IS_DELETED_ACTIVE
						+ "and adv.chanel.isDeleted="
						+ IConstant.IS_DELETED_ACTIVE
						+ "and adv.city.isDeleted="
						+ IConstant.IS_DELETED_ACTIVE
						+ "and adv.advType.isDeleted="
						+ IConstant.IS_DELETED_ACTIVE
						+ "and adv.party.isDeleted="
						+ IConstant.IS_DELETED_ACTIVE+
						"and adv.registration.registrationId="+id
						+ "order by adv.advertismentId desc");
		return advTrackingContent;
	}
	public void deleteAdvTracking(Integer Id) {
		AdvertisementTracking advTracking=(AdvertisementTracking)hibernateTemplate.get(AdvertisementTracking.class,Id);
		advTracking.setIsDeleted(IConstant.IS_DELETED_DEACTIVE);
		if(null!=advTracking)
		{
			hibernateTemplate.update(advTracking);
		}
	}
	@SuppressWarnings("unchecked")
	public List<Object> updateAdvTracking(Integer Id) {
		List<Object> advTracking=null;
		advTracking=hibernateTemplate.find("from AdvertisementTracking advTracking where advTracking.advertismentId=?",Id);
		return advTracking;
	}
	public void repeatAdvTracking(AdvertisementTracking advTracking) {
		hibernateTemplate.save(advTracking);
	}
}
