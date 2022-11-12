import styles from './logo.module.scss'
import Link from 'next/link'

function Logo() {
  return (
    <Link href="/" className={styles.container}>
      <div className={styles.mask}></div>
    </Link>
  );
}

export default Logo;