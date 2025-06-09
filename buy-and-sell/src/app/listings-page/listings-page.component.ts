import { Component, OnInit } from '@angular/core';
import { Listing } from '../types';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ListingsService } from '../listings.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-listings-page',
  imports: [RouterLink, CommonModule, HttpClientModule, FormsModule],
  templateUrl: './listings-page.component.html',
  styleUrl: './listings-page.component.css'
})
export class ListingsPageComponent implements OnInit {

  listings: Listing[] = [];
  filteredListings: Listing[] = [];
  paginatedListings: Listing[] = [];

  searchTerm: string = '';
  currentPage: number = 1;
  pageSize: number = 6;
  totalPages: number = 1;

  constructor(
    private listingsService: ListingsService
  ) { }

  ngOnInit(): void {
    this.listingsService.getListings().subscribe({
      next: listings => {
        this.listings = listings;
        this.applyFilters(); // initialize

      },
      error: err => {
        console.error('API error:', err);
      }
    });
  }

  onSearchChange(): void {
    this.currentPage = 1;
    this.applyFilters();
  }

  applyFilters(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredListings = this.listings.filter(
      listing =>
        listing.name.toLowerCase().includes(term) ||
        listing.description?.toLowerCase().includes(term)
    );

    this.totalPages = Math.ceil(this.filteredListings.length / this.pageSize);
    this.updatePaginatedListings();
  }

  updatePaginatedListings(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedListings = this.filteredListings.slice(start, end);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedListings();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedListings();
    }
  }

  isExpanded = false;

  toggleSearch() {
    this.isExpanded = true;
  }

  collapseSearch() {
    if (!this.searchTerm) {
      this.isExpanded = false;
    }
  }


}
