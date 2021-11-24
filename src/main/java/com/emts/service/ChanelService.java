package com.emts.service;

import java.util.List;

import com.emts.model.Chanel;

public interface ChanelService {
	public  List<Object> addChanelName(Chanel chanel);
	public List<Chanel> getContent();
	public void removeContent(Integer Id);
	public Chanel updateChanel(Integer Id);
	@SuppressWarnings("rawtypes")
	public List getChannelName(Integer channelId);
	public List<Chanel> getAllChanel();
	public List<Object> getChannelByState(Integer stateId);
}
