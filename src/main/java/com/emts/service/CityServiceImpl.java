package com.emts.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.emts.dao.CityDao;
import com.emts.model.City;
import com.emts.model.Registration;
import com.emts.util.IConstant;

@Service
public class CityServiceImpl implements CityService {
	@Autowired
	private CityDao citydao;

	@Transactional
	public List<Object> addcityName(City city) {
		List<Object> content = null;
		city.setIsDeleted(IConstant.IS_DELETED_ACTIVE);
		content = citydao.addcityName(city);
		return content;
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public List<City> getContent() {
		List<City> cityContent = new ArrayList<City>();
		cityContent = (List) citydao.getContent();
		return cityContent;
	}

	public void removeContent(Integer Id) {
		citydao.removeContent(Id);

	}

	public City updateCity(Integer Id) {
		List<Object> city = new ArrayList<Object>();
		City updateCity = new City();
		city = citydao.updateCity(Id);
		/* List convert to object */
		for (Object object : city) {
			updateCity = (City) object;
		}
		return updateCity;
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public List<City> getAllCity() {
		List<City> cityList = new ArrayList<City>();
		cityList = (List) citydao.getAllCity();
		return cityList;
	}

	public List<Object> getcityByState(Integer stateId) {
		List<Object> cityList = new ArrayList<Object>();
		cityList = citydao.getcityByState(stateId);
		return cityList;
	}
	public List<Object> getCityViaState(Integer stateId) {
		List<Object> cityList=new ArrayList<Object>();
		cityList=citydao.getCityViaState(stateId);
		return cityList;
	}

	public City getCurrentCity() {
		City city=null;
		List<Object> cityList=null;
		cityList = citydao.getCurrentCity();
		if(cityList.size()==0)
		{
			city=null;	
		}
		else
		{
			city=(City)cityList.get(0);
		}
		return city;
	}
}
