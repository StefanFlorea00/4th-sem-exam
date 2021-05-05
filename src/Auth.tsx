import React, { useEffect, useState, createContext } from 'react';
import FirebaseApp from './components/FirebaseApp';
import firebase from 'firebase/app';

export const AuthContext = createContext<firebase.User | any>(null);

export function AuthProvider({
  children,
}: {
  children?: JSX.Element | JSX.Element[];
}) {
  const [currentUser, setCurrentUser] = useState<firebase.User | any>(null);
  const [requestPending, setRequestPending] = useState(true);

  useEffect(() => {
    FirebaseApp.auth().onAuthStateChanged(user => {
      setCurrentUser(user);
      setRequestPending(false);
    });
  }, []);
  if (requestPending) {
    return <small>Loading...</small>;
  }
  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
}
