import { useState } from 'react';
import { auth } from '../lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export const useLogin = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const emailLogin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password).catch((error) => {
      if (error.code === 'auth/user-not-found') {
        setErrorMessage('This email address was not found.');
      } else if (error.code === 'auth/wrong-password') {
        setErrorMessage('Password is incorrect.');
      }
    });
  };

  return { emailLogin, errorMessage };
};