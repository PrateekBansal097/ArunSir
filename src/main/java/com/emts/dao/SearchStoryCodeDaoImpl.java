package com.emts.dao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.stereotype.Repository;

import com.emts.util.IConstant;
@Repository
public class SearchStoryCodeDaoImpl implements SearchStoryCodeDao{
	@Autowired
	private HibernateTemplate hibernateTemplate;
	@SuppressWarnings("unchecked")
	public List<Object> SeachStoryCode(String storyCode) {
		List<Object> searchCode=new ArrayList<Object>();
		List<Object> trackingStoryCode=null;
		List<Object> publicationStoryCode=null;
		trackingStoryCode=hibernateTemplate.find("from Tracking WHERE isDeleted="+IConstant.IS_DELETED_ACTIVE+" AND storyCode='"+storyCode+"'");
		publicationStoryCode=hibernateTemplate.find("from PrintTracking WHERE isDeleted="+IConstant.IS_DELETED_ACTIVE+" AND storyCode='"+storyCode+"'");
		searchCode.add(trackingStoryCode);
		searchCode.add(publicationStoryCode);
		return searchCode;
	}

}
