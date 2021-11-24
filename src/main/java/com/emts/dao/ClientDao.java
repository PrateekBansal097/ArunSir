package com.emts.dao;
import java.util.List;
import com.emts.model.Client;
public interface ClientDao {
	public List<Object> addclientName(Client client);
	public List<Object> getContent();
	public List<Object> updateClient(Integer Id);
	public void removeContent(Integer Id);
	@SuppressWarnings("rawtypes")
	public List getClientName(Integer clientId);
	public List<Object> getAllClientName();
}
