package com.emts.service;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.emts.dao.SaveTrackDao;
import com.emts.model.NewsType;
import com.emts.model.Tracking;
import com.emts.util.IConstant;
@Service
public class SaveTrackServiceImpl implements SaveTrackService {
@Autowired SaveTrackDao savetrackdao;
public void addSaveTracking(Tracking saveTracking) {
	saveTracking.setIsDeleted(IConstant.IS_DELETED_ACTIVE);
	/*saveTracking.setStoryCode(saveTracking.getChanel().getShortChannelName()+"-"+ saveTracking.getDate()+"-"+saveTracking.getTrackingId());*/
	savetrackdao.addSaveTracking(saveTracking);
}
@SuppressWarnings({ "unchecked", "rawtypes" })
public List<NewsType> getAllNewsType() {
	List<NewsType> newsType=new ArrayList<NewsType>();
	newsType=(List)savetrackdao.getAllNewsType();
	return newsType;
}
@SuppressWarnings({ "unchecked", "rawtypes" })
public List<Tracking> getContent(Integer id) {
	List<Tracking>trackingContent=new ArrayList<Tracking>();
	trackingContent=(List)savetrackdao.getContent(id);
	return trackingContent;
}
public void deleteTracking(Integer Id) {
	savetrackdao.deleteTracking(Id);
}
public Tracking updateTracking(Integer Id) {
	List<Object> tracking=new ArrayList<Object>();
	Tracking updateTracking=new Tracking();
	tracking=savetrackdao.updateTracking(Id);	/*List convert to object*/
	for (Object object : tracking) {
		updateTracking= (Tracking) object; 
	}
	return updateTracking;
}
}
