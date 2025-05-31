import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Listing } from '../types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listing-data-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './listing-data-form.component.html',
  styleUrl: './listing-data-form.component.css'
})
export class ListingDataFormComponent implements OnInit {
  @Input() buttonText!: string;
  @Input() currentName = '';
  @Input() currentDescription = '';
  @Input() currentPrice: number = 0;
  @Input() currentImageUrl: string = "";

  name: string = '';
  description: string = '';
  price: number = 0;
  selectedFile: File | null = null;
  imagePreviewUrl: string | ArrayBuffer | null = null;


  @Output() onSubmit = new EventEmitter<{
    listing: Listing,
    file: File | null
  }>();

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.name = this.currentName;
    this.description = this.currentDescription;
    this.price = this.currentPrice;
    this.imagePreviewUrl = this.currentImageUrl;
  }

  onButtonClicked(): void {
    this.onSubmit.emit({
      listing: {
        id: null,
        name: this.name,
        description: this.description,
        price: Number(this.price),
        views: 0,
        imageUrl: "",
      },
      file: this.selectedFile
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      this.selectedFile = null;
      this.imagePreviewUrl = null;
      return;
    }

    this.selectedFile = input.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreviewUrl = reader.result; // base64 or URL
    };
    reader.readAsDataURL(this.selectedFile);
  }
}
