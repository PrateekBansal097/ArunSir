package com.emts.service;

import java.util.List;

import com.emts.model.Party;

public interface PartyService {
	public List<Object> addPartyName(Party party);
	public List<Party> getContent();
	public Party updateParty(Integer Id);
	public void removeContent(Integer Id);

}
