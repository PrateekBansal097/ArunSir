package com.emts.service;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRichTextString;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.CellValue;
import org.apache.poi.ss.usermodel.ClientAnchor;
import org.apache.poi.ss.usermodel.CreationHelper;
import org.apache.poi.ss.usermodel.Drawing;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Picture;
import org.apache.poi.ss.usermodel.PrintSetup;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.ss.util.CellUtil;
import org.apache.poi.util.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.emts.dao.ReportDao;
import com.emts.model.AdvertisementTracking;
import com.emts.model.PrintTracking;
import com.emts.model.Tracking;
import com.emts.util.DateFormat;
import com.lowagie.text.Font;

@Service
public class ReportServiceImpl implements ReportService {

    @Autowired
    @SuppressWarnings("all")
    private ReportDao reportDao;

    public HashMap<String, Object[]> pieChartReport(Integer clientId,
	    String fromDate, String toDate, Integer channelId, String param) {
	return reportDao.pieChartReport(clientId, fromDate, toDate, channelId,
		param);
    }

    public HashMap<String, List<Object>> genrateSectorWisePieChartReport(
	    Integer clientId, String fromDate, String toDate, String param) {

	HashMap<String, List<Object>> map = reportDao
		.genrateSectorWisePieChartReport(clientId, fromDate, toDate,
			param);
	HashMap<String, List<Object>> sectorMap = new HashMap<String, List<Object>>();
	Set set = map.keySet();
	Iterator iterator = set.iterator();

	while (iterator.hasNext()) {
	    List<Object> sectorPositiveList = (List<Object>) map.get(iterator
		    .next());
	    List<Object> sectorNegitiveList = (List<Object>) map.get(iterator
		    .next());
	    List<Object> channelList = (List<Object>) map.get(iterator.next());
	    sectorMap.put("sectorPositiveList", sectorPositiveList);
	    sectorMap.put("sectorNegitiveList", sectorNegitiveList);
	    sectorMap.put("channelList", channelList);

	}
	return sectorMap;
    }

    public HashMap<String, List<Object>> channelWisePieChart(Integer clientId,
	    String fromDate, String toDate, String param) {
	return reportDao.channelWisePieChart(clientId, fromDate, toDate, param);

    }

    @SuppressWarnings({ "unchecked", "rawtypes" })
    public List<Tracking> EMTPDFReport(String fromDate, String toDate,
	    Integer channelId) {
	List<Tracking> pdfTracking = new ArrayList<Tracking>();
	pdfTracking = (List) reportDao
		.EMTPDFReport(fromDate, toDate, channelId);
	return pdfTracking;
    }

    public HashMap<String, List<Object>> sectorWiseNegativePosReport(
	    Integer clientId, String fromDate, String toDate,
	    Integer channelId, String param) {
	return reportDao.sectorWiseNegativePosReport(clientId, fromDate,
		toDate, channelId, param);
    }

