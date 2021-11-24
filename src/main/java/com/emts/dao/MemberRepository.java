/**
 * 
 */
package com.emts.dao;
import java.util.List;
/**
 * @author ajay.jirati
 *
 */
public interface MemberRepository {
	public List<Object> findByEmailAndPassword(String email,String password);
}
