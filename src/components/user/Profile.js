import styles from './profile.module.scss'

export default function UserProfile({user}) {
  return (
    <div className={styles.profile}>
      <img 
        src={user?.photoURL || '/icons/user-circle.svg'} 
        className={styles.avatar}
        referrerPolicy="no-referrer" />
      <h1>
        {user.displayName || 'Anonymous User'}
      </h1>
      <h2>
        <i>@{user.username}</i>
      </h2>
    </div>
  );
}
