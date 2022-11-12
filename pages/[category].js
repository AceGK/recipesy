import { useRouter } from 'next/router';

export default function CategoryPages() {
  const router = useRouter();
  const { category } = router.query;

  return ( 
    <>
      <h1>
        {category === 'all' ? 'All Recipes' : category}
      </h1>
    </>
   );
}