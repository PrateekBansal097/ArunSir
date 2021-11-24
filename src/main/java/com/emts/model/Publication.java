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
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
@Entity  
@Table(name="publication") 
public class Publication  implements Serializable{

	private static final long serialVersionUID = 1L;
	@Id  
	@GeneratedValue(strategy=GenerationType.AUTO)  
	@Column(name="PUBLICATION_ID")  
	private Integer publicationId; 

	@Column(name="PUBLICATION_NAME")  
	private String publicationName;

	@Column(name="PUBLICATION_SHORT_NAME")  
	private String shortPublicationName;

	@Column(name="IS_DELETED")  
	private Integer isDeleted;

	@ManyToOne
	@JoinColumn(name="STATE_ID")  
	private State state;

	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "PUBLICATION_ID" , updatable=false)
	
	private List<PrintTracking> printTrackingList;

	@Transient
	@OneToMany(cascade = CascadeType.ALL)
	private List<PieChart> piechartList;
	/**
	 * @return the publicationName
	 */
	public String getPublicationName() {
		return publicationName;
	}

	/**
	 * @param publicationName the publicationName to set
	 */
	public void setPublicationName(String publicationName) {
		this.publicationName = publicationName;
	}

	/**
	 * @return the shortPublicationName
	 */
	public String getShortPublicationName() {
		return shortPublicationName;
	}

	/**
	 * @param shortPublicationName the shortPublicationName to set
	 */
	public void setShortPublicationName(String shortPublicationName) {
		this.shortPublicationName = shortPublicationName;
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
	 * @return the publicationId
	 */
	public Integer getPublicationId() {
		return publicationId;
	}

	/**
	 * @param publicationId the publicationId to set
	 */
	public void setPublicationId(Integer publicationId) {
		this.publicationId = publicationId;
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
