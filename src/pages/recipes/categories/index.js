
import { getCategories } from '@/lib/categories';
import CategoryCard from '@/components/categoryCard';
import Header from '@/components/categoryHeader';
import Breadcrumbs from '@/components/breadcrumbs';

export default function CategoriesPage() {
  const { categories } = getCategories();

  return (
    <div className='container'>
      <Breadcrumbs />
      <div style={{ padding: '2rem 0rem' }}>
        <h1>All Categories</h1>
        <p>Browse recipes by type to discover your next favorite meal, drink, or treat.</p>
      </div>
      <div className="grid">
        {categories.map((category) => (
          <CategoryCard category={category} />
        ))}
      </div>

    </div>
  );
}

