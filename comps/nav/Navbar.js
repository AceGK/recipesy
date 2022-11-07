import styles from './navbar.module.scss'
import Link from 'next/link'

import { useContext } from 'react';
import { UserContext } from '../../lib/context';

export default function Navbar() {
  const { user, username } = useContext(UserContext)
  
  return (
    <nav className={styles.navbar}>
      <ul>
        <Navitem href="/" class={styles.logo}>
          Recipeasy
        </Navitem>
        <Navitem href="/category">
          Category
        </Navitem>

        {/* user is signed in and has username */}
        {username && (
          <>
            <Navitem href="/admin">
              <button>Add Recipe</button>
            </Navitem>
            <Navitem href={`/user/${username}`}>
              <img src={user?.photoURL} />
              <span>{username}</span>
            </Navitem>
          </>
        )}

        {/* user is not signed in or has not created a username */}
        {!username && (
          <Navitem href="/login">
            <button>Login</button>
          </Navitem>
        )}

      </ul>
    </nav>
  );
}

function Navitem(props) {
  return (
    <li className={props.class}>
      <Link href={props.href}>
        {props.children}
      </Link>
    </li>
  )
}