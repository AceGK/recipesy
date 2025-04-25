import { useRouter } from 'next/router';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import { Scrollbar } from 'swiper/modules';
import Icon from '../icon';
import ChevronRight from '../../public/icons/chevron-right.svg';

import styles from './CategorySwiper.module.scss';

export default function CategorySwiper({ categories }) {
  const router = useRouter();

  const filteredCategories = categories.filter((category) => {
    if (router.asPath === '/recipes' && category.title === 'all') return false;
    if (router.asPath.includes(`/recipes/categories/${category.title}`)) return false;
    return true;
  });

  return (
    <section>
      <div className="title">
        <h2>Categories</h2>
        <Link href="/recipes/categories">
          view all <ChevronRight />
        </Link>
      </div>

      <Swiper
        spaceBetween={10}
        // slidesPerView="auto"
        slidesPerView={9}
        className={styles.swiper}
      >
        {filteredCategories.map((category) => (
          <SwiperSlide className={styles.slide} key={category.title}>
            <Link href={`/recipes/categories/${category.title}`}>
              <div className={styles.icon}>
                <Icon icon={category.icon} src={category.src} width="40px" height="40px" />
              </div>
              {category.title}
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
