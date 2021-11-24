package com.emts.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.emts.dao.ChanelDao;
import com.emts.model.Chanel;
import com.emts.util.IConstant;

@Service
public class ChanelServiceImpl implements ChanelService {
	@Autowired ChanelDao chaneldao;
	@Transactional
	public  List<Object> addChanelName(Chanel chanel) {
		List<Object> content=null;
		chanel.setIsDeleted(IConstant.IS_DELETED_ACTIVE);
		content=chaneldao.addChanelName(chanel);
		return content;
		
	}
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public List<Chanel> getContent() {
		List<Chanel>chanelContent=new ArrayList<Chanel>();
		chanelContent=(List)chaneldao.getContent();
		return chanelContent;
	}
	public void removeContent(Integer Id) {
		chaneldao.removeContent(Id);
		
	}
	public Chanel updateChanel(Integer Id) {
		List<Object> chanel=new ArrayList<Object>();
		Chanel updateChanel=new Chanel();
		chanel=chaneldao.updateChanel(Id);
		for (Object object :chanel)
		{
			updateChanel=(Chanel)object;
		}
		return updateChanel;
	}
	@SuppressWarnings("rawtypes")
	public List getChannelName(Integer channelId) {
		List channelName=null;
		channelName=chaneldao.getChannelName(channelId);
		return	channelName;	
	}
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public List<Chanel> getAllChanel() {
		List<Chanel> chanelList=new ArrayList<Chanel>();
		chanelList=(List)chaneldao.getAllChanel();
		return chanelList;
	}
	public List<Object> getChannelByState(Integer stateId) {
		List<Object> channelList=new ArrayList<Object>();
		channelList=chaneldao.getChannelByState(stateId);
		return channelList;
	}

}