    // generate excel report started
    @SuppressWarnings("rawtypes")
    public Boolean getExcelReport(String getreportfromDate,
	    String getreporttoDate, String getreportchannelId,
	    String getclientName) {
	boolean reportGenerated = false;

	try {

	    Map<String, List<Tracking>> dateWiseTrackingListMap = reportDao
		    .getExcelReportList(getreportfromDate, getreporttoDate,
			    getreportchannelId, getclientName);
	    if(dateWiseTrackingListMap==null){
	    	return reportGenerated;
	    }
	    HSSFWorkbook workbook = new HSSFWorkbook();
	    int rowNum = 0;
	    HSSFSheet sheet = null;
	    if (null != dateWiseTrackingListMap
		    && dateWiseTrackingListMap.size() > 0) {
		for (Map.Entry<String, List<Tracking>> TrackingListMap : dateWiseTrackingListMap
			.entrySet()) {
		    sheet = workbook.createSheet(String.valueOf(TrackingListMap
			    .getKey()));
		    insertDataIntoSheet(true, sheet,
			    TrackingListMap.getValue(), rowNum++,
			    getreportfromDate, getreporttoDate,
			    getreportchannelId, getclientName , workbook);

		}
	    }
	    InputStream inputStream = new FileInputStream("E:/Projects/EMTS/src/main/webapp/images/excel.png");
	   // InputStream inputStream = new FileInputStream("/home/sumit23/jvm/apache-tomcat-7.0.41/domains/thinkersanalyzers.in/ROOT/images/excel.png");
	    byte[] bytes = IOUtils.toByteArray(inputStream);
	    int pictureIdx = workbook.addPicture(bytes, Workbook.PICTURE_TYPE_PNG);
	    inputStream.close();
	    CreationHelper helper = workbook.getCreationHelper();
		 
		   //Creates the top-level drawing patriarch.
		   Drawing drawing = sheet.createDrawingPatriarch();
		 
		   //Create an anchor that is attached to the worksheet
		   ClientAnchor anchor = helper.createClientAnchor();
		   anchor.setAnchorType(ClientAnchor.MOVE_DONT_RESIZE);
		   //set top-left corner for the image
		   anchor.setCol1(1);
		   anchor.setRow1(0);
		   //Creates a picture
		   Picture pict = drawing.createPicture(anchor, pictureIdx);
		   //Reset the image to the original size
		   pict.resize();
	   /* File f = new File(" D:/AICTSL/Report");
	    f.mkdirs();
	    FileOutputStream out = new FileOutputStream(
			    new File("D:/AICTSL/Report/Emts_MediaExcel_Report.xls"));*/

	    File f = new File(
		    "/home/sumit23/jvm/apache-tomcat-7.0.41/domains/thinkersanalyzers.in/ROOT/WEB-INF/downloads");
	    f.mkdirs();
	    FileOutputStream out = new FileOutputStream(
		    new File(
			    "/home/sumit23/jvm/apache-tomcat-7.0.41/domains/thinkersanalyzers.in/ROOT/WEB-INF/downloads/Emts_MediaExcel_Report.xls"));

	    workbook.write(out);
	    out.close();
	    reportGenerated = true;

	} catch (FileNotFoundException fileNotFoundException) {
	    fileNotFoundException.printStackTrace();
	} catch (IOException ioException) {
	    ioException.printStackTrace();
	}

	return reportGenerated;
    }

