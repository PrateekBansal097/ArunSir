package com.emts.dao;
import java.util.List;
import com.emts.model.Country;
public interface CountryDao {
	public List<Object> addCountryname(Country country);
	public List<Object> getContent();
	public void removeContent(Integer Id);
	public List<Object> editContent(Integer Id);
	public List<Object> getAllCountryName();
}
