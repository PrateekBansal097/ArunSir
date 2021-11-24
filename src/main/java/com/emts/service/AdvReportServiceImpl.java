package com.emts.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.emts.dao.AdvReportDao;
import com.emts.model.AdvertisementTracking;
import com.emts.model.Party;

@Service
public class AdvReportServiceImpl implements AdvReportService{
@Autowired
private AdvReportDao advReportDao;
@SuppressWarnings({ "unchecked", "rawtypes" })
public List<Party> getAllParty() {
	List<Party> party=new ArrayList<Party>();
	party=(List)advReportDao.getAllParty();
	return party;
}
@SuppressWarnings({ "unchecked", "rawtypes" })
public List<AdvertisementTracking> advPDFReport(Integer clientId, String fromDate, String toDate,Integer channelId) {
	List<AdvertisementTracking> advertisementTracking=new ArrayList<AdvertisementTracking>();
	advertisementTracking=(List)advReportDao.advPDFReport( fromDate,  toDate, channelId,clientId);
	return advertisementTracking;
}
public List<Object> AllChanelPieChart(Integer clientId, String fromDate, String toDate,
		Integer[] partyId) {
	List<Object> list =advReportDao.AllChanelPieChart( fromDate,  toDate, partyId,clientId);
	return list;
}
public HashMap<String, List<Object>> chanelWiseAdvPieChart(Integer clientId, String fromDate,
		String toDate, Integer[] partyId) {
	return advReportDao.chanelWiseAdvPieChart( fromDate,  toDate, partyId,clientId); 
}

}
