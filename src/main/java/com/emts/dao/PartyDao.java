package com.emts.dao;
import java.util.List;
import com.emts.model.Party;
public interface PartyDao {
	public List<Object> addPartyName(Party party);
	public List<Object> getContent();
	public List<Object> updateParty(Integer Id);
	public void removeContent(Integer Id);
}
