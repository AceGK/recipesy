import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';

import { UserContext } from '../lib/context';

export default function AccountPage() {
  const router = useRouter();
  const { user, username } = useContext(UserContext);



  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [])


  function handleLogOut(e){
    e.preventDefault();
    signOut(auth)
      .then(() => {
        console.log("you are logged out");
        router.push("/");
      })
      .catch((error) => {
        console.log(error);
      })
  }

  if (user) {
  return ( 
    <>
      <h1>Account</h1>
      <form onSubmit={handleLogOut}>
        <button type='submit'>Logout</button>
      </form>
    </>
   );
  }
  return null
}

