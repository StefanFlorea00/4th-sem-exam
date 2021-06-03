import React, { useEffect, useState, createContext } from 'react';
import app from './components/FirebaseApp';
import firebase from 'firebase/app';
import LoadingSvg from './components/Assets/Loading';
export const AuthContext = createContext<firebase.User | any>(null);

export function AuthProvider({
  children,
}: {
  children?: JSX.Element | JSX.Element[];
}) {
  const [currentUser, setCurrentUser] = useState<firebase.User | any>(null);
  const [requestPending, setRequestPending] = useState(true);

  useEffect(() => {
    app.auth().onAuthStateChanged(user => {
      setCurrentUser(user);
      setRequestPending(false);
    });
  }, []);
  if (requestPending) {
    return <LoadingSvg hasErrorText className='main_loading_svg'/>;
  }
  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
}
