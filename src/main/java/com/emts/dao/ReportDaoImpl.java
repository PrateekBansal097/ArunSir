package com.emts.dao;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections.functors.AndPredicate;
import org.apache.taglibs.standard.lang.jstl.AndOperator;
import org.hibernate.HibernateException;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.stereotype.Repository;

import com.emts.model.AdvertisementTracking;
import com.emts.model.Chanel;
import com.emts.model.Client;
import com.emts.model.PrintTracking;
import com.emts.model.Publication;
import com.emts.model.Sector;
import com.emts.model.Tracking;
import com.emts.util.IConstant;
@Repository
public class ReportDaoImpl implements ReportDao{
	@Autowired
	private HibernateTemplate hibernateTemplate;
	@SuppressWarnings("unchecked")
		public HashMap<String, Object[]> pieChartReport(Integer clientId, String fromDate, String toDate, Integer channelId, String param) {
			List<Object> positiveList=null;
			List<Object> negitiveList=null;
			List<Object> channelList=null;
			
			if(channelId!=null)
			{
			if(param!=null && param.equals("{param=Channel}"))
			{
				positiveList = hibernateTemplate.find("select count(t.newsTrend) ,sum(t.marking) from Tracking t WHERE t.isDeleted="+IConstant.IS_DELETED_ACTIVE+" AND t.newsTrend LIKE 'Positive%' AND t.client.clientId="+clientId+" AND t.date BETWEEN '"
						+ fromDate + "' AND '" + toDate + "' and t.chanel.channelId="+channelId);

				negitiveList = hibernateTemplate.find("select count(t.newsTrend),sum(t.marking) from Tracking t WHERE t.isDeleted="+IConstant.IS_DELETED_ACTIVE+" AND t.newsTrend LIKE 'Negative%' AND t.client.clientId="+clientId+" AND t.date BETWEEN '"
						+ fromDate + "' AND '" + toDate + "' and t.chanel.channelId="+channelId);
				channelList=hibernateTemplate.find("select distinct  t.chanel.channelName from Tracking t WHERE t.isDeleted="+IConstant.IS_DELETED_ACTIVE+" AND t.client.clientId="+clientId+" AND t.date BETWEEN '"
						+ fromDate + "' AND '" + toDate + "' and t.chanel.channelId="+channelId);
				
			}
			}
			else
			{
			if(param!=null && param.equals("{param=AllChannel}"))
			{
				positiveList = hibernateTemplate.find("select count(t.newsTrend) ,sum(t.marking) from Tracking t WHERE t.isDeleted="+IConstant.IS_DELETED_ACTIVE+" AND t.newsTrend LIKE 'Positive%' AND t.client.clientId="+clientId+" AND t.date BETWEEN '"
						+ fromDate + "' AND '" + toDate + "'");

				negitiveList = hibernateTemplate.find("select count(t.newsTrend),sum(t.marking) from Tracking t WHERE t.isDeleted="+IConstant.IS_DELETED_ACTIVE+" AND t.newsTrend LIKE 'Negative%' AND t.client.clientId="+clientId+" AND t.date BETWEEN '"
						+ fromDate + "' AND '" + toDate + "'");
				channelList = hibernateTemplate.find("select distinct t.chanel.channelName from Tracking t WHERE t.isDeleted="+IConstant.IS_DELETED_ACTIVE+" AND  t.client.clientId="+clientId+" AND t.date BETWEEN '"
						+ fromDate + "' AND '" + toDate + "'");
			}
			}
				
		  HashMap<String, Object[]> map=new HashMap<String, Object[]>();
		  if(positiveList.size()!=0 || negitiveList.size()!=0 )
		  {
		  map.put("positive", (Object[]) positiveList.get(0));
		  map.put("negitive", (Object[]) negitiveList.get(0));
		  map.put("channelList",(Object[])channelList.toArray());
		  }
		  return map;
	}
	@SuppressWarnings("unchecked")
	public HashMap<String, List<Object>> genrateSectorWisePieChartReport(Integer clientId,
			String fromDate, String toDate, String param) {
		List<Object> sectorPositiveList=null;
		List<Object> sectorNegitiveList=null;
		List<Object> channelList=null;
		HashMap<String, List<Object>> map = new HashMap<String, List<Object>>();
		if(param!=null && param.equals("{param=Sector}"))
		{
			sectorPositiveList=	hibernateTemplate.find("SELECT sum(t.marking),t.sector.sectorName  from Tracking t WHERE t.isDeleted="+IConstant.IS_DELETED_ACTIVE+" AND t.newsTrend LIKE 'Positive%' AND t.client.clientId="+clientId+" AND t.date BETWEEN '"
					+ fromDate + "' AND '" + toDate + "' GROUP BY t.sector.sectorName ORDER BY t.sector.sectorName ");
			
			
			sectorNegitiveList=	hibernateTemplate.find("SELECT sum(t.marking),t.sector.sectorName  from Tracking t WHERE t.isDeleted="+IConstant.IS_DELETED_ACTIVE+" AND t.newsTrend LIKE 'Negative%' AND t.client.clientId="+clientId+" AND t.date BETWEEN '"
					+ fromDate + "' AND '" + toDate + "' GROUP BY t.sector.sectorName ORDER BY t.sector.sectorName ");
			channelList = hibernateTemplate.find("select distinct t.chanel.channelName from Tracking t WHERE t.isDeleted="+IConstant.IS_DELETED_ACTIVE+" AND  t.client.clientId="+clientId+" AND t.date BETWEEN '"
			+ fromDate + "' AND '" + toDate + "'");
			System.out.println("Positive Sector List"+sectorPositiveList);
			System.out.println("Negative Sector List"+sectorNegitiveList);
			map.put("sectorPositiveList", sectorPositiveList);
			map.put("sectorNegitiveList", sectorNegitiveList);
			map.put("channelList", channelList);
		}
		return map;
	}
	@SuppressWarnings("unchecked")
	public HashMap<String, List<Object>> channelWisePieChart(Integer clientId, String fromDate,String toDate, String param) {
		List<Object> channelList=null;
		List<Object> channelPositiveList=null;
		List<Object> channelNegativeList=null;
		@SuppressWarnings("rawtypes")
		List positiveChannelList=new ArrayList();
		@SuppressWarnings("rawtypes")
		List negativeChannelList=new ArrayList();
		
		HashMap<String, List<Object>> map = new HashMap<String, List<Object>>();
		
		channelList=hibernateTemplate.find("SELECT t.chanel  from Tracking t WHERE t.isDeleted="+IConstant.IS_DELETED_ACTIVE+" AND t.client.clientId="+clientId+" AND t.date BETWEEN '"
					+ fromDate + "' AND '" + toDate + "' GROUP BY t.chanel ");
		System.out.println("channelList----"+channelList.size());
		for(int i = 0 ; i < channelList.size() ; i++)
		{
		System.out.println("channelList"+((Chanel)channelList.get(i)).getChannelName());
			
		channelPositiveList=hibernateTemplate.find("select count(t.newsTrend),sum(t.marking) from Tracking t WHERE t.isDeleted="+IConstant.IS_DELETED_ACTIVE+" AND t.newsTrend LIKE 'Positive%' AND t.client.clientId="+clientId+" AND t.date BETWEEN '"
				+ fromDate + "' AND '" + toDate + "' and t.chanel.channelId='"+((Chanel)channelList.get(i)).getChannelId()+"' GROUP BY t.chanel.channelId ");
		if(channelPositiveList.size()==0)
		{
			Object[] obj = new Object[2];
			obj[0]=0;
			obj[1]=0;
			channelPositiveList.add(obj);
		}
		positiveChannelList.addAll(channelPositiveList);
		channelNegativeList=hibernateTemplate.find("select count(t.newsTrend),sum(t.marking) from Tracking t WHERE t.isDeleted="+IConstant.IS_DELETED_ACTIVE+" AND t.newsTrend LIKE 'Negative%' AND t.client.clientId="+clientId+" AND t.date BETWEEN '"
				+ fromDate + "' AND '" + toDate + "' and t.chanel.channelId='"+((Chanel)channelList.get(i)).getChannelId()+"' GROUP BY t.chanel.channelId ");	
		if(channelNegativeList.size()==0)
		{
			Object[] obj = new Object[2];
			obj[0]=0;
			obj[1]=0;
			channelNegativeList.add(obj);
		}
		negativeChannelList.addAll(channelNegativeList);
		}
		map.put("positiveChannelList", positiveChannelList);
		map.put("negativeChannelList", negativeChannelList);
		map.put("channelList", channelList);
		return map;
		
	}
	@SuppressWarnings("unchecked")
	public List<Object> EMTPDFReport(String fromDate, String toDate, Integer channelId) {
		List<Object> pdfTracking=null;
		pdfTracking=hibernateTemplate.find("from Tracking t WHERE t.isDeleted="+IConstant.IS_DELETED_ACTIVE+" AND t.date BETWEEN ' " + fromDate + " ' AND ' " + toDate + " ' AND t.chanel.channelId=' " + channelId + " ' ");
		System.out.println("pdfTracking List"+pdfTracking);
		return pdfTracking;
	}
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public HashMap<String, List<Object>> sectorWiseNegativePosReport(Integer clientId, String fromDate,
			String toDate, Integer channelId, String param) {
		List<Object> sectorList=null;
		List<Object> sectorPositiveList=null;
		List<Object> sectorNegativeList=null;
		List positivesectorList=new ArrayList();
		List negativesectorList=new ArrayList();
		HashMap<String, List<Object>> map = new HashMap<String, List<Object>>();
		sectorList=hibernateTemplate.find("SELECT t.sector  from Tracking t WHERE t.isDeleted="+IConstant.IS_DELETED_ACTIVE+" AND t.client.clientId="+clientId+" AND t.chanel.channelId= "+channelId+" AND t.date BETWEEN '"
				+ fromDate + "' AND '" + toDate + "' GROUP BY t.sector ");
	
		for(int i = 0 ; i < sectorList.size() ; i++)
		{
			System.out.println("sectorList"+((Sector)sectorList.get(i)).getSectorName());	
			sectorPositiveList=hibernateTemplate.find("select count(t.newsTrend),sum(t.marking) from Tracking t WHERE t.isDeleted="+IConstant.IS_DELETED_ACTIVE+" AND t.newsTrend LIKE 'Positive%' AND t.client.clientId="+clientId+"  AND t.chanel.channelId= "+channelId+" AND t.date BETWEEN '"
				+ fromDate + "' AND '" + toDate + "' and t.sector.sectorId='"+((Sector)sectorList.get(i)).getSectorId()+"' GROUP BY t.sector.sectorId ");
		if(sectorPositiveList.size()==0)
		{
			Object[] obj = new Object[2];
			obj[0]=0;
			obj[1]=0;
			sectorPositiveList.add(obj);
		}
		positivesectorList.addAll(sectorPositiveList);
		sectorNegativeList=hibernateTemplate.find("select count(t.newsTrend),sum(t.marking) from Tracking t WHERE t.isDeleted="+IConstant.IS_DELETED_ACTIVE+" AND t.newsTrend LIKE 'Negative%' AND t.client.clientId="+clientId+"  AND t.chanel.channelId= "+channelId+" AND t.date BETWEEN '"
				+ fromDate + "' AND '" + toDate + "' and t.sector.sectorId='"+((Sector)sectorList.get(i)).getSectorId()+"' GROUP BY t.sector.sectorId ");	
		if(sectorNegativeList.size()==0)
		{
			Object[] obj = new Object[2];
			obj[0]=0;
			obj[1]=0;
			sectorNegativeList.add(obj);
		}
		negativesectorList.addAll(sectorNegativeList);
		}
		map.put("positivesectorList", positivesectorList);
		map.put("negativesectorList", negativesectorList);
		map.put("sectorList", sectorList);
		return map;
	}
	@SuppressWarnings("unchecked")
	public Map<String, List<Tracking>> getExcelReportList(String getreportfromDate,
			String getreporttoDate, String getreportchannelId, String getclientName) {
		Map<String, List<Tracking>> dateWiseTrakingListMap = null; 
		try{

			List<Tracking> reportList=hibernateTemplate.find("from Tracking t WHERE t.isDeleted="+IConstant.IS_DELETED_ACTIVE+" AND t.date BETWEEN '" + getreportfromDate + "' AND '" + getreporttoDate + "' and t.chanel.channelId=' " + getreportchannelId + " ' ");
	      
		if(null != reportList && reportList.size() > 0){
			dateWiseTrakingListMap =  new LinkedHashMap<String, List<Tracking>>();
			for(Tracking tracking : reportList){
				
				if(dateWiseTrakingListMap.containsKey(tracking.getDate())){
					dateWiseTrakingListMap.get(tracking.getDate()).add(tracking);
										
				}else{
					dateWiseTrakingListMap.put(getreportfromDate, reportList);
				}
			}
		}
		
	}catch(HibernateException exception){
		exception.printStackTrace();
	}
	return dateWiseTrakingListMap;
}
	@SuppressWarnings("unchecked")
	public Map<String, List<AdvertisementTracking>> getAdvExcelReportList(
			String getAdvReportfromDate, String getAdvReporttoDate,
			String getAdvReportchanelid, String getAdvReportclientId,String getclientName) {
		
		// TODO Auto-generated method stub
		Map<String, List<AdvertisementTracking>> dateWiseAdvTrakingListMap = null; 
		try{
		      List<AdvertisementTracking> advreportList=hibernateTemplate.find("from  AdvertisementTracking a WHERE a.isDeleted="+IConstant.IS_DELETED_ACTIVE+" AND a.date BETWEEN '" + getAdvReportfromDate + "' AND '" + getAdvReporttoDate + "' and a.chanel.channelId='"+getAdvReportchanelid+"' and a.client.clientId='"+getAdvReportclientId+"' ");
		      if(null != advreportList && advreportList.size() > 0){
		    	  
		    	  dateWiseAdvTrakingListMap =  new LinkedHashMap<String, List<AdvertisementTracking>>();
					for(AdvertisementTracking advtracking : advreportList){
						
						if(dateWiseAdvTrakingListMap.containsKey(advtracking.getDate())){
							dateWiseAdvTrakingListMap.get(advtracking.getDate()).add(advtracking);
							
						}else{
							dateWiseAdvTrakingListMap.put(getAdvReportfromDate, advreportList);
						}
					}
				}
		}catch(HibernateException exception){
			exception.printStackTrace();
		}
		return dateWiseAdvTrakingListMap;

	}
	public Map<String, List<PrintTracking>> getPrintExcelReportList(
			String getPrintReportfromDate, String getPrintReporttoDate,
			String getPrintReportpublicationId, String getPrintReportclientId, String getclientName) {
		
	
		Map<String, List<PrintTracking>> dateWisePrintTrakingListMap = null; 
		try{
		      @SuppressWarnings("unchecked")
			List<PrintTracking> printreportList=hibernateTemplate.find("from  PrintTracking p WHERE p.isDeleted="+IConstant.IS_DELETED_ACTIVE+" AND p.date BETWEEN '" + getPrintReportfromDate + "' AND '" + getPrintReporttoDate + "' and p.publication.publicationId='"+getPrintReportpublicationId+"' ");
		      if(null != printreportList && printreportList.size() > 0){ 
		    	  dateWisePrintTrakingListMap =  new LinkedHashMap<String, List<PrintTracking>>();
		    	  for(PrintTracking printtracking : printreportList){
						
						if(dateWisePrintTrakingListMap.containsKey(printtracking.getDate())){
							dateWisePrintTrakingListMap.get(printtracking.getDate()).add(printtracking);
							
						}else{
							dateWisePrintTrakingListMap.put(getPrintReportfromDate, printreportList);
						}
		    	  }
				}
	}catch(HibernateException exception){
		exception.printStackTrace();
	}
	return dateWisePrintTrakingListMap;	
}
	
	}
