import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Listing } from '../types';
import { ListingsService } from '../listings.service'; 
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listing-detail',
  imports: [RouterLink, CommonModule],
  templateUrl: './listing-detail.component.html',
  styleUrl: './listing-detail.component.css'
})
export class ListingDetailComponent {
  isLoading: boolean = true;
  listing: Listing|undefined;
  constructor(
    private route: ActivatedRoute,
    private listingsService: ListingsService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      // handle error, maybe redirect or return
      console.error('No ID in route');
      return;
    }
    this.listingsService.getListingById(id).subscribe(listing => {
      this.listing= listing;
      this.isLoading= false;
    });
    this.listingsService.addViewToListing(id).subscribe(()=>console.log('Views updated!'))
    
  } 
}
