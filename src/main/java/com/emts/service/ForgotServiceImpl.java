package com.emts.service;
import java.util.List;

import javax.mail.Message;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;

import com.emts.dao.ForgotDao;
@Service
public class ForgotServiceImpl implements ForgotService{
@Autowired
private ForgotDao forgotDao;
@Autowired
private JavaMailSender mailSender;  

	@SuppressWarnings("rawtypes")
	public List getPassword(final String email) {
		List password=null;
		password=forgotDao.getPassword(email);
		System.out.println("Forgot Password Service---"+password.get(0));
	return password;	
}

	public void sendMail(final String pass,final String emailId) {
		MimeMessagePreparator messagePreparator = new MimeMessagePreparator() {  
            public void prepare(MimeMessage mimeMessage) throws Exception {  
               mimeMessage.setRecipient(Message.RecipientType.TO,new InternetAddress(emailId));  
               mimeMessage.setFrom(new InternetAddress("praveen.raghuvanshii@gmail.com"));  
               mimeMessage.setSubject("This is your Password");  
               mimeMessage.setText("Your Password is"+pass);  
            }  
    };  
    mailSender.send(messagePreparator); 
		
	}

	/**
	 * @param mailSender the mailSender to set
	 */
	public void setMailSender(JavaMailSender mailSender) {
		this.mailSender = mailSender;
	}
}	

