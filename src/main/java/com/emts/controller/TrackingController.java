package com.emts.controller;

import java.io.UnsupportedEncodingException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.imageio.spi.RegisterableService;
import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.support.SessionStatus;

import com.emts.model.AdvType;
import com.emts.model.AdvertisementTracking;
import com.emts.model.Chanel;
import com.emts.model.City;
import com.emts.model.Client;
import com.emts.model.NewsType;
import com.emts.model.Party;
import com.emts.model.PieChart;
import com.emts.model.PopUp;
import com.emts.model.PrintTracking;
import com.emts.model.Publication;
import com.emts.model.Registration;
import com.emts.model.Sector;
import com.emts.model.State;
import com.emts.model.SubSector;
import com.emts.model.Tracking;
import com.emts.service.AdvTrackingService;
import com.emts.service.ChanelService;
import com.emts.service.CityService;
import com.emts.service.ClientService;
import com.emts.service.PopUpService;
import com.emts.service.PrintTrackService;
import com.emts.service.PublicationService;
import com.emts.service.RegistrationService;
import com.emts.service.SaveTrackService;
import com.emts.service.SearchStoryCodeService;
import com.emts.service.SectorService;
import com.emts.service.StateService;
import com.emts.service.SubSectorService;
import com.emts.util.DateFormat;
import com.emts.validator.AdvTrackingValidator;
import com.emts.validator.PrintTrackingValidator;
import com.emts.validator.SaveTrackingValidator;

@Controller
public class TrackingController {

	@Autowired
	private SaveTrackingValidator saveTrackingValidator;

	@Autowired
	private AdvTrackingService advTrackingService;

	@Autowired
	private SaveTrackService saveTrackService;

	@Autowired
	private AdvTrackingValidator advTrackingValidator;

	@Autowired
	private PrintTrackService printTrackService;

	@Autowired
	private PrintTrackingValidator printTrackingValidator;

	@Autowired
	private SearchStoryCodeService storyCodeService;

	@Autowired
	private StateService stateservice;

	@Autowired
	private ClientService clientService;

	@Autowired
	private SectorService sectorService;

	@Autowired
	private SubSectorService subSectorService;

	@Autowired
	private ChanelService chanelService;

	@Autowired
	private CityService cityService;

	@Autowired
	private PublicationService publicationService;

	/* Save Tracking Controller Start */
	@RequestMapping(value = "/savetracking", method = RequestMethod.GET)
	public String savetracking(@ModelAttribute("Tracking") Tracking tracking,
			HttpServletRequest request, Model model) {
		System.out.println("Tracking Controller");
		List<State> stateList = new ArrayList<State>();
		stateList = stateservice.getAllStateName();
		if (stateList != null) {
			model.addAttribute("state", stateList);
		}
		/*
		 * List<City> cityList=new ArrayList<City>();
		 * cityList=cityService.getAllCity(); if(cityList!=null) {
		 * model.addAttribute("city", cityList); }
		 */
		List<Sector> sectorList = new ArrayList<Sector>();
		sectorList = sectorService.getAllSector();
		if (sectorList != null) {
			model.addAttribute("sector", sectorList);
		}
		List<SubSector> subSectorList = new ArrayList<SubSector>();
		subSectorList = subSectorService.getAllSubSector();
		if (subSectorList != null) {
			model.addAttribute("subsector", subSectorList);
		}
		/*
		 * List<Chanel> chanelList=new ArrayList<Chanel>();
		 * chanelList=chanelService.getAllChanel(); if(chanelList!=null) {
		 * model.addAttribute("chanel", chanelList); }
		 */
		List<Client> clientList = new ArrayList<Client>();
		clientList = clientService.getAllClientName();
		if (clientList != null) {
			model.addAttribute("client", clientList);
		}
		List<NewsType> newsType = new ArrayList<NewsType>();
		newsType = saveTrackService.getAllNewsType();
		if (newsType != null) {
			model.addAttribute("newsType", newsType);
		}
		List<Tracking> trackingContent = new ArrayList<Tracking>();
		HttpSession session1 = request.getSession(); // get Session value and
														// set it into Tracking
														// model
		Registration member = (Registration) session1.getAttribute("member"); // where
																				// Mapping
																				// is
																				// arrived
																				// for
																				// User_Id
		System.out.println("member.getRegistrationId()=== "
				+ member.getRegistrationId());
		trackingContent = saveTrackService.getContent(member
				.getRegistrationId());
		if (trackingContent != null) {
			model.addAttribute("trackingContent", trackingContent);
		}
		return "savetracking";
	}

