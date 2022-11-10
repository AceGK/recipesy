import { useEffect, useContext, useState, useCallback } from 'react';
import { useRouter } from "next/router";
import { UserContext } from '../../lib/context';
import styles from './login.module.scss'
import Logo from '../../public/recipeasy-logo';
import Link from 'next/link';

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithRedirect,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { doc, writeBatch, getDoc, getFirestore } from 'firebase/firestore';
import debounce from 'lodash.debounce';

import ErrorIcon from '../../public/icons/error.svg'

export default function Login() {
  const { user, loading, username } = useContext(UserContext)
  const [signUp, setSignUp] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);

  const router = useRouter();

  useEffect(() => {
    auth.onAuthStateChanged(function(username) {
      if (username){
        router.push('/dashboard');
      } else {
        return
      }
    })
  }, [])

  return (
    <main className={styles.container}>
      <Link href="/" className={styles.logo}>
        <Logo />
      </Link>
      <div className={styles.login}>

        {user ?
          !username ? <UsernameForm /> : <SignOutButton />
          :
          signUp ? <SignupForm setSignUp={setSignUp} /> :
            <>
              {resetPassword ?
                <ResetPassword setResetPassword={setResetPassword} />
                :
                <LoginOptions setSignUp={setSignUp} setResetPassword={setResetPassword} />
              }
            </>
        }

      </div>
    </main>
  );
}

// Login options (sign in with google, sign in with email)
function LoginOptions({ setSignUp, setResetPassword }) {
  return (
    <>
      <h1>Login</h1>
      <LoginWithGoogle />
      <LoginWithEmail />
      <a onClick={() => setSignUp(true)}>No account? <span>SIGN UP</span></a>
    </>
  )

  // Sign in with Google button
  function LoginWithGoogle() {

    const signInWithGoogle = async () => {
      const result = await signInWithRedirect(getAuth(), new GoogleAuthProvider());
      console.log(result.user)
    }

    return (
      <div>
        <button className={styles.googleButton} onClick={signInWithGoogle}>
          <img src={'/icons/google.svg'} width="20px" /> Login with Google
        </button>
      </div>
    )
  }

  // Sign in with Email form 
  function LoginWithEmail() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    function handleLogin(e) {
      e.preventDefault();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log("logged in");
          // Signed in 
          const user = userCredential.user;
        })
        .catch((error) => {
          console.log(error)
          setError("Incorrect Password")
        });
    }

    return (
      <form onSubmit={handleLogin}>
        <input
          type='email'
          name='email'
          placeholder='Email'
          value={email}
          autoComplete="username"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='password'
          name='password'
          placeholder='Password'
          value={password}
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {error &&
          <span className={styles.error}>
            <ErrorIcon />
            {error}
          </span>
        }
        <a className={styles.resetPassword} onClick={() => setResetPassword(true)}>Forgot password?</a>
        <button type='submit'>Login</button>
      </form>
    )
  }
}

function ResetPassword({ setResetPassword }) {
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
      </form>
      <a onClick={() => setResetPassword(false)}>Already have an account? <span>LOGIN</span></a>
    </>
  )
}

// Sign up form 
function SignupForm({ setSignUp }) {

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
    <>
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
        <a onClick={() => setSignUp(false)}>Already have an account? <span>LOGIN</span></a>
      </form>
    </>
  );
}

// Username Form
function UsernameForm() {
  const [formValue, setFormValue] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, username } = useContext(UserContext);

  const onSubmit = async (e) => {
    e.preventDefault();

    // Create refs for both user and username documents
    const userDoc = doc(getFirestore(), 'users', user.uid);
    const usernameDoc = doc(getFirestore(), 'usernames', formValue);

    // Commit user and username together as a batch write.
    const batch = writeBatch(getFirestore());
    batch.set(userDoc, { username: formValue, photoURL: user.photoURL, displayName: user.displayName });
    batch.set(usernameDoc, { uid: user.uid });

    await batch.commit();
  };

  const onChange = (e) => {
    // Force form value typed in form to match correct format
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    // Only set form value if length is < 3 OR it passes regex
    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }

    if (re.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }
  };

  //

  useEffect(() => {
    checkUsername(formValue);
  }, [formValue]);

  // Hit the database for username match after each debounced change
  // useCallback is required for debounce to work
  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {
        const ref = doc(getFirestore(), 'usernames', username);
        const snap = await getDoc(ref);
        console.log('Firestore read executed!', snap.exists());
        setIsValid(!snap.exists());
        setLoading(false);
      }
    }, 500),
    []
  );

  return (
    !username && (
      <section>
        <h3>Choose Username</h3>
        <form onSubmit={onSubmit}>
          <input name="username" placeholder="myname" value={formValue} onChange={onChange} />
          <UsernameMessage username={formValue} isValid={isValid} loading={loading} />
          <button type="submit" className="btn-green" disabled={!isValid}>
            Choose
          </button>

          {/* <h3>Debug State</h3>
          <div>
            Username: {formValue}
            <br />
            Loading: {loading.toString()}
            <br />
            Username Valid: {isValid.toString()}
          </div> */}
        </form>
      </section>
    )
  );
}

// Username availability message
function UsernameMessage({ username, isValid, loading }) {
  if (loading) {
    return <p>Checking...</p>;
  } else if (isValid) {
    return <p className="text-success">{username} is available!</p>;
  } else if (username && !isValid) {
    return <p className="text-danger">That username is taken!</p>;
  } else {
    return <p></p>;
  }
}

// Sign out button
function SignOutButton() {
  return (
    <>
      {/* <p>Hello, {username}</p> */}
      <button onClick={() => auth.signOut()}>Sign Out</button>
    </>
  )
}