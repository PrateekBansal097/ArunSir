package com.emts.dao;

import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.stereotype.Repository;

import com.emts.model.PrintTracking;
import com.emts.model.Sector;
import com.emts.model.Tracking;
import com.emts.util.IConstant;

@Repository
public class SectorDaoImpl implements SectorDao {
	@Autowired
	private HibernateTemplate hibernateTemplate;
	@SuppressWarnings("unchecked")
	public List<Object> addSectorname(Sector sector) {
		List<Object> sectorContent=null;
		if(sector.getSectorId()!=null){
			hibernateTemplate.saveOrUpdate(sector);
			return sectorContent;
		}else{
			sectorContent=hibernateTemplate.find("from Sector where SECTOR_NAME='"+sector.getSectorName()+"' AND IS_DELETED="+IConstant.IS_DELETED_ACTIVE);
			if(sectorContent.isEmpty())
			{
			    hibernateTemplate.saveOrUpdate(sector);
				
			}
			return sectorContent;
		}
		
	}

	@SuppressWarnings("unchecked")
	public List<Object> getContent() {
		List<Object> sectorContent=null;
		sectorContent=hibernateTemplate.find("from Sector where IS_DELETED="+IConstant.IS_DELETED_ACTIVE);
		return sectorContent;
	}
	public void removeContent(Integer Id) {
		Sector sector=(Sector)hibernateTemplate.get(Sector.class,Id);
		sector.setIsDeleted(IConstant.IS_DELETED_DEACTIVE);
		if(null!=sector)
		{
			hibernateTemplate.update(sector);
		}
		
	}
	@SuppressWarnings("unchecked")
	public List<Object> updateSector(Integer Id) {
		List<Object> sector=null;
		sector=hibernateTemplate.find("from Sector sector where sector.sectorId=?",Id);
		return sector;
	}
	@SuppressWarnings("unchecked")
	public List<Object> getAllSector() {
		List<Object> sectorList=null;
		sectorList=hibernateTemplate.find("from Sector where IS_DELETED="+IConstant.IS_DELETED_ACTIVE);
		return sectorList;
	}

}
