package com.emts.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
import org.springframework.web.servlet.ModelAndView;

import com.emts.model.AdvType;
import com.emts.model.Chanel;
import com.emts.model.City;
import com.emts.model.Client;
import com.emts.model.Country;
import com.emts.model.Party;
import com.emts.model.PieChart;
import com.emts.model.PopUp;
import com.emts.model.Publication;
import com.emts.model.Registration;
import com.emts.model.Sector;
import com.emts.model.State;
import com.emts.model.SubSector;
import com.emts.model.Tracking;
import com.emts.model.User;
import com.emts.service.AdvTypeService;
import com.emts.service.ChanelService;
import com.emts.service.CityService;
import com.emts.service.ClientService;
import com.emts.service.CountryService;
import com.emts.service.ForgotService;
import com.emts.service.LoginService;
import com.emts.service.PartyService;
import com.emts.service.PopUpService;
import com.emts.service.PublicationService;
import com.emts.service.RegistrationService;
import com.emts.service.SectorService;
import com.emts.service.StateService;
import com.emts.service.SubSectorService;
import com.emts.validator.AdvTypeValidator;
import com.emts.validator.ChanelValidator;
import com.emts.validator.CityValidator;
import com.emts.validator.ClientValidator;
import com.emts.validator.CountryValidator;
import com.emts.validator.LoginValidator;
import com.emts.validator.PartyValidator;
import com.emts.validator.PopUpValidator;
import com.emts.validator.PublicationValidator;
import com.emts.validator.RegistrationValidator;
import com.emts.validator.SectorValidator;
import com.emts.validator.StateValidator;
import com.emts.validator.SubSectorValidator;

/**
 * @author ajay.jirati
 * 
 */
@SuppressWarnings("all")
@Controller
public class LoginController {

	@Autowired
	private LoginService loginService;

	@Autowired
	private LoginValidator loginValidator;

	@Autowired
	private PublicationService publicationService;

	@Autowired
	private PublicationValidator publicationValidator;

	@Autowired
	private PopUpService popupservice;

	@Autowired
	private PartyService partyService;

	@Autowired
	private PartyValidator partyValidator;

	@Autowired
	private StateService stateservice;

	@Autowired
	private StateValidator statevalidator;

	@Autowired
	private CityService cityservice;

	@Autowired
	private CityValidator cityvalidator;

	@Autowired
	private RegistrationService registrationservice;

	@Autowired
	private ChanelService chanelservice;

	@Autowired
	private ChanelValidator chanelvalidator;

	@Autowired
	private CountryService countryservice;

	@Autowired
	private CountryValidator countryvalidator;

	@Autowired
	private SectorValidator sectorvalidator;

	@Autowired
	private SectorService sectorservice;

	@Autowired
	private SubSectorValidator subsectorvalidator;

	@Autowired
	private SubSectorService subsectorservice;

	@Autowired
	private AdvTypeValidator advtypevalidator;

	@Autowired
	private AdvTypeService advtypeservice;

	@Autowired
	private ClientService clientService;

	@Autowired
	private ClientValidator clientValidator;

	@Autowired
	private RegistrationValidator registrationValidator;

	@Autowired
	private ForgotService forgotService;

	@Autowired
	private PopUpValidator popUpValidator;

	/** Method for first landing page */
	@RequestMapping(value = "/welcome", method = RequestMethod.GET)
	public String welcome(@ModelAttribute("Member") Registration member) {
		return "loginPage";
	}

	@RequestMapping(value = "/onloginSubmit", method = { RequestMethod.POST })
	public String login(@ModelAttribute("Member") Registration member,
			BindingResult result, ModelMap model, SessionStatus status,
			HttpServletRequest request, HttpServletResponse response) {
		loginValidator.validate(member, result);
		if (result.hasErrors()) {
			return "loginPage";
		}
		member = loginService.findByEmailAndPassword(member);
		if (member == null) {
		    result.rejectValue("email", "error.email.isExist");
			return "loginPage";
		}
		if(member.getIsDeleted()==0)
		{
		    result.rejectValue("email", "error.email.notexist");
		    return "loginPage";
		}
		
		List<PopUp> popupList = new ArrayList<PopUp>();
		popupList = popupservice.getmessage(); 
		model.addAttribute("popupList", popupList);
		
		System.out.println(member.getFirstName());
		System.out.println(member.getIsDeleted());
		HttpSession session = request.getSession();
		session.setAttribute("member", member);
		
		System.out.println(member.getFirstName());
		
		
		// request.getSession().setAttribute(IConstant.SESSION_LOGGEDIN_USER,
		// member);
		// model.addAttribute("userName", member.getFirstName());
		return "login";
	}

