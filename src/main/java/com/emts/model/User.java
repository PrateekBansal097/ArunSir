package com.emts.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="user")
public class User {

    @Id  
    @GeneratedValue(strategy=GenerationType.AUTO)  
     @Column(name="USER_TYPE_ID")
    private Integer userId;
    
    @Column(name="USER_TYPE")
    private String userType;
    
    @Column(name="IS_DELETED")  
    private Integer isDeleted;

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }

    public int getIsDeleted() {
        return isDeleted;
    }

    public void setIsDeleted(int isDeleted) {
        this.isDeleted = isDeleted;
    }

    @Override
    public String toString() {
	return "User [userId=" + userId + ", userType=" + userType
		+ ", isDeleted=" + isDeleted + "]";
    }

  
    
    
}
