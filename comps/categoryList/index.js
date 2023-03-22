import { getCategories } from '../../lib/categories';
import Link from 'next/link'
import styles from './CategoryList.module.scss'
import { useRouter } from "next/router";
import ChevronRight from '../../public/icons/chevron-right.svg'

export default function CategoryList() {
  const { categories } = getCategories();
  const router = useRouter()

  return (
    <div className={styles.categories}>

      <div className={styles.title}>
        <h2>categories</h2>
        <Link href="/recipes/categories">
          See All <ChevronRight />
        </Link>
      </div>

      <ul className={styles.categoryList}>
        {categories.map((category) => (
          <li
            key={category.title}
            style={router.asPath.includes(category.title) ? { display: 'none' } : { display: 'block' }}
          >
            <Link className='btn-dark' href={`/recipes/categories/${category.title}`}>
              {category.icon}
              {category.title}
            </Link>
          </li>
        ))}
      </ul>

    </div>
  )
}