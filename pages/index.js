import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'

import Loader from '../components/loader/Loader'
import CategoryList from '../components/categoryList'
import RecipeSwiper from '../components/swiper/RecipeSwiper'
import { getCategories } from '../lib/categories'
import Hero from '../components/hero'

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
        description="Discover easy, delicious recipes — no stress, just flavor."
        buttonText="View All Recipes"
        buttonLink="/recipes"
      />

      <CategoryList cards />
      {categories
        .map(cat => (
          <RecipeSwiper key={cat.title} category={cat.title} />
        ))}
    </main>
  )
}
