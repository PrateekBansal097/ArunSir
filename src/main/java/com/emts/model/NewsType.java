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
@Table(name="newstype") 
public class NewsType implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id  
	@GeneratedValue(strategy=GenerationType.AUTO)  
	@Column(name="NEWS_TYPE_ID")  
	private Integer newTypeId;

	@Column(name = "NEWS_TYPE_NAME")
	private String newsTypeName;

	@Column(name="IS_DELETED")  
	private int isDeleted;

	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "NEWS_TYPE_ID")
	private List<Tracking> trackingList;

	/**
	 * @return the newsTypeName
	 */
	public String getNewsTypeName() {
		return newsTypeName;
	}

	/**
	 * @param newsTypeName the newsTypeName to set
	 */
	public void setNewsTypeName(String newsTypeName) {
		this.newsTypeName = newsTypeName;
	}

	/**
	 * @return the isDeleted
	 */
	public int getIsDeleted() {
		return isDeleted;
	}

	/**
	 * @param isDeleted the isDeleted to set
	 */
	public void setIsDeleted(int isDeleted) {
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
	 * @return the newTypeId
	 */
	public Integer getNewTypeId() {
		return newTypeId;
	}

	/**
	 * @param newTypeId the newTypeId to set
	 */
	public void setNewTypeId(Integer newTypeId) {
		this.newTypeId = newTypeId;
	}
}
