package com.emts.dao;

import java.util.List;

import com.emts.model.Sector;

public interface SectorDao {
	public List<Object> addSectorname(Sector sector);
	public List<Object> getContent();
	public void removeContent(Integer Id);
	public List<Object> updateSector(Integer Id);
	public List<Object> getAllSector();
}
