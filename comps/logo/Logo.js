import styles from './logo.module.scss'
import Link from 'next/link'

function Logo(props) {
  return (
    <Link href="/" className={styles.container} style={{height:`${props.height}`, width:`${props.width}`}}>
      <div className={styles.mask}></div>
    </Link>
  );
}

export default Logo;