	/* Login Controller End */
	/* Registration Controller Start */
	@RequestMapping("/registration")
	public String NewUser(Map<String, Object> map, Model model) {
		map.put("Member", new Registration());
		return "registration";
	}

	@RequestMapping(value = "/add", method = RequestMethod.POST)
	public String addContact(@ModelAttribute("Member") Registration reg,
			BindingResult result, ModelMap model, Map<String, Object> map) {
		registrationValidator.validate(reg, result);
		if (result.hasErrors()) {
			return "registration";
		}
		registrationservice.addUser(reg);
		return "registration";
	}

	/* Registration Controller End */
	/* State Controller Start */
	@RequestMapping("/state")
	public String newState(Map<String, Object> map, Model model) {
		map.put("State", new State());
		List<Country> countryList = new ArrayList<Country>();
		countryList = countryservice.getAllCountryName();
		if (countryList != null) {
			model.addAttribute("country", countryList);
		}
		List<State> stateContent = new ArrayList<State>();
		stateContent = stateservice.getContent();
		if (stateContent != null) {
			model.addAttribute("stateContent", stateContent);
		}
		return "state";
	}

	@RequestMapping(value = "/StateAdd", method = { RequestMethod.GET,
			RequestMethod.POST })
	public String addState(@ModelAttribute("State") State state,
			BindingResult result, ModelMap model, HttpServletRequest request,
			@RequestParam(required = false) Integer stateId) {
		List<Country> countryList = new ArrayList<Country>();
		List<State> stateContent = new ArrayList<State>();
		List<Object> content = null;
		String method = request.getMethod();
		if (method.equals("GET")) {
			state = stateservice.updateState(stateId);
			model.put("State", state);
			stateContent = stateservice.getContent();
		} else {
			stateContent = stateservice.getContent();
			if (stateContent != null) {
				model.addAttribute("stateContent", stateContent);
			}
			statevalidator.validate(state, result);
			if (result.hasErrors()) {
				countryList = countryservice.getAllCountryName();
				model.addAttribute("country", countryList);
				return "state";
			} else {
				model.put("State", new State());
			}
			content = stateservice.addStateName(state);
			if (content== null) {
			String w = "State name updated successfully..!";
			model.addAttribute("message", w);

		} else {
			if (content.isEmpty()) {
				String w = "State name added successfully..!";
				model.addAttribute("message", w);
			} else {
				String w = "State name already exist..!";
				model.addAttribute("message", w);
			}
		}
		
		}
		stateContent = stateservice.getContent();
		if (stateContent != null) {
			model.addAttribute("stateContent", stateContent);
		}
		countryList = countryservice.getAllCountryName();
		if (countryList != null) {
			model.addAttribute("country", countryList);
		}
		return "state";
	}

	@RequestMapping(value = "/stateDelete/{id}")
	public String deleteState(@PathVariable("id") Integer id) {
		stateservice.removeContent(id);
		return "redirect:/state.do";
	}

	/* State Controller End */
	/* City Controller Start */

	@RequestMapping("/city")
	public String newCity(Map<String, Object> map, Model model,@RequestParam(required = false) String message){
		List<State> stateList = new ArrayList<State>();
		List<Country> countryList = new ArrayList<Country>();
		List<City> cityContent = new ArrayList<City>();
		City city=null;
		countryList = countryservice.getAllCountryName();
		if (countryList != null) {
			model.addAttribute("country", countryList);
		}
		cityContent = cityservice.getContent();
		if (cityContent != null) {
			model.addAttribute("cityContent", cityContent);
		}
		stateList = stateservice.getAllStateName();
		if (stateList != null) {
			model.addAttribute("state", stateList);
		}
		city=cityservice.getCurrentCity();
         city.setCityId(null);
		city.setCityName(null);
		if(city!=null){
			map.put("City",city);
		}
		model.addAttribute("message",message);
		return "city";
	}

