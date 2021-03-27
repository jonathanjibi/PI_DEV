package com.esprit.spring.services;

import java.util.List;

import com.esprit.spring.entites.Claim;
import com.esprit.spring.entites.ClaimDecision;
public interface ClaimServiceI {
	
	
	
	List<Claim> retrieveAllClaims();
	Claim addClaim(Claim c);
	void deleteClaim (String id);
	Claim updateClaim(Claim c);
	Claim retrieveClaim(String id);
	void updateDecision(long idClaim, ClaimDecision decision);
	

}





