
import { firestore } from '../../lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import Link from 'next/link';

export default function Recipe({recipe}) {
  return ( 
    <>
    <p>{recipe.title}</p>
    <Link href={`/user/${recipe.author}`}>
      <p>{recipe.author}</p>
    </Link>
    <p>{recipe.content}</p>
    </>
   );
}

export async function getStaticPaths() {
  let paths = [];

  const querySnapshot = await getDocs(collection(firestore, 'recipes'));
  querySnapshot.forEach((doc) => {
    paths.push(doc.data().slug);
  });

  return {
    fallback: true,
    paths: paths.map((slug) => ({ params: { slug: slug } })),
  };
}

export async function getStaticProps(context) {
  const recipeSlug = context.params.slug;
  let recipe = {};

  const recipesRef = collection(firestore, 'recipes');
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