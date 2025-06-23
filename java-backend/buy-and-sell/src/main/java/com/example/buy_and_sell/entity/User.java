package com.example.buy_and_sell.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "user")
public class User {
	
    @Id
    @Column(length = 36, nullable = false, updatable = false)
    private String id;

}