    private void insertDataIntoSheet(boolean headerRequired, HSSFSheet sheet,
	    List<Tracking> trackingList, int rowNum, String getreportfromDate,
	    String getreporttoDate, String getreportchannelId,
	    String getclientName,HSSFWorkbook workbook) {
    	CellStyle style =workbook.createCellStyle(); //Create new style
    	style.setAlignment(CellStyle.ALIGN_CENTER);
    	style.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
    	PrintSetup printSetup = sheet.getPrintSetup();
    	printSetup.setLandscape(true);

    	if (headerRequired) {
	    // testing purpose
	    Object[] headerList = new Object[] { "S.NO", "Slug", "City",
		    "Time", "NewsType", "Sector", "SubSector", "News Trend",
		    "Story Code" };
	    sheet.setColumnWidth(0, 1000);// 1
	    sheet.setColumnWidth(1, 6000);// 2
	    sheet.setColumnWidth(2, 2500);// 3
	    sheet.setColumnWidth(3, 3500);// 4
	    sheet.setColumnWidth(4, 3500);// 5
	    sheet.setColumnWidth(5, 3000);// 6
	    sheet.setColumnWidth(6, 3000);// 7
	    sheet.setColumnWidth(7, 2500);// 8
	    sheet.setColumnWidth(8, 5000);// 9

	    createReportHeader(sheet, rowNum++, headerList, getreportfromDate,
		    getreporttoDate, getreportchannelId, getclientName, style);
	}
	Row row = null;
	int cellnum = 0;
	int serialNo=1;
	for (Tracking tracking : trackingList) {
		int slug=0;
	    if (trackingList.size() > 1) {
		row = sheet.createRow(rowNum = rowNum + 1);
		cellnum = 0;
	    } else {
		row = sheet.createRow(rowNum = rowNum + 1);
	    }
	    Object[] trackingObject = convertTrackingToObjectArray(tracking,serialNo++);
	    if (null != trackingObject) {

		for (Object obj : trackingObject) {
		    Cell cell = row.createCell(cellnum++);
		    style.setWrapText(true);
	    	cell.setCellStyle(style);
		    if (obj instanceof Date)
			cell.setCellValue((Date) obj);
		    else if (obj instanceof Boolean)
			cell.setCellValue((Boolean) obj);
		    else if (obj instanceof String){
		    	if(slug==0){
			    	if(((String) obj).trim().length() < 82){
//			    		row.setHeightInPoints((((String) obj).trim().length() * 2));
			    		row.setHeightInPoints((float) 27.10);
			    		 	}
			    	else{
			    	 row.setHeightInPoints((((String) obj).trim().length()));
			    	}
			    	 slug++;
			    }
			    cell.setCellValue((String) obj);
			    }
			else if (obj instanceof Double)
			cell.setCellValue((Double) obj);
		    else if (obj instanceof Float)
			cell.setCellValue((Float) obj);
		    else if (obj instanceof Integer)
			cell.setCellValue((Integer) obj);
		}
	    }
	}

    }
    private void createReportHeader(HSSFSheet sheet, int rowNumber,
    	    Object[] headerList, String getreportfromDate,
    	    String getreporttoDate, String getreportchannelId,
    	    String getclientName, CellStyle style) {
    	Row row = sheet.createRow(rowNumber);
    	row.setHeightInPoints((float) 37.50);
    	String fromDate=getreportfromDate;
    	String toDate=getreporttoDate;
        String[] newfromDate=fromDate.split("-");
        String fromSetDate=newfromDate[2]+"-"+newfromDate[1]+"-"+newfromDate[0];
        String[] newtoDate=toDate.split("-");
        String toSetDate=newtoDate[2]+"-"+newtoDate[1]+"-"+newtoDate[0];
        sheet.addMergedRegion(new CellRangeAddress(0,0,2,3));
        sheet.addMergedRegion(new CellRangeAddress(0,0,4,5));
        sheet.addMergedRegion(new CellRangeAddress(0,0,6,8));
        Cell cell = row.createCell(2);
    	cell.setCellValue("From:- " + fromSetDate.trim());
    	cell.setCellStyle(style);
    	cell = row.createCell(4);
    	cell.setCellValue("To:- " + toSetDate.trim());
    	cell.setCellStyle(style);
    	cell = row.createCell(6);
    	cell.setCellValue("Client Name :- "
    		+ getclientName.trim().replaceAll("^\\[|\\]$", ""));
    	cell.setCellStyle(style);

    	Row nextRow = sheet.createRow(rowNumber = rowNumber + 1);
    	nextRow.setHeightInPoints((3 * sheet.getDefaultRowHeightInPoints()));
    	int cellnum = 0;
    	for (Object obj : headerList) {
    		Cell nextcell = nextRow.createCell(cellnum++);
    	    nextcell.setCellValue((String) obj);
    	    nextcell.setCellStyle(style);
    	}
    }
    

    private Object[] convertTrackingToObjectArray(Tracking tracking,int serialNo) {

	Object[] trackingObject = null;

	if (null != tracking)

	    trackingObject = new Object[] { serialNo,
		    tracking.getTextArea(), tracking.getCity().getCityName(),
		    tracking.getTime(),
		    tracking.getNewsType().getNewsTypeName(),
		    tracking.getSector().getSectorName(),
		    tracking.getSubSector().getSubSectorName(),
		    tracking.getNewsTrend(), tracking.getStoryCode()
		    };

	return trackingObject;

    }


    // generate excel report functionality end

    // *********************************************************************************************************************
    // generate Adv excel report functionality started

