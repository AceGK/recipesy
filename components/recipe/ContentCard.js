import styles from './ContentCard.module.scss'

export default function RecipeDescription({ children, title }) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.body}>
        {children}
      </div>
    </div>
  );
}
