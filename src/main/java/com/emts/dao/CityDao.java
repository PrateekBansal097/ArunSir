package com.emts.dao;
import java.util.List;
import com.emts.model.City;
public interface CityDao {
	public List<Object> addcityName(City city);
	public List<Object> getContent();
	public void removeContent(Integer Id);
	public List<Object> updateCity(Integer Id);
	public List<Object> getAllCity();
	public List<Object> getcityByState(Integer stateId);
	public List<Object> getCityViaState(Integer stateId);
	public List<Object> getCurrentCity();
}
