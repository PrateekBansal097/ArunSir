package com.emts.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.util.StringUtils;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.emts.model.AdvertisementTracking;
import com.emts.model.Chanel;
import com.emts.model.Client;
import com.emts.model.Party;
import com.emts.model.PieChart;
import com.emts.model.PrintTracking;
import com.emts.model.Publication;
import com.emts.model.State;
import com.emts.model.Tracking;
import com.emts.service.AdvReportService;
import com.emts.service.BarChartService;
import com.emts.service.ChanelService;
import com.emts.service.ClientService;
import com.emts.service.PrintReportService;
import com.emts.service.PublicationService;
import com.emts.service.ReportService;
import com.emts.service.StateService;
import com.emts.util.DateFormat;
import com.emts.validator.PieChartValidator;

@Controller
@SuppressWarnings("all")
public class ReportController {

    @Autowired
    ServletContext servletContext;

    @Autowired
    private ReportService reportService;

    @Autowired
    private PrintReportService printReportService;

    @Autowired
    private AdvReportService advReportService;

    @Autowired
    private BarChartService barChartService;

    @Autowired
    private ClientService clientService;

    @Autowired
    private ChanelService chanelService;

    @Autowired
    private PublicationService publicationService;

    @Autowired
    private PieChartValidator pieChartValidator;
    
	@Autowired 
	private StateService stateservice;

    HttpSession session;

    private String printreporttoDate;

    private static final int BUFFER_SIZE = 4096;

    /*
     * @Autowired private PieChartValidator pieChartValidator;
     */

    /* Pie Chart for Electronic Media Tracking */

    @RequestMapping("/piechart")
    public String showPiechart(Map<String, Object> map, Model model) {
	map.put("PieChart", new PieChart());
	List<Client> clientList = new ArrayList<Client>();
	clientList = clientService.getAllClientName();
	if (clientList != null) {
	    model.addAttribute("client", clientList);
	}
/*	List<Chanel> chanelList = new ArrayList<Chanel>();
	chanelList = chanelService.getAllChanel();
	if (chanelList != null) {
	    model.addAttribute("chanel", chanelList);
	}*/
	List<State> stateList=new ArrayList<State>();
	stateList=stateservice.getAllStateName();
	if(stateList!=null)
	{
	model.addAttribute("state",stateList);
	}
	return "piechart";
    }

