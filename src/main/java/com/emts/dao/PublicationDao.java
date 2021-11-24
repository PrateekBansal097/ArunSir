package com.emts.dao;
import java.util.List;
import com.emts.model.Publication;
public interface PublicationDao {
	public List<Object> addPublicationName(Publication publication);
	public List<Object> getContent();
	public void removeContent(Integer Id);
	public List<Object> updatePublication(Integer Id);
	@SuppressWarnings("rawtypes")
	public List getPublicationName(Integer publicationId);
	public List<Object> getpublicationByState(Integer stateId);
}
