import firebase from 'firebase/app'
import 'firebase/messaging'

const firebaseConfig = {
    apiKey: "AIzaSyBoALM6WoNAjhIr_-PPFZLL_ZldDWYADno",
    authDomain: "guelph-notifyme.firebaseapp.com",
    databaseURL: "https://guelph-notifyme.firebaseio.com",
    projectId: "guelph-notifyme",
    storageBucket: "",
    messagingSenderId: "161956224137",
    appId: "1:161956224137:web:85d298e11131aaf8"
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let messaging = undefined

if (firebase.messaging.isSupported()) {

    messaging = firebase.messaging()

    function saveFcmToken(fcm_token) {
        sessionStorage.setItem('fcm_token', fcm_token)
    }

    // Add the public key generated from firebase here.
    messaging.usePublicVapidKey("BP3FJNT_wp-itoVZJHAdmLXJEpasu_ofj3p-19BUX85l73t9GyZJSX1uiFoPoaGUB7xSZjFxt8Yew7Befba8QOc");
    messaging.requestPermission().then((permission) => {
        messaging.getToken().then(saveFcmToken).catch(error => {
            alert('You have not allowed notifications on your browser, and will be notified only through email.')
        })
    })

    // Callback fired if Instance ID token is updated.
    messaging.onTokenRefresh(() => {
        messaging.getToken().then(saveFcmToken).catch(error => {
            alert('There was an error with firebase')
        })
    })

}
export default messaging
