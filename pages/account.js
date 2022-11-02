import { useState } from 'react'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';


export default function Login() {

  return (
   <div>
    <GoogleLogin />
    <EmailLogin />
   </div>
  )
}

function GoogleLogin(){
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result.user)
  }

  return (
   <div>
    <button onClick={signInWithGoogle}>Sign in with Google</button>
   </div>
  )
}

function EmailLogin(){

  const [inputValues, setInputValues] = useState({ email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // loginUser(inputValues.email, inputValues.password);
    console.log(inputValues.email, inputValues.password);
    setInputValues({ email: '', password: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit}>
        <input
          type='email'
          name='email'
          placeholder='Email'
          value={inputValues.email}
          onChange={handleInputChange}
        />
        <input
          type='password'
          name='password'
          placeholder='Password'
          value={inputValues.password}
          onChange={handleInputChange}
        />
        <button type='submit'>Login</button>
      </form>  
  )
}

