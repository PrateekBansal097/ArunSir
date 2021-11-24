package com.emts.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.emts.dao.SearchStoryCodeDao;
@Service
public class SearchStoryCodeServiceImpl implements SearchStoryCodeService{
@Autowired SearchStoryCodeDao storyCodeDao;
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public List<Object> SeachStoryCode(String storyCode) {
		List<Object> searchCodeList = new ArrayList<Object>();
		searchCodeList = (List)storyCodeDao.SeachStoryCode(storyCode);
			return searchCodeList;
	}
	}


