
import { getCategories } from '../../../lib/categories';
import CategoryCard from '../../../components/categoryCard';
import Header from '../../../components/categoryHeader';

export default function CategoriesPage() {
  const { categories } = getCategories();

  return (
    <div className='container'>
      <h1 style={{padding:'2rem 0rem'}}>All Categories</h1>
      <div className="grid">
        {categories.map((category) => (
          <CategoryCard category={category} />
        ))}
      </div>

    </div>
  );
}

