package com.emts.dao;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.emts.model.AdvertisementTracking;
import com.emts.model.PrintTracking;
import com.emts.model.Publication;
import com.emts.model.Tracking;
public interface ReportDao {
	public HashMap<String,Object[]> pieChartReport(Integer clientId, String fromDate, String toDate, Integer channelId, String param);
	public HashMap<String, List<Object>> genrateSectorWisePieChartReport(Integer clientId, String fromDate, String toDate, String param);
	public HashMap<String, List<Object>> channelWisePieChart(Integer clientId, String fromDate, String toDate, String param);
	public List<Object> EMTPDFReport(String fromDate, String toDate, Integer channelId);
	public HashMap<String, List<Object>> sectorWiseNegativePosReport(Integer clientId, String fromDate,
			String toDate, Integer channelId, String param);
	
	public Map<String, List<Tracking>> getExcelReportList(String getreportfromDate,String getreporttoDate,String getreportchannelId,String getclientName );
	
	public Map<String, List<AdvertisementTracking>> getAdvExcelReportList(
			String getAdvReportfromDate, String getAdvReporttoDate,
			String getAdvReportchanelid, String getAdvReportclientId,String getclientName);
	
	public Map<String, List<PrintTracking>> getPrintExcelReportList(
			String getPrintReportfromDate, String getPrintReporttoDate,
			String getPrintReportpublicationId, String getPrintReportclientId, String getclientName);
	
	
	
}
