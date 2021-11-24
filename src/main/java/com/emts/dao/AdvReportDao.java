package com.emts.dao;
import java.util.HashMap;
import java.util.List;
public interface AdvReportDao {
	public List<Object> getAllParty();
	public List<Object> advPDFReport(String fromDate, String toDate, Integer channelId,Integer clientId);
	public List<Object> AllChanelPieChart(String fromDate, String toDate,Integer[] partyId, Integer clientId);
	public HashMap<String, List<Object>> chanelWiseAdvPieChart(String fromDate, String toDate,
			Integer[] partyId, Integer clientId);
}
