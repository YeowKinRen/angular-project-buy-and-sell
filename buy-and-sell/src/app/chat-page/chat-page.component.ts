import { Component, inject } from '@angular/core';
import { Message } from '../types';
import { ActivatedRoute } from '@angular/router';
import { ListingsService } from '../listings.service';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth, User } from '@angular/fire/auth';
import { authState } from 'rxfire/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chat-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.css'
})
export class ChatPageComponent {
  messages: Message[] = [];
  listingId!: string;
  senderEmail!: string;
  recipientEmail!: string;
  email!: string;
  isRecipientView = false;
  conversationId!: string;

  newMessage = '';
  private auth = inject(Auth);
  public user$: Observable<User | null> = authState(this.auth);

  constructor(
    private route: ActivatedRoute,
    private listingsService: ListingsService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.listingId = this.route.snapshot.paramMap.get('listingId')!;
    this.senderEmail = this.route.snapshot.queryParamMap.get('senderEmail')!;
    this.recipientEmail = this.route.snapshot.queryParamMap.get('recipientEmail')!;
    this.conversationId = this.route.snapshot.queryParamMap.get('conversationId')!;

    if (this.recipientEmail) {
      this.email = this.recipientEmail;
      this.isRecipientView = true;
    } else {
      this.email = this.senderEmail;
      this.isRecipientView = false;
    }
    console.log(this.conversationId);
    this.listingsService.getChatHistory(this.conversationId)
      .subscribe(messages => this.messages = messages);
  }

  goBack(): void {
    this.location.back(); // Native browser back
  }

  sendMessage(): void {
    if (!this.newMessage.trim()) return;

    // Get current logged-in user email
    this.user$.subscribe(user => {
      if (!user) return;
      const currentEmail = user.email;
      const sender = this.isRecipientView ? currentEmail : currentEmail;
      const recipient = this.isRecipientView ? '' : this.senderEmail;
      this.listingsService.sendMessage(this.listingId, recipient, sender, this.newMessage, this.conversationId).subscribe(sentMessage => {
        sentMessage.timestamp = new Date().toISOString();;
        this.messages.push(sentMessage);
        this.newMessage = '';
      });

    });
  }


}
