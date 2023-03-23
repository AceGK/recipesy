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
        
        {/* Post Recipe */}
        {username
          && <Navitem href="/dashboard" className="btn">
            Post Recipe
          </Navitem>
        }

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
          <Navitem href="/login" className="btn">
            {/* can't wrap button w <a></a> */}
            Login
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
        {/* {underline && <div className="gradient-link" />} */}
      </Link>
    </li>
  )
}

