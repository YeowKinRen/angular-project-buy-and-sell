import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Listing } from '../types';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ListingsService } from '../listings.service';
import { Auth, User } from '@angular/fire/auth';
import { authState } from 'rxfire/auth';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-contact-page',
  imports: [FormsModule],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.css'
})
export class ContactPageComponent {
  email: string = '';
  message: string = '';
  listing: Listing | undefined;
  private id: string = '';
  private auth = inject(Auth);
  public user$: Observable<User | null> = authState(this.auth);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private listingsService: ListingsService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      // handle error, maybe redirect or return
      console.error('No ID in route');
      return;
    } else {
      this.id = id;
    }
    this.listingsService.getListingById(this.id).subscribe(listing => {
      this.listing = listing;
      this.message = `Hi I'm interested in your ${this.listing?.name.toLowerCase()}!`;

    });

    this.user$.subscribe(user => {
      if (!user) return;
      this.email = user.email!;
    });

  }

  sendMessage(): void {
    if (!this.message.trim()) return;
    if (!this.email.trim()) return;
    // alert('Your message have been sent!');
    // this.router.navigateByUrl('/listings');
    this.listingsService.sendMessage(this.id, '', this.email, this.message).subscribe(sentMessage => {
      this.router.navigateByUrl('/listings');
    });


  }
}
