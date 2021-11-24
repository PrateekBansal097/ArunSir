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

import org.codehaus.jackson.annotate.JsonIgnore;
import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
@Entity  
@Table(name="sector") 
public class Sector implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id  
	@GeneratedValue(strategy=GenerationType.AUTO)  
	@Column(name="SECTOR_ID")  
	private Integer sectorId; 
	
	@Column(name="IS_DELETED")  
	private Integer isDeleted;

	@Column(name="SECTOR_NAME")  
	private String sectorName;

	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "SECTOR_ID" , updatable=false)
	private List<Tracking> trackingList;
	
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "SECTOR_ID" , updatable=false)
	
	private List<PrintTracking> printTrackingList;

	/**
	 * @return the sectorId
	 */
	public Integer getSectorId() {
		return sectorId;
	}

	/**
	 * @param sectorId the sectorId to set
	 */
	public void setSectorId(Integer sectorId) {
		this.sectorId = sectorId;
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
	 * @return the sectorName
	 */
	public String getSectorName() {
		return sectorName;
	}

	/**
	 * @param sectorName the sectorName to set
	 */
	public void setSectorName(String sectorName) {
		this.sectorName = sectorName;
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
}
