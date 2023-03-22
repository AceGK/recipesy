import Link from 'next/link'
import { useContext } from 'react';
import { UserContext } from '../../lib/context';
import { getCategories } from '../../lib/categories';

import styles from './Nav.module.scss'

import Logo from '../logo/Logo'
import SearchIcon from '../../public/icons/search.svg'
import PrimaryMenu from './PrimaryMenu'
import MobileMenu from './MobileMenu'
import useMediaQuery from '../../hooks/useMediaQuery';


export default function Navbar() {
  const isBreakpoint = useMediaQuery(850);

  return (
    <div className='container'>
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Logo height="50px" width="150px"/>
      </div>
      {!isBreakpoint && <PrimaryMenu />}
      <SecondaryMenu />
    </nav>
    </div>
  );
}

function Navitem(props) {
  return (
    <Link href={props.href} className={props.className}>
      {props.children}
    </Link>
  )
}

function SecondaryMenu() {
  const { user, username } = useContext(UserContext)
  return (
    <ul className={styles.secondaryMenu}>
      <SearchButton />
      {username && (
        <Navitem href='/dashboard' className={styles.userButton}>
          <img
            className={styles.avatar}
            src={user?.photoURL || '/icons/user-circle.svg'}
            referrerPolicy="no-referrer" />
        </Navitem>
      )}

      {!username && (
        <Navitem href="/login" className={styles.loginButton}>
          <button>Login</button>
        </Navitem>
      )}
      <MobileMenu />
    </ul>
  )
}

function SearchButton() {
  return( 
    <li 
      className={styles.searchButton}
      onClick={() => console.log('search button clicked')}
    >
      <SearchIcon />
    </li>
  )
}