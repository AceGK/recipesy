import Link from 'next/link'
import styles from './CategoryCard.module.scss'
import ArrowRight from '../../public/icons/arrow-right-long.svg'

export default function CategoryCard({ category }) {

  return (
    <Link className={styles.card} href={`/recipes/categories/${category.title}`}>
        <span className={styles.category}>{category.icon}</span>
        <span className={styles.title}>{category.title}</span>
        <span className={styles.description}>{category.description}</span>
        <span className={styles.arrow}><ArrowRight /></span>
    </Link>
  )
}