	@RequestMapping(value = "/SaveTrackAdd", method = { RequestMethod.GET,
			RequestMethod.POST })
	public String addSaveTrack(@ModelAttribute("Tracking") Tracking tracking,
			BindingResult result, ModelMap model, HttpServletRequest request,
			@RequestParam(required = false) Integer trackingId,
			@RequestParam(required = false) String isRepeat)
			throws ParseException {
		List<State> stateList = new ArrayList<State>();
		List<City> cityList = new ArrayList<City>();
		List<Sector> sectorList = new ArrayList<Sector>();
		List<SubSector> subSectorList = new ArrayList<SubSector>();
		List<Chanel> chanelList = new ArrayList<Chanel>();
		List<Client> clientList = new ArrayList<Client>();
		List<NewsType> newsType = new ArrayList<NewsType>();

		List<Tracking> trackingContent = new ArrayList<Tracking>();

		HttpSession session1 = request.getSession(); // get Session value and
														// set it into Tracking
														// model
		Registration member = (Registration) session1.getAttribute("member"); // where
																				// Mapping
																				// is
																				// arrived
																				// for
																				// User_Id
		tracking.setRegistration(member); // this User_Id set in database
		System.out.println(tracking.getRegistration().getRegistrationId());

		/* model.addAttribute("registration", ID); */

		String method = request.getMethod();
		if (method.equals("GET")) {
			tracking = saveTrackService.updateTracking(trackingId);
			tracking.setDate(DateFormat.getDDMMYYYYDate(tracking.getDate()));
			if (isRepeat != null && isRepeat.equals("Y")) {
				tracking.setIsRepeat(true);
			} else {
				tracking.setIsRepeat(false);
			}
			model.put("Tracking", tracking);
			trackingContent = saveTrackService.getContent(member
					.getRegistrationId());
			model.addAttribute("trackingContent", trackingContent);
		} else {
			saveTrackingValidator.validate(tracking, result);
			if (result.hasErrors()) {
				stateList = stateservice.getAllStateName();
				model.addAttribute("state", stateList);
				cityList = cityService.getAllCity();
				model.addAttribute("city", cityList);
				chanelList = chanelService.getAllChanel();
				model.addAttribute("chanel", chanelList);
				clientList = clientService.getAllClientName();
				model.addAttribute("client", clientList);
				sectorList = sectorService.getAllSector();
				model.addAttribute("sector", sectorList);
				subSectorList = subSectorService.getAllSubSector();
				model.addAttribute("subsector", subSectorList);
				newsType = saveTrackService.getAllNewsType();
				model.addAttribute("newsType", newsType);

				trackingContent = saveTrackService.getContent(member
						.getRegistrationId());
				model.addAttribute("trackingContent", trackingContent);
				return "savetracking";
			}
			if (tracking.getIsRepeat() == null) {
				saveTrackService.addSaveTracking(tracking);
			} else {
				if (tracking.getIsRepeat()) {
					tracking.setTrackingId(null);
					saveTrackService.addSaveTracking(tracking);
				} else {
					saveTrackService.addSaveTracking(tracking);
				}
			}
			trackingContent = saveTrackService.getContent(member
					.getRegistrationId());
			if (trackingContent != null) {
				model.addAttribute("trackingContent", trackingContent);
			}
			model.put("Tracking", new Tracking());

		}
		stateList = stateservice.getAllStateName();
		if (stateList != null) {
			model.addAttribute("state", stateList);
		}

		cityList = cityService.getAllCity();
		if (cityList != null) {
			model.addAttribute("city", cityList);
		}

		sectorList = sectorService.getAllSector();
		if (sectorList != null) {
			model.addAttribute("sector", sectorList);
		}

		subSectorList = subSectorService.getAllSubSector();
		if (subSectorList != null) {
			model.addAttribute("subsector", subSectorList);
		}

		chanelList = chanelService.getAllChanel();
		if (chanelList != null) {
			model.addAttribute("chanel", chanelList);
		}

		clientList = clientService.getAllClientName();
		if (clientList != null) {
			model.addAttribute("client", clientList);
		}

		model.addAttribute("client", clientList);

		newsType = saveTrackService.getAllNewsType();
		if (newsType != null) {
			model.addAttribute("newsType", newsType);
		}
		return "savetracking";
	}

