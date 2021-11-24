package com.emts.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.emts.dao.PublicationDao;
import com.emts.model.Publication;
import com.emts.util.IConstant;

@Service
public class PublicationServiceImpl implements PublicationService {
	@Autowired PublicationDao publicationDao;

	public List<Object> addPublicationName(Publication publication) {
		List<Object> content=null;
         publication.setIsDeleted(IConstant.IS_DELETED_ACTIVE);
         content= publicationDao.addPublicationName(publication);
         return content;
	}
    
	@Transactional
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public List<Publication> getContent() {
		List<Publication>publicationContent=new ArrayList<Publication>();
		publicationContent=(List) publicationDao.getContent();
		return publicationContent;
	}
	@Transactional
	public void removeContent(Integer Id) {
		
		publicationDao.removeContent(Id);
		
	}
	public Publication updatePublication(Integer Id) {
		List<Object> publication=new ArrayList<Object>();
		Publication updatePublication = new Publication();
		publication=publicationDao.updatePublication(Id);
		/*List convert to object*/
		for (Object object : publication) {
			updatePublication= (Publication) object; 
		}
		return updatePublication;
	}
	@SuppressWarnings("rawtypes")
	public List getPublicationName(Integer publicationId) {
		List publicationName=null;
		publicationName=publicationDao.getPublicationName(publicationId);
		return	publicationName;	
	}

	public List<Object> getpublicationByState(Integer stateId) {
		List<Object> publicationList=new ArrayList<Object>();
		publicationList=publicationDao.getpublicationByState(stateId);
		return publicationList;
	}

	
}