    @RequestMapping(value = "/PieChartReport", method = { RequestMethod.GET,
	    RequestMethod.POST })
    public String genrateReport(@ModelAttribute("PieChart") PieChart pieChart,
	    BindingResult result, ModelMap model, HttpServletRequest request,
	    @RequestParam(required = false) String param,
	    @RequestParam(required = false) Integer clientId,
	    @RequestParam(required = false) String todate,
	    @RequestParam(required = false) String fromdate,
	    @RequestParam(required = false) Integer channelId) {
	List<Client> clientList = new ArrayList<Client>();
	clientList = clientService.getAllClientName();
	if (clientList != null) {
	    model.addAttribute("client", clientList);
	}
	List<Chanel> chanelList = new ArrayList<Chanel>();
	chanelList = chanelService.getAllChanel();
	if (chanelList != null) {
	    model.addAttribute("chanel", chanelList);
	}
	/*
	 * All Channel and Individual Channel Negative Positive
	 * Report(Electronic Media Tracking)
	 */

	if (param != null && param.equals("{param=Channel}")) {
	    List clientName = new ArrayList();
	    clientName = clientService.getClientName(pieChart.getClient()
		    .getClientId());
	    HashMap<String, Object[]> map = reportService.pieChartReport(
		    pieChart.getClient().getClientId(), pieChart.getFromDate(),
		    pieChart.getToDate(), pieChart.getChanel().getChannelId(),
		    param);
	    pieChart.setFromDate(DateFormat.getDDMMYYYYDate(pieChart
		    .getFromDate()));
	    pieChart.setToDate(DateFormat.getDDMMYYYYDate(pieChart.getToDate()));
	    Set set = map.keySet();
	    Iterator it = set.iterator();
	    int i = 1;
	    while (it.hasNext()) {
		Object[] obj = (Object[]) map.get(it.next());

		ArrayList list = new ArrayList(Arrays.asList(obj));
		model.addAttribute("obj" + i++, list);
		model.addAttribute("pieChart", pieChart);
		model.addAttribute("clientName", clientName);

	    }
	    return "generateAllChannelPieCharts";

	}
	if (param != null && param.equals("{param=AllChannel}")) {
	    List clientName = new ArrayList();
	    clientName = clientService.getClientName(pieChart.getClient()
		    .getClientId());
	    HashMap<String, Object[]> map = reportService.pieChartReport(
		    pieChart.getClient().getClientId(), pieChart.getFromDate(),
		    pieChart.getToDate(), null, param);
	    pieChart.setFromDate(DateFormat.getDDMMYYYYDate(pieChart
		    .getFromDate()));
	    pieChart.setToDate(DateFormat.getDDMMYYYYDate(pieChart.getToDate()));
	    Set set = map.keySet();
	    Iterator it = set.iterator();
	    int i = 1;
	    while (it.hasNext()) {
		Object[] obj = (Object[]) map.get(it.next());

		ArrayList list = new ArrayList(Arrays.asList(obj));
		model.addAttribute("obj" + i++, list);
		model.addAttribute("pieChart", pieChart);
		model.addAttribute("clientName", clientName);
	    }
	    return "generateAllChannelPieCharts";
	}
	/*
	 * Sector Wise All Channel Negative Positive Report(Electronic Media
	 * Tracking)
	 */
	if (param != null && param.equals("{param=Sector}")) {
	    List clientName = new ArrayList();
	    clientName = clientService.getClientName(pieChart.getClient()
		    .getClientId());
	    HashMap<String, List<Object>> sectorMap = reportService
		    .genrateSectorWisePieChartReport(pieChart.getClient()
			    .getClientId(), pieChart.getFromDate(), pieChart
			    .getToDate(), param);
	    pieChart.setFromDate(DateFormat.getDDMMYYYYDate(pieChart
		    .getFromDate()));
	    pieChart.setToDate(DateFormat.getDDMMYYYYDate(pieChart.getToDate()));
	    Set set = sectorMap.keySet();
	    Iterator it = set.iterator();
	    while (it.hasNext()) {
		List<Object> sectorPositiveList = (List<Object>) sectorMap
			.get(it.next());
		List<Object> sectorNegativeList = (List<Object>) sectorMap
			.get(it.next());
		List<Object> channelListList = (List<Object>) sectorMap.get(it
			.next());
		model.addAttribute("sectorPositiveList", sectorPositiveList);
		model.addAttribute("sectorNegativeList", sectorNegativeList);
		model.addAttribute("channelListList", channelListList);
		model.addAttribute("pieChart", pieChart);
		model.addAttribute("clientName", clientName);
	    }

	    return "generateElectronicMediaSectorWisePieChart";
	}
	/* Channel Wise Negative Positive Report(Electronic Media Tracking) */
	if (param != null && param.equals("{param=AllChannelNegativePositive}")) {
	    List clientName = new ArrayList();
	    clientName = clientService.getClientName(pieChart.getClient()
		    .getClientId());
	    HashMap<String, List<Object>> map = reportService
		    .channelWisePieChart(pieChart.getClient().getClientId(),
			    pieChart.getFromDate(), pieChart.getToDate(), param);
	    pieChart.setFromDate(DateFormat.getDDMMYYYYDate(pieChart
		    .getFromDate()));
	    pieChart.setToDate(DateFormat.getDDMMYYYYDate(pieChart.getToDate()));
	    Set set = map.keySet();
	    Iterator iterator = set.iterator();
	    while (iterator.hasNext()) {
		List<Object> ChannelPositiveList = (List<Object>) map
			.get(iterator.next());
		List<Object> ChannelNegativeList = (List<Object>) map
			.get(iterator.next());
		List<Object> ChannelList = (List<Object>) map.get(iterator
			.next());

		model.addAttribute("ChannelPositiveList", ChannelPositiveList);
		model.addAttribute("ChannelNegativeList", ChannelNegativeList);
		model.addAttribute("ChannelList", ChannelList);
		model.addAttribute("pieChart", pieChart);
		model.addAttribute("todate", todate);
		model.addAttribute("clientId", clientId);
		model.addAttribute("fromdate", fromdate);
		model.addAttribute("clientName", clientName);

		session = request.getSession();
		session.setAttribute("ChannelPositiveList", ChannelPositiveList);
		session.setAttribute("ChannelNegativeList", ChannelNegativeList);

	    }
	    return "generateChannelWisePieChart";
	}
	if (param != null && param.equals("AllChannelNegativePositive1")) {
	    List clientName = new ArrayList();
	    clientName = clientService.getClientName(clientId);
	    HashMap<String, List<Object>> map = reportService
		    .channelWisePieChart(clientId,
			    DateFormat.getYYYYMMDDDate(fromdate),
			    DateFormat.getYYYYMMDDDate(todate),
			    "{param=AllChannelNegativePositive}");
	    Set set = map.keySet();
	    Iterator iterator = set.iterator();
	    while (iterator.hasNext()) {
		List<Object> ChannelPositiveList = (List<Object>) map
			.get(iterator.next());
		List<Object> ChannelNegativeList = (List<Object>) map
			.get(iterator.next());
		List<Object> ChannelList = (List<Object>) map.get(iterator
			.next());

		model.addAttribute("ChannelPositiveList", ChannelPositiveList);
		model.addAttribute("ChannelNegativeList", ChannelNegativeList);
		model.addAttribute("ChannelList", ChannelList);
		/* model.addAttribute("pieChart",pieChart); */
		model.addAttribute("todate", todate);
		model.addAttribute("clientId", clientId);
		model.addAttribute("fromdate", fromdate);
		model.addAttribute("clientName", clientName);
	    }
	    return "generateChannelWisePieChart1";
	}
	if (param != null && param.equals("AllChannelNegativePositive2")) {
	    List clientName = new ArrayList();
	    clientName = clientService.getClientName(clientId);
	    HashMap<String, List<Object>> map = reportService
		    .channelWisePieChart(clientId,
			    DateFormat.getYYYYMMDDDate(fromdate),
			    DateFormat.getYYYYMMDDDate(todate),
			    "{param=AllChannelNegativePositive}");
	    /*
	     * pieChart.setFromDate(DateFormat.getDDMMYYYYDate(pieChart.getFromDate
	     * ()));
	     * pieChart.setToDate(DateFormat.getDDMMYYYYDate(pieChart.getToDate
	     * ()));
	     */
	    Set set = map.keySet();
	    Iterator iterator = set.iterator();
	    while (iterator.hasNext()) {
		List<Object> ChannelPositiveList = (List<Object>) map
			.get(iterator.next());
		List<Object> ChannelNegativeList = (List<Object>) map
			.get(iterator.next());
		List<Object> ChannelList = (List<Object>) map.get(iterator
			.next());

		model.addAttribute("ChannelPositiveList", ChannelPositiveList);
		model.addAttribute("ChannelNegativeList", ChannelNegativeList);
		model.addAttribute("ChannelList", ChannelList);
		/* model.addAttribute("pieChart",pieChart); */
		model.addAttribute("todate", todate);
		model.addAttribute("clientId", clientId);
		model.addAttribute("fromdate", fromdate);
		model.addAttribute("clientName", clientName);
	    }
	    return "generateChannelWisePieChart";
	}
	if (param != null && param.equals("AllChannelNegativePositive3")) {
	    List clientName = new ArrayList();
	    clientName = clientService.getClientName(clientId);
	    HashMap<String, List<Object>> map = reportService
		    .channelWisePieChart(clientId,
			    DateFormat.getYYYYMMDDDate(fromdate),
			    DateFormat.getYYYYMMDDDate(todate),
			    "{param=AllChannelNegativePositive}");
	    Set set = map.keySet();
	    Iterator iterator = set.iterator();
	    while (iterator.hasNext()) {
		List<Object> ChannelPositiveList = (List<Object>) map
			.get(iterator.next());
		List<Object> ChannelNegativeList = (List<Object>) map
			.get(iterator.next());
		List<Object> ChannelList = (List<Object>) map.get(iterator
			.next());

		model.addAttribute("ChannelPositiveList", ChannelPositiveList);
		model.addAttribute("ChannelNegativeList", ChannelNegativeList);
		model.addAttribute("ChannelList", ChannelList);
		/* model.addAttribute("pieChart",pieChart); */
		model.addAttribute("todate", todate);
		model.addAttribute("clientId", clientId);
		model.addAttribute("fromdate", fromdate);
		model.addAttribute("clientName", clientName);
	    }
	    return "generateChannelWisePieChart2";
	}
	if (param != null && param.equals("AllChannelNegativePositive4")) {
	    List clientName = new ArrayList();
	    clientName = clientService.getClientName(clientId);
	    HashMap<String, List<Object>> map = reportService
		    .channelWisePieChart(clientId,
			    DateFormat.getYYYYMMDDDate(fromdate),
			    DateFormat.getYYYYMMDDDate(todate),
			    "{param=AllChannelNegativePositive}");
	    Set set = map.keySet();
	    Iterator iterator = set.iterator();
	    while (iterator.hasNext()) {
		List<Object> ChannelPositiveList = (List<Object>) map
			.get(iterator.next());
		List<Object> ChannelNegativeList = (List<Object>) map
			.get(iterator.next());
		List<Object> ChannelList = (List<Object>) map.get(iterator
			.next());

		model.addAttribute("ChannelPositiveList", ChannelPositiveList);
		model.addAttribute("ChannelNegativeList", ChannelNegativeList);
		model.addAttribute("ChannelList", ChannelList);
		/* model.addAttribute("pieChart",pieChart); */
		model.addAttribute("todate", todate);
		model.addAttribute("clientId", clientId);
		model.addAttribute("fromdate", fromdate);
		model.addAttribute("clientName", clientName);
	    }
	    return "generateChannelWisePieChart3";
	}
	if (param != null && param.equals("{param=ChannelSector}")) {
	    List clientName = new ArrayList();
	    clientName = clientService.getClientName(pieChart.getClient()
		    .getClientId());
	    HashMap<String, List<Object>> map = reportService
		    .sectorWiseNegativePosReport(pieChart.getClient()
			    .getClientId(), pieChart.getFromDate(), pieChart
			    .getToDate(), pieChart.getChanel().getChannelId(),
			    param);
	    pieChart.setFromDate(DateFormat.getDDMMYYYYDate(pieChart
		    .getFromDate()));
	    pieChart.setToDate(DateFormat.getDDMMYYYYDate(pieChart.getToDate()));
	    Set set = map.keySet();
	    Iterator iterator = set.iterator();
	    while (iterator.hasNext()) {
		List<Object> sectorPositiveList = (List<Object>) map
			.get(iterator.next());
		List<Object> sectorList = (List<Object>) map.get(iterator
			.next());
		List<Object> sectorNegativeList = (List<Object>) map
			.get(iterator.next());
		model.addAttribute("sectorPositiveList", sectorPositiveList);
		model.addAttribute("sectorNegativeList", sectorNegativeList);
		model.addAttribute("sectorList", sectorList);
		model.addAttribute("pieChart", pieChart);
		model.addAttribute("todate", todate);
		model.addAttribute("clientId", clientId);
		model.addAttribute("fromdate", fromdate);
		model.addAttribute("channelId", channelId);
		model.addAttribute("clientName", clientName);
		session = request.getSession();
		session.setAttribute("sectorPositiveList", sectorPositiveList);
		session.setAttribute("sectorNegativeList", sectorNegativeList);
	    }
	    return "generateSectorWisePieCharts";
	}
	if (param != null && param.equals("ChannelSector1")) {
	    List clientName = new ArrayList();
	    clientName = clientService.getClientName(clientId);
	    HashMap<String, List<Object>> map = reportService
		    .sectorWiseNegativePosReport(clientId,
			    DateFormat.getYYYYMMDDDate(fromdate),
			    DateFormat.getYYYYMMDDDate(todate), channelId,
			    "{param=ChannelSector}");
	    Set set = map.keySet();
	    Iterator iterator = set.iterator();
	    while (iterator.hasNext()) {
		List<Object> sectorPositiveList = (List<Object>) map
			.get(iterator.next());
		List<Object> sectorList = (List<Object>) map.get(iterator
			.next());
		List<Object> sectorNegativeList = (List<Object>) map
			.get(iterator.next());
		model.addAttribute("sectorPositiveList", sectorPositiveList);
		model.addAttribute("sectorNegativeList", sectorNegativeList);
		model.addAttribute("sectorList", sectorList);
		model.addAttribute("pieChart", pieChart);
		model.addAttribute("todate", todate);
		model.addAttribute("clientId", clientId);
		model.addAttribute("fromdate", fromdate);
		model.addAttribute("channelId", channelId);
		model.addAttribute("clientName", clientName);
	    }
	    return "generateSectorWisePieCharts1";
	}
	if (param != null && param.equals("ChannelSector2")) {
	    List clientName = new ArrayList();
	    clientName = clientService.getClientName(clientId);
	    HashMap<String, List<Object>> map = reportService
		    .sectorWiseNegativePosReport(clientId,
			    DateFormat.getYYYYMMDDDate(fromdate),
			    DateFormat.getYYYYMMDDDate(todate), channelId,
			    "{param=ChannelSector}");
	    Set set = map.keySet();
	    Iterator iterator = set.iterator();
	    while (iterator.hasNext()) {
		List<Object> sectorPositiveList = (List<Object>) map
			.get(iterator.next());
		List<Object> sectorList = (List<Object>) map.get(iterator
			.next());
		List<Object> sectorNegativeList = (List<Object>) map
			.get(iterator.next());
		model.addAttribute("sectorPositiveList", sectorPositiveList);
		model.addAttribute("sectorNegativeList", sectorNegativeList);
		model.addAttribute("sectorList", sectorList);
		model.addAttribute("pieChart", pieChart);
		model.addAttribute("todate", todate);
		model.addAttribute("clientId", clientId);
		model.addAttribute("fromdate", fromdate);
		model.addAttribute("channelId", channelId);
		model.addAttribute("clientName", clientName);
	    }
	    return "generateSectorWisePieCharts";
	}
	return "piechart";
    }