	@RequestMapping(value = "/trackingContent/{id}")
	public String deleteTrack(@PathVariable("id") Integer id) {
		System.out.println("hiiii");
		saveTrackService.deleteTracking(id);
		return "redirect:/savetracking.do";
	}

	/* Save Tracking Controller End */

	/* Advertisement Controller Start */
	@RequestMapping(value = "/advertisement", method = RequestMethod.GET)
	public String advertisement(
			@ModelAttribute("AdvertisementTracking") AdvertisementTracking advtracking,
			HttpServletRequest request, Model model) {
		List<State> stateList = new ArrayList<State>();
		stateList = stateservice.getAllStateName();
		if (stateList != null) {
			model.addAttribute("state", stateList);
		}
		/*
		 * List<City> cityList=new ArrayList<City>();
		 * cityList=cityService.getAllCity(); if(cityList!=null) {
		 * model.addAttribute("city", cityList); } List<Chanel> chanelList=new
		 * ArrayList<Chanel>(); chanelList=chanelService.getAllChanel();
		 * if(chanelList!=null) { model.addAttribute("chanel", chanelList); }
		 */
		List<Client> clientList = new ArrayList<Client>();
		clientList = clientService.getAllClientName();
		if (clientList != null) {
			model.addAttribute("client", clientList);
		}
		List<Party> party = new ArrayList<Party>();
		party = advTrackingService.getAllParty();
		if (party != null) {
			model.addAttribute("party", party);
		}
		List<AdvType> advType = new ArrayList<AdvType>();
		advType = advTrackingService.getAlladvType();
		if (advType != null) {
			model.addAttribute("advType", advType);
		}
		List<AdvertisementTracking> advTrackingContent = new ArrayList<AdvertisementTracking>();

		HttpSession session1 = request.getSession(); // get Session value and
														// set it into Tracking
														// model
		Registration member = (Registration) session1.getAttribute("member"); // where
																				// Mapping
																				// is
																				// arrived
																				// for
																				// User_Id
		advTrackingContent = advTrackingService.getContent(member
				.getRegistrationId());
		if (advTrackingContent != null) {
			model.addAttribute("advTrackingContent", advTrackingContent);
		}
		return "advertisement";
	}

