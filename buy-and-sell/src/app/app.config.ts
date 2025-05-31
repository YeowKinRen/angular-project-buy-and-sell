import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; 
import { environment } from '../environments/environment';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { provideAuth, getAuth } from '@angular/fire/auth';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), // Optimizes change detection
    provideRouter(routes), // Sets up Angular’s Router
    provideHttpClient(), // Provides Angular’s HttpClient
    provideFirebaseApp(() => initializeApp(environment.firebase)), //Initializes the Firebase app with configuration from environment file
    provideStorage(() => getStorage()), // rovides Firebase Cloud Storage functionality
    provideAuth(() => getAuth()), //// Enables Firebase Authentication features
    ]
};
