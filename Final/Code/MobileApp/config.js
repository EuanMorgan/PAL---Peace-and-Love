import Firebase from 'firebase';
let config = {
    apiKey: 'AIzaSyBxJb8oxSFCCqPAofx1uAWxJ72-bFkHwvQ',
    authDomain: 'krapp-server.firebaseapp.com',
    databaseURL: 'https://krapp-server.firebaseio.com',
    projectID: 'krapp-server',
    storageBucket: 'krapp-server.appspot.com',
    messageSenderID: '994619209931'
};

let app = Firebase.initializeApp(config);
export const db = app.database();