    public Boolean getAdvExcelReport(String getAdvReportfromDate,
	    String getAdvReporttoDate, String getAdvReportchanelid,
	    String getAdvReportclientId, String getclientName) {
	// Generating AdvExcel report functionality
	boolean reportGenerated = false;

	try {

	    Map<String, List<AdvertisementTracking>> dateWiseAdvTrackingListMap = reportDao
		    .getAdvExcelReportList(getAdvReportfromDate,
			    getAdvReporttoDate, getAdvReportchanelid,
			    getAdvReportclientId, getclientName);
	    if (dateWiseAdvTrackingListMap==null) {
			return reportGenerated;
		}
	    HSSFWorkbook workbook = new HSSFWorkbook();
	    HSSFFont font = workbook.createFont();
	    HSSFCellStyle cellStyle = workbook.createCellStyle();
	    cellStyle.setFont(font);
	    cellStyle.setFillBackgroundColor(HSSFColor.BLACK.index);
	    cellStyle
		    .setFillBackgroundColor((short) HSSFColor.DARK_YELLOW.index);

	    font.setColor(IndexedColors.RED.getIndex());
	    cellStyle.setFont(font);
	    int rowNum = 0;
	    HSSFSheet sheet = null;
	    if (null != dateWiseAdvTrackingListMap
		    && dateWiseAdvTrackingListMap.size() > 0) {
		
//		this variable used for storing total duration.... Add on 4-9-2014 added by kapil for total duration
		int totalDuration=0;
		
		for (Map.Entry<String, List<AdvertisementTracking>> AdvTrackingListMap : dateWiseAdvTrackingListMap
			.entrySet()) {
		    sheet = workbook.createSheet(String
			    .valueOf(AdvTrackingListMap.getKey()));
                    //4-9-2014
		    //calculating total duration   
		    for (AdvertisementTracking advertisementTracking : AdvTrackingListMap.getValue()) {
			   totalDuration=totalDuration+advertisementTracking.getDuration();
			   
		    }
		 
//		 Add totalDuration argument on 04-09-14   
		    insertAdvDataIntoSheet(true, sheet,
			    AdvTrackingListMap.getValue(), rowNum++,
			    getAdvReportclientId, getAdvReportfromDate,
			    getAdvReporttoDate, getclientName,workbook,totalDuration);
		}
		
	    }
//	    InputStream inputStream = new FileInputStream("E:/Projects/EMTS/src/main/webapp/images/excel.png");
	    InputStream inputStream = new FileInputStream("/home/sumit23/jvm/apache-tomcat-7.0.41/domains/thinkersanalyzers.in/ROOT/images/excel.png");
//	    InputStream inputStream = new FileInputStream("/home/dell/Projects/EMTS/target/ROOT/WEB-INF/downloads/Emts_AdvExcel_Report.xls");
//	   InputStream inputStream=new FileInputStream("/home/dell/kapil_EMTS/target/emts/pdfReports/Emts_AdvExcel_Report.xls");
	    byte[] bytes = IOUtils.toByteArray(inputStream);
	    int pictureIdx = workbook.addPicture(bytes, Workbook.PICTURE_TYPE_PNG);
	    inputStream.close();
	    CreationHelper helper = workbook.getCreationHelper();
		   //Creates the top-level drawing patriarch.
		   Drawing drawing = sheet.createDrawingPatriarch();
		   //Create an anchor that is attached to the worksheet
		   ClientAnchor anchor = helper.createClientAnchor();
		   //set top-left corner for the image
		   anchor.setCol1(1);
		   anchor.setRow1(0);
		   //Creates a picture
		   Picture pict = drawing.createPicture(anchor, pictureIdx);
		   //Reset the image to the original size
		   pict.resize();
	   /* File f = new File("D:/AICTSL/Report");
	    if(f.exists()){
	    	f.delete();
	    }
	    f.mkdirs();
	    FileOutputStream out = new FileOutputStream(
			    new File("D:/AICTSL/Report/Emts_AdvExcel_Report.xls"));*/
	    File f = new File(
		    "/home/sumit23/jvm/apache-tomcat-7.0.41/domains/thinkersanalyzers.in/ROOT/WEB-INF/downloads");
	    f.mkdirs();
	    FileOutputStream out = new FileOutputStream(
		    new File(
			    "/home/sumit23/jvm/apache-tomcat-7.0.41/domains/thinkersanalyzers.in/ROOT/WEB-INF/downloads/Emts_AdvExcel_Report.xls"));
	     workbook.write(out);
	    out.close();
	    reportGenerated = true;

	} catch (FileNotFoundException fileNotFoundException) {
	    fileNotFoundException.printStackTrace();
	} catch (IOException ioException) {
	    ioException.printStackTrace();
	}
	return reportGenerated;
    }
    private void insertAdvDataIntoSheet(boolean headerRequired,
	    HSSFSheet sheet, List<AdvertisementTracking> advtrackingList,
	    int rowNum, String getAdvReportclientId,
	    String getAdvReportfromDate, String getAdvReporttoDate,
	    String getclientName,HSSFWorkbook workbook,int totalDuration) {
    	CellStyle style =workbook.createCellStyle(); //Create new style
    	style.setAlignment(CellStyle.ALIGN_CENTER);
    	style.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
    	  PrintSetup ps = sheet.getPrintSetup();
    	  ps.setLandscape(true);
	if (headerRequired) {
	    Object[] headerList = new Object[] { "S.NO", "Slug",
		    "Advertisement Type Name", "Party", "City", "Start Time",
		    "End Time", "Duration (in Seconds)" };
	    sheet.setColumnWidth(0, 1000);// 1
	    sheet.setColumnWidth(1, 6000);// 2
	    sheet.setColumnWidth(2, 5000);// 3
	    sheet.setColumnWidth(3, 3000);// 4
	    sheet.setColumnWidth(4, 2500);// 5
	    sheet.setColumnWidth(5, 3000);// 6
	    sheet.setColumnWidth(6, 3000);// 7
	    sheet.setColumnWidth(7, 3000);// 8
	    createAdvReportHeader(sheet, rowNum++, headerList,
		    getAdvReportfromDate, getAdvReporttoDate,
		    getAdvReportclientId, getclientName,style);
	}

	Row row = null;
	int cellnum = 0;
	int serialNo=1;
	
	for (AdvertisementTracking advtracking : advtrackingList) {
		int slug=0;
	    if (advtrackingList.size() > 1) {
		row = sheet.createRow(rowNum = rowNum + 1);
		cellnum = 0;
	    } else {
		row = sheet.createRow(rowNum = rowNum + 1);
	    }
	 

	    Object[] advtrackingObject = convertAdvTrackingToObjectArray(advtracking,serialNo++);

	    if (null != advtrackingObject) {

		for (Object obj : advtrackingObject) {
		    Cell cell = row.createCell(cellnum++);
		  
		    style.setWrapText(true);
	    	cell.setCellStyle(style);
		    if (obj instanceof Date)
			cell.setCellValue((Date) obj);
		    else if (obj instanceof Boolean)
			cell.setCellValue((Boolean) obj);
					else if (obj instanceof String) {
						if (slug == 0) {
							if (((String) obj).trim().length() < 62) {
								row.setHeightInPoints((float)27.00);
							} else {
								row.setHeightInPoints((((String) obj).trim()
										.length()));
							}
							slug++;
						}
						cell.setCellValue((String) obj);
					}
		    else if (obj instanceof Double)
			cell.setCellValue((Double) obj);
		    else if (obj instanceof Float)
			cell.setCellValue((Float) obj);
		    else if (obj instanceof Integer)
			cell.setCellValue((Integer) obj);
		}
	    }
	}
//	4-9-2014 
//	code added for insert row and save total duration in xls file 	
	row = sheet.createRow(rowNum = rowNum + 1);
	row.setHeightInPoints((float) 37.50);
	sheet.addMergedRegion(new CellRangeAddress(rowNum,rowNum,5,6));
	Cell cell = row.createCell(5);
	CellStyle style1 =workbook.createCellStyle(); 
	style1.setAlignment(CellStyle.ALIGN_CENTER);
	style1.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
	style1.setWrapText(true);
	cell.setCellStyle(style1);
	cell.setCellValue("Total duration (in seconds) ");
	 cell = row.createCell(7);
	 cell.setCellStyle(style1);
	 cell.setCellValue(totalDuration);
	System.out.println("totalDuration------"+totalDuration);
    }

