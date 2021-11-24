package com.emts.service;

import java.util.List;

import com.emts.model.City;

public interface CityService {
	public List<Object> addcityName(City city);
	public List<City> getContent();
	public void removeContent(Integer Id);
	public City updateCity(Integer Id);
	public List<City> getAllCity();
	public List<Object> getcityByState(Integer stateId);
	public List<Object> getCityViaState(Integer stateId);
	public City getCurrentCity();
}
 