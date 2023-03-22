import styles from './PrimaryMenu.module.scss'
import Link from 'next/link'

export default function PrimaryMenu() {
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