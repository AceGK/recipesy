import { useRouter } from 'next/router';
import styles from '../styles/Categories.module.scss'

export default function CategoryPages() {
  const router = useRouter();
  const { category } = router.query;

  return (
    <>
      <div className={styles.header}>
        <h1>
          {category === 'all' ? 'All Recipes' : category}
        </h1>
      </div>
    </>
  );
}