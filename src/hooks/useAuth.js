import { useState, useEffect } from 'react';

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  // updateEmail,
} from 'firebase/auth';
import { auth } from '../firebaseConfig/firebase';

function useAuth() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const registerUser = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        setLoading(false);
        return response.user;
      })
      .catch((error) => {
        return error;
      });

  const loginUser = (email, password) =>
    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        setLoading(false);
        setCurrentUser(response.user);
        return response.user;
      })
      .catch((error) => {
        return error;
      });

  const logoutUser = () =>
    signOut(auth)
      .then(() => {
        setCurrentUser(null);
        setLoading(false);
      })
      .catch((error) => {
        return error;
      });

  const resetUserPassword = (email) =>
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setLoading(false);
        console.log('EMAIL SEND');
        return true;
      })
      .catch((error) => {
        console.log('ERROR:', error.message);
        return error;
      });

  useEffect(() => {
    console.log('Rerendered useAuth');
    console.log('current', currentUser);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(false);

        console.log('We are authenticated now!');
        setCurrentUser(user);
      } else {
        setLoading(false);

        console.log('The user is not logged!');
        setCurrentUser(null);
      }
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return {
    loading,
    currentUser,
    loginUser,
    registerUser,
    logoutUser,
    resetUserPassword,
    // updateUserEmail,
    // updateUserPassword,
  };
}

export default useAuth;