	@RequestMapping(value = "/AdvTrackingAdd", method = { RequestMethod.GET,
			RequestMethod.POST })
	public String addAdvTrack(
			@ModelAttribute("AdvertisementTracking") AdvertisementTracking advTracking,
			BindingResult result, ModelMap model, HttpServletRequest request,
			HttpServletResponse response,
			@RequestParam(required = false) Integer advertismentId,
			@RequestParam(required = false) String isRepeat)
			throws UnsupportedEncodingException {

		List<State> stateList = new ArrayList<State>();
		List<City> cityList = new ArrayList<City>();
		List<Chanel> chanelList = new ArrayList<Chanel>();
		List<Client> clientList = new ArrayList<Client>();
		List<Party> party = new ArrayList<Party>();
		List<AdvType> advType = new ArrayList<AdvType>();
		List<AdvertisementTracking> advTrackingContent = new ArrayList<AdvertisementTracking>();
		System.out.println("Advertisement Controller---"
				+ advTracking.getTextArea());
		HttpSession session1 = request.getSession(); // get Session value and
														// set it into Tracking
														// model
		Registration member = (Registration) session1.getAttribute("member"); // where
																				// Mapping
																				// is
																				// arrived
																				// for
																				// User_Id
		advTracking.setRegistration(member); // this User_Id set in database
		System.out.println(advTracking.getRegistration().getRegistrationId());
		if (request.getCharacterEncoding() == null) {
			response.setCharacterEncoding("UTF-8");
			response.setContentType("text/html; charset=utf-8");
			request.setCharacterEncoding("UTF-8");
		}
		String method = request.getMethod();
		if (method.equals("GET")) {
			advTracking = advTrackingService.updateAdvTracking(advertismentId);
			advTracking.setDate(DateFormat.getDDMMYYYYDate(advTracking
					.getDate()));
			if (isRepeat != null && isRepeat.equals("Y")) {
				advTracking.setIsRepeat(true);
			} else {
				advTracking.setIsRepeat(false);
			}
			model.put("AdvertisementTracking", advTracking);
			advTrackingContent = advTrackingService.getContent(member
					.getRegistrationId());
			model.addAttribute("advTrackingContent", advTrackingContent);
		} else {
			advTrackingValidator.validate(advTracking, result);
			if (result.hasErrors()) {
				stateList = stateservice.getAllStateName();
				model.addAttribute("state", stateList);
				cityList = cityService.getAllCity();
				model.addAttribute("city", cityList);
				chanelList = chanelService.getAllChanel();
				model.addAttribute("chanel", chanelList);
				clientList = clientService.getAllClientName();
				model.addAttribute("client", clientList);
				party = advTrackingService.getAllParty();
				model.addAttribute("party", party);
				advType = advTrackingService.getAlladvType();
				model.addAttribute("advType", advType);
				advTrackingContent = advTrackingService.getContent(member
						.getRegistrationId());
				model.addAttribute("advTrackingContent", advTrackingContent);
				return "advertisement";
			}
			// TODO:
			if (advTracking.getIsRepeat() == null) {
				advTrackingService.addAdvTracking(advTracking);
			} else {
				if (advTracking.getIsRepeat()) {
					advTracking.setAdvertismentId(null);
					advTrackingService.addAdvTracking(advTracking);
				} else {
					advTrackingService.addAdvTracking(advTracking);
				}
			}
			advTrackingContent = advTrackingService.getContent(member
					.getRegistrationId());
			if (advTrackingContent != null) {
				model.addAttribute("advTrackingContent", advTrackingContent);
			}
			model.put("AdvertisementTracking", new AdvertisementTracking());
		}

		stateList = stateservice.getAllStateName();
		if (stateList != null) {
			model.addAttribute("state", stateList);
		}

		cityList = cityService.getAllCity();
		if (cityList != null) {
			model.addAttribute("city", cityList);
		}

		chanelList = chanelService.getAllChanel();
		if (chanelList != null) {
			model.addAttribute("chanel", chanelList);
		}

		clientList = clientService.getAllClientName();
		if (clientList != null) {
			model.addAttribute("client", clientList);
		}

		party = advTrackingService.getAllParty();
		if (party != null) {
			model.addAttribute("party", party);
		}

		advType = advTrackingService.getAlladvType();
		if (advType != null) {
			model.addAttribute("advType", advType);
		}
		return "advertisement";
	}

	@RequestMapping(value = "/advTrackingContent/{id}")
	public String deleteAdvTrack(@PathVariable("id") Integer id) {
		System.out.println("hiiii");
		advTrackingService.deleteAdvTracking(id);
		return "redirect:/advertisement.do";
	}