    /* PDF Report For channel(Electronic Media Tracking) */
    @RequestMapping("/PDFReport")
    public String showPDFReport(Map<String, Object> map, Model model) {
	map.put("PieChart", new PieChart());
	List<Client> clientList = new ArrayList<Client>();
	clientList = clientService.getAllClientName();
	if (clientList != null) {
	    model.addAttribute("client", clientList);
	}
/*	List<Chanel> chanelList = new ArrayList<Chanel>();
	chanelList = chanelService.getAllChanel();
	if (chanelList != null) {
	    model.addAttribute("chanel", chanelList);
	}*/
	List<State> stateList=new ArrayList<State>();
	stateList=stateservice.getAllStateName();
	if(stateList!=null)
	{
	model.addAttribute("state",stateList);
	}
	
	return "PDFReport";
    }

    @RequestMapping(value = "/EMTorPDFReport", method = { RequestMethod.GET,
	    RequestMethod.POST })
    public String genratePDFReport(
	    @ModelAttribute("PieChart") PieChart pieChart,
	    BindingResult result, ModelMap model, HttpServletRequest request,
	    @RequestParam(required = false) String param) {
	pieChartValidator.validate(pieChart, result);
	if (result.hasErrors()) {
	    return "PDFReport";
	}
	List clientName = new ArrayList();
	clientName = clientService.getClientName(pieChart.getClient()
		.getClientId());
	
	//String getStringClientName = (String) clientName.get(0);
	String getStringClientName =	StringUtils.collectionToCommaDelimitedString(clientName);
	List channelName = new ArrayList();
	channelName = chanelService.getChannelName(pieChart.getChanel()
		.getChannelId());
	List<Tracking> pdfTracking = new ArrayList<Tracking>();
	pdfTracking = reportService.EMTPDFReport(pieChart.getFromDate(),
		pieChart.getToDate(), pieChart.getChanel().getChannelId());
	if (pdfTracking != null) {
	    model.addAttribute("pdfTracking", pdfTracking);
	    model.addAttribute("pieChart", pieChart);
	    model.addAttribute("clientName", clientName);
	    model.addAttribute("channelName", channelName);
	}
	return "generatePDFReport";

    }

