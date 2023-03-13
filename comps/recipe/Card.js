import styles from './card.module.scss'
import Link from 'next/link';

export default function RecipeCard({ recipe }) {
  console.log(recipe)
  return (
    <Link className={styles.card} href={`/recipes/${recipe.slug}`}>
      <span className={styles.title}>{recipe.title}</span>
      <span className={styles.description}>{recipe.description}</span>
      <div className={styles.tags}>
      {recipe.category.map((category) => (
        <span>{category}</span>
      ))}
      </div>
    </Link>
  );
}