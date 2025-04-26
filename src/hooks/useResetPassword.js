import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../lib/firebase';

export const useResetPassword = () => {
  const [message, setMessage] = useState();
  const [error, setError] = useState();

  const sendResetPassword = (email) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setMessage('Password reset email sent.');
        setError(null)
      })
      .catch((error) => {
        if (error.code === 'auth/user-not-found') {
          setError('This email address was not found.');
        } else if (error.code === 'auth/too-many-requests') {
          setError('Error: too many requests. Please check your email or try again later.');
        } else {
          setError(error.message);
        }
      });
  };

  return { sendResetPassword, message, error };
};