package com.emts.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.stereotype.Repository;

import com.emts.model.AdvType;
import com.emts.util.IConstant;

@Repository
public class AdvTypeDaoImpl implements AdvTypeDao{
@Autowired
private HibernateTemplate hibernatetemplate;
	@SuppressWarnings("unchecked")
	public List<Object> addAdvTypename(AdvType advtype) {
		List<Object> advtypeContent=null;
		if(advtype.getAdvTypeId()!=null){
			hibernatetemplate.saveOrUpdate(advtype);
			return advtypeContent;
		}else{
			advtypeContent=hibernatetemplate.find("from AdvType where ADV_TYPE_NAME='"+advtype.getAdvtypeName()+"' AND IS_DELETED="+IConstant.IS_DELETED_ACTIVE);
			if (advtypeContent.isEmpty()){		
			    hibernatetemplate.saveOrUpdate(advtype);
			}
			return advtypeContent;
		}
		
	}
	
	@SuppressWarnings("unchecked")
	public List<Object> getContent() {
		List<Object> advTypeContent=null;
		advTypeContent=hibernatetemplate.find("from AdvType  where IS_DELETED="+IConstant.IS_DELETED_ACTIVE);
		return advTypeContent;
	}
	public void removeContent(Integer Id) {
		AdvType adType=(AdvType)hibernatetemplate.get(AdvType.class,Id);
		adType.setIsDeleted(IConstant.IS_DELETED_DEACTIVE);
		if(null!=adType)
		{
			System.out.println("if Block");
			hibernatetemplate.update(adType);
		}
		
	}
	@SuppressWarnings("unchecked")
	public List<Object> updateAdvType(Integer Id) {
		List<Object> advType=null;
		advType=hibernatetemplate.find("from AdvType advType where advType.advTypeId=?",Id);
		return advType;
		
	}

}
