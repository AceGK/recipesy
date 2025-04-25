import styles from './Header.module.scss'
import Link from 'next/link'
import { getCategories } from '../../lib/categories';

export default function RecipeHeader({ recipe }) {
  const { categories } = getCategories();

  return (
    <div className={styles.container}>
      <section>
        <h1>{recipe.title}</h1>
        <div className={styles.tags}>
          {categories.map((category) => {
            return recipe.categories.some(el => el === category.title)
              &&
              <Link key={category.title} className={styles.tag} href={`/recipes/categories/${category.title}`}>
                {category.icon}
                {category.title}
              </Link>
          })}
        </div>
      </section>

      <aside>
        <div>
          <Link href={`/user/${recipe.author}`}>
            by <span className={styles.author}>{recipe.author}</span>
          </Link>
        </div>
        <div>Prep</div>
        <div>Cook</div>
        <div>Total</div>
      </aside>

    </div>
  );
}

