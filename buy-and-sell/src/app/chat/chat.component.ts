import { Component, OnInit, inject } from '@angular/core';
import { ListingsService } from '../listings.service';
import { Listing, Message } from '../types';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Auth, User } from '@angular/fire/auth';
import { authState } from 'rxfire/auth';
import { Observable, firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-chat',
  imports: [FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  groupedMessages: {
    [senderEmail: string]: {
      [listingId: string]: {
        message: Message;
        listingName: String;
      }
    }
  } = {};
  listings: Listing[] = [];
  private auth = inject(Auth);
  public user$: Observable<User | null> = authState(this.auth);

  constructor(private listingsService: ListingsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.fetchMessages();
  }
  fetchMessages(): void {
    this.listingsService.getListingsForUser().subscribe(listings => {
      this.listings = listings;
      this.groupedMessages = {};

      this.user$.subscribe(user => {
        if (!user) return;
        const currentEmail = user.email;

        const myListings = listings.filter(listing => listing.userId === user.uid);

        const listingIds = myListings.map(listing => listing.id);

        if (listingIds.length === 0) return;

        this.listingsService.getMessagesByListingIds(listingIds).subscribe(messages => {
          messages.forEach(msg => {
            const listing = myListings.find(l => l.id === msg.listingId);
            if (!listing) return;

            // Include both incoming and outgoing messages
            const otherParty = msg.senderEmail === currentEmail
              ? msg.recipientEmail || '(To self)'
              : msg.senderEmail;

            if (!otherParty) return; // skip invalid case

            if (!this.groupedMessages[otherParty]) {
              this.groupedMessages[otherParty] = {};
            }

            const existing = this.groupedMessages[otherParty][listing.id];

            if (
              !existing ||
              new Date(msg.timestamp).getTime() > new Date(existing.message.timestamp).getTime()
            ) {
              this.groupedMessages[otherParty][listing.id] = {
                message: msg,
                listingName: listing.name
              };
            }
          });
        });
      });
    });
  }





  async openMessageDetail(listingId: String, senderEmail: String, conversationId: String): Promise<void> {
    const user = await firstValueFrom(this.user$);
    if (!user) return;

    const queryParams = senderEmail === '(To self)' ?
      { recipientEmail: user.email, conversationId: conversationId } :
      { senderEmail: senderEmail, conversationId: conversationId };
    console.log(conversationId);
    this.router.navigate(['/chat', listingId], {
      queryParams
    });
  }

}