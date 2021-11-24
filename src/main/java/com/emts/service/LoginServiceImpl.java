/**
 * 
 */
package com.emts.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.emts.dao.MemberRepository;
import com.emts.model.Registration;

/**
 * @author ajay.jirati
 *
 */
@Service
public class LoginServiceImpl implements LoginService {

	@Autowired
	private MemberRepository memberRepository;

	/** Method to find Member as per email and password **/
	public Registration findByEmailAndPassword(Object member) {
		Registration convertMember= (Registration) member;
		List<Object> memberList=null;
		if(member!=null)
		{
			if(convertMember.getEmail()!=null && convertMember.getPassword()!=null)
			{
				 memberList =memberRepository.findByEmailAndPassword(convertMember.getEmail(),convertMember.getPassword());
			}
		}
		if(memberList.size()==0)
		{
			convertMember=null;	
		}
		else
		{
			convertMember=(Registration)memberList.get(0);
		}
		
		return convertMember;
	}
}
