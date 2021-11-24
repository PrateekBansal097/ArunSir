package com.emts.dao;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.stereotype.Repository;
import com.emts.model.PrintTracking;
import com.emts.model.Publication;
import com.emts.util.DateFormat;
import com.emts.util.IConstant;

@Repository
public class PrintTrackDaoImpl implements PrintTrackDao {
	@Autowired
	private HibernateTemplate hibernateTemplate;

	@SuppressWarnings("unchecked")
	public List<Object> getAllState() {
		List<Object> state = null;
		state = hibernateTemplate.find("from State where IS_DELETED="
				+ IConstant.IS_DELETED_ACTIVE);
		return state;
	}

	@SuppressWarnings("unchecked")
	public List<Object> getAllPublication() {
		List<Object> publication = null;
		publication = hibernateTemplate
				.find("from Publication where IS_DELETED="
						+ IConstant.IS_DELETED_ACTIVE);
		return publication;
	}

	public void addPrintTrack(PrintTracking printTracking) {
		Publication publication = (Publication) hibernateTemplate.get(
				Publication.class, printTracking.getPublication()
						.getPublicationId());
		printTracking.setPublication(publication);
		if (printTracking.getPrintTrackingId() == null) {
			@SuppressWarnings("unchecked")
			List<Integer> results = hibernateTemplate
					.find("select max(print.printTrackingId) from PrintTracking print");
			int id;
			if (results.get(0)==null) {
				id = 1;
			} else {
				id = results.get(0) + 1;
			}
			printTracking.setStoryCode(printTracking.getPublication()
					.getShortPublicationName()
					+ "-"
					+ DateFormat.generateStoryCode(printTracking.getDate())
					+ "-" + id);
		} else {
			printTracking.setStoryCode(printTracking.getPublication()
					.getShortPublicationName()
					+ "-"
					+ DateFormat.generateStoryCode(printTracking.getDate())
					+ "-" + printTracking.getPrintTrackingId());
		}
		if (printTracking.getNewsTrend().equals("POSITIVE")
				|| printTracking.getNewsTrend().equals("Positive")) {
			int PhotoColumn;
			int NewsColumn;
			if (printTracking.getPhotoColumn() != null) {
				PhotoColumn = printTracking.getPhotoColumn();
			} else {
				PhotoColumn = 0;
			}
			if (printTracking.getNewsColumn() != null) {
				NewsColumn = printTracking.getNewsColumn();
			} else {
				NewsColumn = 0;
			}
			int valuetest = (NewsColumn + PhotoColumn) * 1;
			printTracking.setMarking(valuetest);
		} else {
			int PhotoColumn;
			int NewsColumn;
			if (printTracking.getPhotoColumn() != null) {
				PhotoColumn = printTracking.getPhotoColumn();
			} else {
				PhotoColumn = 0;
			}
			if (printTracking.getNewsColumn() != null) {
				NewsColumn = printTracking.getNewsColumn();
			} else {
				NewsColumn = 0;
			}
			int valuetest = (NewsColumn + PhotoColumn) * -1;
			printTracking.setMarking(valuetest);
		}
		hibernateTemplate.saveOrUpdate(printTracking);
	}

	@SuppressWarnings("unchecked")
	public List<Object> getContent(Integer id) {
		List<Object> printTrackingList = null;
		printTrackingList = hibernateTemplate
				.find("from PrintTracking p where p.isDeleted="
						+ IConstant.IS_DELETED_ACTIVE
						+ "and p.state.isDeleted="
						+ IConstant.IS_DELETED_ACTIVE 
						+ "and p.city.isDeleted="
						+ IConstant.IS_DELETED_ACTIVE
						+ "and p.publication.isDeleted="
						+ IConstant.IS_DELETED_ACTIVE
						+ "and p.sector.isDeleted="
						+ IConstant.IS_DELETED_ACTIVE
						+ "and p.subSector.isDeleted="
						+ IConstant.IS_DELETED_ACTIVE
						+ "and p.client.isDeleted="
						+ IConstant.IS_DELETED_ACTIVE+
						"and p.registration.registrationId="+id
						+ "order by p.printTrackingId desc");
		return printTrackingList;
	}

	public void deleteTracking(Integer id) {
		PrintTracking tracking = (PrintTracking) hibernateTemplate.get(
				PrintTracking.class, id);
		tracking.setIsDeleted(IConstant.IS_DELETED_DEACTIVE);
		if (null != tracking) {
			hibernateTemplate.update(tracking);
		}
	}

	@SuppressWarnings("unchecked")
	public List<Object> updatePrintTracking(Integer Id) {
		List<Object> printTracking = null;
		printTracking = hibernateTemplate
				.find("from PrintTracking printTracking where printTracking.printTrackingId=?",
						Id);
		return printTracking;
	}
}
