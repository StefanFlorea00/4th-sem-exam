import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const app = firebase.default.initializeApp({
  apiKey: 'AIzaSyAfsv1OHa4opKU7qoyFfYRfwAKVl0BXCuk',
  authDomain: 'th-sem-exam-25420.firebaseapp.com',
  databaseURL:
    'https://th-sem-exam-25420-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'th-sem-exam-25420',
  storageBucket: 'th-sem-exam-25420.appspot.com',
  messagingSenderId: '822500859565',
  appId: '1:822500859565:web:14dd338c20adb79fda7024',
});

export const auth = firebase.default.auth();
export const firestore = firebase.default.firestore();

export async function createUserDocument(user: any, additionalData: any) {
  if (user) {
    const userRef = firestore.doc(`users/${user.uid}`);

    const snapshot = await userRef.get();
    if (!snapshot.exists) {
      const { email } = user;
      const { fullname, investExp } = additionalData;

      try {
        userRef.set({ fullname, email, createdAt: new Date(), investExp });
      } catch (error) {
        console.log(error.message);
      }
    }
  } else return;
}

export async function getUser(user:any) {
  if(user) {
    const userData = firestore.collection('users').doc(user.uid)
    const data = await userData.get()
    if(!data.exists){
      console.log('Document doesn`t exist')
    } else {
      console.log(data.data())
    }
  }
}
export default app;
