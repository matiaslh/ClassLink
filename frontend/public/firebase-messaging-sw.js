importScripts('https://www.gstatic.com/firebasejs/6.2.4/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/6.2.4/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "AIzaSyBoALM6WoNAjhIr_-PPFZLL_ZldDWYADno",
    authDomain: "guelph-notifyme.firebaseapp.com",
    databaseURL: "https://guelph-notifyme.firebaseio.com",
    projectId: "guelph-notifyme",
    storageBucket: "",
    messagingSenderId: "161956224137",
    appId: "1:161956224137:web:85d298e11131aaf8"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
