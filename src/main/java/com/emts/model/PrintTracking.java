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
@Table(name="printtracking") 
public class PrintTracking implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id  
	@GeneratedValue(strategy=GenerationType.AUTO)  
	@Column(name="PRINT_TRACKING_ID")  
	private Integer printTrackingId; 

	/*@Column(name="SLUG")  
	private String slug;*/
	
	@Column(name="SLUG")  
	private String textArea;

	@Column(name="PAGE")  
	private Short pageNumber;

	@Column(name="NEWS_COLUMN")  
	private Integer newsColumn;
	
	@Transient
	private Boolean isRepeat;

	@ManyToOne
	@JoinColumn(name="CITY_ID") 
	@Fetch(FetchMode.JOIN)
	@BatchSize(size=1)
	private City city;

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
	@JoinColumn(name="STATE_ID") 
	@Fetch(FetchMode.JOIN)
	@BatchSize(size=1)
	private State state;
	
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
	@JoinColumn(name="PUBLICATION_ID") 
	@Fetch(FetchMode.JOIN)
	@BatchSize(size=1)
	private Publication publication;

	@Column(name="DATE")  
	private String date;

	@ManyToOne
	@JoinColumn(name="CLIENT_ID")  
	@Fetch(FetchMode.JOIN)
	@BatchSize(size=1)
	private Client client;

	@ManyToOne
	@JoinColumn(name="SECTOR_ID")  
	@Fetch(FetchMode.JOIN)
	@BatchSize(size=1)
	private Sector sector;
	
	@Column(name="PHOTO")  
	private String photo="No";
	
	@Column(name="RADIO")  
	private String slugRadio;
	
	@Column(name="PHOTO_COLUMN")  
	private Integer photoColumn;
	
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
	 * @return the pageNumber
	 */
	public Short getPageNumber() {
		return pageNumber;
	}

	/**
	 * @param pageNumber the pageNumber to set
	 */
	public void setPageNumber(Short pageNumber) {
		this.pageNumber = pageNumber;
	}


	/**
	 * @return the publication
	 */
	@JsonIgnore
	public Publication getPublication() {
		return publication;
	}

	/**
	 * @param publication the publication to set
	 */
	public void setPublication(Publication publication) {
		this.publication = publication;
	}

	

	/**
	 * @return the printTrackingId
	 */
	public Integer getPrintTrackingId() {
		return printTrackingId;
	}

	/**
	 * @param printTrackingId the printTrackingId to set
	 */
	public void setPrintTrackingId(Integer printTrackingId) {
		this.printTrackingId = printTrackingId;
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
	 * @return the photo
	 */
	public String getPhoto() {
		return photo;
	}

	/**
	 * @param photo the photo to set
	 */
	public void setPhoto(String photo) {
		this.photo = photo;
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
	 * @return the newsColumn
	 */
	public Integer getNewsColumn() {
		return newsColumn;
	}

	/**
	 * @param newsColumn the newsColumn to set
	 */
	public void setNewsColumn(Integer newsColumn) {
		this.newsColumn = newsColumn;
	}

	/**
	 * @return the photoColumn
	 */
	public Integer getPhotoColumn() {
		return photoColumn;
	}

	/**
	 * @param photoColumn the photoColumn to set
	 */
	public void setPhotoColumn(Integer photoColumn) {
		this.photoColumn = photoColumn;
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
}
