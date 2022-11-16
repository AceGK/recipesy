import { getUserWithUsername } from '../../lib/firebase';


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

  if (userDoc) {
    user = userDoc.data();
  }

  return {
    props: { user }, // will be passed to the page component as props
  };
}

export default function UserProfilePage({ user }) {
  return (
    <main>
      {/* <Metatags title={user.username} description={`${user.username}'s public profile`} /> */}
      <img src={user?.photoURL || '/icons/user-circle.svg'} referrerPolicy="no-referrer" />
      <p>
        <i>@{user.username}</i>
      </p>
      <h1>{user.displayName || 'Anonymous User'}</h1>
    </main>
  );
}