import Link from 'next/link'
import { useContext } from 'react';
import { UserContext } from '../../lib/context';
import { getCategories } from '../../lib/categories';

import styles from './navbar.module.scss'
import Logo from '../../comps/logo/Logo'


export default function Navbar() {
  const { user, username } = useContext(UserContext)

  return (
    <nav className={styles.navbar}>
      <ul>
        <Logo />
        <ul className={styles.primary}>
          <Categories />
        </ul>

        {/* user is signed in and has username */}
        {username && (
          <ul className={styles.secondary}>
            <Navitem href="/admin">
              <button>Add Recipe</button>
            </Navitem>
            <Navitem
              // href={`/user/${username}`}
              href='/dashboard'
            >
              <img src={user?.photoURL || '/icons/user-circle.svg'} className={styles.userIcon} referrerPolicy="no-referrer" />
            </Navitem>
          </ul>
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

function Categories(props) {
  const { categories } = getCategories();
  return (
    <>
      {categories.map((category) => (
        <li key={category}>
          <Link href={`/${category}`}>
            {category}
          </Link>
          <div className='gradient-link' ></div>
        </li>
      ))
      }
    </>
  )
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