import { getCategories } from '@/lib/categories';
import { useRouter } from "next/router";
import Link from 'next/link'
import styles from './CategoryList.module.scss'
import ChevronRight from '@/assets/icons/chevron-right.svg';
import Icon from '../icon';

export default function CategoryList({cards}) {
  const { categories } = getCategories();
  const router = useRouter()

  return (
    <div className={styles.categories}>

      <div className={styles.title}>
        <h2>categories</h2>
        <Link href="/recipes/categories">
          view all <ChevronRight />
        </Link>
      </div>

      <ul className={styles.categoryList}>
        {categories.map((category) => {
          // skip "all" on /recipes
          if (router.asPath === '/recipes' && category.title === 'all') return null;

          return (
            <li
              key={category.title}
              style={
                router.asPath.includes(category.title)
                  ? { display: 'none' }
                  : { display: 'block' }
              }
            >
              <Link className="btn-dark" href={`/recipes/categories/${category.title}`}>
                {/* {category.icon} */}
                <Icon icon={category.icon} src={category.src} width="25px" height="25px" />
                {category.title}
              </Link>
            </li>
          );
        })}
      </ul>

    </div>
  )
}