    /* Generate Image Bar(BarChart) */
    @RequestMapping("/barChart")
    public String showBarChart(Map<String, Object> map, Model model) {
	map.put("PieChart", new PieChart());
	List<Client> clientList = new ArrayList<Client>();
	clientList = clientService.getAllClientName();
	if (clientList != null) {
	    model.addAttribute("client", clientList);
	}
	return "barChart";
    }

    @RequestMapping(value = "/BarChartImage", method = { RequestMethod.GET,
	    RequestMethod.POST })
    public String genrateBarChart(
	    @ModelAttribute("PieChart") PieChart pieChart,
	    BindingResult result, ModelMap model, HttpServletRequest request,
	    @RequestParam(required = false) String param) {

	List clientName = new ArrayList();
	clientName = clientService.getClientName(pieChart.getClient()
		.getClientId());
	List<Object> barChartList = new ArrayList<Object>();
	barChartList = barChartService.barChart(pieChart.getFromDate(),
		pieChart.getToDate(), pieChart.getClient().getClientId());
	pieChart.setFromDate(DateFormat.getDDMMYYYYDate(pieChart.getFromDate()));
	pieChart.setToDate(DateFormat.getDDMMYYYYDate(pieChart.getToDate()));
	if (barChartList != null) {

	    List list = (List) barChartList.get(0);
	    model.addAttribute("dateList", barChartList.get(0));
	    model.addAttribute("markingList", barChartList.get(1));
	    model.addAttribute("channelList", barChartList.get(2));
	    model.addAttribute("dateListSize", list.size());
	    model.addAttribute("clientName", clientName);
	    model.addAttribute("barChartList", barChartList);
	    model.addAttribute("pieChart", pieChart);
	}
	return "generateBarChart";
    }

    /* Advertisement Pie Chart for Channel wise and All Channel */
    @RequestMapping("/advPieChart")
    public String showAdvPieChartReport(Map<String, Object> map, Model model) {
	map.put("PieChart", new PieChart());
	List<Client> clientList = new ArrayList<Client>();
	clientList = clientService.getAllClientName();
	if (clientList != null) {
	    model.addAttribute("client", clientList);
	}
	List<Party> party = new ArrayList<Party>();
	party = advReportService.getAllParty();
	if (party != null) {
	    model.addAttribute("party", party);
	}
	return "advPieChart";
    }

