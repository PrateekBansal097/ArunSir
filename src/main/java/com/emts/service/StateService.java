package com.emts.service;

import java.util.List;

import com.emts.model.State;

public interface StateService {
	public List<Object> addStateName(State state);
	public List<State> getContent();
	public void removeContent(Integer Id);
	public State updateState(Integer Id);
	public List<Object> getStateByCountry(Integer countryId);
	public List<State> getAllStateName();
}
