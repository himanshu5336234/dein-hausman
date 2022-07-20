// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.3.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.3.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: "AIzaSyD-xznJlhO3Toqi9acZvVVxNCw7cQ3en4o",
    authDomain: "dein-houseman.firebaseapp.com",
    projectId: "dein-houseman",
    storageBucket: "dein-houseman.appspot.com",
    messagingSenderId: "723634436996",
    appId: "1:723634436996:web:9f1354a2361e8048afbbd1"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();