package com.emts.dao;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.stereotype.Repository;
import com.emts.model.Chanel;
import com.emts.model.State;
import com.emts.util.IConstant;
@Repository
public class ChanelDaoImpl implements ChanelDao{
	@Autowired
	private HibernateTemplate hibernateTemplate;
	@SuppressWarnings({ "unchecked" })
	public  List<Object> addChanelName(Chanel chanel) {
		ArrayList<Object> list=new ArrayList<Object>();
		List<Object> chanelContent=null;
		List<Object> shortchanelContent=null;
		if(chanel.getChannelId()!=null &&chanel.getShortChannelName()!=null){
			hibernateTemplate.saveOrUpdate(chanel);
			return chanelContent;
		}else{
			chanelContent=hibernateTemplate.find("from Chanel where CHANNEL_NAME='"+chanel.getChannelName()+"' AND IS_DELETED="+IConstant.IS_DELETED_ACTIVE);
			shortchanelContent=hibernateTemplate.find("from Chanel where CHANNEL_SHORT_NAME='"+chanel.getShortChannelName()+"' AND IS_DELETED="+IConstant.IS_DELETED_ACTIVE);
			list.add(chanelContent);
			list.add(shortchanelContent);
			if(chanelContent.isEmpty()||shortchanelContent.isEmpty() ){
				@SuppressWarnings("unused")
				State state=(State)hibernateTemplate.get(State.class, chanel.getState().getStateId());
				hibernateTemplate.saveOrUpdate(chanel);
			}
				return chanelContent;
		}
		
	}
	@SuppressWarnings("unchecked")
	public List<Object> getContent() {
		List<Object> chanelContent=null;
		chanelContent=hibernateTemplate.find("from Chanel c where c.isDeleted="+IConstant.IS_DELETED_ACTIVE + " and c.state.isDeleted="+IConstant.IS_DELETED_ACTIVE);
		return chanelContent;
	}
	public void removeContent(Integer Id) {
		Chanel chanel=(Chanel)hibernateTemplate.get(Chanel.class, Id);
		chanel.setIsDeleted(IConstant.IS_DELETED_DEACTIVE);
		if(null!=chanel)
		{
			hibernateTemplate.update(chanel);
		}
	}
	@SuppressWarnings("unchecked")
	public List<Object> updateChanel(Integer Id) {
		List<Object> chanel=null;
		chanel=hibernateTemplate.find("from Chanel chanel where chanel.channelId=?",Id );
		return chanel;
	}
	@SuppressWarnings("rawtypes")
	public List getChannelName(Integer channelId) {
		List channelName=null;
		channelName=hibernateTemplate.find("select channelName from Chanel  where IS_DELETED="+IConstant.IS_DELETED_ACTIVE+"and channelId="+channelId+" ");
		return channelName;
	}
	@SuppressWarnings("unchecked")
	public List<Object> getAllChanel() {
		List<Object> chanelList=null;
		chanelList=hibernateTemplate.find("from Chanel where IS_DELETED="+IConstant.IS_DELETED_ACTIVE);
		return chanelList;
	}
	@SuppressWarnings("unchecked")
	public List<Object> getChannelByState(Integer stateId) {
		List<Object> channelList=null;
		channelList=hibernateTemplate.find("from Chanel where IS_DELETED="+IConstant.IS_DELETED_ACTIVE+"and state.stateId="+stateId+" ");
		Chanel chanel = new Chanel();
		chanel=(Chanel)channelList.get(0);
		return channelList;
	}
}
