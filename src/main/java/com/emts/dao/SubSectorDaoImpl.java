package com.emts.dao;

import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.stereotype.Repository;

import com.emts.model.PrintTracking;
import com.emts.model.SubSector;
import com.emts.model.Tracking;
import com.emts.util.IConstant;

@Repository
public class SubSectorDaoImpl implements SubSectorDao {
@Autowired 
private HibernateTemplate hibernateTemplate;
@SuppressWarnings("unchecked")
public List<Object> addSubSectorname(SubSector subsector) {
	List<Object> subsectorContent=null;
	if(subsector.getSubSectorId()!=null){
		hibernateTemplate.saveOrUpdate(subsector);	   
		return subsectorContent;
	}else{
		subsectorContent=hibernateTemplate.find("from SubSector where SUB_SECTOR_NAME='"+subsector.getSubSectorName()+"' AND IS_DELETED="+IConstant.IS_DELETED_ACTIVE);
		if(subsectorContent.isEmpty()){
		    hibernateTemplate.saveOrUpdate(subsector);	    
		}
				return subsectorContent;
	}
	
}

	@SuppressWarnings("unchecked")
	public List<Object> getContent() {
		List<Object> subsectorContent=null;
		subsectorContent=hibernateTemplate.find("from SubSector where IS_DELETED="+IConstant.IS_DELETED_ACTIVE);
		return subsectorContent;
	}
	public void removeContent(Integer Id) {
		SubSector subsector=(SubSector)hibernateTemplate.get(SubSector.class, Id);
		subsector.setIsDeleted(IConstant.IS_DELETED_DEACTIVE);
		if(null!=subsector)
		{
			hibernateTemplate.update(subsector);
		}
	}
	@SuppressWarnings("unchecked")
	public List<Object> updateSubSector(Integer Id) {
		List<Object> subSector=null;
		subSector=hibernateTemplate.find("from SubSector subSector where subSector.subSectorId=?",Id);
		return subSector;
	}
	@SuppressWarnings("unchecked")
	public List<Object> getAllSubSector() {
		List<Object> subSectorList=null;
		subSectorList=hibernateTemplate.find("from SubSector where IS_DELETED="+IConstant.IS_DELETED_ACTIVE);
		return subSectorList;
	}

}
