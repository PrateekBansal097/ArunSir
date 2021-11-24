package com.emts.dao;

import java.util.List;

import com.emts.model.SubSector;

public interface SubSectorDao {
	public List<Object> addSubSectorname(SubSector subsector);
	public List<Object> getContent();
	public void removeContent(Integer Id);
	public List<Object> updateSubSector(Integer Id);
	public List<Object> getAllSubSector();
}
