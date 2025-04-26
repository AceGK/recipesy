import styles from './CategoryHeader.module.scss'
import { getCategories } from '@/lib/categories';
import Icon from '../icon';

export default function Header(props) {
  const { categories } = getCategories();

  return (
    <>
      {categories.map((category) => {
        if (category.title === props.category) {
          return (
            <div key={category.title} className={styles.header}>
              {/* <i>{category.icon}</i> */}
              <Icon icon={category.icon} src={category.src} width="60px" height="60px" />
              <h1> {category.title === 'all' ? 'All Recipes' : category.title}</h1>
              <p>{category.description}</p>
            </div>
          )
        }
      })}
    </>
  )
}