package com.example.buy_and_sell.controller;

import com.example.buy_and_sell.entity.Listing;
import com.example.buy_and_sell.exception.UnauthorizedException;
import com.example.buy_and_sell.repository.ListingRepository;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api")
public class ListingController {

	private final ListingRepository listingRepository;
	private final FirebaseAuth firebaseAuth; // from Firebase Admin SDK

	@Autowired
	public ListingController(ListingRepository listingRepository, FirebaseAuth firebaseAuth) {
		this.listingRepository = listingRepository;
		this.firebaseAuth = firebaseAuth;
	}

	@GetMapping("/listings")
	public List<Listing> getAllListings() {
		return listingRepository.findAll();
	}

	@GetMapping("/users/{userId}/listings")
	public ResponseEntity<List<Listing>> getUserListings(@RequestHeader("authtoken") String token,
			@PathVariable String userId) {
		try {

			// Verify token and check user ID match
			verifyTokenMatchesUserId(token, userId);

			// Query listings for userId
			List<Listing> listings = listingRepository.findByUserId(userId);
			return ResponseEntity.ok(listings);

		} catch (UnauthorizedException e) {
			// Custom exception for user ID mismatch
			return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
		} catch (FirebaseAuthException e) {
			// Token verification failed
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
	}

	@GetMapping("/listings/{id}")
	public ResponseEntity<Listing> getListingById(@PathVariable String id) {
//	    UUID uuid = UUID.fromString(id);
		
		Optional<Listing> listingResult = listingRepository.findById(id);
		if (listingResult.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		} else {
			return ResponseEntity.ok(listingResult.get());
		}
	}

	// Enhancement: Concurrency (if high traffic expected)
	@PostMapping("/listings/{id}/add-view")
	public ResponseEntity<Listing> addView(@PathVariable String id) {
//	    UUID uuid = UUID.fromString(id);
		
	    return listingRepository.findById(id)
	        .map(listing -> {
	            listing.setViews(listing.getViews() + 1);
	            Listing savedListing = listingRepository.save(listing);
	            return ResponseEntity.ok(savedListing);
	        })
	        .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
	}


	@PostMapping("/listings")
	public ResponseEntity<Listing> createNewListing(@RequestHeader("authtoken") String token,
			@RequestBody Listing listing) {
		try {
			// Verify token and check user ID match
	        FirebaseToken decodedToken = firebaseAuth.verifyIdToken(token);
	        String authenticatedUserId = decodedToken.getUid();

	        // Override any userId from the client to prevent spoofing
	        listing.setUserId(authenticatedUserId);
	        listing.setId(UUID.randomUUID().toString());

			Listing savedListing = listingRepository.save(listing);
			return ResponseEntity.ok(savedListing);

		} catch (UnauthorizedException e) {
			// Custom exception for user ID mismatch
			return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
		} catch (FirebaseAuthException e) {
			// Token verification failed
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
	}

	@PostMapping("/listings/{id}")
	public ResponseEntity<Listing> updateListing(@PathVariable String id, @RequestBody Listing updatedListing,
			@RequestHeader("authtoken") String authToken) throws FirebaseAuthException {

		try {
			// Verify token and check user ID match
			verifyTokenMatchesUserId(authToken, null);
			
//		    UUID uuid = UUID.fromString(id);

			// Query listings for userId
			Listing savedListing = listingRepository.findById(id).map(listing -> {
				listing.setName(updatedListing.getName());
				listing.setDescription(updatedListing.getDescription());
				listing.setPrice(updatedListing.getPrice());
				return listingRepository.save(listing);
			}).orElseThrow(() -> new RuntimeException("Listing not found with id: " + id));

			return ResponseEntity.ok(savedListing);

		} catch (UnauthorizedException e) {
			// Custom exception for user ID mismatch
			return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
		} catch (FirebaseAuthException e) {
			// Token verification failed
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}

	}

	/**
	 * Verifies that the Firebase token is valid and matches the provided userId.
	 * Throws UnauthorizedException if the user IDs do not match. Throws
	 * FirebaseAuthException if token verification fails.
	 */
	private void verifyTokenMatchesUserId(String authToken, String userId) throws FirebaseAuthException {
		if (authToken == null || authToken.isBlank()) {
			throw new IllegalArgumentException("Auth token is missing");
		}
		FirebaseToken decodedToken = firebaseAuth.verifyIdToken(authToken);
		String authenticatedUserId = decodedToken.getUid();
		
		if (userId != null && !authenticatedUserId.equals(userId)) {
			throw new UnauthorizedException("Users can only access their own data");
		}
	}

	@DeleteMapping("/listings/{id}")
	public ResponseEntity<?> deleteListing(@PathVariable String id, @RequestHeader("authtoken") String authToken) {
		try {
//		    UUID uuid = UUID.fromString(id);
			
	        Listing listing = listingRepository.findById(id)
	                .orElseThrow(() -> new RuntimeException("Listing not found"));
			
			// Verify token and check user ID match
			verifyTokenMatchesUserId(authToken, null);
			// 
			listingRepository.delete(listing);

	        // Return JSON response
	        return ResponseEntity.ok().body(Map.of("message", "Success"));
	        
		} catch (UnauthorizedException e) {
			// Custom exception for user ID mismatch
			return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
		} catch (FirebaseAuthException e) {
			// Token verification failed
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		} catch (RuntimeException e) {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
	    }

	}
}
