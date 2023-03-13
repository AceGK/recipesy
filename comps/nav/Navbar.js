import Link from 'next/link'
import { useContext } from 'react';
import { UserContext } from '../../lib/context';
import { getCategories } from '../../lib/categories';

import styles from './navbar.module.scss'

import Logo from '../../comps/logo/Logo'
import MenuIcon from '../../public/icons/mobile-menu.svg'
import SearchIcon from '../../public/icons/search.svg'

export default function Navbar() {

  return (
    <div className='container'>
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Logo height="50px" width="150px"/>
      </div>
      <PrimaryMenu />
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

function PrimaryMenu() {
  return (
    <ul className={styles.primaryMenu}>
      <li>
        <Link href="/recipes">recipes</Link>
        <div className={styles.gradientLink} />
      </li>
      <li>
        <Link href="/recipes/categories">categories</Link>
        <div className={styles.gradientLink} />
      </li>
      <li>
        <Link href="/guides">tips & guides</Link>
        <div className={styles.gradientLink} />
      </li>
    </ul>
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
      <MobileButton />
    </ul>
  )
}

function MobileButton() {
  return( 
    <div 
      className={styles.mobileButton}
      onClick={() => console.log('mobile menu clicked')}
    >
      <MenuIcon />
    </div>
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