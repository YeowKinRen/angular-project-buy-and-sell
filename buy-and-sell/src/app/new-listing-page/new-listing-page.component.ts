import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ListingDataFormComponent } from "../listing-data-form/listing-data-form.component";
import { ListingsService } from '../listings.service';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { CommonModule } from '@angular/common';
import { Listing } from '../types';


@Component({
  selector: 'app-new-listing-page',
  imports: [FormsModule, ListingDataFormComponent, CommonModule],
  templateUrl: './new-listing-page.component.html',
  styleUrl: './new-listing-page.component.css'
})
export class NewListingPageComponent {

  constructor(
    private router: Router,
    private listingService: ListingsService,
    private storage: Storage
  ) { }

  ngOnInit(): void {

  }
  async onSubmit({ listing, file }: { listing: Listing, file: File | null }): Promise<void> {
    let imageUrl = '';

    if (file) {
      const filePath = `images/${Date.now()}_${file.name}`;
      const fileRef = ref(this.storage, filePath);

      try {
        await uploadBytes(fileRef, file);
        imageUrl = await getDownloadURL(fileRef);
        console.log(imageUrl);
      } catch (error) {
        console.error('Upload failed', error);
        return;
      }
    }

    this.listingService.createListing(listing.name, listing.description, listing.price, imageUrl).subscribe(() => {
      this.router.navigateByUrl('/my-listings');
    });
  }

}
