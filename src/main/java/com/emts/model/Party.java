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
@Entity  
@Table(name="party") 
public class Party implements Serializable{

	private static final long serialVersionUID = 1L;
	@Id  
	 @GeneratedValue(strategy=GenerationType.AUTO)  
	 @Column(name="PARTY_ID")  
	 private Integer partyId; 
	 
	 @Column(name="PARTY_NAME")  
	 private String partyName;
	
	@Column(name="IS_DELETED")  
	private Integer isDeleted;

	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "PARTY_ID",updatable=false)
	private List<AdvertisementTracking> AdvertisementTrackingList;

	@Transient
	@OneToMany(cascade = CascadeType.ALL)
	private List<PieChart> piechartList;
	/**
	 * @return the partyName
	 */
	public String getPartyName() {
		return partyName;
	}
	/**
	 * @param partyName the partyName to set
	 */
	public void setPartyName(String partyName) {
		this.partyName = partyName;
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
	 * @return the advertisementTrackingList
	 */
	@JsonIgnore
	public List<AdvertisementTracking> getAdvertisementTrackingList() {
		return AdvertisementTrackingList;
	}
	/**
	 * @param advertisementTrackingList the advertisementTrackingList to set
	 */
	public void setAdvertisementTrackingList(
			List<AdvertisementTracking> advertisementTrackingList) {
		AdvertisementTrackingList = advertisementTrackingList;
	}
	/**
	 * @return the partyId
	 */
	public Integer getPartyId() {
		return partyId;
	}
	/**
	 * @param partyId the partyId to set
	 */
	public void setPartyId(Integer partyId) {
		this.partyId = partyId;
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
