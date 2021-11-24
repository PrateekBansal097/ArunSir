package com.emts.dao;
import java.util.HashMap;
import java.util.List;
public interface PrintReportDao {
	public List<Object> getAllPublication();
	public List<Object> printPDFReport(String fromDate, String toDate,Integer clientId, Integer publicationId);
	public HashMap<String, List<Object>> AllpublicationPieChart(String fromDate, String toDate,Integer clientId,Integer publicationId, String param);
	public HashMap<String, List<Object>> sectorWiseAllPublication(String fromDate, String toDate,Integer clientId, Integer publicationId, String param);
}
