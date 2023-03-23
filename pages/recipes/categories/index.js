
import { getCategories } from '../../../lib/categories';
import Link from 'next/link'
import CategoryCard from '../../../comps/categoryCard';
import Header from '../../../comps/categoryHeader';

export default function CategoriesPage() {
  const { categories } = getCategories();

  return (
    <div className='container'>
      <Header title="Recipe Categories" />

      <div className="grid">
        {categories.map((category) => (
          <CategoryCard category={category} />
        ))}
      </div>

    </div>
  );
}

