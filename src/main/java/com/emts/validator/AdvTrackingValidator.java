package com.emts.validator;

import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

import com.emts.model.AdvertisementTracking;
@Component
public class AdvTrackingValidator implements Validator{

	public boolean supports(Class<?> clazz) {
		return AdvertisementTracking.class.isAssignableFrom(clazz);
	}

	public void validate(Object target, Errors errors) {
		AdvertisementTracking advTracking=(AdvertisementTracking)target;
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "date",
		"error.date.empty");
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "startTime",
		"error.startTime.empty");
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "endTime",
		"error.endTime.empty");
		/*ValidationUtils.rejectIfEmptyOrWhitespace(errors, "slug",
		"error.slug.empty");*/
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "duration",
		"error.duration.empty");
		if(advTracking.getClient().getClientId()==0)
		{
			errors.rejectValue("client.clientId","error.clientName.select");
		}
		if(advTracking.getState().getStateId()==0)
		{
			errors.rejectValue("state.stateId","error.stateName.select");
		}
		if(advTracking.getChanel().getChannelId()==0)
		{
			errors.rejectValue("chanel.channelId","error.channelName.select");
		}
		if(advTracking.getCity().getCityId()==0)
		{
			errors.rejectValue("city.cityId","error.cityName.select");
		}
		if(advTracking.getAdvType().getAdvTypeId()==0)
		{
			errors.rejectValue("advType.advTypeId","error.advType.select");
		}
		if(advTracking.getParty().getPartyId()==0)
		{
			errors.rejectValue("party.partyId","error.party.select");
		}
	}

}