	@RequestMapping(value = "/CityAdd", method = { RequestMethod.GET,
			RequestMethod.POST })
	public String addCity(@ModelAttribute("City") City city,
			BindingResult result, ModelMap model, HttpServletRequest request,
			@RequestParam(required = false) Integer cityId) {
		List<City> cityContent = new ArrayList<City>();
		List<Country> countryList = new ArrayList<Country>();
		List<State> stateList = new ArrayList<State>();
		List<Object> content = null;
		String method = request.getMethod();
	    if (method.equals("GET")) {
			city = cityservice.updateCity(cityId);
			model.put("City", city);
			cityContent = cityservice.getContent();
			countryList = countryservice.getAllCountryName();
			if (countryList != null) {
				model.addAttribute("country", countryList);
			}
			stateList = stateservice.getAllStateName();
			if (stateList != null) {
				model.addAttribute("state", stateList);
			}
			cityContent = cityservice.getContent();
			if (cityContent != null) {
				model.addAttribute("cityContent", cityContent);
			}
			return "city";
		} else {
			cityContent = cityservice.getContent();
			if (cityContent != null) {
				model.addAttribute("cityContent", cityContent);
			}
			cityvalidator.validate(city, result);
			if (result.hasErrors()) {
				countryList = countryservice.getAllCountryName();
				model.addAttribute("country", countryList);
				stateList = stateservice.getAllStateName();
				model.addAttribute("state", stateList);
				return "city";
			} else {
				model.put("City", new City());
			}
			content = cityservice.addcityName(city);
			if (content== null) {
			String w = "City Name updated successfully..!";
			model.addAttribute("message", w);

		} else {
			if (content.isEmpty()) {
				String w = "City Name added successfully..!";
				model.addAttribute("message", w);
			} else {
				String w = "City name already Exist..!";
				model.addAttribute("message", w);
			}
		}
			
		}
		countryList = countryservice.getAllCountryName();
		if (countryList != null) {
			model.addAttribute("country", countryList);
		}
		stateList = stateservice.getAllStateName();
		if (stateList != null) {
			model.addAttribute("state", stateList);
		}
		cityContent = cityservice.getContent();
		if (cityContent != null) {
			model.addAttribute("cityContent", cityContent);
		}
		return "redirect:/city.do";
	}

	@RequestMapping(value = "/cityContent/{id}")
	public String deleteCity(@PathVariable("id") Integer id) {
		cityservice.removeContent(id);
		return "redirect:/city.do";
	}

	/* City Controller End */
	/* Channel Controller Start */

	@RequestMapping("/channel")
	public String newChannel(Map<String, Object> map, Model model) {
		map.put("Chanel", new Chanel());
		List<State> stateList = new ArrayList<State>();
		stateList = stateservice.getAllStateName();
		if (stateList != null) {
			model.addAttribute("state", stateList);
		}
		List<Chanel> chanelContent = new ArrayList<Chanel>();
		chanelContent = chanelservice.getContent();
		if (chanelContent != null) {
			model.addAttribute("chanelContent", chanelContent);
		}
		return "channel";
	}

	@RequestMapping(value = "/ChanelAdd", method = { RequestMethod.GET,
			RequestMethod.POST })
	public String addChanel(@ModelAttribute("Chanel") Chanel chanel,
			BindingResult result, ModelMap model, HttpServletRequest request,
			@RequestParam(required = false) Integer chanelId) {
		List<Chanel> chanelContent = new ArrayList<Chanel>();
		List<State> stateList = new ArrayList<State>();
		List<Object> content = null;
		String method = request.getMethod();
		if (method.equals("GET")) {
			chanel = chanelservice.updateChanel(chanelId);
			model.put("Chanel", chanel);
			chanelContent = chanelservice.getContent();
			model.addAttribute("chanelContent", chanelContent);
		} else {
			chanelvalidator.validate(chanel, result);
			if (result.hasErrors()) {
				stateList = stateservice.getAllStateName();
				model.addAttribute("state", stateList);
				chanelContent = chanelservice.getContent();
				model.addAttribute("chanelContent", chanelContent);
				return "channel";
			}
			content = chanelservice.addChanelName(chanel);
			if (content== null) {
				String w = "Channel name updated successfully..!";
				model.addAttribute("message", w);

			} else {
				if (content.isEmpty()) {
					String w = "Channel name added successfully..!";
					model.addAttribute("message", w);
				} else {
					String w = "Channel name already Exist..!";
					model.addAttribute("message", w);
				}
			}
			stateList = stateservice.getAllStateName();
			if (stateList != null) {
				model.addAttribute("state", stateList);
			}
			chanelContent = chanelservice.getContent();
			if (chanelContent != null) {
				model.addAttribute("chanelContent", chanelContent);
			}
			
			model.put("Chanel", new Chanel());
			
			return "channel";
		}

		stateList = stateservice.getAllStateName();
		if (stateList != null) {
			model.addAttribute("state", stateList);
		}
		
		return "channel";
	}

