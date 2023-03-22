
import { getCategories } from '../../../lib/categories';
import Link from 'next/link'
import CategoryList from '../../../comps/categoryList';
import Header from '../../../comps/categoryHeader';

export default function CategoriesPage() {
  return ( 
    <div className='container'>
    <Header title="Recipe Categories" />
    <CategoryList />
    </div>
   );
}