	/* Advertisement Controller End */
	/* Save Print Tracking Controller Start */
	@RequestMapping(value = "/saveprinttracking", method = RequestMethod.GET)
	public String saveprinttracking(
			@ModelAttribute("PrintTracking") PrintTracking printTracking,
			HttpServletRequest request, ModelMap model) {
		List<State> stateList = new ArrayList<State>();
		stateList = stateservice.getAllStateName();
		if (stateList != null) {
			model.addAttribute("state", stateList);
		}
		/*
		 * List<City> cityList=new ArrayList<City>();
		 * cityList=cityService.getAllCity(); if(cityList!=null) {
		 * model.addAttribute("city", cityList); }
		 */
		List<Sector> sectorList = new ArrayList<Sector>();
		sectorList = sectorService.getAllSector();
		if (sectorList != null) {
			model.addAttribute("sector", sectorList);
		}
		List<SubSector> subSectorList = new ArrayList<SubSector>();
		subSectorList = subSectorService.getAllSubSector();
		if (subSectorList != null) {
			model.addAttribute("subsector", subSectorList);
		}
		/*
		 * List<Publication> publication = new ArrayList<Publication>();
		 * publication = printTrackService.getAllPublication(); if (publication
		 * != null) { model.addAttribute("publication", publication); }
		 */
		List<Client> clientList = new ArrayList<Client>();
		clientList = clientService.getAllClientName();
		if (clientList != null) {
			model.addAttribute("client", clientList);
		}
		List<PrintTracking> prinTrackingContent = new ArrayList<PrintTracking>();
		HttpSession session1 = request.getSession(); // get Session value and
														// set it into Tracking
														// model
		Registration member = (Registration) session1.getAttribute("member");
		prinTrackingContent = printTrackService.getContent(member
				.getRegistrationId());
		if (prinTrackingContent != null) {
			model.addAttribute("prinTrackingContent", prinTrackingContent);
		}
		return "saveprinttracking";
	}

	@RequestMapping(value = "/PrintTrackAdd", method = { RequestMethod.GET,
			RequestMethod.POST })
	public String addPrintTrack(
			@ModelAttribute("PrintTracking") PrintTracking printTracking,
			BindingResult result, ModelMap model, HttpServletRequest request,
			@RequestParam(required = false) Integer printTrackingId,
			@RequestParam(required = false) String isRepeat) {
		List<State> stateList = new ArrayList<State>();
		List<City> cityList = new ArrayList<City>();
		List<Sector> sectorList = sectorService.getAllSector();
		List<SubSector> subSectorList = new ArrayList<SubSector>();
		List<Client> clientList = new ArrayList<Client>();
		List<Publication> publication = new ArrayList<Publication>();
		List<PrintTracking> prinTrackingContent = new ArrayList<PrintTracking>();
		HttpSession session1 = request.getSession(); // get Session value and
														// set it into Tracking
														// model
		Registration member = (Registration) session1.getAttribute("member"); // where
																				// Mapping
																				// is
																				// arrived
																				// for
																				// User_Id
		printTracking.setRegistration(member); // this User_Id set in database
		System.out.println(printTracking.getRegistration().getRegistrationId());

		String method = request.getMethod();
		if (method.equals("GET")) {
			printTracking = printTrackService
					.updatePrintTracking(printTrackingId);
			printTracking.setDate(DateFormat.getDDMMYYYYDate(printTracking
					.getDate()));
			if (isRepeat != null && isRepeat.equals("Y")) {
				printTracking.setIsRepeat(true);
			} else {
				printTracking.setIsRepeat(false);
			}
			model.put("PrintTracking", printTracking);
			prinTrackingContent = printTrackService.getContent(member
					.getRegistrationId());
			model.addAttribute("prinTrackingContent", prinTrackingContent);
		} else {
			printTrackingValidator.validate(printTracking, result);
			if (result.hasErrors()) {
				stateList = stateservice.getAllStateName();
				model.addAttribute("state", stateList);
				cityList = cityService.getAllCity();
				model.addAttribute("city", cityList);
				sectorList = sectorService.getAllSector();
				model.addAttribute("sector", sectorList);
				subSectorList = subSectorService.getAllSubSector();
				model.addAttribute("subsector", subSectorList);
				clientList = clientService.getAllClientName();
				model.addAttribute("client", clientList);
				publication = printTrackService.getAllPublication();
				model.addAttribute("publication", publication);
				prinTrackingContent = printTrackService.getContent(member
						.getRegistrationId());
				model.addAttribute("prinTrackingContent", prinTrackingContent);
				return "saveprinttracking";
			}
			if (printTracking.getIsRepeat() == null) {
				printTrackService.addPrintTrack(printTracking);
			} else {
				if (printTracking.getIsRepeat()) {
					printTracking.setPrintTrackingId(null);
					printTrackService.addPrintTrack(printTracking);
				} else {
					printTrackService.addPrintTrack(printTracking);
				}
			}
			prinTrackingContent = printTrackService.getContent(member
					.getRegistrationId());
			if (prinTrackingContent != null) {
				model.addAttribute("prinTrackingContent", prinTrackingContent);
			}
			model.put("PrintTracking", new PrintTracking());
		}
		stateList = stateservice.getAllStateName();
		if (stateList != null) {
			model.addAttribute("state", stateList);
		}
		cityList = cityService.getAllCity();
		if (cityList != null) {
			model.addAttribute("city", cityList);
		}
		sectorList = sectorService.getAllSector();
		if (sectorList != null) {
			model.addAttribute("sector", sectorList);
		}
		subSectorList = subSectorService.getAllSubSector();
		if (subSectorList != null) {
			model.addAttribute("subsector", subSectorList);
		}
		clientList = clientService.getAllClientName();
		if (clientList != null) {
			model.addAttribute("client", clientList);
		}
		publication = printTrackService.getAllPublication();
		if (publication != null) {
			model.addAttribute("publication", publication);
		}
		return "saveprinttracking";
	}

