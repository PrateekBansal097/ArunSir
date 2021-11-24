package com.emts.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.emts.dao.PopUpDao;
import com.emts.model.PopUp;
import com.emts.util.IConstant;

@Service
public class PopUpServiceImpl implements PopUpService{
	@Autowired
	private  PopUpDao popUpDao;
	
	@Transactional
	public void addPop(PopUp popUp) {
		popUp.setIsDeleted(IConstant.IS_DELETED_ACTIVE);
		popUpDao.addPop(popUp);
		
	}

	public List<PopUp> getmessage() {
		List<PopUp> popupList = new ArrayList<PopUp>();
		popupList=popUpDao.getmessage();
		return popupList;
	}
}
