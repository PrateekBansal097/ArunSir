package com.emts.dao;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.stereotype.Repository;
import com.emts.model.Party;
import com.emts.util.IConstant;
@Repository
public class PartyDaoImpl implements PartyDao {
	@Autowired
	private HibernateTemplate hibernateTemplate;

	@SuppressWarnings("unchecked")
	public List<Object> addPartyName(Party party) {
		List<Object> addPartyContent=null;
		if(party.getPartyId()!=null){
			hibernateTemplate.saveOrUpdate(party);
		return addPartyContent;
		}else{
			addPartyContent=hibernateTemplate.find("from Party where PARTY_NAME='"+party.getPartyName()+"' AND IS_DELETED="+IConstant.IS_DELETED_ACTIVE);
			if (addPartyContent.isEmpty()){
				hibernateTemplate.saveOrUpdate(party);
			}
			return addPartyContent;
		}
		
	}
	@SuppressWarnings("unchecked")
	public List<Object> getContent() {
		List<Object> partyContent = null;
		partyContent = hibernateTemplate.find("from Party where IS_DELETED="+IConstant.IS_DELETED_ACTIVE);
		return partyContent;
	}
	public void removeContent(Integer Id) {
		Party party=(Party)hibernateTemplate.get(Party.class,Id);
		party.setIsDeleted(IConstant.IS_DELETED_DEACTIVE);
		if(null!=party)
		{
			System.out.println("if Block");
			hibernateTemplate.update(party);
		}
	}
	@SuppressWarnings("unchecked")
	public List<Object> updateParty(Integer Id) {
		List<Object> party=null;
		party=hibernateTemplate.find("from Party party where party.partyId=?",Id);
		return party;
	}
}
