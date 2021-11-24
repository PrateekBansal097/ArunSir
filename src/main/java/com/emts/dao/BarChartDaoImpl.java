package com.emts.dao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.stereotype.Repository;

import com.emts.util.IConstant;

@Repository
public class BarChartDaoImpl implements BarChartDao{
@Autowired HibernateTemplate hibernateTemplate;
@SuppressWarnings("unchecked")
public List<Object> barChart(String fromDate, String toDate, Integer clientId) {
	List<Object> barChartList=null;
	barChartList=hibernateTemplate.find("select t.date ,sum(t.marking),t.chanel.channelName from Tracking t WHERE t.isDeleted="+IConstant.IS_DELETED_ACTIVE+" and  t.client.clientId="+clientId+" AND t.date>='"+ fromDate + "' AND t.date<='" + toDate + "' GROUP BY t.date ORDER BY t.date ");
	@SuppressWarnings("rawtypes")
	List dateList = new ArrayList();
	@SuppressWarnings("rawtypes")
	List marking = new ArrayList();
	@SuppressWarnings("rawtypes")
	List channel = new ArrayList();
	@SuppressWarnings("rawtypes")
	List<Object> list= new ArrayList();
	Object[] obj=null;
	for(int j=0;j<barChartList.size();j++)
	 {
	    obj = (Object[])barChartList.get(j);
	   String date=obj[0].toString().replaceAll("-", " ");
	   dateList.add(date);
	   marking.add(obj[1]);
	   channel.add(obj[2]);
	 }
		list.add(dateList);
		list.add(marking);
		list.add(channel);
 	 return list;
}
}
