import { auth } from '../lib/firebase';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';

import { UserContext } from '../lib/context';
import { useLogout } from '../hooks/useLogout';

export default function AccountPage() {
  const router = useRouter();
  const { user, username } = useContext(UserContext);

  // https://firebase.google.com/docs/auth/web/manage-users
  // redirect if logged and have username
  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (!user) {
        router.push('/login');
      }
    })
  }, [])


  return (
    <main className="container">
      <h1>Dashboard</h1>
      <img src={user?.photoURL || '/icons/user-circle.svg'} referrerPolicy="no-referrer" />
      <p>Hello, {username}</p>
      <LogoutButton />
      <button href="/submit-recipe" className="btn">
        Post Recipe
      </button>
    </main>
  );
}


function LogoutButton() {
  const { logoutUser } = useLogout();
  return <button className="btn" onClick={logoutUser}>Logout</button>
}