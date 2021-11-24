package com.emts.dao;

import java.util.LinkedList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.stereotype.Repository;

import com.emts.model.AdvertisementTracking;
import com.emts.model.City;
import com.emts.model.PrintTracking;
import com.emts.model.State;
import com.emts.model.Tracking;
import com.emts.util.IConstant;

@Repository
public class CityDaoImpl implements CityDao {
	@Autowired
	private HibernateTemplate hibernateTemplate;

	@SuppressWarnings("unchecked")
	public List<Object> addcityName(City city) {
		List<Object> cityContent = null;
		if(city.getCityId()!=null)
		{
			hibernateTemplate.saveOrUpdate(city);
			return cityContent;
		}else{
			cityContent = hibernateTemplate.find("from City where CITY_NAME='"
					+ city.getCityName() + "' AND IS_DELETED="
					+ IConstant.IS_DELETED_ACTIVE);
			if (cityContent.isEmpty()) {
			hibernateTemplate.saveOrUpdate(city);
			}
			return cityContent;
		}
		
	}

	@SuppressWarnings("unchecked")
	public List<Object> getContent() {
		List<Object> cityContent = null;
		cityContent = hibernateTemplate.find("from City where IS_DELETED="
				+ IConstant.IS_DELETED_ACTIVE);
		return cityContent;
	}

	public void removeContent(Integer Id) {
		City city = (City) hibernateTemplate.get(City.class, Id);
		city.setIsDeleted(IConstant.IS_DELETED_DEACTIVE);
		if (null != city) {
			hibernateTemplate.update(city);
		}
	}

	@SuppressWarnings("unchecked")
	public List<Object> updateCity(Integer Id) {
		List<Object> city = null;
		city = hibernateTemplate.find("from City city where city.cityId=?", Id);
		return city;
	}

	@SuppressWarnings("unchecked")
	public List<Object> getAllCity() {
		List<Object> cityList = null;
		cityList = hibernateTemplate.find("from City  where IS_DELETED="
				+ IConstant.IS_DELETED_ACTIVE);
		return cityList;
	}

	@SuppressWarnings("unchecked")
	public List<Object> getcityByState(Integer stateId) {
		List<Object> cityList = null;
		cityList = hibernateTemplate.find("from City where IS_DELETED="
				+ IConstant.IS_DELETED_ACTIVE + "and state.stateId=" + stateId
				+ " ");
		City city = new City();
		city = (City) cityList.get(0);
		return cityList;
	}

	@SuppressWarnings("unchecked")
	public List<Object> getCityViaState(Integer stateId) {
		List<Object> cityList = null;
		cityList = hibernateTemplate.find("from City where IS_DELETED="
				+ IConstant.IS_DELETED_ACTIVE + "and state.stateId=" + stateId
				+ " ");
		City city = new City();
		city = (City) cityList.get(0);
		return cityList;
		
		
	}

	@SuppressWarnings("unchecked")
	public List<Object> getCurrentCity() {
		List<Object> cityCurrentContent = null;
		cityCurrentContent = hibernateTemplate.find("from City city order by city.cityId desc");
		return cityCurrentContent;
	}

}