    private void createAdvReportHeader(HSSFSheet sheet, int rowNumber,
	    Object[] headerList, String getAdvReportfromDate,
	    String getAdvReporttoDate, String getAdvReportclientId,
	    String getclientName,CellStyle style) {

	// TODO Auto-generated method stub
	Row row = sheet.createRow(rowNumber);
	row.setHeightInPoints((float) 37.50);
	
	String fromDate=getAdvReportfromDate;
	String toDate=getAdvReporttoDate;
    String[] newfromDate=fromDate.split("-");
    String fromSetDate=newfromDate[2]+"-"+newfromDate[1]+"-"+newfromDate[0];
    String[] newtoDate=toDate.split("-");
    String toSetDate=newtoDate[2]+"-"+newtoDate[1]+"-"+newtoDate[0];
    sheet.addMergedRegion(new CellRangeAddress(0,0,2,3));
    sheet.addMergedRegion(new CellRangeAddress(0,0,4,5));
    sheet.addMergedRegion(new CellRangeAddress(0,0,6,7));
    Cell cell = row.createCell(2);
	cell.setCellValue("From :- " + fromSetDate.trim());
	cell.setCellStyle(style);
	cell = row.createCell(4);
	cell.setCellValue("To :- " + toSetDate.trim());
	cell.setCellStyle(style);
	cell = row.createCell(6);
	cell.setCellValue("Client Name :- "
		+ getclientName.trim().replaceAll("^\\[|\\]$", ""));
	cell.setCellStyle(style);

	Row nextRow = sheet.createRow(rowNumber = rowNumber + 1);
	nextRow.setHeightInPoints((4 * sheet.getDefaultRowHeightInPoints()));
	int cellnum = 0;
	for (Object obj : headerList) {
	    Cell nextcell = nextRow.createCell(cellnum++);
	    nextcell.setCellValue((String) obj);
	    nextcell.setCellStyle(style);
	}
    }

