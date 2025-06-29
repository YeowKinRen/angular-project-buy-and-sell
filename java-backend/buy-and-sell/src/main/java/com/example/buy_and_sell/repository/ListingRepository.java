package com.example.buy_and_sell.repository;

import com.example.buy_and_sell.entity.Listing;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ListingRepository extends JpaRepository<Listing, String> {

	List<Listing> findByUserId(String userId);

}
