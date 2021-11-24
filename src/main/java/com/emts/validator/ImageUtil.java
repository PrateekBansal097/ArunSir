/**
 * -----------------------------------------------------------------------------
 * Company: Janssen Pharmaceuticals, Inc.
 * -----------------------------------------------------------------------------
 *
 * This file contains trade secrets of Janssen Pharmaceuticals, Inc. No part may
 * be reproduced or transmitted in any form by any means or for any purpose
 * without the express written permission of Janssen Pharmaceuticals, Inc.
 *
 * Copyright: (C) 2013
 */
package com.emts.validator;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

import org.apache.commons.codec.binary.Base64;
import org.apache.log4j.Logger;

/**
 * Implements operation related to Image.
 * 
 * @author hemant.sharma
 * @version 1.0, 13 April, 2013.
 */
public class ImageUtil {
	
 static	Logger logger = Logger.getLogger(ImageUtil.class);
	

	/**
	 * write imageData to imagePath by id.
	 * 
	 * @param imagePath
	 *            path of image.
	 * @param imageData
	 *            data of image.
	 * @param id
	 *            id of image.
	 */
	public static void writeImage(String imagePath, String imageData, Long id) {

		try {
			byte[] imageByteArray = decodeImage(imageData);

      String filename = imagePath + "//" + id;
			// Write a image byte array into file system
			FileOutputStream imageOutFile = new FileOutputStream(filename);
			imageOutFile.write(imageByteArray);
			imageOutFile.close();
      File imageFile = new File(filename);
      imageFile.setReadable(true, false);
			System.out.println("Image Successfully Manipulated!");
		} catch (FileNotFoundException e) {
			System.out.println("Image not found" + e);
		} catch (IOException ioe) {
			System.out.println("Exception while reading the Image " + ioe);
		}

	}

	/**
	 * readImage by imagePath and fileName.
	 * 
	 * @param imagePath
	 *            path of image.
	 * @param fileName
	 *            file name of image.
	 * @return array of byte.
	 */
	public static byte[] readImage(String imagePath, String fileName) {

		try {
			// Write a image byte array into file system
			FileInputStream imageInputStream = new FileInputStream(imagePath
					+ "//" + fileName);
			System.out.println("Image Successfully readed!");
			return getBytes(imageInputStream);
		} catch (FileNotFoundException e) {
			System.out.println("Image not found" + e);
			return null;
		} catch (IOException ioe) {
			System.out.println("Exception while reading the Image " + ioe);
			return null;
		}

	}

	/**
	 * getBytes of InputStream.
	 * 
	 * @param is
	 *            InputStream instance.
	 * @return array of byte.
	 */
	public static byte[] getBytes(InputStream is) throws IOException {

		int len;
		int size = 1024;
		byte[] buf;

		if (is instanceof ByteArrayInputStream) {
			size = is.available();
			buf = new byte[size];
			len = is.read(buf, 0, size);
		} else {
			ByteArrayOutputStream bos = new ByteArrayOutputStream();
			buf = new byte[size];
			while ((len = is.read(buf, 0, size)) != -1)
				bos.write(buf, 0, len);
			buf = bos.toByteArray();
		}
		return buf;
	}

	/**
	 * Encodes the byte array into base64 string
	 * 
	 * @param imageByteArray
	 *            - byte array
	 * @return String a {@link java.lang.String}
	 */
	public static byte[] encodeImage(byte[] imageByteArray) {
		return Base64.encodeBase64(imageByteArray);
	}

	/**
	 * Decodes the base64 string into byte array
	 * 
	 * @param imageDataString
	 *            - a {@link java.lang.String}
	 * @return byte array
	 */
	public static byte[] decodeImage(String imageDataString) {
		return Base64.decodeBase64(imageDataString.getBytes());
	}

	/**
	 * get image mimeType.Data passed as imageBytes.
	 * 
	 * @param imageBytes
	 *            array of bytes.
	 * @return mimeType.
	 */
	public static String getImageMimeType(byte[] imageBytes) {
		String mimeType = null;
		try {
			InputStream is = new ByteArrayInputStream(imageBytes);
			int c1 = is.read();
			int c2 = is.read();
			int c3 = is.read();
			if (c1 == 'G' && c2 == 'I' && c3 == 'F') { // GIF
				mimeType = "image/gif";
			} else if (c1 == 0xFF && c2 == 0xD8) { // JPG
				mimeType = "image/jpeg";
			} else if (c1 == 137 && c2 == 80 && c3 == 78) { // PNG
				mimeType = "image/png";
			} else if (c1 == 66 && c2 == 77) { // BMP
				mimeType = "image/bmp";
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return mimeType != null ? mimeType : "";
	}

	/**
	 * get image mimeType.Data passed as String.
	 * 
	 * @param data
	 *            data for image.
	 * @return mimeType.
	 */

	public static String getImageMimeType(String data) {
		byte[] decodeImageByte = decodeImage(data);
		String mimeType = null;
		try {
			InputStream is = new ByteArrayInputStream(decodeImageByte);
			int c1 = is.read();
			int c2 = is.read();
			int c3 = is.read();
			if (c1 == 'G' && c2 == 'I' && c3 == 'F') { // GIF
				mimeType = "image/gif";
			} else if (c1 == 0xFF && c2 == 0xD8) { // JPG
				mimeType = "image/jpeg";
			} else if (c1 == 137 && c2 == 80 && c3 == 78) { // PNG
				mimeType = "image/png";
			} else if (c1 == 66 && c2 == 77) { // BMP
				mimeType = "image/bmp";
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return mimeType != null ? mimeType : "";
	}
	
	
	/**
	 * get image mimeType.Data passed as String.
	 * 
	 * @param data
	 *            data for image.
	 * @return mimeType.
	 */

	public static boolean deleteFile(String imagePath, String fileName) {		
		try {
			File f=new File(imagePath +"//" + fileName);
			if(f.exists()){	
		    logger.info(fileName+ " profile File is founded ");
			boolean isDelted=f.delete();
		    logger.info(fileName+ " profile File is deleted "+isDelted);
			return isDelted;
			
			
			}

		}catch (Exception e) {
			  logger.error(fileName+ " profile File is deleted",e);
		}
		return false;

	}
	

}
