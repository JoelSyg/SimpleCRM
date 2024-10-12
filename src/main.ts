import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// Firebase Realtime Database imports
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideDatabase, getDatabase } from '@angular/fire/database';  // Nur Realtime Database
import { firebaseConfig } from './firebase-config'; // Deine Firebase-Konfiguration

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    // Firebase und Realtime Database initialisieren
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideDatabase(() => getDatabase()),  // Realtime Database Provider
  ],
})
  .catch((err) => console.error(err));
