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
@Entity  
@Table(name="advtype") 
public class AdvType implements Serializable{

	private static final long serialVersionUID = 1L;
	@Id  
	@GeneratedValue(strategy=GenerationType.AUTO)  
	@Column(name="ADV_TYPE_ID")  
	private Integer advTypeId; 

	@Column(name="ADV_TYPE_NAME")  
	private String advtypeName;

	@Column(name="IS_DELETED")  
	private Integer isDeleted;
	
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "ADV_TYPE_ID",updatable=false)
	
	private List<AdvertisementTracking> AdverTrackingList;

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
	 * @return the advtypeName
	 */
	public String getAdvtypeName() {
		return advtypeName;
	}
	/**
	 * @param advtypeName the advtypeName to set
	 */
	public void setAdvtypeName(String advtypeName) {
		this.advtypeName = advtypeName;
	}
	/**
	 * @return the adverTrackingList
	 */
	@JsonIgnore
	public List<AdvertisementTracking> getAdverTrackingList() {
		return AdverTrackingList;
	}
	/**
	 * @param adverTrackingList the adverTrackingList to set
	 */
	public void setAdverTrackingList(List<AdvertisementTracking> adverTrackingList) {
		AdverTrackingList = adverTrackingList;
	}
	/**
	 * @return the advTypeId
	 */
	public Integer getAdvTypeId() {
		return advTypeId;
	}
	/**
	 * @param advTypeId the advTypeId to set
	 */
	public void setAdvTypeId(Integer advTypeId) {
		this.advTypeId = advTypeId;
	}
}
