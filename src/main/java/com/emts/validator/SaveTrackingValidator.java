package com.emts.validator;

import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

import com.emts.model.Tracking;

@Component
public class SaveTrackingValidator implements Validator{

	public boolean supports(Class<?> clazz) {
		return Tracking.class.isAssignableFrom(clazz);
	}

	public void validate(Object target, Errors errors) {
		Tracking saveTracking=(Tracking)target;
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "date",
		"error.date.empty");
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "time",
		"error.time.empty");
		/*ValidationUtils.rejectIfEmptyOrWhitespace(errors, "slug",
		"error.slug.empty");*/
		if(saveTracking.getClient().getClientId()==0)
		{
			errors.rejectValue("client.clientId","error.clientName.select");
		}
		if(saveTracking.getState().getStateId()==0)
		{
			errors.rejectValue("state.stateId","error.stateName.select");
		}
		if(saveTracking.getChanel().getChannelId()==0)
		{
			errors.rejectValue("chanel.channelId","error.channelName.select");
		}
		if(saveTracking.getCity().getCityId()==0)
		{
			errors.rejectValue("city.cityId","error.cityName.select");
		}
		if(saveTracking.getSector().getSectorId()==0)
		{
			errors.rejectValue("sector.sectorId","error.SectorName.select");
		}
		if(saveTracking.getSubSector().getSubSectorId()==0)
		{
			errors.rejectValue("subSector.subSectorId","error.SubSectorName.select");
		}
		if(saveTracking.getNewsType().getNewTypeId()==0)
		{
			errors.rejectValue("newsType.newTypeId","error.newsType.select");
		}
		if(saveTracking.getNewsTrend().equals("Select"))
		{
			errors.rejectValue("newsTrend","error.newsTrend.select");
		}
		
	}

}
