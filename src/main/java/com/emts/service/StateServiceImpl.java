package com.emts.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.emts.dao.StateDao;
import com.emts.model.State;
import com.emts.util.IConstant;

@Service
public class StateServiceImpl implements StateService{
@Autowired StateDao statedao;
@Transactional
public List<Object> addStateName(State state) {
	List<Object> content=null;
	state.setIsDeleted(IConstant.IS_DELETED_ACTIVE);
    content=statedao.addStateName(state);	
    return content;
}
@SuppressWarnings({ "unchecked", "rawtypes" })
public List<State> getContent() {
	List<State> stateContent=new ArrayList<State>();
	stateContent=(List)statedao.getContent();
	return stateContent;
}
@Transactional
public void removeContent(Integer Id) {
	statedao.removeContent(Id);
	
}
public State updateState(Integer Id) {
	List<Object> state=new ArrayList<Object>();
	State updateState = new State();
	state=statedao.updateState(Id);
	/*List convert to object*/
	for (Object object : state) {
		updateState= (State) object; 
	}
	return updateState;
}
public List<Object> getStateByCountry(Integer countryId) {
	List<Object> stateList=new ArrayList<Object>();
	stateList=statedao.getStateByCountry(countryId);
	return stateList;
}
@SuppressWarnings({ "unchecked", "rawtypes" })
public List<State> getAllStateName() {
	List<State> stateList=new ArrayList<State>();
	stateList=(List)statedao.getAllStateName();
	return stateList;
}
}

