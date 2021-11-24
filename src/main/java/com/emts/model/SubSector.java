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
@Table(name="subsector") 
public class SubSector implements Serializable{

	private static final long serialVersionUID = 1L;
	@Id  
	@GeneratedValue(strategy=GenerationType.AUTO)  
	@Column(name="SUB_SECTOR_ID")  
	private Integer subSectorId; 

	@Column(name="SUB_SECTOR_NAME")  
	private String subSectorName;

	@Column(name="IS_DELETED")  
	private Integer isDeleted;

	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "SUB_SECTOR_ID" , updatable=false)
	private List<Tracking> trackingList;

	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "SUB_SECTOR_ID" , updatable=false )
	
	private List<PrintTracking> printTrackingList;

	/**
	 * @return the subSectorId
	 */
	public Integer getSubSectorId() {
		return subSectorId;
	}

	/**
	 * @param subSectorId the subSectorId to set
	 */
	public void setSubSectorId(Integer subSectorId) {
		this.subSectorId = subSectorId;
	}

	/**
	 * @return the subSectorName
	 */
	public String getSubSectorName() {
		return subSectorName;
	}

	/**
	 * @param subSectorName the subSectorName to set
	 */
	public void setSubSectorName(String subSectorName) {
		this.subSectorName = subSectorName;
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
}
