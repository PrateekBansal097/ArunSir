package com.emts.dao;
import java.util.List;
public interface ForgotDao {
	@SuppressWarnings("rawtypes")
	public List getPassword(String email);
}
