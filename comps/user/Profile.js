export default function UserProfile({user}) {
  return (
    <>
      <img src={user?.photoURL || '/icons/user-circle.svg'} referrerPolicy="no-referrer" />
      <p>
        <i>@{user.username}</i>
      </p>
      <h1>{user.displayName || 'Anonymous User'}</h1>
    </>
  );
}