    private Object[] convertAdvTrackingToObjectArray(
	    AdvertisementTracking advtracking, int serialNo ) {
	Object[] advtrackingObject = null;
	if (null != advtracking)
		
	    advtrackingObject = new Object[] {serialNo,
		    advtracking.getTextArea(),
		    advtracking.getAdvType().getAdvtypeName(),
		    advtracking.getParty().getPartyName(),
		    advtracking.getCity().getCityName(),
		    advtracking.getStartTime(), advtracking.getEndTime(),
		    advtracking.getDuration() };

	return advtrackingObject;
    }

    // generate Adv excel report functionality end

    // *********************************************************************************************************************

    // generate Print excel report functionality Start

    public Boolean getPrintExcelReport(String getPrintReportfromDate,
	    String getPrintReporttoDate, String getPrintReportpublicationId,
	    String getPrintReportclientId, String getclientName) {
	// TODO Auto-generated method stub
	boolean reportGenerated = false;

	try {

	    Map<String, List<PrintTracking>> dateWisePrintTrackingListMap = reportDao
		    .getPrintExcelReportList(getPrintReportfromDate,
			    getPrintReporttoDate, getPrintReportpublicationId,
			    getPrintReportclientId, getclientName);
	    if (dateWisePrintTrackingListMap==null) {
			return reportGenerated;
		}
	    HSSFWorkbook workbook = new HSSFWorkbook();
	    int rowNum = 0;
	    HSSFSheet sheet = null;
	    if (null != dateWisePrintTrackingListMap
		    && dateWisePrintTrackingListMap.size() > 0) {
		for (Map.Entry<String, List<PrintTracking>> PrintTrackingListMap : dateWisePrintTrackingListMap
			.entrySet()) {
		    sheet = workbook.createSheet(String
			    .valueOf(PrintTrackingListMap.getKey()));
		    insertPrintDataIntoSheet(true, sheet,
			    PrintTrackingListMap.getValue(), rowNum++,
			    getPrintReporttoDate, getPrintReportfromDate,
			    getPrintReportclientId, getclientName, workbook);
		}
	    }
	      /*File f = new File(
	      "/home/dell/Projects/EMTS/target/ROOT/WEB-INF/downloads");
	      f.mkdirs(); FileOutputStream out = new FileOutputStream( new
	      File(
	      "/home/dell/Projects/EMTS/target/ROOT/WEB-INF/downloads/Emts_PrintExcel_Report.xls"
	      ));*/
//	    InputStream inputStream = new FileInputStream("E:/Projects/EMTS/src/main/webapp/images/excel.png");
	    InputStream inputStream = new FileInputStream("/home/sumit23/jvm/apache-tomcat-7.0.41/domains/thinkersanalyzers.in/ROOT/images/excel.png");
	    byte[] bytes = IOUtils.toByteArray(inputStream);
	    int pictureIdx = workbook.addPicture(bytes, Workbook.PICTURE_TYPE_PNG);
	    inputStream.close();
	    	CreationHelper helper = workbook.getCreationHelper();
		   //Creates the top-level drawing patriarch.
	    	Drawing drawing = sheet.createDrawingPatriarch();
		   //Create an anchor that is attached to the worksheet
	    	ClientAnchor anchor = helper.createClientAnchor();
	    	anchor.setAnchorType(ClientAnchor.MOVE_DONT_RESIZE);
		   //set top-left corner for the image
	    	anchor.setCol1(1);
	    	anchor.setRow1(0);
		   //Creates a picture
		   Picture pict = drawing.createPicture(anchor, pictureIdx);
		   //Reset the image to the original size
		   pict.resize();
	    /*File f = new File("D:/AICTSL/Report");
	    f.mkdirs();
	    FileOutputStream out = new FileOutputStream(
			    new File("D:/AICTSL/Report/Emts_PrintExcel_Report.xls"));*/
		    File f = new File(
		    "/home/sumit23/jvm/apache-tomcat-7.0.41/domains/thinkersanalyzers.in/ROOT/WEB-INF/downloads");
	    f.mkdirs();
	    FileOutputStream out = new FileOutputStream(
		    new File(
			    "/home/sumit23/jvm/apache-tomcat-7.0.41/domains/thinkersanalyzers.in/ROOT/WEB-INF/downloads/Emts_PrintExcel_Report.xls"));
	     
	    workbook.write(out);
	    out.close();
	    reportGenerated = true;

	} catch (FileNotFoundException fileNotFoundException) {
	    fileNotFoundException.printStackTrace();
	} catch (IOException ioException) {
	    ioException.printStackTrace();
	}

	return reportGenerated;
    }

