import { getCategories } from '../../lib/categories';
import { useRouter } from "next/router";
import Link from 'next/link'
import styles from './CategoryList.module.scss'
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
          <>
          {/* don't display 'all recipes' button on /recipes */}
          {router.asPath === '/recipes' && category.title === 'all' ? null : 
          <li
            key={category.title}
            // hide currently active category
            style={router.asPath.includes(category.title) ? { display: 'none' } : { display: 'block' }}
          >
            <Link className='btn-dark' href={`/recipes/categories/${category.title}`}>
              {category.icon}
              {category.title}
            </Link>
          </li>
          }
          </>
        ))}
      </ul>

    </div>
  )
}