    @RequestMapping(value = "/ADVPieChartReport", method = { RequestMethod.GET,
	    RequestMethod.POST })
    public String genrateAdvPieChartReport(
	    @ModelAttribute("PieChart") PieChart pieChart,
	    BindingResult result, ModelMap model, HttpServletRequest request,
	    @RequestParam(required = false) String param,
	    @RequestParam(required = false) Integer clientId,
	    @RequestParam(required = false) String todate,
	    @RequestParam(required = false) String fromdate,
	    @RequestParam(required = false) Integer partyId[]) {
	if (param != null && param.equals("{param=AllChennal}")) {
	    List clientName = new ArrayList();
	    clientName = clientService.getClientName(pieChart.getClient()
		    .getClientId());
	    List<Object> advList = advReportService.AllChanelPieChart(pieChart
		    .getClient().getClientId(), pieChart.getFromDate(),
		    pieChart.getToDate(), pieChart.getPartyId());
	    pieChart.setFromDate(DateFormat.getDDMMYYYYDate(pieChart
		    .getFromDate()));
	    pieChart.setToDate(DateFormat.getDDMMYYYYDate(pieChart.getToDate()));
	    model.addAttribute("advList", advList);
	    model.addAttribute("clientName", clientName);
	    model.addAttribute("pieChart", pieChart);
	    return "generateAllChannelAdvReport";
	}
	if (param != null && param.equals("{param=Channel}")) {
	    List clientName = new ArrayList();
	    clientName = clientService.getClientName(pieChart.getClient()
		    .getClientId());
	    HashMap<String, List<Object>> map = advReportService
		    .chanelWiseAdvPieChart(pieChart.getClient().getClientId(),
			    pieChart.getFromDate(), pieChart.getToDate(),
			    pieChart.getPartyId());
	    Set set = map.keySet();
	    Iterator iterator = set.iterator();
	    while (iterator.hasNext()) {
		List<Object> advList = (List<Object>) map.get(iterator.next());
		List<Object> ChannelList = (List<Object>) map.get(iterator
			.next());
		pieChart.setFromDate(DateFormat.getDDMMYYYYDate(pieChart
			.getFromDate()));
		pieChart.setToDate(DateFormat.getDDMMYYYYDate(pieChart
			.getToDate()));
		model.addAttribute("advList", advList);
		model.addAttribute("ChannelList", ChannelList);
		model.addAttribute("pieChart", pieChart);
		model.addAttribute("clientName", clientName);
		model.addAttribute("todate", todate);
		model.addAttribute("clientId", clientId);
		model.addAttribute("fromdate", fromdate);
		session = request.getSession();
		session.setAttribute("advList", advList);
	    }
	    return "generateChannelWiseAdvPieChart";
	}
	if (param != null && param.equals("Channel1")) {
	    List clientName = new ArrayList();
	    clientName = clientService.getClientName(clientId);
	    pieChart.setFromDate(DateFormat.getYYYYMMDDDate(pieChart
		    .getFromDate()));
	    pieChart.setToDate(DateFormat.getYYYYMMDDDate(pieChart.getToDate()));
	    HashMap<String, List<Object>> map = advReportService
		    .chanelWiseAdvPieChart(clientId, pieChart.getFromDate(),
			    pieChart.getToDate(), pieChart.getPartyId());
	    Set set = map.keySet();
	    Iterator iterator = set.iterator();
	    while (iterator.hasNext()) {

		List<Object> advList = (List<Object>) map.get(iterator.next());
		List<Object> ChannelList = (List<Object>) map.get(iterator
			.next());
		pieChart.setFromDate(DateFormat.getDDMMYYYYDate(pieChart
			.getFromDate()));
		pieChart.setToDate(DateFormat.getDDMMYYYYDate(pieChart
			.getToDate()));
		model.addAttribute("advList", advList);
		model.addAttribute("ChannelList", ChannelList);
		model.addAttribute("pieChart", pieChart);
		model.addAttribute("clientName", clientName);
		model.addAttribute("todate", todate);
		model.addAttribute("clientId", clientId);
		model.addAttribute("fromdate", fromdate);
	    }
	    return "generateChannelWiseAdvPieChart1";
	}
	if (param != null && param.equals("Channel2")) {
	    List clientName = new ArrayList();
	    clientName = clientService.getClientName(clientId);
	    pieChart.setFromDate(DateFormat.getYYYYMMDDDate(pieChart
		    .getFromDate()));
	    pieChart.setToDate(DateFormat.getYYYYMMDDDate(pieChart.getToDate()));
	    HashMap<String, List<Object>> map = advReportService
		    .chanelWiseAdvPieChart(clientId, pieChart.getFromDate(),
			    pieChart.getToDate(), pieChart.getPartyId());
	    Set set = map.keySet();
	    Iterator iterator = set.iterator();
	    while (iterator.hasNext()) {

		List<Object> advList = (List<Object>) map.get(iterator.next());
		List<Object> ChannelList = (List<Object>) map.get(iterator
			.next());
		pieChart.setFromDate(DateFormat.getDDMMYYYYDate(pieChart
			.getFromDate()));
		pieChart.setToDate(DateFormat.getDDMMYYYYDate(pieChart
			.getToDate()));
		model.addAttribute("advList", advList);
		model.addAttribute("ChannelList", ChannelList);
		model.addAttribute("pieChart", pieChart);
		model.addAttribute("clientName", clientName);
		model.addAttribute("todate", todate);
		model.addAttribute("clientId", clientId);
		model.addAttribute("fromdate", fromdate);
	    }
	    return "generateChannelWiseAdvPieChart";
	}
	return "advPieChart";
    }

    /* Advertisement PDF Report */
    @RequestMapping("/AdvPDFReport")
    public String showAdvPDFReport(Map<String, Object> map, Model model) {
	map.put("PieChart", new PieChart());
	List<Client> clientList = new ArrayList<Client>();
	clientList = clientService.getAllClientName();
	if (clientList != null) {
	    model.addAttribute("client", clientList);
	}
/*	List<Chanel> chanelList = new ArrayList<Chanel>();
	chanelList = chanelService.getAllChanel();
	if (chanelList != null) {
	    model.addAttribute("chanel", chanelList);
	}*/
	List<State> stateList=new ArrayList<State>();
	stateList=stateservice.getAllStateName();
	if(stateList!=null)
	{
	model.addAttribute("state",stateList);
	}
	
	return "AdvPDFReport";
    }

