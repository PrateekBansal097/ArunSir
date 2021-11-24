package com.emts.dao;

import java.util.List;

import com.emts.model.AdvertisementTracking;

public interface AdvTrackingDao {
	public void addAdvTracking(AdvertisementTracking advTracking);
	public List<Object> getAllParty();
	public List<Object> getAlladvType();
	public List<Object> getContent(Integer id);
	public void deleteAdvTracking(Integer Id);
	public List<Object> updateAdvTracking(Integer Id);
	public void repeatAdvTracking(AdvertisementTracking advTracking);
}
