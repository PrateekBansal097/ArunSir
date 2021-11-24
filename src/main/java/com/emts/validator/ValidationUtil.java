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

import java.io.IOException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.log4j.Logger;
import org.springframework.validation.Errors;
import org.springframework.web.multipart.MultipartFile;


public class ValidationUtil {

	static Logger logger = Logger.getLogger(ValidationUtil.class);

	public static boolean validateEmail(String email) {
		// final String EMAIL_PATTERN =
		// "^[\\w\\-]([\\.\\w])+[\\w]+@([\\w\\-]+\\.){1,2}+[A-Z]{2,4}$";
		final String EMAIL_PATTERN = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
				+ "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";
		Pattern p = Pattern.compile(EMAIL_PATTERN, Pattern.CASE_INSENSITIVE);
		Matcher m = p.matcher(email != null ? email : "");
		boolean b = m.matches();
		if (!b) {
			return false;
		}
		return true;

	}

	public static void validateImageFile(String data, MultipartFile file,
			Errors errors) throws IOException {
		String imageType = "";
		final String imageTypeEx = "(image/gif|image/GIF|image/JPG|image/jpg|image/JPEG|image/jpeg|image/BMP|image/bmp|image/png|image/PNG)";
		Pattern patterncheck = Pattern.compile(imageTypeEx);
		// yashwant
		if (data != null && !data.isEmpty()) {
			imageType = ImageUtil.getImageMimeType(data);
			logger.info("imageType:" + imageType);

			Matcher matcher = patterncheck.matcher(imageType);
			boolean match = matcher.matches();

			if (!match) {
				errors.rejectValue("image", "error.image.type");
			}

			int size = data.getBytes().length;
			logger.info("image size:" + size);
			// Yashwant
			if (size == 0 || size > (1024 * 1024 * 2)) {
				errors.rejectValue("image", "error.image.size");
			}

		} else if (file != null && file.getOriginalFilename()!=null && !file.getOriginalFilename().isEmpty()) {
			// Yashwant
			if (file.getSize() == 0 || file.getSize() > (1024 * 1024 * 2)) {
				errors.rejectValue("image", "error.image.size");
			} else {
				imageType = ImageUtil.getImageMimeType(file.getBytes());
				patterncheck = Pattern.compile(imageTypeEx);
				Matcher matcher = patterncheck.matcher(imageType);
				boolean match = matcher.matches();
				if (file != null && file.getBytes().length > 0) {
					if (!match) {
						errors.rejectValue("image", "error.image.type");
					}
				}
			}
		}

	}

}
