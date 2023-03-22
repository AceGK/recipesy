import styles from './PrimaryMenu.module.scss'
import Link from 'next/link'
import { UserContext } from '../../lib/context';
import { useContext } from 'react';
import LogoutButton from '../user/LogoutButton';
import useMediaQuery from '../../hooks/useMediaQuery';

export default function PrimaryMenu() {
  const { user, username } = useContext(UserContext)
  const isBreakpoint = useMediaQuery(768);

  return (
    <ul className={styles.primaryMenu}>
      <Navitem href="/recipes" underline>
        recipes
      </Navitem>
      <Navitem href="/categories" underline>
        categories
      </Navitem>
      <Navitem href="/guides" underline>
        tips & guides
      </Navitem>

      <div className={styles.userMenu}>
        {/* user icon/dashboard link */}
        {username &&
          <Navitem href='/dashboard' className={styles.userButton}>
            <img
              className={styles.avatar}
              src={user?.photoURL || '/icons/user-circle.svg'}
              referrerPolicy="no-referrer" />
          </Navitem>
        }

        {/* logout button */}
        {username
          && isBreakpoint
          && <li><LogoutButton /></li>
        }

        {/* login button */}
        {!username &&
          <Navitem href="/login" className={styles.loginButton}>
            <button>Login</button>
          </Navitem>
        }
      </div>
    </ul>

  )
}

function Navitem({ href, className, underline, children }) {
  return (
    <li>
      <Link href={href} className={className}>
        {children}
        {underline && <div className={styles.gradientLink} />}
      </Link>
    </li>
  )
}