	@RequestMapping(value = "/chanelContent/{id}")
	public String deleteChanel(@PathVariable("id") Integer id) {
		chanelservice.removeContent(id);
		return "redirect:/channel.do";
	}

	/* Channel Controller End */
	/* Country Controller Start */

	@RequestMapping("/country")
	public String newCountry(Map<String, Object> map, ModelMap model) {
		List<Country> countryContent = new ArrayList<Country>();
		countryContent = countryservice.getContent();
		map.put("Country", new Country());
		if (countryContent != null) {
			model.addAttribute("countryContent", countryContent);
		}
		return "country";
	}

	@RequestMapping(value = "/countryAdd", method = { RequestMethod.GET,
			RequestMethod.POST })
	public String addCountry(@ModelAttribute("Country") Country country,
			BindingResult result, ModelMap model, HttpServletRequest request,
			@RequestParam(required = false) Integer countryId) {
		List<Object> content = null;
		List<Country> countryContent = new ArrayList<Country>();
		String method = request.getMethod();
		if (method.equals("GET")) {
			country = countryservice.editContent(countryId);
			model.put("Country", country);
			// till here only 
			countryContent = countryservice.getContent();
			model.addAttribute("countryContent", countryContent);
		} else {
			countryvalidator.validate(country, result);
			if (result.hasErrors()) {
				countryContent = countryservice.getContent();
				model.addAttribute("countryContent", countryContent);
				return "country";
			}
			content = countryservice.addCountryname(country);
			if (content== null) {
				String w = "Country name updated successfully..!";
				model.addAttribute("message", w);

			} else {
				if (content.isEmpty()) {
					String w = "Country name added successfully..!";
					model.addAttribute("message", w);
				} else {
					String w = "Country name already Exist..!";
					model.addAttribute("message", w);
				}
			}
			countryContent = countryservice.getContent();
			if (countryContent != null) {
				model.addAttribute("countryContent", countryContent);
			}
			model.put("Country", new Country());
			
		}

		return "country";
	}

	@RequestMapping(value = "/countryContent/{id}")
	public String delete(@PathVariable("id") Integer id) {
		countryservice.removeContent(id);
		System.out.println("After removeContent method" + id);
		return "redirect:/country.do";
	}

	@RequestMapping(value = "/editCountry")
	public String showEdit(Model model) {

		return "editCountry";
	}

	/* Country Controller End */
	
	/* Sector Controller Start */
	@RequestMapping(value = "/sector", method = RequestMethod.GET)
	public ModelAndView sector(@ModelAttribute("Sector") Sector sector,
			Model model) {
		List<Sector> sectorContent = new ArrayList<Sector>();
		sectorContent = sectorservice.getContent();
		if (sectorContent != null) {
			model.addAttribute("sectorContent", sectorContent);
		}
		return new ModelAndView("sector", "message", "");
	}

	@RequestMapping(value = "/SectorAdd", method = { RequestMethod.GET,
			RequestMethod.POST })
	public String addSector(@ModelAttribute("Sector") Sector sector,
			BindingResult result, ModelMap model, HttpServletRequest request,
			@RequestParam(required = false) Integer sectorId) {
		List<Object> content = null;
		List<Sector> sectorContent = new ArrayList<Sector>();
		String method = request.getMethod();
		if (method.equals("GET")) {
			sector = sectorservice.updatSector(sectorId);
			model.put("Sector", sector);
			sectorContent = sectorservice.getContent();
			model.addAttribute("sectorContent", sectorContent);
		} else {
			sectorvalidator.validate(sector, result);
			if (result.hasErrors()) {
				sectorContent = sectorservice.getContent();
				model.addAttribute("sectorContent", sectorContent);
				return "sector";
			}
			content = sectorservice.addSectorname(sector);
			if (content== null) {
				String w = "Sector name updated successfully..!";
				model.addAttribute("message", w);

			} else {
				if (content.isEmpty()) {
					String w = "Sector name added successfully..!";
					model.addAttribute("message", w);
				} else {
					String w = "Sector name already Exist..!";
					model.addAttribute("message", w);
				}
			}
			sectorContent = sectorservice.getContent();
			if (sectorContent != null) {
				model.addAttribute("sectorContent", sectorContent);
			}
			model.put("Sector", new Sector());
			}

		return "sector";
	}

