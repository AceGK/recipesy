import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { collectionGroup, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../../lib/firebase';

import RecipeCard from '../recipe/Card';

import 'swiper/css';
import 'swiper/css/navigation';
import styles from './RecipeSwiper.module.scss';
import Link from 'next/link';
import ChevronRight from '../../public/icons/chevron-right.svg';

import { getCategories } from '../../lib/categories';
import Icon from '../icon';

export default function CategorySwiper({ category }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { categories } = getCategories();

  const selectedCategory = categories.find(cat => cat.title === category);

  useEffect(() => {
    const fetchRecipes = async () => {
      if (!category) return;

      setLoading(true);
      try {
        let q;

        if (category === 'all') {
          q = query(collectionGroup(firestore, 'recipes'));
        } else {
          q = query(
            collectionGroup(firestore, 'recipes'),
            where('categories', 'array-contains', category)
          );
        }

        const querySnapshot = await getDocs(q);
        const recipeList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRecipes(recipeList);
      } catch (error) {
        console.error(`Error fetching recipes for ${category}:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [category]);

  if (!selectedCategory) return null;

  const skeletonSlides = Array.from({ length: 4 }).map((_, i) => (
    <SwiperSlide key={`skeleton-${i}`}>
      <div className={styles.skeletonCard} />
    </SwiperSlide>
  ));

  return (
    <section className={styles.categorySection}>
      <div className="title">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Icon icon={selectedCategory.icon} src={selectedCategory.src} width="35px" height="35px" />
          <h2>{selectedCategory.title.charAt(0).toUpperCase() + selectedCategory.title.slice(1)}</h2>
        </div>
        <Link href={`/recipes/categories/${selectedCategory.title}`} className={styles.viewAll}>
          view all <ChevronRight />
        </Link>
      </div>
      <Swiper
        modules={[Navigation]}
        navigation
        className={styles.swiper}
        slidesPerView={4}
        spaceBetween={20}
      >
        {loading
          ? skeletonSlides
          : recipes.map(recipe => (
              <SwiperSlide key={recipe.id}>
                <RecipeCard recipe={recipe} />
              </SwiperSlide>
            ))}
      </Swiper>
    </section>
  );
}