    @RequestMapping(value = "/ADVPDFReport", method = { RequestMethod.GET,
	    RequestMethod.POST })
    public String genrateAdvPDFReport(
	    @ModelAttribute("PieChart") PieChart pieChart,
	    BindingResult result, ModelMap model, HttpServletRequest request,
	    @RequestParam(required = false) String param) {
	pieChartValidator.validate(pieChart, result);
	if (result.hasErrors()) {
	    return "AdvPDFReport";
	}

	List clientName = new ArrayList();
	clientName = clientService.getClientName(pieChart.getClient()
		.getClientId());

	String getStringClientName = (String) clientName.get(0);

	List channelName = new ArrayList();
	channelName = chanelService.getChannelName(pieChart.getChanel()
		.getChannelId());
	List<AdvertisementTracking> advertisementTracking = new ArrayList<AdvertisementTracking>();
	advertisementTracking = advReportService.advPDFReport(pieChart
		.getClient().getClientId(), pieChart.getFromDate(), pieChart
		.getToDate(), pieChart.getChanel().getChannelId());
	if (advertisementTracking != null) {
	    model.addAttribute("advertisementTracking", advertisementTracking);
	    model.addAttribute("clientName", clientName);
	    model.addAttribute("pieChart", pieChart);
	    model.addAttribute("channelName", channelName);
	}
	/*Add on 03-09-14
	 * For counting total duration
	 * Start
	 */
	int totalDuration=0;
	for(AdvertisementTracking advertisementTracking2:advertisementTracking)
	{
	    totalDuration=advertisementTracking2.getDuration()+totalDuration;
	}
	/*Add total duration in request attribute for sending on jsp */
	request.setAttribute("totalDuration", totalDuration);
	
       //End
	
	return "generateAdvPDFReport";
    }

    @RequestMapping("/printPieChart")
    public String showprintPieChart(Map<String, Object> map, Model model) {
	map.put("PieChart", new PieChart());
	List<Client> clientList = new ArrayList<Client>();
	clientList = clientService.getAllClientName();
	if (clientList != null) {
	    model.addAttribute("client", clientList);
	}
	List<Publication> publication = new ArrayList<Publication>();
	publication = printReportService.getAllPublication();
	if (publication != null) {
	    model.addAttribute("publication", publication);
	}
	return "printPieChart";
    }

    @RequestMapping(value = "/PrintPieChartReport", method = {
	    RequestMethod.GET, RequestMethod.POST })
    public String genratePrintReport(
	    @ModelAttribute("PieChart") PieChart pieChart,
	    BindingResult result, ModelMap model, HttpServletRequest request,
	    @RequestParam(required = false) String param) {

	List clientName = new ArrayList();
	clientName = clientService.getClientName(pieChart.getClient()
		.getClientId());

	if (param != null && param.equals("{param=AllPaper}")) {
	    HashMap<String, List<Object>> publicationMap = printReportService
		    .AllpublicationPieChart(pieChart.getClient().getClientId(),
			    pieChart.getFromDate(), pieChart.getToDate(), null,
			    param);
	    pieChart.setFromDate(DateFormat.getDDMMYYYYDate(pieChart
		    .getFromDate()));
	    pieChart.setToDate(DateFormat.getDDMMYYYYDate(pieChart.getToDate()));

	    Set set = publicationMap.keySet();

	    Iterator it = set.iterator();
	    while (it.hasNext()) {
		List<Object> publicationNegitiveList = (List<Object>) publicationMap
			.get(it.next());
		List<Object> publicationList = (List<Object>) publicationMap
			.get(it.next());
		List<Object> publicationPositiveList = (List<Object>) publicationMap
			.get(it.next());
		model.addAttribute("publicationPositiveList",
			publicationPositiveList);
		model.addAttribute("publicationNegitiveList",
			publicationNegitiveList);
		model.addAttribute("publicationList", publicationList);
		model.addAttribute("pieChart", pieChart);
		model.addAttribute("clientName", clientName);
	    }
			return "generateAllChannelPrintPieChart";
	}
	if (param != null && param.equals("{param=Paper}")) {
	    HashMap<String, List<Object>> publicationMap = printReportService
		    .AllpublicationPieChart(pieChart.getClient().getClientId(),
			    pieChart.getFromDate(), pieChart.getToDate(),
			    pieChart.getPublication().getPublicationId(), param);
	    pieChart.setFromDate(DateFormat.getDDMMYYYYDate(pieChart
		    .getFromDate()));
	    pieChart.setToDate(DateFormat.getDDMMYYYYDate(pieChart.getToDate()));

	    Set set = publicationMap.keySet();

	    Iterator it = set.iterator();
	    while (it.hasNext()) {
		List<Object> publicationNegitiveList = (List<Object>) publicationMap
			.get(it.next());
		List<Object> publicationList = (List<Object>) publicationMap
			.get(it.next());
		List<Object> publicationPositiveList = (List<Object>) publicationMap
			.get(it.next());
		model.addAttribute("publicationPositiveList",
			publicationPositiveList);
		model.addAttribute("publicationNegitiveList",
			publicationNegitiveList);
		model.addAttribute("publicationList", publicationList);
		model.addAttribute("pieChart", pieChart);
		model.addAttribute("clientName", clientName);
	    }
	    return "generateAllChannelPrintPieChart";
	}
	if (param != null && param.equals("{param=Sector}")) {
	    HashMap<String, List<Object>> sectorMap = printReportService
		    .sectorWiseAllPublication(pieChart.getClient()
			    .getClientId(), pieChart.getFromDate(), pieChart
			    .getToDate(), null, param);
	    pieChart.setFromDate(DateFormat.getDDMMYYYYDate(pieChart
		    .getFromDate()));
	    pieChart.setToDate(DateFormat.getDDMMYYYYDate(pieChart.getToDate()));

	    Set set = sectorMap.keySet();

	    Iterator it = set.iterator();
	    while (it.hasNext()) {
		List<Object> sectorNegitiveList = (List<Object>) sectorMap
			.get(it.next());
		List<Object> publicationList = (List<Object>) sectorMap.get(it
			.next());
		List<Object> sectorPositiveList = (List<Object>) sectorMap
			.get(it.next());
		model.addAttribute("sectorPositiveList", sectorPositiveList);
		model.addAttribute("sectorNegitiveList", sectorNegitiveList);
		model.addAttribute("publicationList", publicationList);
		model.addAttribute("pieChart", pieChart);
		model.addAttribute("clientName", clientName);

	    }
	    return "generateSectorWiseAllPublicationPieChart";
	}
	if (param != null && param.equals("{param=PaperSector}")) {
	    HashMap<String, List<Object>> sectorMap = printReportService
		    .sectorWiseAllPublication(pieChart.getClient()
			    .getClientId(), pieChart.getFromDate(), pieChart
			    .getToDate(), pieChart.getPublication()
			    .getPublicationId(), param);
	    pieChart.setFromDate(DateFormat.getDDMMYYYYDate(pieChart
		    .getFromDate()));
	    pieChart.setToDate(DateFormat.getDDMMYYYYDate(pieChart.getToDate()));

	    Set set = sectorMap.keySet();

	    Iterator it = set.iterator();
	    while (it.hasNext()) {
		List<Object> sectorNegitiveList = (List<Object>) sectorMap
			.get(it.next());
		List<Object> publicationList = (List<Object>) sectorMap.get(it
			.next());
		List<Object> sectorPositiveList = (List<Object>) sectorMap
			.get(it.next());
		model.addAttribute("sectorPositiveList", sectorPositiveList);
		model.addAttribute("sectorNegitiveList", sectorNegitiveList);
		model.addAttribute("publicationList", publicationList);
		model.addAttribute("pieChart", pieChart);
		model.addAttribute("clientName", clientName);
	    }
	    return "generateSectorWiseAllPublicationPieChart";
	}
	return "printPieChart";
    }

