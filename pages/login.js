import { useState } from 'react'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useRouter } from 'next/router';

export default function LoginPage() {

  return (
    <>
      <h1>Login</h1>
      <GoogleLogin />
      <EmailLogin />

      <h1>Signup</h1>
      <Signup />
    </>
  );
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
        console.log("logged in");
        // Signed in 
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        console.log(error)
      });
  }

  return (
    <>
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
    </>
  );
}