    private void insertPrintDataIntoSheet(boolean headerRequired,
	    HSSFSheet sheet, List<PrintTracking> printtrackingList, int rowNum,
	    String getPrintReporttoDate, String getPrintReportfromDate,
	    String getPrintReportclientId, String getclientName,HSSFWorkbook workbook) {
    	CellStyle style =workbook.createCellStyle(); //Create new style
    	style.setAlignment(CellStyle.ALIGN_CENTER);
    	style.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
    	
    	PrintSetup printSetup = sheet.getPrintSetup();
    	printSetup.setLandscape(true);

	if (headerRequired) {
	    // testing purpose
	    Object[] headerList = new Object[] { "S.NO", "Slug", "Page",
		    "City", "News Size(in Column)", "With photo", "Sector",
		    "Sub Sector", "News Trend", "Story Code" };
	    	   sheet.setColumnWidth(0, 1000);// 1
		   	    sheet.setColumnWidth(1, 6000);// 2
		   	    sheet.setColumnWidth(2, 1300);// 3
		   	    sheet.setColumnWidth(3, 3200);// 4
		   	    sheet.setColumnWidth(4, 2500);// 5
		   	    sheet.setColumnWidth(5, 2000);// 6
		   	    sheet.setColumnWidth(6, 2500);// 7
		   	    sheet.setColumnWidth(7, 3000);// 8
		   	    sheet.setColumnWidth(8, 2500);// 9
		   	    sheet.setColumnWidth(9, 4000);//
		   	    	   	  
		   	    createPrintReportHeader(sheet, rowNum++, headerList,
		   		    getPrintReporttoDate, getPrintReportfromDate,
		   		    getPrintReportclientId, getclientName ,style);
	  	
	}
	Row row = null;
	int cellnum = 0;
	int serialNo=1;
	for (PrintTracking printtracking : printtrackingList) {
		int slug=0;
		 if (printtrackingList.size() > 1) {
	row = sheet.createRow(rowNum = rowNum +1);
	cellnum = 0;

	    } else {
	    	
	row = sheet.createRow(rowNum = rowNum + 1);
	
	    }
	    Object[] printtrackingObject = convertPrintTrackingToObjectArray(printtracking,serialNo++);
 	    if (null != printtrackingObject) {
		for (Object obj : printtrackingObject) {
		    Cell cell = row.createCell(cellnum++);
		    style.setWrapText(true);
	    	cell.setCellStyle(style);
		    if (obj instanceof Date)
			cell.setCellValue((Date) obj);
		    else if (obj instanceof Boolean)
			cell.setCellValue((Boolean) obj);
		    else if (obj instanceof String){
		    if(slug==0){
		    	if(((String) obj).trim().length() < 62){
		    		row.setHeightInPoints((float)27.50);
		    	}
		    	else{
		    		row.setHeightInPoints((((String) obj).trim().length()));
		    	}
		    	 slug++;
		    }
		    cell.setCellValue((String) obj);
		    }
		    else if (obj instanceof Double)
			cell.setCellValue((Double) obj);
		    else if (obj instanceof Float)
			cell.setCellValue((Float) obj);
		    else if (obj instanceof Integer)
			cell.setCellValue((Integer) obj);
		    else if (obj instanceof Short)
			cell.setCellValue((Short) obj);
		    
				}
			}
		}

	}
	