    @RequestMapping("/printPDFReport")
    public String showprintPDFReport(Map<String, Object> map, Model model) {
	map.put("PieChart", new PieChart());
	List<Client> clientList = new ArrayList<Client>();
	clientList = clientService.getAllClientName();
	if (clientList != null) {
	    model.addAttribute("client", clientList);
	}
	List<Publication> publication = new ArrayList<Publication>();
	publication = printReportService.getAllPublication();
	if (publication != null) {
	    model.addAttribute("publication", publication);
	}

	return "printPDFReport";
    }

    @RequestMapping(value = "/PrintPDFReport", method = { RequestMethod.GET,
	    RequestMethod.POST })
    public String printPDF(@ModelAttribute("PieChart") PieChart pieChart,
	    BindingResult result, ModelMap model, HttpServletRequest request,
	    @RequestParam(required = false) String param) {
	
	List clientName = new ArrayList();
	clientName = clientService.getClientName(pieChart.getClient().getClientId());
	
	String getStringClientName = (String) clientName.get(0);
	List publicationName = new ArrayList();
	publicationName = publicationService.getPublicationName(pieChart
		.getPublication().getPublicationId());
	List<PrintTracking> printTracking = new ArrayList<PrintTracking>();
	printTracking = printReportService.printPDFReport(pieChart
		.getFromDate(), pieChart.getToDate(), pieChart.getClient()
		.getClientId(), pieChart.getPublication().getPublicationId());
	if (printTracking != null) {
	    model.addAttribute("printTracking", printTracking);
	    model.addAttribute("pieChart", pieChart);
	    model.addAttribute("clientName", clientName);
	    model.addAttribute("publicationName", publicationName);
	}
	return "generatePrintPDFReport";
    }

    @RequestMapping(value = "/ExcelReport", method = RequestMethod.POST)
    @ResponseBody
    public String generateXls(@ModelAttribute("PieChart") PieChart pieChart,
	    BindingResult result, ModelMap model, HttpServletRequest request,
	    String clientName) {
	String getreportfromDate = request.getParameter("getreportfromDate");
	String getreporttoDate = request.getParameter("getreporttoDate");
	String getreportchannelId = request.getParameter("getreportchannelId");
	String getclientName = request.getParameter("getStringClientName");

	Boolean reportResult;
	reportResult = reportService.getExcelReport(getreportfromDate,
		getreporttoDate, getreportchannelId, getclientName);
	String returnText;
	if (reportResult == true) {
	    returnText = "Report generate successfully.Now please click on the dowload button";
	} else {
	    returnText = "Sorry No Data Found...!";
	}
	return returnText;

    }

    /* Download on client Side Controller Start */