	@RequestMapping(value = "/sectorContent/{id}")
	public String deleteSector(@PathVariable("id") Integer id) {
		
		sectorservice.removeContent(id);
		return "redirect:/sector.do";
	}

	/* Sector Controller End */
	/* Sub Sector Controller Start */
	@RequestMapping(value = "/subsector", method = RequestMethod.GET)
	public String subsector(@ModelAttribute("SubSector") SubSector subsector,
			Model model) {
		List<SubSector> subsectorContent = new ArrayList<SubSector>();
		subsectorContent = subsectorservice.getContent();
		if (subsectorContent != null) {
			model.addAttribute("subsectorContent", subsectorContent);
		}
		return "subsector";
	}

	@RequestMapping(value = "/SubSectorAdd", method = { RequestMethod.GET,
			RequestMethod.POST })
	public String addSubSector(
			@ModelAttribute("SubSector") SubSector subsector,
			BindingResult result, ModelMap model, HttpServletRequest request,
			@RequestParam(required = false) Integer subSectorId) {
		List<SubSector> subsectorContent = new ArrayList<SubSector>();
		List<Object> content = null;
		String method = request.getMethod();
		if (method.equals("GET")) {
			subsector = subsectorservice.updateSubSector(subSectorId);
			model.put("SubSector", subsector);
			subsectorContent = subsectorservice.getContent();
			model.addAttribute("subsectorContent", subsectorContent);
		} else {
			subsectorvalidator.validate(subsector, result);
			if (result.hasErrors()) {
				subsectorContent = subsectorservice.getContent();
				model.addAttribute("subsectorContent", subsectorContent);
				return "subsector";
			}
			content = subsectorservice.addSubSectorname(subsector);
			if (content== null) {
				String w = "SubSector name updated successfully..!";
				model.addAttribute("message", w);

			} else {
				if (content.isEmpty()) {
					String w = "SubSector name added successfully..!";
					model.addAttribute("message", w);
				} else {
					String w = "SubSector name already Exist..!";
					model.addAttribute("message", w);
				}
			}
			subsectorContent = subsectorservice.getContent();
			if (subsectorContent != null) {
				model.addAttribute("subsectorContent", subsectorContent);
			}
			model.put("SubSector", new SubSector());
			
		}

		return "subsector";
	}

	@RequestMapping(value = "/subsectorContent/{id}")
	public String deleteSubSector(@PathVariable("id") Integer id) {
		
		subsectorservice.removeContent(id);
		return "redirect:/subsector.do";
	}

	/* Sub Sector Controller End */
	
	/* Advertisement Type Controller Start */
	@RequestMapping(value = "/advtype", method = RequestMethod.GET)
	public String advtype(@ModelAttribute("AdvType") AdvType advtype,
			Model model) {
		List<AdvType> advTypeContent = new ArrayList<AdvType>();
		advTypeContent = advtypeservice.getContent();
		if (advTypeContent != null) {
			model.addAttribute("advTypeContent", advTypeContent);
		}
		return "advtype";
	}

	@RequestMapping(value = "/advTypeAdd", method = { RequestMethod.GET,
			RequestMethod.POST })
	public String addAdvType(@ModelAttribute("AdvType") AdvType advType,
			BindingResult result, ModelMap model, HttpServletRequest request,
			@RequestParam(required = false) Integer advTypeId) {
		List<AdvType> advTypeContent = new ArrayList<AdvType>();
		List<Object> content = null;
		String method = request.getMethod();
		if (method.equals("GET")) {
			advType = advtypeservice.updateAdvType(advTypeId);
			model.put("AdvType", advType);
			advTypeContent = advtypeservice.getContent();
			model.addAttribute("advTypeContent", advTypeContent);
		} else {
			advtypevalidator.validate(advType, result);
			if (result.hasErrors()) {
				advTypeContent = advtypeservice.getContent();
				model.addAttribute("advTypeContent", advTypeContent);
				return "advtype";
			}
			content = advtypeservice.addAdvTypename(advType);
			if (content== null) {
				String w = "Advertisement Type updated successfully..!";
				model.addAttribute("message", w);

			} else {
				if (content.isEmpty()) {
					String w = "Advertisement Type added successfully..!";
					model.addAttribute("message", w);
				} else {
					String w = "Advertisement Type already Exist..!";
					model.addAttribute("message", w);
				}
			}
			advTypeContent = advtypeservice.getContent();
			if (advTypeContent != null) {
				model.addAttribute("advTypeContent", advTypeContent);
			}
			model.put("AdvType", new AdvType());
		}

		return "advtype";
	}

