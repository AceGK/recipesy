import styles from './Header.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { getCategories } from '@/lib/categories';

export default function RecipeHeader({ recipe }) {
  const { categories } = getCategories();
  const backgroundImage = recipe.image || '/placeholder.jpg';

  return (
    <div className={styles.container}>
      {/* Background image */}
      <div className={styles.bg}>
        <Image
          src={backgroundImage}
          alt={recipe.title}
          fill
          priority
          quality={70}
          sizes="100vw"
          className={styles.bgImage}
        />
      </div>

      <section>
        <h1 className={styles.title}>{recipe.title}</h1>
        <div className={styles.tags}>
          {categories.map((category) =>
            recipe.categories.includes(category.title) && (
              <Link
                key={category.title}
                className={`${styles.tag} btn-dark`}
                href={`/recipes/categories/${category.title}`}
              >
                {category.icon}
                {category.title}
              </Link>
            )
          )}
        </div>
      </section>

      {/* <aside>
        <div>
          <Link href={`/user/${recipe.author}`}>
            by <span className={styles.author}>{recipe.author}</span>
          </Link>
        </div>
        <div>Prep</div>
        <div>Cook</div>
        <div>Total</div>
      </aside> */}
    </div>
  );
}
