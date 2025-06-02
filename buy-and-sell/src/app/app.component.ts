import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { HttpClientModule } from '@angular/common/http';
import { Auth, signInWithPopup, GoogleAuthProvider, signOut, User, onAuthStateChanged } from '@angular/fire/auth';
import { inject, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, BehaviorSubject } from 'rxjs';
import { authState } from 'rxfire/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, RouterOutlet, RouterModule, NavBarComponent, HttpClientModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'buy-and-sell';

  private auth = inject(Auth); // // ensures Angular context
  private zone = inject(NgZone); // 👈 Inject NgZone

  public user$: Observable<User | null> = authState(this.auth);
  public isLoaded$ = new BehaviorSubject<boolean>(false); // default to loading

  constructor() {
    this.user$.subscribe(() => {
      this.isLoaded$.next(true); // Mark as loaded when auth state is known
    });
  }

  signInClicked(): void {
    const provider = new GoogleAuthProvider();
    // Wrap Firebase auth call inside Angular's zone
    this.zone.run(() => {
      signInWithPopup(this.auth, provider).then(result => {
        console.log('Signed in as:', result.user.displayName);
      });
    });
  }

  signOutClicked(): void {
    signOut(this.auth).then(() => {
      console.log('Signed out!');
    });
  }
}
