package com.emts.service;
import java.util.List;

import com.emts.model.PrintTracking;
import com.emts.model.Publication;
import com.emts.model.State;
public interface PrintTrackService {
	public List<State> getAllState();
	public List<Publication> getAllPublication();
	public void addPrintTrack(PrintTracking printTracking);
	public List<PrintTracking> getContent(Integer id);
	public void deletePrintTrack(Integer id);
	public PrintTracking updatePrintTracking(Integer Id);
	
 }