    @RequestMapping(value = "/downloadExcelReport", method = RequestMethod.GET)
    private void download(HttpServletRequest request,
	    HttpServletResponse response) throws IOException {
	//String reportResult = "/home/sumit23/jvm/apache-tomcat-7.0.41/domains/thinkersanalyzers.in/ROOT/WEB-INF/downloads/Emts_MediaExcel_Report.xls";
//	 String reportResult = "/home/dell/Projects/EMTS/target/ROOT/WEB-INF/downloads/Emts_Excel_Report.xls";
     String reportResult = "E:/report/Emts_MediaExcel_Report.xls";


	String appPath = request.getServletPath();
	// String appPath=servletContext.getRealPath("/");
	File downloadFile = new File(reportResult);
	FileInputStream inputStream = new FileInputStream(downloadFile);
	// get MIME type of the file
	String mimeType = null;
	if (mimeType == null) {
	    // set to binary type if MIME mapping not found
	    mimeType = "application/octet-stream";
	}
	// set content attributes for the response
	response.setContentType(mimeType);
	response.setContentLength((int) downloadFile.length());

	// set headers for the response
	String headerKey = "Content-Disposition";
	String headerValue = String.format("attachment; filename=\"%s\"",
		downloadFile.getName());
	response.setHeader(headerKey, headerValue);
	// get output stream of the response
	OutputStream outStream = response.getOutputStream();
	byte[] buffer = new byte[BUFFER_SIZE];
	int bytesRead = -1;
	// write bytes read from the input stream into the output stream
	while ((bytesRead = inputStream.read(buffer)) != -1) {
	    outStream.write(buffer, 0, bytesRead);
	}
	inputStream.close();
	outStream.close();
    }
    /* END */
    @RequestMapping(value = "/AdvExcelReport", method = RequestMethod.POST)
    @ResponseBody
    public String generateAdvXLS(@ModelAttribute("PieChart") PieChart pieChart,
	    BindingResult result, ModelMap model, HttpServletRequest request,
	    String getStringClientName) {
	String getAdvReportfromDate = request
		.getParameter("getAdvReportfromDate");
	String getAdvReporttoDate = request.getParameter("getAdvReporttoDate");
	String getAdvReportchanelid = request
		.getParameter("getAdvReportchanelid");
	String getAdvReportclientId = request
		.getParameter("getAdvReportclientId");
	String getclientName = request.getParameter("getStringClientName");
	Boolean advReportResult;
	advReportResult = reportService.getAdvExcelReport(getAdvReportfromDate,
		getAdvReporttoDate, getAdvReportchanelid, getAdvReportclientId,
		getclientName);
	String returnText;
	if (advReportResult == true) {
	    returnText = "Report generate successfully. Now please click on the dowload button";
	} else {
	    returnText = "No Data Found.";
	}
	return returnText;
    }
    /* Download on client Side Controller Start */
    @RequestMapping(value = "/downloadAdvExcelReport", method = RequestMethod.GET)
    private void downloadAdv(HttpServletRequest request,
	    HttpServletResponse response) throws IOException {
	// TODO Auto-generated method stub

	// String reportResult = "/home/sumit23/jvm/apache-tomcat-7.0.41/domains/thinkersanalyzers.in/ROOT/WEB-INF/downloads/Emts_AdvExcel_Report.xls";
//	 String reportResult = "/home/dell/Projects/EMTS/target/ROOT/WEB-INF/downloads/Emts_AdvExcel_Report.xls";
String reportResult = "E:/report/Emts_AdvExcel_Report.xls";

	String appPath = request.getServletPath();
	File downloadFile = new File(reportResult);
	FileInputStream inputStream = new FileInputStream(downloadFile);
	// get MIME type of the file
	String mimeType = null;
	if (mimeType == null) {
	    // set to binary type if MIME mapping not found
	    mimeType = "application/octet-stream";
	}
	// set content attributes for the response
	response.setContentType(mimeType);
	response.setContentLength((int) downloadFile.length());
	// set headers for the response
	String headerKey = "Content-Disposition";
	String headerValue = String.format("attachment; filename=\"%s\"",
		downloadFile.getName());
	response.setHeader(headerKey, headerValue);
	// get output stream of the response
	OutputStream outStream = response.getOutputStream();
	byte[] buffer = new byte[BUFFER_SIZE];
	int bytesRead = -1;
	// write bytes read from the input stream into the output stream
	while ((bytesRead = inputStream.read(buffer)) != -1) {
	    outStream.write(buffer, 0, bytesRead);
	}
	inputStream.close();
	outStream.close();
    }

    /* END */

    @RequestMapping(value = "/printExcelReport", method = RequestMethod.POST)
    @ResponseBody
    public String generatePrintXLS(
	    @ModelAttribute("PieChart") PieChart pieChart,
	    BindingResult result, ModelMap model, HttpServletRequest request,
	    String getStringClientName) {
	String getPrintReportfromDate = request
		.getParameter("getPrintReportfromDate");
	String getPrintReporttoDate = request
		.getParameter("getPrintReporttoDate");
	String getPrintReportpublicationId = request
		.getParameter("getPrintReportpublicationId");
	String getPrintReportclientId = request
		.getParameter("getPrintReportclientId");
	String getclientName = request.getParameter("getStringClientName");
	Boolean printReportResult;
	printReportResult = reportService.getPrintExcelReport(
		getPrintReportfromDate, getPrintReporttoDate,
		getPrintReportpublicationId, getPrintReportclientId,
		getclientName);
	String returnText;
	if (printReportResult == true) {
	    returnText = "Report generate successfully.Now please click on the dowload button";
	} else {
	    returnText = "No Data Found.";
	}
	return returnText;
    }

    /* Download on client Side Controller Start */

    @RequestMapping(value = "/downloadPrintExcelReport", method = RequestMethod.GET)
    private void downloadPrintReport(HttpServletRequest request,
	    HttpServletResponse response) throws IOException {

//	String reportResult = "/home/sumit23/jvm/apache-tomcat-7.0.41/domains/thinkersanalyzers.in/ROOT/WEB-INF/downloads/Emts_PrintExcel_Report.xls";
//	 String reportResult="/home/dell/Projects/EMTS/target/ROOT/WEB-INF/downloads/Emts_PrintExcel_Report.xls";
   String reportResult = "E:/report/Emts_PrintExcel_Report.xls";
	String appPath = request.getServletPath();
	File downloadFile = new File(reportResult);
	FileInputStream inputStream = new FileInputStream(downloadFile);
	// get MIME type of the file
	String mimeType = null;
	if (mimeType == null) {
	    // set to binary type if MIME mapping not found
	    mimeType = "application/octet-stream";
	}
	// set content attributes for the response
	response.setContentType(mimeType);
	response.setContentLength((int) downloadFile.length());
	// set headers for the response
	String headerKey = "Content-Disposition";
	String headerValue = String.format("attachment; filename=\"%s\"",
		downloadFile.getName());
	response.setHeader(headerKey, headerValue);

	// get output stream of the response
	OutputStream outStream = response.getOutputStream();

	byte[] buffer = new byte[BUFFER_SIZE];
	int bytesRead = -1;

	// write bytes read from the input stream into the output stream
	while ((bytesRead = inputStream.read(buffer)) != -1) {
	    outStream.write(buffer, 0, bytesRead);
	}
	inputStream.close();
	outStream.close();
    }
}
/* END */
