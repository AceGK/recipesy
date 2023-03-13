import RecipeCard from '../../comps/recipe/Card';
import UserProfile from '../../comps/user/Profile';
import { getUserWithUsername, postToJSON } from '../../lib/firebase';
import { firestore } from '../../lib/firebase';
import { collection, getDocs, orderBy, where } from 'firebase/firestore';
import { query as fireQuery } from 'firebase/firestore';


export async function getServerSideProps({ query }) {
  const { username } = query;

  const userDoc = await getUserWithUsername(username);

  // If no user, short circuit to 404 page
  if (!userDoc) {
    return {
      notFound: true,
    };
  }

  // JSON serializable data
  let user = null;
  let recipes = [];
  
  if (userDoc) {
    user = userDoc.data();
    const recipesQuery = fireQuery(
      collection(firestore, userDoc.ref.path, 'recipes'),
    );
    recipes = (await getDocs(recipesQuery)).docs.map(postToJSON);
  }
  
  return {
    props: { user, recipes }, // will be passed to the page component as props
  };
}

export default function UserProfilePage({ user, recipes }) {
  return (
    <main>
      {/* <Metatags title={user.username} description={`${user.username}'s public profile`} /> */}
      <UserProfile user={user} />
      {recipes.map((recipe) => (
          <RecipeCard id={recipe} recipe={recipe} />
        ))}
    </main>
  );
}