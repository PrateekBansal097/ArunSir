package com.emts.dao;

import java.util.List;

import com.emts.model.Chanel;

public interface ChanelDao {
	public  List<Object> addChanelName(Chanel chanel);
	public List<Object> getContent();
	public void removeContent(Integer Id);
	public List<Object> updateChanel(Integer Id);
	@SuppressWarnings("rawtypes")
	public List getChannelName(Integer channelId);
	public List<Object> getAllChanel();
	public List<Object> getChannelByState(Integer stateId);
}
