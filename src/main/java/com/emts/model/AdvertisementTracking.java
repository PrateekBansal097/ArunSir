package com.emts.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
@Entity  
@Table(name="advertisement") 
public class AdvertisementTracking implements Serializable{

	private static final long serialVersionUID = 1L;
	@Id  
	@GeneratedValue(strategy=GenerationType.AUTO)  
	@Column(name="ADVERTISEMENT_ID")  
	private Integer advertismentId; 

	/*@Column(name="SLUG")  
	private String slug;*/
	
	@Column(name="SLUG")  
	private String textArea;
	
	@Transient
	private Boolean isRepeat;
	
	@ManyToOne
	@JoinColumn(name="ADV_TYPE_ID")  
	@Fetch(FetchMode.JOIN)
	@BatchSize(size=1)
	private AdvType advType;
	
	@ManyToOne
	@JoinColumn(name="ID")  
	@Fetch(FetchMode.JOIN)
	@BatchSize(size=1)
	private Registration registration;

	@JsonIgnore
	public Registration getRegistration() {
		return registration;
	}

	public void setRegistration(Registration registration) {
		this.registration = registration;
	}

	@ManyToOne
	@JoinColumn(name="PARTY_ID")  
	@Fetch(FetchMode.JOIN)
	@BatchSize(size=1)
	private Party party;

	@Column(name="START_TIME")  
	private String startTime;

	@Column(name="DURATION")  
	private Integer duration;

	@Column(name="END_TIME")  
	private String endTime;

	@ManyToOne
	@JoinColumn(name="CLIENT_ID")
	@Fetch(FetchMode.JOIN)
	@BatchSize(size=1)
	private Client client;

	@ManyToOne
	@JoinColumn(name="STATE_ID")  
	@Fetch(FetchMode.JOIN)
	@BatchSize(size=1)
	private State state;

	@ManyToOne
	@JoinColumn(name="CHANNEL_ID")  
	@Fetch(FetchMode.JOIN)
	@BatchSize(size=1)
	private Chanel chanel;

	@Column(name="DATE")  
	private String date;
	
	@Column(name="RADIO")  
	private String slugRadio;

	@ManyToOne
	@JoinColumn(name="CITY_ID")  
	@Fetch(FetchMode.JOIN)
	@BatchSize(size=1)
	private City city;
	@Column(name="IS_DELETED")  
	private Integer isDeleted;
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
	 * @return the slug
	 *//*
	public String getSlug() {
		return slug;
	}

	*//**
	 * @param slug the slug to set
	 *//*
	public void setSlug(String slug) {
		this.slug = slug;
	}*/

	/**
	 * @return the advType
	 */
	@JsonIgnore
	public AdvType getAdvType() {
		return advType;
	}

	/**
	 * @param advType the advType to set
	 */
	public void setAdvType(AdvType advType) {
		this.advType = advType;
	}

	/**
	 * @return the party
	 */
	@JsonIgnore
	public Party getParty() {
		return party;
	}

	/**
	 * @param party the party to set
	 */
	public void setParty(Party party) {
		this.party = party;
	}

	/**
	 * @return the startTime
	 */
	public String getStartTime() {
		return startTime;
	}

	/**
	 * @param startTime the startTime to set
	 */
	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	/**
	 * @return the duration
	 */
	public Integer getDuration() {
		return duration;
	}

	/**
	 * @param duration the duration to set
	 */
	public void setDuration(Integer duration) {
		this.duration = duration;
	}

	/**
	 * @return the endTime
	 */
	public String getEndTime() {
		return endTime;
	}

	/**
	 * @param endTime the endTime to set
	 */
	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

	/**
	 * @return the client
	 */
	@JsonIgnore
	public Client getClient() {
		return client;
	}

	/**
	 * @param client the client to set
	 */
	public void setClient(Client client) {
		this.client = client;
	}

	/**
	 * @return the state
	 */
	@JsonIgnore
	public State getState() {
		return state;
	}

	/**
	 * @param state the state to set
	 */
	public void setState(State state) {
		this.state = state;
	}

	/**
	 * @return the chanel
	 */
	@JsonIgnore
	public Chanel getChanel() {
		return chanel;
	}

	/**
	 * @param chanel the chanel to set
	 */
	public void setChanel(Chanel chanel) {
		this.chanel = chanel;
	}

	/**
	 * @return the date
	 */
	public String getDate() {
		return date;
	}

	/**
	 * @param date the date to set
	 */
	public void setDate(String date) {
		this.date = date;
	}

	/**
	 * @return the city
	 */
	@JsonIgnore
	public City getCity() {
		return city;
	}

	/**
	 * @param city the city to set
	 */
	public void setCity(City city) {
		this.city = city;
	}

	/**
	 * @return the advertismentId
	 */
	public Integer getAdvertismentId() {
		return advertismentId;
	}

	/**
	 * @param advertismentId the advertismentId to set
	 */
	public void setAdvertismentId(Integer advertismentId) {
		this.advertismentId = advertismentId;
	}

	/**
	 * @return the isRepeat
	 */
	public Boolean getIsRepeat() {
		return isRepeat;
	}

	/**
	 * @param isRepeat the isRepeat to set
	 */
	public void setIsRepeat(Boolean isRepeat) {
		this.isRepeat = isRepeat;
	}

	/**
	 * @return the slugRadio
	 */
	public String getSlugRadio() {
		return slugRadio;
	}

	/**
	 * @param slugRadio the slugRadio to set
	 */
	public void setSlugRadio(String slugRadio) {
		this.slugRadio = slugRadio;
	}

	/**
	 * @return the textArea
	 */
	public String getTextArea() {
		return textArea;
	}

	/**
	 * @param textArea the textArea to set
	 */
	public void setTextArea(String textArea) {
		this.textArea = textArea;
	}

	
}
