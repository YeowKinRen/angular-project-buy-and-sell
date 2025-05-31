import { Component, OnInit } from '@angular/core';
import { ListingDataFormComponent } from "../listing-data-form/listing-data-form.component";
import { ActivatedRoute, Router } from '@angular/router';
import { Listing } from '../types';
import { ListingsService } from '../listings.service';
import { CommonModule } from '@angular/common';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';


@Component({
  selector: 'app-edit-listing-page',
  imports: [ListingDataFormComponent, CommonModule],
  templateUrl: './edit-listing-page.component.html',
  styleUrl: './edit-listing-page.component.css'
})
export class EditListingPageComponent implements OnInit {
listing: Listing | null = null;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private listingService: ListingsService,
    private storage: Storage) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.listingService.getListingById(id).subscribe(listing => this.listing = listing
    );
    
  }

  async onSubmit({ listing, file }: { listing: Listing, file: File | null }) {
    if (!this.listing || !this.listing.id) return;

    const listingId = this.listing.id;
    let imageUrl: string | null = null;

    if (file) {
      const filePath = `images/${Date.now()}_${file.name}`;
      const fileRef = ref(this.storage, filePath);

      try {
        await uploadBytes(fileRef, file);
        imageUrl = await getDownloadURL(fileRef);
        console.log('Image uploaded successfully:', imageUrl);
      } catch (error) {
        console.error('Error uploading image:', error);
        return;
      }
    }

    this.listingService.editListing(
      listingId,
      listing.name,
      listing.description,
      listing.price,
      imageUrl
    ).subscribe({
      next: () => this.router.navigateByUrl('/my-listings'),
      error: (err) => console.error('Edit failed:', err)
    });
  }

}
