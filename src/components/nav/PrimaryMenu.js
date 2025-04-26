import styles from './PrimaryMenu.module.scss'
import Link from 'next/link'
import { UserContext } from '@/lib/context';
import { useContext } from 'react';
import LogoutButton from '../user/LogoutButton';
import useMediaQuery from '@/hooks/useMediaQuery';
import ThemeToggle from '../themeToggle';
import Search from '@/components/search'

export default function PrimaryMenu() {
  const { user, username } = useContext(UserContext)
  const isBreakpoint = useMediaQuery(768);

  return (
    <ul className={styles.primaryMenu}>
      <Navitem href="/recipes" className={styles.link}>
        recipes
      </Navitem>
      <Navitem href="/recipes/categories" className={styles.link}>
        categories
      </Navitem>
      <Navitem href="/guides" className={styles.link}>
        tips & guides
      </Navitem>

      <div className={styles.userMenu}>
      <Search className={styles.searchButton} />

        {/* user icon/dashboard link */}
        {username &&
          <Navitem href='/dashboard' className={styles.userButton}>
            <img
              className={styles.avatar}
              src={user?.photoURL || '/icons/user-circle.svg'}
              referrerPolicy="no-referrer" />
          </Navitem>
        }

        {/* login button */}
        {!username &&
          <Navitem href="/login" className="btn">
            Login
          </Navitem>
        }
      </div>
      <ThemeToggle />
    </ul>

  )
}

function Navitem({ href, className, underline, children }) {
  return (
    <li>
      <Link href={href} className={className}>
        {children}
        {/* {underline && <div className="gradient-link" />} */}
      </Link>
    </li>
  )
}

