import styles from './Header.module.scss'
import Link from 'next/link'

export default function RecipeHeader({recipe}) {
  return ( 
    <div className={styles.container}>
    <section>

      <h1>{recipe.title}</h1>
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

