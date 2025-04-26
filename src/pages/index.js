import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'

import Loader from '../components/loader/Loader'
import CategoryList from '../components/categoryList'
import RecipeSwiper from '../components/swiper/RecipeSwiper'
import { getCategories } from '../lib/categories'
import Hero from '../components/hero'
import CategorySwiper from '../components/swiper/CategorySwiper'

export default function Home() {
  const { categories } = getCategories();

  return (
    <main className="container">
      {/* <Loader show /> */}

      {/* <div className="card2"></div>
    <div className="card"></div> */}

      <Hero
        backgroundImage="/hero.jpg"
        title="Recipes Made Easy"
        description="Straightforward recipes. No ads, no fluff, just food."
        buttonText="View All Recipes"
        buttonLink="/recipes"
      />

      {/* <CategoryList cards /> */}
      <CategorySwiper categories={categories} />
      {categories
        .map(cat => (
          <RecipeSwiper key={cat.title} category={cat.title} />
        ))}
    </main>
  )
}
