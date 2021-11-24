package com.emts.model;

import java.io.Serializable;

import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Transient;

import org.codehaus.jackson.annotate.JsonIgnore;

public class PieChart implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Transient
	private String fromDate;
	@Transient
	private String toDate;
	
	@Transient
	private String email;
	
	@Transient
	@ManyToOne
	private Client client;
	
	@Transient
	private String storyCode;
	@Transient
	private String param;
	
	@Transient
	@ManyToOne
	private Publication publication;
	
	@Transient
	private Integer partyId[];
	
	@Transient
	@ManyToOne 
	private Chanel chanel;
	
	@Transient
	@ManyToOne
	@JoinColumn(name="STATE_ID")  
	private State state;
	
	
	public State getState() {
		return state;
	}
	public void setState(State state) {
		this.state = state;
	}
	/**
	 * @return the fromDate
	 */
	public String getFromDate() {
		return fromDate;
	}
	/**
	 * @param fromDate the fromDate to set
	 */
	public void setFromDate(String fromDate) {
		this.fromDate = fromDate;
	}
	/**
	 * @return the toDate
	 */
	public String getToDate() {
		return toDate;
	}
	/**
	 * @param toDate the toDate to set
	 */
	public void setToDate(String toDate) {
		this.toDate = toDate;
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
	 * @return the param
	 */
	public String getParam() {
		return param;
	}
	/**
	 * @param param the param to set
	 */
	public void setParam(String param) {
		this.param = param;
	}
	/**
	 * @return the partyId
	 */
	public Integer[] getPartyId() {
		return partyId;
	}
	/**
	 * @param partyId the partyId to set
	 */
	public void setPartyId(Integer[] partyId) {
		this.partyId = partyId;
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
	 * @return the email
	 */
	public String getEmail() {
		return email;
	}
	/**
	 * @param email the email to set
	 */
	public void setEmail(String email) {
		this.email = email;
	}
	
}
