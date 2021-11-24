package com.emts.dao;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.stereotype.Repository;

import com.emts.model.Country;
import com.emts.model.Publication;
import com.emts.model.State;
import com.emts.util.IConstant;

@SuppressWarnings("unused")
@Repository
public class PublicationDaoImpl implements PublicationDao{
	@Autowired
	private HibernateTemplate hibernateTemplate;

	@SuppressWarnings("unchecked")
	public List<Object> addPublicationName(Publication publication) {
		ArrayList<Object> list=new ArrayList<Object>();
		List<Object> publicationContent=null;
		List<Object> shortpublicationContent=null;
		if(publication.getPublicationId()!=null){
			hibernateTemplate.saveOrUpdate(publication);
			return publicationContent;
		}else{
			publicationContent=hibernateTemplate.find("from Publication where PUBLICATION_NAME='"+publication.getPublicationName()+"' AND IS_DELETED="+IConstant.IS_DELETED_ACTIVE);
			shortpublicationContent=hibernateTemplate.find("from Publication where PUBLICATION_SHORT_NAME='"+publication.getShortPublicationName()+"' AND IS_DELETED="+IConstant.IS_DELETED_ACTIVE);
			list.add(publicationContent);
			list.add(shortpublicationContent);
			if(publicationContent.isEmpty()||shortpublicationContent.isEmpty()){
			hibernateTemplate.saveOrUpdate(publication);
		}
			return publicationContent;
		}
		
	}
	
	@SuppressWarnings("unchecked")
	public List<Object> getContent() {
		List<Object> publicationContent=null;
		publicationContent=hibernateTemplate.find("from Publication p where p.isDeleted="+IConstant.IS_DELETED_ACTIVE+"and p.state.isDeleted="+IConstant.IS_DELETED_ACTIVE );
		return publicationContent;
	}
	public void removeContent(Integer Id) {
		Publication publication=(Publication)hibernateTemplate.get(Publication.class,Id);
		publication.setIsDeleted(IConstant.IS_DELETED_DEACTIVE);
		if(null!=publication)
		{
			hibernateTemplate.update(publication);
		}
	}
	@SuppressWarnings("unchecked")
	public List<Object> updatePublication(Integer Id) {
		List<Object> publication=null;
		publication=hibernateTemplate.find("from Publication public where public.publicationId=?",Id);
		return publication;
		
	}
	@SuppressWarnings("rawtypes")
	public List getPublicationName(Integer publicationId) {
		List publicationName=null;
		publicationName=hibernateTemplate.find("select publicationName from Publication  where IS_DELETED="+IConstant.IS_DELETED_ACTIVE+"and publicationId="+publicationId+" ");
		System.out.println("publicationName"+publicationName);
		System.out.println("publicationName Dao");
		return publicationName;
	}
	@SuppressWarnings("unchecked")
	public List<Object> getpublicationByState(Integer stateId) {
		List<Object> publicationList=null;
		publicationList=hibernateTemplate.find("from Publication where IS_DELETED="+IConstant.IS_DELETED_ACTIVE+"and state.stateId="+stateId+" ");
		Publication publication=new Publication();
		publication=(Publication) publicationList.get(0);
			return publicationList;
	}
}
