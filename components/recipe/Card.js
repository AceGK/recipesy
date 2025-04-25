import styles from './card.module.scss'
import Link from 'next/link';
import Image from 'next/image';

export default function RecipeCard({ recipe }) {

  return (
    <Link key={recipe.id} className={styles.card} href={`/recipes/${recipe.slug}`}>
      <div className={styles.imageWrapper}>
        <Image
          src={recipe.image ? recipe.image : "/placeholder.jpg"}
          alt={recipe.title}
          fill
          className={styles.image}
          sizes="(max-width: 768px) 100vw, 300px"
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className={styles.content}>
        <span className={styles.title}>{recipe.title}</span>
        <div className={styles.tags}>
          {recipe.categories.map((category) => (
            <span key={category}>{category}</span>
          ))}
        </div>
      </div>
    </Link>
  );
}