	@RequestMapping(value = "/advTypeContent/{id}")
	public String deleteAdvType(@PathVariable("id") Integer id) {
		
		advtypeservice.removeContent(id);
		return "redirect:/advtype.do";
	}

	/* Advertisement Type Controller End */
	/** Method for first landing page */
	@RequestMapping(value = "/cancel", method = RequestMethod.GET)
	public String cancel(@ModelAttribute("Member") Registration member,ModelMap model) {
	    
//	    Add 05-09-2014
	    
	    List<PopUp> popupList = new ArrayList<PopUp>();
		popupList = popupservice.getmessage(); 
		model.addAttribute("popupList", popupList);
		return "login";
	}

	/* Client Controller Start */
	@RequestMapping(value = "/client", method = RequestMethod.GET)
	public String newClient(Map<String, Object> map, Model model) {
		List<Client> clientContent = new ArrayList<Client>();
		clientContent = clientService.getContent();
		map.put("Client", new Client());
		if (clientContent != null) {
			model.addAttribute("clientContent", clientContent);
		}
		return "client";
	}

	@RequestMapping(value = "/clientAdd", method = { RequestMethod.GET,
			RequestMethod.POST })
	public String addClientName(@ModelAttribute("Client") Client client,
			BindingResult result, ModelMap model, HttpServletRequest request,
			@RequestParam(required = false) Integer clientId) {
		List<Client> clientContent = new ArrayList<Client>();
		List<Object> content = null;
		String method = request.getMethod();
		if (method.equals("GET")) {
			client = clientService.updateClient(clientId);
			model.put("Client", client);
			clientContent = clientService.getContent();
			model.addAttribute("clientContent", clientContent);
		} else {
			clientValidator.validate(client, result);
			if (result.hasErrors()) {
				clientContent = clientService.getContent();
				model.addAttribute("clientContent", clientContent);
				return "client";
			}
			content = clientService.addClientName(client);
			if (content== null) {
				String w = "Client name updated successfully..!";
				model.addAttribute("message", w);

			} else {
				if (content.isEmpty()) {
					String w = "Client name added successfully..!";
					model.addAttribute("message", w);
				} else {
					String w = "Client name already Exist..!";
					model.addAttribute("message", w);
				}
			}
			clientContent = clientService.getContent();
			if (clientContent != null) {
				model.addAttribute("clientContent", clientContent);
			}
			model.put("Client", new Client());

		}

		return "client";
	}

	@RequestMapping(value = "/clientContent/{id}")
	public String deleteClient(@PathVariable("id") Integer id) {
		clientService.removeContent(id);
		return "redirect:/client.do";
	}

	/* Client Controller End */
	/* Party Controller Start */
	@RequestMapping("/party")
	public String newParty(Map<String, Object> map, Model model) {
		List<Party> partyContent = new ArrayList<Party>();
		partyContent = partyService.getContent();
		map.put("Party", new Party());
		if (partyContent != null) {
			model.addAttribute("partyContent", partyContent);
		}
		return "party";
	}

