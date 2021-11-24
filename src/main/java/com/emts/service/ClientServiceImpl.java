package com.emts.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.emts.dao.ClientDao;
import com.emts.model.Client;
import com.emts.util.IConstant;

@Service
public class ClientServiceImpl implements ClientService{
	@Autowired 
	private ClientDao clientDao ;
	public List<Object> addClientName(Client client) {
	List<Object> content=null;
     client.setIsDeleted(IConstant.IS_DELETED_ACTIVE);
     content=clientDao.addclientName(client);
	return content;
	}
		@Transactional
		@SuppressWarnings({ "unchecked", "rawtypes" })
		public List<Client> getContent() {
			List<Client>clientContent=new ArrayList<Client>();
			clientContent=(List) clientDao.getContent();
			return clientContent;
		}
		@Transactional
		public void removeContent(Integer Id) {
			clientDao.removeContent(Id);
		}
		public Client updateClient(Integer Id) {
			List<Object> client=new ArrayList<Object>();
			Client updateClient = new Client();
			client=clientDao.updateClient(Id);
			/*List convert to object*/
			for (Object object : client) {
				updateClient= (Client) object; 
			}
			return updateClient;
		}
		@SuppressWarnings("rawtypes")
		public List getClientName(Integer clientId) {
			List ClientName=null;
			ClientName=clientDao.getClientName(clientId);
			return	ClientName;	
			}
		@SuppressWarnings({ "unchecked", "rawtypes" })
		public List<Client> getAllClientName() {
			List<Client> clientList=new ArrayList<Client>();
			clientList=(List)clientDao.getAllClientName();
			return clientList;
		}
}
