import { useRouter } from 'next/router';
import styles from '../styles/Categories.module.scss'
import { getCategories } from '../lib/categories';

import { firestore } from '../lib/firebase';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import RecipeCard from '../comps/recipe/Card';

export default function CategoryPages({ recipes }) {
  const router = useRouter();
  const { category } = router.query;

  return (
    <>
      <div className={styles.header}>
        <h1>
          {category === 'all' ? 'All Recipes' : category}
        </h1>
      </div>
      <div className={styles.recipes}>
        {recipes.map((recipe) => (
          <RecipeCard id={recipe.id} recipe={recipe} />
        ))}
      </div>
    </>
  );
}

// export async function getStaticPaths() {
//   const { paths } = getCategories();
//   return {
//     paths,
//     fallback: false,
//   };
// }

export async function getServerSideProps(context) {
  const categorySlug = context.params.category;
  let recipes = [];

  const q = query(
    collection(firestore, 'recipes'),
    where('category', 'array-contains', categorySlug)
  )
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    recipes.push({ id: doc.id, ...doc.data() });
  });

  return {
    props: {
      recipes: JSON.parse(JSON.stringify(recipes)),
    },
  };

}