	// party action start
	@RequestMapping(value = "/partyAdd", method = { RequestMethod.GET,
			RequestMethod.POST })
	public String addPartyName(@ModelAttribute("Party") Party party,
			BindingResult result, ModelMap model, HttpServletRequest request,
			@RequestParam(required = false) Integer partyId) {
		List<Party> partyContent = new ArrayList<Party>();
		List<Object> content = null;
		String method = request.getMethod();
		if (method.equals("GET")) {
			party = partyService.updateParty(partyId);
			model.put("Party", party);
			partyContent = partyService.getContent();
			model.addAttribute("partyContent", partyContent);
		} else {
			partyValidator.validate(party, result);
			if (result.hasErrors()) {
				partyContent = partyService.getContent();
				model.addAttribute("partyContent", partyContent);
				return "party";
			}
			content = partyService.addPartyName(party);
			if (content== null) {
				String w = "Party name updated successfully..!";
				model.addAttribute("message", w);

			} else {
				if (content.isEmpty()) {
					String w = "Party name added successfully..!";
					model.addAttribute("message", w);
				} else {
					String w = "Party name already Exist..!";
					model.addAttribute("message", w);
				}
			}
			partyContent = partyService.getContent();
			if (partyContent != null) {
				model.addAttribute("partyContent", partyContent);
			}
			model.put("Party", new Party());
		}
		return "party";

	}

	@RequestMapping(value = "/partyContent/{id}")
	public String deleteParty(@PathVariable("id") Integer id) {
		
		partyService.removeContent(id);
		return "redirect:/party.do";
	}
	/* Party Controller End */

	/* Pop Up Entry Controller Start */
	@RequestMapping(value = "/popupentry", method = RequestMethod.GET)
	public String popupentry(Map<String, Object> map, Model model) {
		map.put("PopUp", new PopUp());
		return "popupentry";
	}

	@RequestMapping(value = "/popupAdd", method = { RequestMethod.GET,
			RequestMethod.POST })
	public String addPopUpMessage(@ModelAttribute("PopUp") PopUp popUp,
			BindingResult result, ModelMap model) {
		popUpValidator.validate(popUp, result);
		if (result.hasErrors()) {
			return "popupentry";
		}
		popupservice.addPop(popUp);
		
		  String w = "PopUp Message added successfully!";
		  model.addAttribute("message", w);
		 
		model.put("PopUp", new PopUp());
		return "popupentry";
	}

	/* Publication Controller Start */
	@RequestMapping("/publication")
	public String newPublication(Map<String, Object> map, Model model) {
		List<State> stateList = new ArrayList<State>();
		stateList = stateservice.getAllStateName();
		if (stateList != null) {
			model.addAttribute("state", stateList);
		}
		List<Publication> publicationContent = new ArrayList<Publication>();
		publicationContent = publicationService.getContent();
		map.put("Publication", new Publication());
		if (publicationContent != null) {
			model.addAttribute("publicationContent", publicationContent);
		}
		return "publication";
	}

	@RequestMapping(value = "/publicationAdd", method = { RequestMethod.GET,
			RequestMethod.POST })
	public String addPublication(
			@ModelAttribute("Publication") Publication publication,
			BindingResult result, ModelMap model, HttpServletRequest request,
			@RequestParam(required = false) Integer publicationId) {
		List<State> stateList = new ArrayList<State>();
		List<Publication> publicationContent = new ArrayList<Publication>();
		List<Object> content = null;
		List<Object> publicationlList = null;
		List<Object> shortpublicationList = null;
		String method = request.getMethod();
		if (method.equals("GET")) {
			publication = publicationService.updatePublication(publicationId);
			model.put("Publication", publication);
			publicationContent = publicationService.getContent();
			model.addAttribute("publicationContent", publicationContent);
		} else {
			publicationValidator.validate(publication, result);
			if (result.hasErrors()) {
				stateList = stateservice.getAllStateName();
				model.addAttribute("state", stateList);
				publicationContent = publicationService.getContent();
				model.addAttribute("publicationContent", publicationContent);
				return "publication";
			}
			content = publicationService.addPublicationName(publication);
			if (content== null) {
				String w = "Publication name updated successfully..!";
				model.addAttribute("message", w);

			} else {
				if (content.isEmpty()) {
					String w = "Publication name added successfully..!";
					model.addAttribute("message", w);
				} else {
					String w = "Publication name already Exist..!";
					model.addAttribute("message", w);
				}
			}
			stateList = stateservice.getAllStateName();
			if (stateList != null) {
				model.addAttribute("state", stateList);
			}
			publicationContent = publicationService.getContent();
			if (publicationContent != null) {
				model.addAttribute("publicationContent", publicationContent);
			}
			model.put("Publication", new Publication());
			
			return "publication";
		}
		stateList = stateservice.getAllStateName();
		if (stateList != null) {
			model.addAttribute("state", stateList);
		}
		publicationContent = publicationService.getContent();
		if (publicationContent != null) {
			model.addAttribute("publicationContent", publicationContent);
		}
		return "publication";
	}

