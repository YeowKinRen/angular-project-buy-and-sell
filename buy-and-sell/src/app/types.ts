export interface Listing {
    id: string|null,
    name: string,
    description: string,
    price: number,
    views: number,
    imageUrl: string,
}

export interface Message {
  id: string;
  listingId: string;
  senderEmail: string;
  message: string;
  timestamp: string;
}