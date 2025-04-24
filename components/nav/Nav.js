import styles from './Nav.module.scss'

import Logo from '../logo/Logo'
import SearchIcon from '../../public/icons/search.svg'
import PrimaryMenu from './PrimaryMenu'
import MobileMenu from './MobileMenu'
import useMediaQuery from '../../hooks/useMediaQuery';


export default function Navbar() {
  const isBreakpoint = useMediaQuery(768);
  return (
    <div className='container'>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <Logo height="50px" width="150px" />
        </div>
        {!isBreakpoint && <PrimaryMenu />}
        <div className={styles.rightAlign}>
          <MobileMenu />
        </div>
      </nav>
    </div>
  );
}
