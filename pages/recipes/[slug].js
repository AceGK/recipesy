
import { firestore } from '../../lib/firebase';
import { collection, collectionGroup, getDocs, query, where } from 'firebase/firestore';
import Link from 'next/link';

export default function Recipe({recipe}) {

  return ( 
    <>
      <p>title: {recipe.title}</p>

      <Link href={`/user/${recipe.author}`}>
        <p>author: {recipe.author}</p>
      </Link>

      <p>description: {recipe.description}</p>

      <p>Ingredients:</p>
        <ul>
          {recipe.ingredients.map((i) => (
              <li key={i}>{i}</li>
            ))}
        </ul>

      <p>Instructions:</p>
        <ul>
          {recipe.instructions.map((i) => (
              <li key={i}>{i}</li>
            ))}
        </ul>
    </>
   );
}

export async function getStaticPaths() {
  let paths = [];

  const querySnapshot = await getDocs(collectionGroup(firestore, 'recipes'));
  querySnapshot.forEach((doc) => {
    paths.push(doc.data().slug);
  });

  return {
    fallback: false,
    paths: paths.map((slug) => ({ params: { slug: slug } })),
  };
}

export async function getStaticProps(context) {
  const recipeSlug = context.params.slug;
  let recipe = {};

  const recipesRef = collectionGroup(firestore, 'recipes');
  const q = query(recipesRef, where('slug', '==', recipeSlug));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    recipe = { id: doc.id, ...doc.data() };
  });

  return {
    props: {
      recipe: JSON.parse(JSON.stringify(recipe)),
    },
  };
}