    private void createPrintReportHeader(HSSFSheet sheet, int rowNumber,
	    Object[] headerList, String getPrintReporttoDate,
	    String getPrintReportfromDate, String getPrintReportclientId,
	    String getclientName,CellStyle style) {
	Row row = sheet.createRow(rowNumber);
	row.setHeightInPoints((float) 37.50);
	/*Added by Mayank*/
	/*code start*/
	String fromDate=getPrintReportfromDate;
	String toDate=getPrintReporttoDate;
    String[] newfromDate=fromDate.split("-");
    String fromSetDate=newfromDate[2]+"-"+newfromDate[1]+"-"+newfromDate[0];
    String[] newtoDate=toDate.split("-");
    String toSetDate=newtoDate[2]+"-"+newtoDate[1]+"-"+newtoDate[0];
    /*code end here */
    sheet.addMergedRegion(new CellRangeAddress(0,0,2,3));
    sheet.addMergedRegion(new CellRangeAddress(0,0,4,5));
    sheet.addMergedRegion(new CellRangeAddress(0,0,6,8));
	Cell cell = row.createCell(2);
	cell.setCellValue("From :- " + fromSetDate);
	cell.setCellStyle(style);
	cell = row.createCell(4);
	cell.setCellValue("To :- " + toSetDate);
	cell.setCellStyle(style);
	cell = row.createCell(6);
	cell.setCellValue("Client Name :- "
		+ getclientName.trim().replaceAll("^\\[|\\]$", ""));
	cell.setCellStyle(style);
	Row nextRow = sheet.createRow(rowNumber+1);
	nextRow.setHeightInPoints((3 * sheet.getDefaultRowHeightInPoints()));
	int cellnum = 0;
	for (Object obj : headerList) {
		Cell nextcell = nextRow.createCell(cellnum++);
	    nextcell.setCellValue((String) obj);
	    nextcell.setCellStyle(style);
	    
	}
	
    }

    private Object[] convertPrintTrackingToObjectArray(
	    PrintTracking printtracking, int serialNo) {
	{
	    Object[] printtrackingObject = null;
	    if (null != printtracking)
		printtrackingObject = new Object[] {
	    	serialNo,
			printtracking.getTextArea(),
			printtracking.getPageNumber(),
			printtracking.getCity().getCityName(),
			printtracking.getNewsColumn(),
			printtracking.getPhoto(),
			printtracking.getSector().getSectorName(),
			printtracking.getSubSector().getSubSectorName(),
			printtracking.getNewsTrend(),
			printtracking.getStoryCode() };
	    return printtrackingObject;
	}

    }
    // generate Print excel report functionality End
    // *********************************************************************************************************************

}
