import styles from './card.module.scss'
import Link from 'next/link';

export default function RecipeCard({ recipe }) {

  return (
    <Link key={recipe.id} className={styles.card} href={`/recipes/${recipe.slug}`}>
      <span className={styles.title}>{recipe.title}</span>
      <span className={styles.description}>{recipe.description}</span>
      <div className={styles.tags}>
      {recipe.category.map((category) => (
        <span key={category}>{category}</span>
      ))}
      </div>
    </Link>
  );
}