package com.emts.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.emts.dao.BarChartDao;

@Service
public class BarChartServiceImpl implements BarChartService{
@Autowired
private BarChartDao barChartDao;
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public List<Object> barChart(String fromDate, String toDate, Integer clientId) {
		List<Object> barChartList=new ArrayList<Object>();
		barChartList=(List)barChartDao.barChart(fromDate,toDate,clientId);
		return barChartList;
	}

}
