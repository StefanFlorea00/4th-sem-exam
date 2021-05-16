import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage'

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

export async function getDoc(user: any) {
  if (user) {
    const userRef = firestore.collection('users');
    const snapshot = await userRef.get();

    if (snapshot) {
      const currentUser = user.uid;
      const findData = snapshot?.docs.find(el => el.id === currentUser);
      return findData?.data();
    } else {
      console.log('User doesnt exist');
    }
  }
}

export async function uploadUserImage(user: any, profileImg: string) {
  if (user) {
    const userRef = firestore.doc(`users/${user.uid}`);
    const snapshot = await userRef.get();

    if (snapshot) {
      getDoc(user).then(info => {
        try {
          userRef.set({ fullname: info?.fullname, email: info?.email, createdAt: info?.createdAt, investExp: info?.investExp, profileImg });
        } catch (error) {
          console.log(error.message);
        }
      });
    } else {
      console.log('User doesnt exist');
    }
  }
}

export async function updateUser(user: any, additionalData: any) {
  if (user) {
    const userRef = firestore.doc(`users/${user.uid}`);
    const snapshot = await userRef.get();

    if (snapshot) {
      const { email } = user;
      const { fullname, investExp, description } = additionalData;

      getDoc(user).then(info => {
        try {
          userRef.set({ fullname, email, createdAt: info?.createdAt, investExp, description, profileImg: info?.profileImg });
        } catch (error) {
          console.log(error.message);
        }
      });
    }
  } else return;
}

export default app;