	@RequestMapping(value = "/publicationContent/{id}")
	public String deletePublication(@PathVariable("id") Integer id) {
		publicationService.removeContent(id);
		return "redirect:/publication.do";
	}

	/* Publication Controller End */
	@RequestMapping("/logout")
	public String showLogout(Map<String, Object> map, Model model,
			HttpServletRequest request) {
		HttpSession session = request.getSession();
		session.invalidate();
		return "redirect:/welcome.do";
	}

	@RequestMapping(value = "/stateByCountryID", method = RequestMethod.GET)
	@ResponseBody
	public Map<String, List<Object>> getStateByCountryID(
			@RequestParam Integer countryId) {
		List<Object> stateList = new ArrayList<Object>();
		Map<String, List<Object>> stateMap = new HashMap<String, List<Object>>();
		if (countryId != null) {
			stateList = stateservice.getStateByCountry(countryId);
			stateMap.put("stateListByCountryID", stateList);
		}
		return stateMap;
	}

	@RequestMapping(value = "/cityViaStateId", method = RequestMethod.GET)
	@ResponseBody
	public Map<String, List<Object>> getCityViaStateID(
			@RequestParam Integer stateId, ModelMap model) {
		List<Object> cityList = new ArrayList<Object>();
		Map<String, List<Object>> cityMap = new HashMap<String, List<Object>>();
		if (stateId != null) {
			cityList = cityservice.getCityViaState(stateId);
			cityMap.put("cityListByStateID", cityList);
			City city = (City) cityList.get(0);
		}
		return cityMap;
	}

	/* Forgot Password Controller Start */
	@RequestMapping("/forgotPassword")
	public String forgotPassword(Map<String, Object> map, Model model) {
		map.put("PieChart", new PieChart());
		return "forgotPassword";
	}

	@RequestMapping(value = "/ForgotPassword", method = { RequestMethod.GET,
			RequestMethod.POST })
	public String forgot(@ModelAttribute("PieChart") PieChart pieChart,
			BindingResult result, ModelMap model, HttpServletRequest request) {
		List password = new ArrayList();
		password = forgotService.getPassword(pieChart.getEmail());
		String pass = (String) password.get(0);
		forgotService.sendMail(pass, pieChart.getEmail());
		return "forgotPassword";
	}

	/* Registration After Login Controller Start */
	@RequestMapping("/userRegistration")
	public String userType(@ModelAttribute("Registration") Registration registration,Map<String, Object> map, Model model) {
		map.put("Registration", new Registration());
		/*Edit on 4-9-14
		 * start========
		 * */
		List<Registration>registerdUserData=new ArrayList<Registration>();
		registerdUserData=registrationservice.getRegisterdUserData();
		List<User> userType=new ArrayList<User>();
		userType=registrationservice.getUserType();
		
		if(userType!=null)
		{
		    model.addAttribute("userType", userType);  
		}
		if(registerdUserData!=null)
		{
		     model.addAttribute("registration1", registerdUserData);
		}
                //	End
		
		return "userRegistration";
	}
//	Add on 4-9-14
//	For deletion 
//	Start
	@RequestMapping(value="/registerdUserData/{id}")
	public String deleteTrack(@PathVariable("id") Integer id) {
		System.out.println("hiiii ....."+id);
		registrationservice.deleteRegisterdUser(id);
		return "redirect:/userRegistration.do";
	}
//      End
	
	
	@RequestMapping(value = "/addUser", method = RequestMethod.POST)
	public String addUserType(
			@ModelAttribute("Registration") Registration registration,
			BindingResult result, ModelMap model, Map<String, Object> map) {
		registrationValidator.validate(registration, result);
		if (result.hasErrors()) {
			return "userRegistration";
		}
		List<User> userType=new ArrayList<User>();
		userType=registrationservice.getUserType();
		
		if(userType!=null)
		{
		    model.addAttribute("userType", userType);  
		}
		/*Edit on 4-9-14
		 * start========
		 * */
		List<Registration>registerdUserData=new ArrayList<Registration>();
		registerdUserData=registrationservice.getRegisterdUserData();
		
		if(registerdUserData!=null)
		{
		
		    model.addAttribute("registration1", registerdUserData);
		}
                //	End
		
		registrationservice.addUserType(registration);
		return "redirect:/userRegistration.do";
	}
}
