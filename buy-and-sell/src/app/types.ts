export interface Listing {
    id: string,
    name: string,
    description: string,
    price: number,
    views: number,
    imageUrl: string,
    userId: string,

}

export interface Message {
  id: string;
  listingId: string;
  senderEmail: string;
  recipientEmail: string;
  message: string;
  timestamp: string;
  conversationId: string;
}