import { firestore } from '../../lib/firebase';
import { collection, collectionGroup, getDocs, orderBy, query, where } from 'firebase/firestore';
import RecipeCard from '../../components/recipe/Card';
import CategoryList from '../../components/categoryList'
import Header from '../../components/categoryHeader';

export default function Categories({ recipes }) {

  return (
    <div className="container">
      <Header category='all' /> 
      <CategoryList />
    
      <div className="grid">
        {recipes.map((recipe) => (
          <RecipeCard recipe={recipe} key={recipe.id} />
        ))}
      </div>
    </div>
  );
}

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

// export async function getStaticPaths() {
//   const { paths } = getCategories();
//   return {
//     paths,
//     fallback: false,
//   };
// }