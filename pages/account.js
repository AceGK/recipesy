import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/router';

export default function AccountPage() {
  const router = useRouter();

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

  return ( 
    <>
      <h1>Account</h1>
      <form onSubmit={handleLogOut}>
        <button type='submit'>Logout</button>
      </form>
    </>
   );
}

