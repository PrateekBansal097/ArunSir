package com.emts.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.stereotype.Repository;

import com.emts.model.Chanel;
import com.emts.util.IConstant;

@Repository
public class AdvReportDaoImpl implements AdvReportDao{
	@Autowired
	private HibernateTemplate hibernateTemplate;
	@SuppressWarnings("unchecked")
	public List<Object> getAllParty() {
		List<Object> party=null;
		party=hibernateTemplate.find("from Party where IS_DELETED="+IConstant.IS_DELETED_ACTIVE);
		return party;
	}
	@SuppressWarnings("unchecked")
	public List<Object> advPDFReport(String fromDate, String toDate, Integer channelId,Integer clientId) {
		List<Object> advertisementTracking=null;
		advertisementTracking=hibernateTemplate.find("from  AdvertisementTracking a WHERE a.isDeleted="+IConstant.IS_DELETED_ACTIVE+" AND a.date BETWEEN '" + fromDate + "' AND '" + toDate + "' and a.chanel.channelId='"+channelId+"' and a.client.clientId='"+clientId+"' ");
		return advertisementTracking;
	}
	@SuppressWarnings("unchecked")
	public List<Object> AllChanelPieChart(String fromDate, String toDate,
			Integer[] partyId, Integer clientId) {
		List<Object> AdvList=null;
		String client = " ";
		for (Integer s : partyId) {
			client = client + " OR a.party.partyId=" + s;
			System.out.println("Client"+client);
		}
		AdvList=hibernateTemplate.find("select distinct count(a.party.partyId),a.party.partyName,(a.chanel.channelName),sum(a.duration) from  AdvertisementTracking a WHERE a.isDeleted="+IConstant.IS_DELETED_ACTIVE+" AND" +
				" a.date BETWEEN '" + fromDate + "' AND '" + toDate + "' and a.client.clientId="+clientId+" and(a.party.partyId=0"+client+") GROUP BY a.party.partyId ");
		return AdvList;
	}
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public HashMap<String, List<Object>> chanelWiseAdvPieChart(String fromDate, String toDate,
			Integer[] partyId, Integer clientId) {
		List<Object> channelList=null;
		List<Object> advList=null;
		List advertisementList=new ArrayList();
		HashMap<String, List<Object>> map = new HashMap<String, List<Object>>();
		String client = " ";
		for (Integer s : partyId) {
			client = client + " OR a.party.partyId=" + s;
			System.out.println("Client"+client);
		}
		channelList=hibernateTemplate.find("SELECT adv.chanel  from AdvertisementTracking adv WHERE adv.isDeleted="+IConstant.IS_DELETED_ACTIVE+" AND adv.client.clientId="+clientId+" AND adv.date BETWEEN '"
				+ fromDate + "' AND '" + toDate + "' GROUP BY adv.chanel ");
	    for(int i = 0 ; i < channelList.size() ; i++)
		{
	    	System.out.println("channelList"+((Chanel)channelList.get(i)).getChannelName());
	    	advList=hibernateTemplate.find("select count(a.party.partyId),a.party.partyName,a.chanel.channelName,sum(a.duration) from  AdvertisementTracking a WHERE a.isDeleted="+IConstant.IS_DELETED_ACTIVE+" AND" +
					" a.date BETWEEN '" + fromDate + "' AND '" + toDate + "' and a.client.clientId="+clientId+" and(a.party.partyId=0"+client+") and  a.chanel.channelId='"+((Chanel)channelList.get(i)).getChannelId()+"'GROUP BY a.party.partyId ");
	    	advertisementList.add(advList);
		}
	    map.put("advertisementList", advertisementList);
		map.put("channelList", channelList);
		return map;
	}
	
	
	
}
