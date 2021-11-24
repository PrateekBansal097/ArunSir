package com.emts.service;

import java.util.HashMap;
import java.util.List;

import com.emts.model.AdvertisementTracking;
import com.emts.model.Party;

public interface AdvReportService {
	public List<Party> getAllParty();
	public List<AdvertisementTracking> advPDFReport(Integer clientId, String fromDate, String toDate,Integer channelId);
	public List<Object> AllChanelPieChart(Integer clientId, String fromDate,String toDate, Integer[] partyId);
	public HashMap<String, List<Object>> chanelWiseAdvPieChart(Integer clientId, String fromDate,
			String toDate, Integer[] partyId);
}
