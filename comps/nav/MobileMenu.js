import { useState } from 'react'
import PrimaryMenu from './PrimaryMenu'
import useMediaQuery from '../../hooks/useMediaQuery'

import styles from './MobileMenu.module.scss'
import Hamburger from '../../public/icons/hamburger.svg'
import Xmark from '../../public/icons/xmark.svg'
import LogoutButton from '../user/LogoutButton'

export default function MobileMenu() {
  const [open, setOpen] = useState(false)
  const isBreakpoint = useMediaQuery(768);

  return (
    <>
      <div
        className={styles.hamburger}
        onClick={() => setOpen(!open)}
      >
        {!open ? <Hamburger /> : <Xmark />}
      </div>

      {isBreakpoint &&
        <div className={`${styles.menu} ${open && styles.menu__active}`}>
          <PrimaryMenu />
        </div>
      }

      {open
        && isBreakpoint
        && <div className={styles.backdrop} onClick={() => setOpen(!open)}/>
      }
    </>
  )
}