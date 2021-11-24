package com.emts.dao;

import java.util.List;

import com.emts.model.AdvType;

public interface AdvTypeDao {
	public List<Object> addAdvTypename(AdvType advtype);
	public List<Object> getContent();
	public List<Object> updateAdvType(Integer Id);
	public void removeContent(Integer Id);
}
