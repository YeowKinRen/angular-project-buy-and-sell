import { Component, OnInit } from '@angular/core';
import { Listing } from '../types';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ListingsService } from '../listings.service';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-listings-page',
  imports: [RouterLink, CommonModule, HttpClientModule],
  templateUrl: './listings-page.component.html',
  styleUrl: './listings-page.component.css'
})
export class ListingsPageComponent implements OnInit {

  listings: Listing[] = [];

  constructor(
    private listingsService: ListingsService
  ) { }

  ngOnInit(): void {
    this.listingsService.getListings().subscribe({
      next: listings => {
        console.log('Listings received:', listings); // <- This should log your array
        this.listings = listings;
      },
      error: err => {
        console.error('API error:', err);
      }
    });
  }
}
