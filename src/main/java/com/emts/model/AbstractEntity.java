package com.emts.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.map.SerializationConfig;
@MappedSuperclass
public abstract class AbstractEntity {
	/**
	 * Date of creation.
	 */
	 @Column(name ="CREATED_DATE")
	 private Date createdDate;
	 /**
	 * Date of updation.
	 * */
	 @Column(name="UPDATED_DATE")
	 private Date updatedDate;
	 @Column(name="CREATED_BY")
	 private String createdBy;
	 @Column(name="UPDATED_BY")
	 private String updatedBy;
	/**
	 * @return the createdBy
	 */
	public String getCreatedBy() {
		return createdBy;
	}
	/**
	 * @param createdBy the createdBy to set
	 */
	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}
	/**
	 * @return the updatedBy
	 */
	public String getUpdatedBy() {
		return updatedBy;
	}
	/**
	 * @param updatedBy the updatedBy to set
	 */
	public void setUpdatedBy(String updatedBy) {
		this.updatedBy = updatedBy;
	}
	/**
	 * Retrieve updatedDate .
	 * 
	 * @return a Date data type.
	 */
	 @JsonIgnore
	public Date getUpdatedDate() {
		return updatedDate;
	}
    /**
	 * Retrieve createdDate .
	 * 
	 * @return a Date data type.
	 */
	@JsonIgnore
	public Date getCreatedDate() {
		return createdDate;
	}

    /**
	 * Set the value of createdDate.
	 * 
	 * @param createdDate
	 *            a variable of type Date.
	 */
	@JsonIgnore
	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}
    /**
	 * Set the value of updatedDate.
	 * 
	 * @param updatedDate
	 *            a variable of type Date.
	 */
	@JsonIgnore
	public void setUpdatedDate(Date updatedDate) {
		this.updatedDate = updatedDate;
	}
	public String toJSON(){

		try {

		ObjectMapper mapper = new ObjectMapper();
		 mapper.getSerializationConfig().set(
		          SerializationConfig.Feature.INDENT_OUTPUT, true);
		      return mapper.writeValueAsString(this);

		} catch (Exception e) {
			return toString();
		}
		
	}
	
	public static void main(String [] args)
	{
		Date date = new Date();
	    System.out.println(date.toString());
	}
	
}
