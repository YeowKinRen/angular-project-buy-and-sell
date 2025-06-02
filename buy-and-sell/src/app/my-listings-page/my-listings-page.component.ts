import { Component } from '@angular/core';
import { Listing } from '../types';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ListingsService } from '../listings.service';

@Component({
  selector: 'app-my-listings-page',
  imports: [RouterLink, CommonModule],
  templateUrl: './my-listings-page.component.html',
  styleUrl: './my-listings-page.component.css'
})
export class MyListingsPageComponent {
  listings: Listing[] = [];
  
  constructor(
    private listingsService: ListingsService,
  ) {}
  ngOnInit(): void {
    this.listingsService.getListingsForUser().subscribe(listings => this.listings = listings);
  }

  onDeleteClicked(listingId: string | undefined | null): void {
    if (!listingId) return; // safely ignore or log an error
    this.listingsService.deleteListing(listingId).subscribe(() => {
      this.listings = this.listings.filter(
        listing => listing.id !== listingId
      )
    });
  }
}
