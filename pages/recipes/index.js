import styles from '../../styles/Categories.module.scss'
import { firestore } from '../../lib/firebase';
import { collection, collectionGroup, getDocs, orderBy, query, where } from 'firebase/firestore';
import RecipeCard from '../../comps/recipe/Card';
import CategoryList from '../../comps/categoryList'

export default function Categories({ recipes }) {

  return (
    <div className="container">
      <div className={styles.header}>
        <h1>
          All Recipes
        </h1>
      <CategoryList />
      </div>
      <div className={styles.recipes}>
        {recipes.map((recipe) => (
          <RecipeCard id={recipe} recipe={recipe} />
        ))}
      </div>
    </div>
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
  let recipes = [];

    const q = query(
      collectionGroup(firestore, 'recipes'),
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