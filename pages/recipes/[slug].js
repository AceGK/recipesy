
import { firestore } from '../../lib/firebase';
import { collection, collectionGroup, getDocs, query, where } from 'firebase/firestore';
import Link from 'next/link';
import Header from '../../components/recipe/Header'
import ContentCard from '../../components/recipe/ContentCard';

export default function Recipe({ recipe }) {

  return (
    <div className="container">

      <Header recipe={recipe} />

      <div className="grid">
        <ContentCard title="Description">
          <p>{recipe.description}</p>
        </ContentCard>

        <ContentCard title="Ingredients">
          <ul>
            {recipe.ingredients.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </ContentCard>

        <ContentCard title="Instructions">
          <ol>
            {recipe.instructions.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ol>
        </ContentCard>

      </div>
    </div>
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