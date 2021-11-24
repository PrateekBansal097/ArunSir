package com.emts.dao;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.stereotype.Repository;
import com.emts.model.Client;
import com.emts.util.IConstant;
@Repository
public class ClientDaoImpl implements ClientDao{
	@Autowired
	private HibernateTemplate hibernateTemplate;
	@SuppressWarnings("unchecked")
	public List<Object> addclientName(Client client) {
			List<Object> clientContent=null;
			if(client.getClientId()!=null){
				hibernateTemplate.saveOrUpdate(client);
				return clientContent;
			}else{
				clientContent=hibernateTemplate.find("from Client where CLIENT_NAME='"+client.getClientName()+"' AND IS_DELETED="+IConstant.IS_DELETED_ACTIVE);
				if (clientContent.isEmpty()){
	           hibernateTemplate.saveOrUpdate(client);
		}
				return clientContent;
			}
	}
			
	@SuppressWarnings("unchecked")
	public List<Object> getContent() {
		List<Object> clientContent=null;
		clientContent=hibernateTemplate.find("from Client where IS_DELETED="+IConstant.IS_DELETED_ACTIVE);
		return clientContent;
	}
	public void removeContent(Integer Id) {
		Client client=(Client)hibernateTemplate.get(Client.class,Id);
		client.setIsDeleted(IConstant.IS_DELETED_DEACTIVE);
		if(null!=client)
		{
			hibernateTemplate.update(client);
		}
	}
	@SuppressWarnings("unchecked")
	public List<Object> updateClient(Integer Id) {
		List<Object> client=null;
		client=hibernateTemplate.find("from Client client where client.clientId=?",Id);
		return client;
	}
	@SuppressWarnings("rawtypes")
	public List getClientName(Integer clientId) {
	List ClientName=null;
	ClientName=hibernateTemplate.find("select clientName from Client  where IS_DELETED="+IConstant.IS_DELETED_ACTIVE+"and clientId="+clientId+" ");
	return ClientName;
	}
	@SuppressWarnings({ "unchecked" })
	public List<Object> getAllClientName() {
		List<Object> clientList=null;
		clientList=hibernateTemplate.find("from Client where IS_DELETED="+IConstant.IS_DELETED_ACTIVE);
		return clientList;
	}
}
