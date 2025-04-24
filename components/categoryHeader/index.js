import styles from './CategoryHeader.module.scss'
import { getCategories } from '../../lib/categories';

export default function Header(props) {
  const { categories } = getCategories();

  return (
    <>
      {categories.map((category) => {
        if (category.title === props.category) {
          return (
            <div key={category.title} className={styles.header}>
              <i>{category.icon}</i>
              <h1> {category.title === 'all' ? 'All Recipes' : category.title}</h1>
              <p>{category.description}</p>
            </div>
          )
        }
      })}
    </>
  )
}