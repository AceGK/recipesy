
import { getCategories } from '../../../lib/categories';
import CategoryCard from '../../../components/categoryCard';
import Header from '../../../components/categoryHeader';

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

