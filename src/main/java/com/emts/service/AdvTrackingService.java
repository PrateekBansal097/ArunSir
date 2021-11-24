package com.emts.service;

import java.util.List;

import com.emts.model.AdvType;
import com.emts.model.AdvertisementTracking;
import com.emts.model.Party;

public interface AdvTrackingService {
	public void addAdvTracking(AdvertisementTracking advTracking);
	public List<Party> getAllParty();
	public List<AdvType> getAlladvType();
	public List<AdvertisementTracking> getContent(Integer id);
	public void deleteAdvTracking(Integer Id);
	public AdvertisementTracking updateAdvTracking(Integer Id);
	public void repeatAdvTracking(AdvertisementTracking advTracking);
}
