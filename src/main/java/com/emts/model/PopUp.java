package com.emts.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
@Entity  
@Table(name="popup") 
public class PopUp implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id  
	@GeneratedValue(strategy=GenerationType.AUTO)  
	@Column(name="POP_ID")  
	private Integer popId;

	@Column(name = "MESSAGE")
	private String textArea;

	@Column(name = "DATE")
	private String date;

	@Column(name="IS_DELETED")  
	private int isDeleted;

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
	 * @return the popId
	 */
	public Integer getPopId() {
		return popId;
	}

	/**
	 * @param popId the popId to set
	 */
	public void setPopId(Integer popId) {
		this.popId = popId;
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
}
