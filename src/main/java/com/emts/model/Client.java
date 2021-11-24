package com.emts.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
/**
 * @author Ajay
 *
 */
@Entity  
@Table(name="client") 
public class Client implements Serializable{

	private static final long serialVersionUID = 1L;
	@Id  
	@GeneratedValue(strategy=GenerationType.AUTO)  
	@Column(name="CLIENT_ID")  
	private Integer clientId;  

	@Column(name="CLIENT_NAME")  
	private String clientName;
	
	@Column(name="IS_DELETED")  
	private Integer isDeleted;

	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "CLIENT_ID" , updatable=false)
	
	private List<Tracking> trackingList;
	
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "CLIENT_ID" , updatable=false)
	
	private List<PrintTracking> printTrackingList;

	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "CLIENT_ID" , updatable= false)
	
	private List<AdvertisementTracking> advertisementTrackingList;
	
	@Transient
	@OneToMany(cascade = CascadeType.ALL)
	private List<PieChart> piechartList;
	/**
	 * @return the clientId
	 */
	public Integer getClientId() {
		return clientId;
	}

	/**
	 * @param clientId the clientId to set
	 */
	public void setClientId(Integer clientId) {
		this.clientId = clientId;
	}

	/**
	 * @return the clientName
	 */
	public String getClientName() {
		return clientName;
	}

	/**
	 * @param clientName the clientName to set
	 */
	public void setClientName(String clientName) {
		this.clientName = clientName;
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

	/**
	 * @return the piechartList
	 */
	@JsonIgnore
	public List<PieChart> getPiechartList() {
		return piechartList;
	}

	/**
	 * @param piechartList the piechartList to set
	 */
	public void setPiechartList(List<PieChart> piechartList) {
		this.piechartList = piechartList;
	}
}
