package com.emts.dao;

import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.stereotype.Repository;

import com.emts.model.Chanel;
import com.emts.model.City;
import com.emts.model.Publication;
import com.emts.model.State;
import com.emts.util.IConstant;

/**
 * @author dell
 *
 */
@Repository
public class StateDaoImpl implements StateDao {
	@Autowired
	private HibernateTemplate hibernateTemplate;

	@SuppressWarnings("unchecked")
	public List<Object> addStateName(State state) {
		List<Object> stateContent = null;
		if(state.getStateId()!=null)
		{
			hibernateTemplate.saveOrUpdate(state);
			return stateContent;
		}
		else
		{
			stateContent = hibernateTemplate.find("from State where STATE_NAME='"
					+ state.getStateName() + "' AND IS_DELETED="
					+ IConstant.IS_DELETED_ACTIVE);
			if (stateContent.isEmpty()) {
			hibernateTemplate.saveOrUpdate(state);
			}
			return stateContent;
		}
	}

/*	@SuppressWarnings("unchecked")
	private State updateAdvertisementTracking(State state) {
	
		List<AdvertisementTracking> advtrackingContent = null;
		List<AdvertisementTracking> advtrackingList = new LinkedList<AdvertisementTracking>();
		advtrackingContent = hibernateTemplate
				.find("from AdvertisementTracking adv where adv.state.stateId ="
						+ state.getStateId());
		for (AdvertisementTracking advTracking : advtrackingContent) {
			advTracking.setState(state);
			advtrackingList.add(advTracking);
		}
		state.setAdvertisementTrackingList(advtrackingList);
		return state;
	}

	@SuppressWarnings("unchecked")
	private State updatePrintTracking(State state) {
	
		List<PrintTracking> printtrackingContent = null;
		List<PrintTracking> printtrackingList = new LinkedList<PrintTracking>();

		printtrackingContent = hibernateTemplate
				.find("from PrintTracking print where print.state.stateId ="
						+ state.getStateId());
		for (PrintTracking printTracking : printtrackingContent) {
			printTracking.setState(state);
			printtrackingList.add(printTracking);
		}
		state.setPrintTrackingList(printtrackingList);
		return state;
	}

	@SuppressWarnings("unchecked")
	private State updateTracking(State state) {
	
		List<Tracking> trackingContent = null;
		List<Tracking> trackingList = new LinkedList<Tracking>();

		trackingContent = hibernateTemplate
				.find("from Tracking t where t.state.stateId ="
						+ state.getStateId());
		for (Tracking tracking : trackingContent) {
			tracking.setState(state);
			trackingList.add(tracking);

		}
		state.setTrackingList(trackingList);

		return state;
	}
*/
	@SuppressWarnings("unchecked")
	public List<Object> getContent() {
		List<Object> stateContent = null;
		stateContent = hibernateTemplate.find("from State where IS_DELETED="
				+ IConstant.IS_DELETED_ACTIVE);
		return stateContent;
	}

	public void removeContent(Integer Id) {
		State state = (State) hibernateTemplate.get(State.class, Id);
		state.setIsDeleted(IConstant.IS_DELETED_DEACTIVE);
		if (null != state) {
			hibernateTemplate.update(state);
		}
	}

	@SuppressWarnings("unchecked")
	public List<Object> updateState(Integer Id) {
		List<Object> state = null;
		state = hibernateTemplate.find(
				"from State state where state.stateId=?", Id);

		return state;
	}

	@SuppressWarnings("unchecked")
	public List<Object> getStateByCountry(Integer countryId) {
		List<Object> stateList = null;
		stateList = hibernateTemplate.find("from State where IS_DELETED="
				+ IConstant.IS_DELETED_ACTIVE + "and country.countryId="
				+ countryId + " ");
		State state = new State();
		state = (State) stateList.get(0);
		System.out.println("stateList" + state.getStateId());
		System.out.println("stateList" + state.getStateName());
		return stateList;
	}

	@SuppressWarnings("unchecked")
	public List<Object> getAllStateName() {
		List<Object> stateList = null;
		stateList = hibernateTemplate.find("from State where IS_DELETED="
				+ IConstant.IS_DELETED_ACTIVE);
		return stateList;
	}

	@SuppressWarnings("unchecked")
	private State updateCity(State state) {
		List<City> cityContent = null;
		Set<City> citySet = new HashSet<City>();
		cityContent = hibernateTemplate
				.find("from City c where c.state.stateId=" + state.getStateId());
		for (City city : cityContent) {
			city.setState(state);
			citySet.add(city);
		}
		state.setCityList(citySet);

		return state;
	}

	@SuppressWarnings({ "unchecked" })
	private State updatePublication(State state) {
		List<Publication> publicationContent = null;
		List<Publication> publicationList = new LinkedList<Publication>();
		publicationContent = hibernateTemplate
				.find("from Publication p where p.state.stateId="
						+ state.getStateId());
		for (Publication publication : publicationContent) {
			publication.setState(state);
			publicationList.add(publication);
		}
		state.setPublicationList(publicationList);

		return state;
	}

	@SuppressWarnings("unchecked")
	private State updateChanel(State state) {
		List<Chanel> chanelContent = null;
		List<Chanel> chanelList = new LinkedList<Chanel>();
		chanelContent = hibernateTemplate
				.find("from Chanel c where c.state.stateId ="
						+ state.getStateId());
		for (Chanel chanel : chanelContent) {
			chanel.setState(state);
			chanelList.add(chanel);

		}
		state.setChanelList(chanelList);

		return state;
	}

}