package com.emts.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.emts.dao.PrintTrackDao;
import com.emts.model.PrintTracking;
import com.emts.model.Publication;
import com.emts.model.State;
import com.emts.util.IConstant;
@Service
public class PrintTrackingServiceImpl implements PrintTrackService {
@Autowired PrintTrackDao printTrackDao ;
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public List<State> getAllState() {
		List<State> state=new ArrayList<State>();
		state=(List)printTrackDao.getAllState();
		return state;
	}
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public List<Publication> getAllPublication() {
        List<Publication> publication = new ArrayList<Publication>();
        publication = (List)printTrackDao.getAllPublication();
		return publication;
	}
	public void addPrintTrack(PrintTracking printTracking){
		printTracking.setIsDeleted(IConstant.IS_DELETED_ACTIVE);
		printTrackDao.addPrintTrack(printTracking);
	}
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public List<PrintTracking> getContent(Integer id) {
     List<PrintTracking> printTrackingList = new ArrayList<PrintTracking>();
     printTrackingList = (List)printTrackDao.getContent(id);
		return printTrackingList;
	}
	public void deletePrintTrack(Integer id) {
		printTrackDao.deleteTracking(id);
		
	}
	public PrintTracking updatePrintTracking(Integer Id) {
		List<Object> printTracking=new ArrayList<Object>();
		PrintTracking updatePrintTracking=new PrintTracking();
		printTracking=printTrackDao.updatePrintTracking(Id);	/*List convert to object*/
		for (Object object : printTracking) {
			updatePrintTracking= (PrintTracking) object; 
		}
		return updatePrintTracking;
	}
	}
	

