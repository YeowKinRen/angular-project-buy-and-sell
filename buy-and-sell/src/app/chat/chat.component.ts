import { Component, Input, OnInit } from '@angular/core';
import { ListingsService } from '../listings.service';
import { Message } from '../types';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-chat',
  imports: [ FormsModule, CommonModule ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  @Input() listingId!: string;
  @Input() userEmail!: string;
  messageText = '';
  messages: Message[] = [];

  constructor(private listingService: ListingsService) {}

  ngOnInit(): void {
    this.fetchMessages();
  }

  fetchMessages(): void {
    this.listingService.getMessages(this.listingId).subscribe(messages => {
      this.messages = messages;
    });
  }

  sendMessage(): void {
    if (!this.messageText.trim()) return;

    this.listingService.sendMessage(this.listingId, this.userEmail, this.messageText)
      .subscribe(() => {
        this.messageText = '';
        this.fetchMessages(); // refresh messages
      });
  }
}