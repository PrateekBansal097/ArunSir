package com.emts.service;

import java.util.List;

import com.emts.model.Publication;

public interface PublicationService {
	public List<Object> addPublicationName(Publication publication);
	public List<Publication> getContent();
	public void removeContent(Integer Id);
	public Publication updatePublication(Integer Id);
	@SuppressWarnings("rawtypes")
	public List getPublicationName(Integer publicationId);
	public List<Object> getpublicationByState(Integer stateId);
}
