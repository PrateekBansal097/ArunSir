/**
 * 
 */
package com.emts.service;

import com.emts.model.Registration;

/**
 * @author ajay.jirati
 *
 */
public interface LoginService {

	public Registration findByEmailAndPassword(Object object);
}
