package com.emts.service;

import java.util.HashMap;
import java.util.List;

import com.emts.model.PrintTracking;
import com.emts.model.Publication;

public interface PrintReportService {
	public List<Publication> getAllPublication();
	public List<PrintTracking> printPDFReport(String fromDate, String toDate,Integer clientId, Integer publicationId);
	public HashMap<String, List<Object>> AllpublicationPieChart(Integer clientId, String fromDate,String toDate,Integer publicationId ,String param);
	public HashMap<String, List<Object>> sectorWiseAllPublication(Integer clientId, String fromDate,String toDate, Integer publicationId, String param);
	
}
