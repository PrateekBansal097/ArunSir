package com.emts.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.emts.dao.SectorDao;
import com.emts.model.Sector;
import com.emts.util.IConstant;
@Service
public class SectorServiceImpl implements SectorService {
	
@Autowired SectorDao sectordao;
@Transactional
public List<Object> addSectorname(Sector sector) {
List<Object> content=null;
	sector.setIsDeleted(IConstant.IS_DELETED_ACTIVE);
	content=sectordao.addSectorname(sector);
	return content;
}
	@Transactional
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public List<Sector> getContent() {
		List<Sector> sectorContent=new ArrayList<Sector>();
		sectorContent=(List)sectordao.getContent();
		return sectorContent;
	}
	@Transactional
	public void removeContent(Integer Id) {
		sectordao.removeContent(Id);
		
	}
	public Sector updatSector(Integer Id) {
		List<Object> sector=new ArrayList<Object>();
		Sector updateSector = new Sector();
		sector=sectordao.updateSector(Id);
		/*List convert to object*/
		for (Object object : sector) {
			updateSector= (Sector) object; 
		}
		return updateSector;
	}
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public List<Sector> getAllSector() {
		List<Sector> sectorList=new ArrayList<Sector>();
		sectorList=(List)sectordao.getAllSector();
		return sectorList;
	}

}
