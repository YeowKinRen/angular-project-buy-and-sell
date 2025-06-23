import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { Auth } from '@angular/fire/auth';
import { inject } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-email-sign-in',
  imports: [FormsModule, CommonModule],
  templateUrl: './email-sign-in.component.html',
  styleUrl: './email-sign-in.component.css'
})
export class EmailSignInComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
    isLoginMode: boolean = false; // ← toggle between login and register

  private auth = inject(Auth); // // ensures Angular context

  async onSubmit(event: Event): Promise<void> {
    event.preventDefault(); // stops the page from reloading
    this.errorMessage = '';

    if (this.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters.';
      return;
    }

    // Replace with actual login logic
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    try {
      if (this.isLoginMode) {
        // LOGIN logic
        const userCredential = await signInWithEmailAndPassword(this.auth, this.email, this.password);
        console.log('Logged in as:', userCredential.user);
      } else {
        // REGISTER logic
        const userCredential = await createUserWithEmailAndPassword(this.auth, this.email, this.password);
        console.log('User registered:', userCredential.user);
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      // this.errorMessage = error.message;
      // Handle known Firebase errors
      switch (error.code) {
        case 'auth/email-already-in-use':
          this.errorMessage = 'This email is already registered. Try signing in with Google instead.';
          break;
        case 'auth/network-request-failed':
          this.errorMessage = 'Network error. Please check your internet connection.';
          break;
        case 'auth/invalid-email':
          this.errorMessage = 'The email address is invalid.';
          break;
        default:
          this.errorMessage = error.message || 'An unexpected error occurred.';
          break;
      }
    }
  }

    toggleMode(): void {
    this.isLoginMode = !this.isLoginMode;
    this.errorMessage = '';
  }
}