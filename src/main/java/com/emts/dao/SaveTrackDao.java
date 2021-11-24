package com.emts.dao;

import java.util.List;

import com.emts.model.Tracking;

public interface SaveTrackDao {
	public void addSaveTracking(Tracking saveTracking);
	public List<Object> getAllNewsType();
	public List<Object> getContent(Integer id);
	public void deleteTracking(Integer Id);
	public List<Object> updateTracking(Integer Id);
}
