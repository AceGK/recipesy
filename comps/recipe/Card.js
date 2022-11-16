import styles from './card.module.scss'
import Link from 'next/link';

function RecipeCard({recipe}) {
  return ( 
    <Link href={`/recipes/${recipe.slug}`}>
      <div className={styles.card}>
        <span>{recipe.title}</span>
      </div>
    </Link>
   );
}

export default RecipeCard;