package com.emts.service;

import java.util.List;

import com.emts.model.NewsType;
import com.emts.model.Tracking;

public interface SaveTrackService {
	public void addSaveTracking(Tracking saveTracking);
	public List<NewsType> getAllNewsType();
	public List<Tracking> getContent(Integer id);
	public void deleteTracking(Integer Id);
	public Tracking updateTracking(Integer Id);
}
