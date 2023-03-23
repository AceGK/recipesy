import { getCategories } from '../../lib/categories';
import { useRouter } from "next/router";
import Link from 'next/link'
import styles from './CategoryCard.module.scss'
import ChevronRight from '../../public/icons/chevron-right.svg'

export default function CategoryCard({ category }) {
  const { categories } = getCategories();

  return (
    <Link href={`/recipes/categories/${category.title}`}>
      <div className={styles.card}>
        <span className={styles.icon}>{category.icon}</span>
        <span className={styles.title}>{category.title}</span>
        <span className={styles.description}>{category.description}</span>
      </div>
    </Link>
  )
}