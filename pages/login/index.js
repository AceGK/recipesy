import { useState } from 'react'
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { useRouter } from 'next/router';

import styles from './login.module.scss'

export default function LoginPage() {

  const [signup, setSignup] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);

  return (
    <div className={styles.login_container}>

      {
      !signup ? 
      !resetPassword ? <Login setSignup={setSignup} setResetPassword={setResetPassword} /> : <ForgotPassword /> 
      : <Signup />
      }
      
    </div>
  );
}

function Login({ setSignup, setResetPassword }) {
  return (
    <div className={styles.login}>
      <h1>Login</h1>
      <GoogleLogin />
      <EmailLogin />
      <button onClick={() => setResetPassword(true)}>Forgot Password?</button>
      <span>Don't have an account?</span>
      <button onClick={() => setSignup(true)}>Signup</button>
    </div>
  )
}


function GoogleLogin() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result.user)
  }

  return (
    <div>
      <button onClick={signInWithGoogle}>Login with Google</button>
    </div>
  )
}


function EmailLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")

  function handleLogin(e) {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("logged in");
        // Signed in 
        const user = userCredential.user;
        router.push("/account");
      })
      .catch((error) => {
        console.log(error)
      });
  }

  return (
    <form onSubmit={handleLogin}>
      <input
        type='email'
        name='email'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type='password'
        name='password'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type='submit'>Login</button>
    </form>
  )
}


function Signup() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")

  function handleSignup(e) {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("signed up");
        // Signed in 
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        console.log(error)
      });
  }

  return (
    <div className={styles.signup}>
      <h1>Signup</h1>
      <form onSubmit={handleSignup}>
        <input
          type='email'
          name='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='password'
          name='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit'>Signup</button>
      </form>
    </div>
  );
}


function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("")

  function handleReset(e) {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log("password reset email sent");
        setMessage("Check your email to reset password")
      })
      .catch((error) => {
        console.log(error);
        setError("Email not found");
      })
  }

  return (
    <>
      <h1>Reset Password</h1>

      {message && <p>{message}</p>}
      {error && <p>{error}</p>}

      <form onSubmit={handleReset}>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          placeholder="email"
        />
        <button type="submit">Reset Password</button>
        <button onClick={() => setResetPassword(false)}>Back to Login</button>
      </form>
    </>
  )
}