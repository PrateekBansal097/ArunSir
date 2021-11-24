package com.emts.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.StringTokenizer;

public class DateFormat {
	public static String generateStoryCode(String date)
	{
		String storyCode="";
		StringTokenizer st = new StringTokenizer(date,"-");
		while(st.hasMoreTokens())
		{
			storyCode=storyCode+st.nextToken();
		}
		return storyCode;	
	}
	public static String getDDMMYYYYDate(String date)
	{
		SimpleDateFormat fromUser = new SimpleDateFormat("yyyy-mm-dd");
		SimpleDateFormat myFormat = new SimpleDateFormat("dd/mm/yyyy");
		
		try {
			date =myFormat.format(fromUser.parse(date));
			System.out.println("yyyy-mm-dd"+ date);
		} catch (ParseException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		return date;
	}
	public static String getYYYYMMDDDate(String date)
	{
		/*SimpleDateFormat fromUser = new SimpleDateFormat("dd-mm-yyyy");
		SimpleDateFormat myFormat = new SimpleDateFormat("yyyy-mm-dd");
		try {
			date =fromUser.format( myFormat.parse(date));
			System.out.println("yyyy-mm-dd"+ date);
		} catch (ParseException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}*/
		java.util.Date ud;
		java.sql.Date sd=null;
		try {
			ud = new java.text.SimpleDateFormat("dd/MM/yyyy").parse(date);
		    sd = new java.sql.Date(ud.getTime());
			System.out.println("---...."+sd);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		String s1 = sd.toString();
		return s1;
	}
}
