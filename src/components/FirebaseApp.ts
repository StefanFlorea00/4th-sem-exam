import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseApp = firebase.default.initializeApp({
  apiKey: 'AIzaSyAfsv1OHa4opKU7qoyFfYRfwAKVl0BXCuk',
  authDomain: 'th-sem-exam-25420.firebaseapp.com',
  databaseURL:
    'https://th-sem-exam-25420-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'th-sem-exam-25420',
  storageBucket: 'th-sem-exam-25420.appspot.com',
  messagingSenderId: '822500859565',
  appId: '1:822500859565:web:14dd338c20adb79fda7024',
});

let db = firebaseApp.firestore();

console.log(db);
db.collection('todo').add({title: 'first todo', description: 'new todo' })
.then(documentReference => {
  console.log('document reference ID', documentReference.id)
})
.catch(error => {
  console.log(error.message)
})

export default firebaseApp;
