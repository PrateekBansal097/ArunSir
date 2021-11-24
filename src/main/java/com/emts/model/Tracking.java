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
@Table(name="tracking") 
public class Tracking implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id  
	@GeneratedValue(strategy=GenerationType.AUTO)  
	@Column(name="TRACKING_ID")  
	private Integer trackingId; 

	/*@Column(name="SLUG")  
	private String slug;*/
	@Column(name="SLUG")  
	private String textArea;
	
	@Column(name="RADIO")  
	private String slugRadio;

	@Column(name="TIME")  
	private String time;
	
	@Transient
	private Boolean isRepeat;

	@ManyToOne
	@JoinColumn(name="NEWS_TYPE_ID")  
		private NewsType newsType;

	@ManyToOne
	@JoinColumn(name="CLIENT_ID")  
	@Fetch(FetchMode.JOIN)
	@BatchSize(size=1)
	private Client client;
	
	
	
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
	@JoinColumn(name="SECTOR_ID") 
	@Fetch(FetchMode.JOIN)
	@BatchSize(size=1)
	private Sector sector;

	@ManyToOne
	@JoinColumn(name="CITY_ID") 
	@Fetch(FetchMode.JOIN)
	@BatchSize(size=1)
	private City city;

	@ManyToOne
	@JoinColumn(name="SUB_SECTOR_ID")  
	@Fetch(FetchMode.JOIN)
	@BatchSize(size=1)
	private SubSector subSector;

	@Column(name="NEWS_TREND")  
	private String newsTrend;

	@Column(name="STORY_CODE")  
	private String storyCode;

	@Column(name="MARKING")  
	private Integer marking;

	@ManyToOne
	@JoinColumn(name="CHANNEL_ID")
	@Fetch(FetchMode.JOIN)
	@BatchSize(size=1)
	private Chanel chanel;

	
	@ManyToOne
	@JoinColumn(name="STATE_ID")  
	@Fetch(FetchMode.JOIN)
	@BatchSize(size=1)
	
	private State state;

	/*@Temporal(TemporalType.DATE)*/
	@Column(name="DATE")  
	private String date;

	@Column(name="IS_DELETED")  
	private Integer isDeleted;

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
	 * @return the newsTrend
	 */
	public String getNewsTrend() {
		return newsTrend;
	}

	/**
	 * @param newsTrend the newsTrend to set
	 */
	public void setNewsTrend(String newsTrend) {
		this.newsTrend = newsTrend;
	}
	/**
	 * @return the time
	 */
	public String getTime() {
		return time;
	}

	/**
	 * @param time the time to set
	 */
	public void setTime(String time) {
		this.time = time;
	}

	/**
	 * @return the newsType
	 */
	@JsonIgnore
	public NewsType getNewsType() {
		return newsType;
	}

	/**
	 * @param newsType the newsType to set
	 */
	public void setNewsType(NewsType newsType) {
		this.newsType = newsType;
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
	 * @return the sector
	 */
	@JsonIgnore
	public Sector getSector() {
		return sector;
	}

	/**
	 * @param sector the sector to set
	 */
	public void setSector(Sector sector) {
		this.sector = sector;
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
	 * @return the subSector
	 */
	@JsonIgnore
	public SubSector getSubSector() {
		return subSector;
	}

	/**
	 * @param subSector the subSector to set
	 */
	public void setSubSector(SubSector subSector) {
		this.subSector = subSector;
	}


	/**
	 * @return the storyCode
	 */
	public String getStoryCode() {
		return storyCode;
	}

	/**
	 * @param storyCode the storyCode to set
	 */
	public void setStoryCode(String storyCode) {
		this.storyCode = storyCode;
	}

	/**
	 * @return the chanel
	 */
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
	 * @return the state
	 */
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
	 * @return the trackingId
	 */
	public Integer getTrackingId() {
		return trackingId;
	}

	/**
	 * @param trackingId the trackingId to set
	 */
	public void setTrackingId(Integer trackingId) {
		this.trackingId = trackingId;
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
	 * @return the marking
	 */
	public Integer getMarking() {
		return marking;
	}

	/**
	 * @param marking the marking to set
	 */
	public void setMarking(Integer marking) {
		this.marking = marking;
	}
	@Override
	public String toString() {
		// TODO Auto-generated method stub
		return "Trakcing";
	}
}