	@RequestMapping(value = "/prinTrackingContent/{id}")
	public String deletePrintTrack(@PathVariable("id") Integer id) {
		System.out.println("hiiii");
		printTrackService.deletePrintTrack(id);
		return "redirect:/saveprinttracking.do";

		/* Save Print Tracking Controller End */
	}

	@RequestMapping("/search")
	public String search(Map<String, Object> map, Model model) {
		map.put("PieChart", new PieChart());
		return "search";
	}

	@RequestMapping(value = "/StoryCode", method = { RequestMethod.GET,
			RequestMethod.POST })
	public String searchCode(@ModelAttribute("PieChart") PieChart storyCode,
			BindingResult result, ModelMap model, HttpServletRequest request) {
		List<Object> searchResult = new ArrayList<Object>();
		searchResult = storyCodeService
				.SeachStoryCode(storyCode.getStoryCode());
		if (searchResult != null) {
			model.addAttribute("trackingStoryCodeList", searchResult.get(0));
			model.addAttribute("publicationStoryCodeList", searchResult.get(1));
		}
		return "login";
	}

	@RequestMapping(value = "/channelByStateID", method = RequestMethod.GET)
	@ResponseBody
	public Map<String, List<Object>> getChannelByStateID(
			@RequestParam Integer stateId) {
		System.out.println("stateId ID" + stateId);
		List<Object> channelList = new ArrayList<Object>();
		Map<String, List<Object>> channelMap = new HashMap<String, List<Object>>();
		if (stateId != null) {
			channelList = chanelService.getChannelByState(stateId);
			System.out.println("stateList on Controller" + channelList.get(0));
			channelMap.put("channelListByStateID", channelList);
		}
		return channelMap;
	}

	@RequestMapping(value = "/cityByStateID", method = RequestMethod.GET)
	@ResponseBody
	public Map<String, List<Object>> getCitylByStateID(
			@RequestParam Integer stateId) {
		System.out.println("stateId ID" + stateId);
		List<Object> cityList = new ArrayList<Object>();
		Map<String, List<Object>> cityMap = new HashMap<String, List<Object>>();
		if (stateId != null) {
			cityList = cityService.getcityByState(stateId);
			System.out.println("cityList on Controller" + cityList.get(0));
			cityMap.put("cityListByStateID", cityList);
		}
		return cityMap;
	}

	@RequestMapping(value = "/publicationByStateID", method = RequestMethod.GET)
	@ResponseBody
	public Map<String, List<Object>> getPublicationlByStateID(
			@RequestParam Integer stateId) {
		System.out.println("stateId ID" + stateId);
		List<Object> publicationList = new ArrayList<Object>();
		Map<String, List<Object>> publicationMap = new HashMap<String, List<Object>>();
		if (stateId != null) {
			publicationList = publicationService.getpublicationByState(stateId);
			System.out.println("publicationList on Controller"
					+ publicationList.get(0));
			publicationMap.put("publicationListByStateID", publicationList);
		}
		return publicationMap;
	}
}
