import { Injectable, inject, NgZone } from '@angular/core';
import { Listing, Message } from './types';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Auth } from '@angular/fire/auth';
import { User } from 'firebase/auth';
import { authState } from 'rxfire/auth';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

const httpOptionsWithAuthToken = (token: string) => ({
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'AuthToken': token
  })

})

@Injectable({
  providedIn: 'root'
})
export class ListingsService {
  private auth = inject(Auth); // recommended in AngularFire modular setup

  constructor(
    private http: HttpClient,
    private zone: NgZone

  ) { }

  getListings(): Observable<Listing[]> {
    return this.http.get<Listing[]>('/api/listings');
  }

  getUser$(): Observable<User | null> {
    return authState(this.auth); // zone-aware, DI-friendly
  }


  getListingById(id: string): Observable<Listing> {
    return this.http.get<Listing>(`/api/listings/${id}`);
  }

  addViewToListing(id: string): Observable<Listing> {
    return this.http.post<Listing>(`/api/listings/${id}/add-view`,
      {},
      httpOptions);
  }

  // Use getUser$ to fetch listings
  getListingsForUser(): Observable<Listing[]> {
    return this.getUser$().pipe(
      switchMap(user => {
        if (!user) return of([]); // Not logged in

        return this.getIdTokenSafe(user).pipe(
          switchMap(token =>
            this.http.get<Listing[]>(
              `/api/users/${user.uid}/listings`,
              httpOptionsWithAuthToken(token)
            )
          )
        );
      })
    );
  }

  // Wrap getIdToken() with from() inside NgZone.run() properly
  // because Firebase's getIdToken() relies on being executed within Angular's zone-aware context
  getIdTokenSafe(user: User): Observable<string> {
    return new Observable(observer => {
      this.zone.run(() => {
        user.getIdToken().then(
          token => {
            observer.next(token);
            observer.complete();
          },
          err => observer.error(err)
        );
      });
    });
  }

  // Use getUser$ to fetch listings
  deleteListing(id: string): Observable<Listing> {
    return this.getUser$().pipe(
      switchMap(user => {
        if (!user) throw new Error('User not authenticated');

        return this.getIdTokenSafe(user).pipe(
          switchMap(token =>
            this.http.delete<Listing>(
              `/api/listings/${id}`,
              httpOptionsWithAuthToken(token)
            )
          )
        );
      })
    );
  }

  // Use getUser$ to fetch listings
  createListing(name: string, description: string, price: number, imageUrl: string): Observable<Listing> {
    return this.getUser$().pipe(
      switchMap(user => {
        if (!user) throw new Error('User not authenticated');

        return this.getIdTokenSafe(user).pipe(
          switchMap(token =>
            this.http.post<Listing>(
              `/api/listings`,
              { name, description, price, imageUrl },
              httpOptionsWithAuthToken(token)
            )
          )
        );
      })
    );
  }

  editListing(id: string, name: string, description: string, price: number, imageUrl: string | null): Observable<Listing> {
    return this.getUser$().pipe(
      switchMap(user => {
        if (!user) throw new Error('User not authenticated');

        return this.getIdTokenSafe(user).pipe(
          switchMap(token =>
            this.http.post<Listing>(
              `/api/listings/${id}`,
              { name, description, price, imageUrl },
              httpOptionsWithAuthToken(token)
            )
          )
        );
      })
    );
  }

  getMessages(listingId: string) {
    return this.http.get<Message[]>(`/api/messages/${listingId}`);
  }

  getChatHistory(listingId: string, senderEmail: string): Observable<Message[]> {
    const params = new HttpParams().set('email', senderEmail);
    return this.http.get<Message[]>(`/api/messages/history/${listingId}`, { params }
    );
  }

  sendMessage(
    listingId: string,
    recipientEmail: string | null,
    senderEmail: String | null,
    message: string,
  ): Observable<Message> {
    return this.getUser$().pipe(
      switchMap(user => {
        if (!user) throw new Error('User not authenticated');

        return this.getIdTokenSafe(user).pipe(
          switchMap(token =>
            this.http.post<Message>(
              `/api/messages/send`,
              { listingId, recipientEmail, senderEmail, message },
              httpOptionsWithAuthToken(token)
            )
          )
        );
      })
    );
  }

}
