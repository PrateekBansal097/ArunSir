package com.emts.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.emts.dao.PrintReportDao;
import com.emts.model.PrintTracking;
import com.emts.model.Publication;

@Service
public class PrintReportServiceImpl implements PrintReportService{
@Autowired PrintReportDao printReportDao;
@SuppressWarnings({ "unchecked", "rawtypes" })
public List<Publication> getAllPublication() {
    List<Publication> publication = new ArrayList<Publication>();
    publication = (List)printReportDao.getAllPublication();
	return publication;
}

@SuppressWarnings({ "unchecked", "rawtypes" })
public List<PrintTracking> printPDFReport(String fromDate, String toDate,
		Integer clientId, Integer publicationId) {
	List<PrintTracking> printTracking=new ArrayList<PrintTracking>();
	printTracking=(List)printReportDao.printPDFReport(fromDate,toDate,clientId,publicationId);
	return printTracking;
}

public HashMap<String, List<Object>> AllpublicationPieChart(Integer clientId, String fromDate,
		String toDate, Integer publicationId ,String param) {
	
	HashMap<String, List<Object>> map=printReportDao.AllpublicationPieChart(fromDate,toDate,clientId,publicationId,param);
	HashMap<String, List<Object>> publicationMap =new HashMap<String, List<Object>>();
	 @SuppressWarnings("rawtypes")
	Set set = map.keySet();
	 @SuppressWarnings("rawtypes")
	Iterator iterator = set.iterator();
	 
	 while(iterator.hasNext())
	 {
		 List<Object> publicationPositiveList=   (List<Object>) map.get(iterator.next());
		 List<Object> publicationNegitiveList=   (List<Object>) map.get(iterator.next());
		 List<Object> publicationList=   (List<Object>) map.get(iterator.next());
		 publicationMap.put("publicationPositiveList", publicationPositiveList);
		 publicationMap.put("publicationNegitiveList", publicationNegitiveList); 
		 publicationMap.put("publicationList", publicationList); 
		   
	 }
	 return publicationMap;
}

public HashMap<String, List<Object>> sectorWiseAllPublication(Integer clientId, String fromDate,
		String toDate, Integer publicationId, String param) {
	HashMap<String, List<Object>> map=printReportDao.sectorWiseAllPublication(fromDate,toDate,clientId,publicationId,param);
	HashMap<String, List<Object>> sectorMap =new HashMap<String, List<Object>>();
	 @SuppressWarnings("rawtypes")
	Set set = map.keySet();
	 @SuppressWarnings("rawtypes")
	Iterator iterator = set.iterator();
	 
	 while(iterator.hasNext())
	 {
		 List<Object> sectorPositiveList=   (List<Object>) map.get(iterator.next());
		 List<Object> sectorNegitiveList=   (List<Object>) map.get(iterator.next());
		 List<Object> publicationList=   (List<Object>) map.get(iterator.next());
		 sectorMap.put("sectorPositiveList", sectorPositiveList);
		 sectorMap.put("sectorNegitiveList", sectorNegitiveList); 
		 sectorMap.put("publicationList", publicationList); 
		   
	 }
	 return sectorMap;
}
}
