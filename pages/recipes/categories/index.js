
import { getCategories } from '../../../lib/categories';
import Link from 'next/link'
import CategoryList from '../../../comps/categoryList';

export default function CategoriesPage() {
  return ( 
    <div className='container'>
    <h1>Categories</h1>
    <CategoryList />
    </div>
   );
}

