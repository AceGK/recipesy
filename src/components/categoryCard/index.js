import Link from 'next/link'
import styles from './CategoryCard.module.scss'
import ArrowRight from '@/assets/icons/arrow-right-long.svg'
import Icon from '../icon'

export default function CategoryCard({ category }) {

  return (
    <Link className={styles.card} href={`/recipes/categories/${category.title}`} key={category.title}>
      <div className={styles.icon}>
        <Icon icon={category.icon} src={category.src} width="35px" height="35px" />
      </div>
      <span className={styles.title}>{category.title}</span>
      <span className={styles.description}>{category.description}</span>
      <span className={styles.arrow}><ArrowRight /></span>
    </Link>
  )
}