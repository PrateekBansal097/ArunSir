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
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.codehaus.jackson.annotate.JsonIgnore;

@Entity  
@Table(name="registration") 
public class Registration implements Serializable{

	 private static final long serialVersionUID = 1L;

	 @Id  
	 @GeneratedValue(strategy=GenerationType.AUTO)  
	 @Column(name = "ID")  
	 private Integer registrationId;  
	 
	 @OneToMany(cascade = CascadeType.ALL)
		@JoinColumn(name = "ID" , updatable=false)
		
		private List<Tracking> trackingList;
		
		@OneToMany(cascade = CascadeType.ALL)
		@JoinColumn(name = "ID" , updatable=false)
		
		private List<PrintTracking> printTrackingList;

		@OneToMany(cascade = CascadeType.ALL)
		@JoinColumn(name = "ID" , updatable= false)
		
		private List<AdvertisementTracking> advertisementTrackingList;
		
		@OneToOne(cascade = CascadeType.ALL)
		@JoinColumn(name="USER_TYPE_ID",insertable = false, updatable = false)  
		private User user;	

		@JsonIgnore
	        public List<Tracking> getTrackingList() {
			return trackingList;
		}

		public void setTrackingList(List<Tracking> trackingList) {
			this.trackingList = trackingList;
		}

		@JsonIgnore
		public List<PrintTracking> getPrintTrackingList() {
			return printTrackingList;
		}

		public void setPrintTrackingList(List<PrintTracking> printTrackingList) {
			this.printTrackingList = printTrackingList;
		}
		

		@JsonIgnore
		public List<AdvertisementTracking> getAdvertisementTrackingList() {
			return advertisementTrackingList;
		}

		public void setAdvertisementTrackingList(
				List<AdvertisementTracking> advertisementTrackingList) {
			this.advertisementTrackingList = advertisementTrackingList;
		}

				
	@Column(name="FIRST_NAME")  
	 private String firstName;
	 
	 @Column(name="LAST_NAME")  
	 private String lastName;
	 
	 

	@Column(name="EMAIL")  
	 private String email;
	 
	 @Column(name="SEX")  
	 private String sex;
	   
	 @Column(name="ADDRESS")  
	 private String address;  
	   
	 @Column(name="CONTACT")  
	 private Long moblieNo;
	 
	 @Column(name="PASSWORD")  
	 private String password;
	 
	 @Column(name = "USER_TYPE_ID")  
	 private Integer userTypeId; 
	 
	 /**
	 * @return the moblieNo
	 */
	public Long getMoblieNo() {
		return moblieNo;
	}
	/**
	 * @param moblieNo the moblieNo to set
	 */
	
	public void setMoblieNo(Long moblieNo) {
		this.moblieNo = moblieNo;
	}

	
	@Column(name="IS_DELETED")  
	 private Integer isDeleted;

	/**
	 * @return the registrationId
	 */
	public Integer getRegistrationId() {
		return registrationId;
	}

	/**
	 * @param registrationId the registrationId to set
	 */
	public void setRegistrationId(Integer registrationId) {
		this.registrationId = registrationId;
	}

	/**
	 * @return the firstName
	 */
	public String getFirstName() {
		return firstName;
	}

	/**
	 * @param firstName the firstName to set
	 */
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	/**
	 * @return the lastName
	 */
	public String getLastName() {
		return lastName;
	}

	/**
	 * @param lastName the lastName to set
	 */
	public void setLastName(String lastName) {
		this.lastName = lastName;
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

	/**
	 * @return the sex
	 */
	public String getSex() {
		return sex;
	}

	/**
	 * @param sex the sex to set
	 */
	public void setSex(String sex) {
		this.sex = sex;
	}

	/**
	 * @return the address
	 */
	public String getAddress() {
		return address;
	}

	/**
	 * @param address the address to set
	 */
	public void setAddress(String address) {
		this.address = address;
	}

	

	/**
	 * @return the password
	 */
	public String getPassword() {
		return password;
	}

	/**
	 * @param password the password to set
	 */
	public void setPassword(String password) {
		this.password = password;
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
	 * @return the userTypeId
	 */
	public Integer getUserTypeId() {
		return userTypeId;
	}

	/**
	 * @param userTypeId the userTypeId to set
	 */
	public void setUserTypeId(Integer userTypeId) {
		this.userTypeId = userTypeId;
	}

	public User getUser() {
	    return user;
	}

	public void setUser(User user) {
	    this.user = user;
	}

	
		
	
}