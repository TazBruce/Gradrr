import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';
import Loader from '../components/common/Loader';
import firebase from '../services/firebase';
import { User } from '../types/index';

interface AuthContextValue {
  user: User | null;
}

export const AuthContext = createContext({} as AuthContextValue);

export const AuthService = firebase.auth();

export function AuthProvider(props: PropsWithChildren<unknown>) {
  const [user, setUser] = useState<User | null>(null);
  const [authPending, setAuthPending] = useState(true);

  useEffect(() => {
    return AuthService.onAuthStateChanged(result => {
      if (result) {
        const { displayName, email, uid, photoURL, phoneNumber } = result;
        const currentUser: User = {
          displayName,
          email,
          uid,
          photoURL,
          phoneNumber,
          isAdmin: false,
        };
        // read claims if necessary
        setAuthPending(true);
        result.getIdTokenResult().then(({ claims }) => {
          currentUser.isAdmin = Boolean(claims.admin);
          setUser(currentUser);
          setAuthPending(false);
        });
      } else {
        setUser(null);
        setAuthPending(false);
      }
    });
  }, []);

  const { children } = props;

  if (authPending) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
