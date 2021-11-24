package com.emts.validator;

import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

import com.emts.model.PrintTracking;

@Component
public class PrintTrackingValidator implements Validator{

	public boolean supports(Class<?> clazz) {
		return PrintTracking.class.isAssignableFrom(clazz);
	}

	public void validate(Object target, Errors errors) {
      PrintTracking printTracking = (PrintTracking)target;	
      ValidationUtils.rejectIfEmptyOrWhitespace(errors, "date",
		"error.date.empty");
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "pageNumber",
		"error.pageNumber.empty");
		
		if(printTracking.getClient().getClientId()==0)
		{
			errors.rejectValue("client.clientId","error.clientName.select");
		}
		if(printTracking.getState().getStateId()==0)
		{
			errors.rejectValue("state.stateId","error.stateName.select");
		}
		if(printTracking.getPublication().getPublicationId()==0)
		{
			errors.rejectValue("publication.publicationId","error.publicationName.select");
		}
		if(printTracking.getCity().getCityId()==0)
		{
			errors.rejectValue("city.cityId","error.cityName.select");
		}
		if(printTracking.getSector().getSectorId()==0)
		{
			errors.rejectValue("sector.sectorId","error.SectorName.select");
		}
		if(printTracking.getSubSector().getSubSectorId()==0)
		{
			errors.rejectValue("subSector.subSectorId","error.SubSectorName.select");
		}
	}

}
