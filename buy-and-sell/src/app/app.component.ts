import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { HttpClientModule } from '@angular/common/http';
import { Auth, signInWithPopup, GoogleAuthProvider, signOut, User, onAuthStateChanged } from '@angular/fire/auth';
import { inject } from '@angular/core';
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

  private auth = inject(Auth);
  public user$: Observable<User | null> = authState(this.auth);
  public isLoaded$ = new BehaviorSubject<boolean>(false); // deafualt to loading

  constructor() {
    // Use onAuthStateChanged to detect when Firebase is ready
    onAuthStateChanged(this.auth, (user) => {
      this.isLoaded$.next(true); // now loading is done
    });
  }

  signInClicked(): void {
    const provider = new GoogleAuthProvider();
    signInWithPopup(this.auth, provider);
  }

  signOutClicked(): void {
    signOut(this.auth);
  }
}
