package com.emts.dao;
import java.util.List;
public interface BarChartDao {
	public List<Object> barChart(String fromDate, String toDate, Integer clientId);
}
