package com.emts.service;

import java.util.List;

public interface BarChartService {
	public List<Object> barChart(String fromDate, String toDate, Integer clientId);
}
