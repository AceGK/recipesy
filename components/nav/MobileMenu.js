import { useState, useEffect } from 'react'
import PrimaryMenu from './PrimaryMenu'
import useMediaQuery from '../../hooks/useMediaQuery'

import styles from './MobileMenu.module.scss'
import Hamburger from '../../public/icons/hamburger.svg'
import Xmark from '../../public/icons/xmark.svg'
import LogoutButton from '../user/LogoutButton'

export default function MobileMenu() {
  const [open, setOpen] = useState(false)
  const isBreakpoint = useMediaQuery(768);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Clean up on unmount
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <div
        className={styles.hamburger}
        onClick={() => setOpen(!open)}
      >
        {/* {!open ? <Hamburger /> : <Xmark />} */}
        <Hamburger />
      </div>

      {isBreakpoint &&
        <div className={`${styles.menu} ${open && styles.menu__active}`}>
          <PrimaryMenu />
        </div>
      }

      <div
        className={`${styles.backdrop} ${open && isBreakpoint ? styles.backdrop__active : ''}`}
        onClick={() => setOpen(false)}
      />
    </>
  )
}