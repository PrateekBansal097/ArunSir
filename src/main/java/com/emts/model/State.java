package com.emts.model;

import java.io.Serializable;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
@SuppressWarnings("unused")
@Entity  
@Table(name="state") 

public class State implements Serializable{

	private static final long serialVersionUID = 1L;
	@Id  
	@GeneratedValue(strategy=GenerationType.AUTO)  
	@Column(name="STATE_ID")  
	private Integer stateId; 

	@Column(name="STATE_NAME")  
	private String stateName;

	@Column(name="IS_DELETED")  
	private Integer isDeleted;

	@ManyToOne
	//@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="COUNTRY_ID" )  
	/*@OneToMany(cascade = CascadeType.ALL,fetch=FetchType.EAGER)*/
	private Country country;

	@LazyCollection(LazyCollectionOption.FALSE)
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "STATE_ID" , updatable=false)
	private Set<City> cityList;

	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "STATE_ID" , updatable=false)
	private List<Chanel> chanelList;

	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "STATE_ID" , updatable=false)
	@Fetch(FetchMode.SUBSELECT)
	@BatchSize(size=1)
	private List<Publication> publicationList;
	/*private Set<Publication> publicationSet;*/

	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "STATE_ID" , updatable=false)
	private List<Tracking> trackingList;

	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "STATE_ID" , updatable=false)
	
	private List<PrintTracking> printTrackingList;

	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "STATE_ID" , updatable=false)
	private List<AdvertisementTracking> advertisementTrackingList;

	
	@Transient
	@OneToMany(cascade = CascadeType.ALL)
	private List<PieChart> piechartList;
	
	/**
	 * @return the stateId
	 */
	public Integer getStateId() {
		return stateId;
	}

	/**
	 * @param stateId the stateId to set
	 */
	public void setStateId(Integer stateId) {
		this.stateId = stateId;
	}

	/**
	 * @return the stateName
	 */
	public String getStateName() {
		return stateName;
	}

	/**
	 * @param stateName the stateName to set
	 */
	public void setStateName(String stateName) {
		this.stateName = stateName;
	}

	/**
	 * @return the isDeleted
	 */
	public Integer getIsDeleted() {
		return isDeleted;
	}

	/**
	 * @param isDeleted the isDeleted to set
	 */
	public void setIsDeleted(Integer isDeleted) {
		this.isDeleted = isDeleted;
	}

	/**
	 * @return the country
	 */
	@JsonIgnore
	public Country getCountry() {
		return country;
	}

	/**
	 * @param country the country to set
	 */
	public void setCountry(Country country) {
		this.country = country;
	}

	/**
	 * @return the cityList
	 */
	@JsonIgnore
	public Set<City> getCityList() {
		return cityList;
	}

	/**
	 * @param cityList the cityList to set
	 */
	public void setCityList(Set<City> cityList) {
		this.cityList = cityList;
	}

	/**
	 * @return the chanelList
	 */
	@JsonIgnore
	public List<Chanel> getChanelList() {
		return chanelList;
	}

	/**
	 * @param chanelList the chanelList to set
	 */
	public void setChanelList(List<Chanel> chanelList) {
		this.chanelList = chanelList;
	}

	/**
	 * @return the publicationList
	 */
	@JsonIgnore
	public List<Publication> getPublicationList() {
		return publicationList;
	}

	/**
	 * @param publicationList the publicationList to set
	 */
	public void setPublicationList(List<Publication> publicationList) {
		this.publicationList = publicationList;
	}
	
	/*@JsonIgnore
	public Set<Publication> getPublicationSet() {
		return publicationSet;
	}

	public void setPublicationSet(Set<Publication> publicationSet) {
		this.publicationSet = publicationSet;
	}

*/
	/**
	 * @return the trackingList
	 */
	@JsonIgnore
	public List<Tracking> getTrackingList() {
		return trackingList;
	}

	/**
	 * @param trackingList the trackingList to set
	 */
	public void setTrackingList(List<Tracking> trackingList) {
		this.trackingList = trackingList;
	}

	/**
	 * @return the printTrackingList
	 */
	@JsonIgnore
	public List<PrintTracking> getPrintTrackingList() {
		return printTrackingList;
	}

	/**
	 * @param printTrackingList the printTrackingList to set
	 */
	public void setPrintTrackingList(List<PrintTracking> printTrackingList) {
		this.printTrackingList = printTrackingList;
	}

	/**
	 * @return the advertisementTrackingList
	 */
	@JsonIgnore
	public List<AdvertisementTracking> getAdvertisementTrackingList() {
		return advertisementTrackingList;
	}

	/**
	 * @param advertisementTrackingList the advertisementTrackingList to set
	 */
	public void setAdvertisementTrackingList(
			List<AdvertisementTracking> advertisementTrackingList) {
		this.advertisementTrackingList = advertisementTrackingList;
	}

	public List<PieChart> getPiechartList() {
		return piechartList;
	}

	public void setPiechartList(List<PieChart> piechartList) {
		this.piechartList = piechartList;
	}
}
