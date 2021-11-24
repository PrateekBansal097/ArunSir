package com.emts.service;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;

import com.emts.model.Tracking;
public interface ReportService {
	public HashMap<String, Object[]> pieChartReport(Integer clientId, String fromDate, String toDate,Integer channelId,String param);
	public HashMap<String, List<Object>> genrateSectorWisePieChartReport(Integer clientId,
			                                 String fromDate, String toDate, String param);
	public HashMap<String, List<Object>> channelWisePieChart(Integer clientId, String fromDate,
			String toDate, String param);
	public List<Tracking> EMTPDFReport(String fromDate, String toDate, Integer channelId);
	public HashMap<String, List<Object>> sectorWiseNegativePosReport(Integer clientId, String fromDate,
			String toDate, Integer channelId, String param);
	
	public Boolean getExcelReport(String getreportfromDate,
			String getreporttoDate, String getreportchannelId, String getclientName);
	
	public Boolean getAdvExcelReport(String getAdvReportfromDate,
			String getAdvReporttoDate, String getAdvReportchanelid,
			String getAdvReportclientId,String getclientName);
	
	public Boolean getPrintExcelReport(String getPrintReportfromDate,
			String getPrintReporttoDate, String getPrintReportpublicationId,
			String getPrintReportclientId, String getclientName);
		
}
