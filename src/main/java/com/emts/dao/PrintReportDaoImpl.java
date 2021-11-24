package com.emts.dao;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.stereotype.Repository;
import com.emts.util.IConstant;
@Repository
public class PrintReportDaoImpl implements PrintReportDao{
	@Autowired
	private HibernateTemplate hibernateTemplate;
	@SuppressWarnings("unchecked")
	public List<Object> getAllPublication() {
		List<Object> publication = null ;
		publication = hibernateTemplate.find("from Publication where IS_DELETED="+IConstant.IS_DELETED_ACTIVE);
		return publication;
	}
	@SuppressWarnings("unchecked")
	public List<Object> printPDFReport(String fromDate, String toDate,Integer clientId, Integer publicationId) {
		List<Object> printTracking=null;
		printTracking=hibernateTemplate.find("from  PrintTracking p WHERE p.isDeleted="+IConstant.IS_DELETED_ACTIVE+" AND p.date BETWEEN '" + fromDate + "' AND '" + toDate + "' and p.publication.publicationId='"+publicationId+"' ");
		return printTracking;
	}
	@SuppressWarnings("unchecked")
	public HashMap<String, List<Object>> AllpublicationPieChart(String fromDate, String toDate, Integer clientId, Integer publicationId ,String param) {
		List<Object> publicationPositiveList=null;
		List<Object> publicationNegitiveList=null;
		List<Object> publicationList=null;
		HashMap<String, List<Object>> map = new HashMap<String, List<Object>>();
		if(param!=null && param.equals("{param=AllPaper}"))
		{
		publicationPositiveList=hibernateTemplate.find("select count(p.newsTrend) ,sum(p.marking) from PrintTracking p WHERE p.isDeleted="+IConstant.IS_DELETED_ACTIVE+" AND p.newsTrend LIKE 'Positive%' AND p.client.clientId="+clientId+" AND p.date BETWEEN '"
				+ fromDate + "' AND '" + toDate + "' ");
		publicationNegitiveList=hibernateTemplate.find("select count(p.newsTrend),sum(p.marking) from PrintTracking p WHERE p.isDeleted="+IConstant.IS_DELETED_ACTIVE+" AND p.newsTrend LIKE 'Negative%' AND p.client.clientId="+clientId+" AND p.date BETWEEN '"
				+ fromDate + "' AND '" + toDate + "' ");
		publicationList=hibernateTemplate.find("SELECT DISTINCT p.publication.publicationName from PrintTracking p WHERE p.isDeleted="+IConstant.IS_DELETED_ACTIVE+" AND p.client.clientId="+clientId+" AND p.date BETWEEN '"
				+ fromDate + "' AND '" + toDate + "' ");
		}
		if(param!=null && param.equals("{param=Paper}"))
		{
			publicationPositiveList=hibernateTemplate.find("select count(p.newsTrend) ,sum(p.marking) from PrintTracking p WHERE p.isDeleted="+IConstant.IS_DELETED_ACTIVE+" AND p.newsTrend LIKE 'Positive%' AND p.client.clientId="+clientId+" AND p.date BETWEEN '"
					+ fromDate + "' AND '" + toDate + "' and p.publication.publicationId="+publicationId);
			publicationNegitiveList=hibernateTemplate.find("select count(p.newsTrend),sum(p.marking) from PrintTracking p WHERE p.isDeleted="+IConstant.IS_DELETED_ACTIVE+" AND p.newsTrend LIKE 'Negative%' AND p.client.clientId="+clientId+" AND p.date BETWEEN '"
					+ fromDate + "' AND '" + toDate + "' and p.publication.publicationId="+publicationId);
			publicationList=hibernateTemplate.find("SELECT DISTINCT p.publication.publicationName from PrintTracking p WHERE p.isDeleted="+IConstant.IS_DELETED_ACTIVE+" AND p.client.clientId="+clientId+" AND p.date BETWEEN '"
					+ fromDate + "' AND '" + toDate + "' and p.publication.publicationId="+publicationId);
		}
		map.put("publicationPositiveList", publicationPositiveList);
		map.put("publicationNegitiveList", publicationNegitiveList);
		map.put("publicationList", publicationList);
		return map;
	}
	@SuppressWarnings("unchecked")
	public HashMap<String, List<Object>> sectorWiseAllPublication(String fromDate, String toDate,Integer clientId, Integer publicationId, String param) {
		List<Object> sectorPositiveList=null;
		List<Object> sectorNegitiveList=null;
		List<Object> publicationList=null;
		HashMap<String, List<Object>> map = new HashMap<String, List<Object>>();
		
		if(param!=null && param.equals("{param=Sector}"))
		{
			sectorPositiveList=hibernateTemplate.find("SELECT sum(p.marking),p.sector.sectorName  from PrintTracking p WHERE p.isDeleted="+IConstant.IS_DELETED_ACTIVE+" AND p.newsTrend LIKE 'Positive%' AND p.client.clientId="+clientId+" AND p.date BETWEEN '"
					+ fromDate + "' AND '" + toDate + "' GROUP BY p.sector.sectorName ORDER BY p.sector.sectorName ");
			sectorNegitiveList=hibernateTemplate.find("SELECT sum(p.marking),p.sector.sectorName  from PrintTracking p WHERE p.isDeleted="+IConstant.IS_DELETED_ACTIVE+" AND p.newsTrend LIKE 'Negative%' AND p.client.clientId="+clientId+" AND p.date BETWEEN '"
					+ fromDate + "' AND '" + toDate + "' GROUP BY p.sector.sectorName ORDER BY p.sector.sectorName ");
			publicationList=hibernateTemplate.find("SELECT DISTINCT p.publication.publicationName from PrintTracking p WHERE p.isDeleted="+IConstant.IS_DELETED_ACTIVE+" AND p.client.clientId="+clientId+" AND p.date BETWEEN '"
					+ fromDate + "' AND '" + toDate + "' ");
		}
		if(param!=null && param.equals("{param=PaperSector}"))
		{
			sectorPositiveList=hibernateTemplate.find("SELECT sum(p.marking),p.sector.sectorName  from PrintTracking p WHERE p.isDeleted="+IConstant.IS_DELETED_ACTIVE+" AND p.newsTrend LIKE 'Positive%' AND p.client.clientId="+clientId+" AND p.date BETWEEN '"
					+ fromDate + "' AND '" + toDate + "' and p.publication.publicationId='"+publicationId+"' GROUP BY p.sector.sectorName ORDER BY p.sector.sectorName ");
			sectorNegitiveList=hibernateTemplate.find("SELECT sum(p.marking),p.sector.sectorName  from PrintTracking p WHERE p.isDeleted="+IConstant.IS_DELETED_ACTIVE+" AND p.newsTrend LIKE 'Negative%' AND p.client.clientId="+clientId+" AND p.date BETWEEN '"
					+ fromDate + "' AND '" + toDate + "' and p.publication.publicationId='"+publicationId+"' GROUP BY p.sector.sectorName ORDER BY p.sector.sectorName ");
			publicationList=hibernateTemplate.find("SELECT DISTINCT p.publication.publicationName from PrintTracking p WHERE p.isDeleted="+IConstant.IS_DELETED_ACTIVE+" AND p.client.clientId="+clientId+" AND p.date BETWEEN '"
					+ fromDate + "' AND '" + toDate + "' and p.publication.publicationId='"+publicationId+"' ");
		}
		map.put("sectorPositiveList", sectorPositiveList);
		map.put("sectorNegitiveList", sectorNegitiveList);
		map.put("publicationList", publicationList);
		return map;
	}
}
