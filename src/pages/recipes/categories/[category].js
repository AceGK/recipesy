import { useRouter } from 'next/router';
// import styles from '@/styles/Categories.module.scss'
import { getCategories } from '@/lib/categories';

import { firestore } from '@/lib/firebase';
import { collection, collectionGroup, getDocs, orderBy, query, where } from 'firebase/firestore';
import RecipeCard from '@/components/recipe/Card';
import CategoryList from '@/components/categoryList';
import Header from '@/components/categoryHeader';
import Breadcrumbs from '@/components/breadcrumbs';


export default function CategoryPages({ recipes }) {
  const router = useRouter();
  const { category } = router.query;

  return (
    <div className="container">
      <Breadcrumbs />
      <Header category={category} />
      {/* <CategoryList /> */}
      <section>
        {/* <div className="title">
          <h2>Recipes</h2>
        </div> */}
        <div className="grid">
          {recipes.map((recipe) => (
            <RecipeCard recipe={recipe} key={recipe.id} />
          ))}
        </div>
      </section>
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
  const categorySlug = context.params.category;
  let recipes = [];

  // query all recipes
  if (categorySlug == 'all') {
    const q = query(
      collectionGroup(firestore, 'recipes'),
    )
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      recipes.push({ id: doc.id, ...doc.data() });
    });
  }
  // else query the category URL slug
  else {
    const q = query(
      collectionGroup(firestore, 'recipes'),
      where('categories', 'array-contains', categorySlug)
    )
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      recipes.push({ id: doc.id, ...doc.data() });
    });
  }


  return {
    props: {
      recipes: JSON.parse(JSON.stringify(recipes)),
    },
  };

}