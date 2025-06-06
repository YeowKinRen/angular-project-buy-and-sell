import { Component, OnInit, inject } from '@angular/core';
import { ListingsService } from '../listings.service';
import { Listing, Message } from '../types';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Auth, User } from '@angular/fire/auth';
import { authState } from 'rxfire/auth';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';



@Component({
  selector: 'app-my-chat',
  imports: [FormsModule, CommonModule],
  templateUrl: './my-chat.component.html',
  styleUrl: './my-chat.component.css'
})
export class MyChatComponent implements OnInit {
  groupedSentMessages: {
    [listingId: string]: {
      message: Message;
      listingName: String;
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
    this.user$.subscribe(user => {
      if (!user) return;
      const myEmail = user.email ?? '';

      this.listingsService.getListings().subscribe(listings => {
        // Exclude listings owned by current user

        const otherListings = listings.filter(listing => listing.userId != user.uid);
        const listingIds = otherListings.map(listing => listing.id);
        if (listingIds.length === 0) return;

        this.groupedSentMessages = {};

        this.listingsService.getMessagesByListingIds(listingIds).subscribe(messages => {
          messages.forEach(msg => {
            if (msg.senderEmail === myEmail) {
              const listing = otherListings.find(l => l.id === msg.listingId);
              if (!listing) return;

              const existing = this.groupedSentMessages[msg.listingId];
              // If no message yet or this one is newer
              if (!existing || new Date(msg.timestamp) > new Date(existing.message.timestamp)) {
                this.groupedSentMessages[msg.listingId] = {
                  listingName: listing.name,
                  message: msg
                };
              }
            }
          });
        });
      });
    });
  }



  openMessageDetail(listingId: string, conversationId: string): void {
    this.user$.pipe(take(1)).subscribe(user => {
      if (!user) return;
      const myEmail = user.email ?? '';
      this.router.navigate(['/chat', listingId], {
        queryParams: {
          recipientEmail: myEmail,
          conversationId: conversationId
        }
      });
    });
  }

}