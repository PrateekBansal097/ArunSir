package com.emts.dao;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.stereotype.Repository;

import com.emts.model.City;
import com.emts.model.Country;
import com.emts.model.State;
import com.emts.util.IConstant;
@Repository
public class CountryDaoImpl implements CountryDao{
	@Autowired
	private HibernateTemplate hibernateTemplate;
	@SuppressWarnings("unchecked")
	public List<Object> addCountryname(Country country) {
		List<Object> countryContent=null;
		if(country.getCountryId()!=null){
			hibernateTemplate.saveOrUpdate(country);
			return countryContent;
		}else{
			countryContent=hibernateTemplate.find("from Country where COUNTRY_NAME='"+country.getCountryName()+"' AND IS_DELETED="+IConstant.IS_DELETED_ACTIVE);
			if(countryContent.isEmpty()){	
			hibernateTemplate.saveOrUpdate(country);
			}
			return countryContent; 
		}
		
	}
	
	@SuppressWarnings("unchecked")
	public List<Object> getContent() {
		List<Object> countryContent=null;
		countryContent=hibernateTemplate.find("from Country where IS_DELETED="+IConstant.IS_DELETED_ACTIVE);
		return countryContent;
	}
	public void removeContent(Integer Id) {
		Country country=(Country)hibernateTemplate.get(Country.class,Id);
		System.out.println("Contry ID for Deletion " + Id);
		country.setIsDeleted(IConstant.IS_DELETED_DEACTIVE);
		Set<State> stateSet = country.getStateList();
		for(State state :stateSet){
			state.setIsDeleted(IConstant.IS_DELETED_DEACTIVE);
			Set<City> citySet = state.getCityList();
			for(City city :citySet ){
				city.setIsDeleted(IConstant.IS_DELETED_DEACTIVE);
			}
		}
		if(null!=country)
		{
			hibernateTemplate.update(country);
		}
	}
	@SuppressWarnings("unchecked")
	public List<Object> editContent(Integer Id) {
		List<Object> country=null;
		 country=hibernateTemplate.find("from Country c where c.countryId=?",Id);
		return country;
	}
	@SuppressWarnings("unchecked")
	public List<Object> getAllCountryName() {
		List<Object> countryList=null;
		countryList=hibernateTemplate.find("from Country where IS_DELETED="+IConstant.IS_DELETED_ACTIVE);
		return countryList;
	}
	
}