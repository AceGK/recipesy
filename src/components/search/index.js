import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { collectionGroup, getDocs } from 'firebase/firestore';
import { firestore } from '@/lib/firebase';
import Image from 'next/image';
import Link from 'next/link';

import styles from './styles.module.scss';

export default function SearchButton() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);
  const router = useRouter();

  // 🔄 Fetch recipes on mount
  useEffect(() => {
    const fetchRecipes = async () => {
      const querySnapshot = await getDocs(collectionGroup(firestore, 'recipes'));
      const all = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRecipes(all);
    };

    fetchRecipes();
  }, []);

  // 🔍 Filter logic
  useEffect(() => {
    if (searchTerm.trim()) {
      const matches = recipes.filter((recipe) =>
        [recipe.title, recipe.description, recipe.ingredients?.join(' '), recipe.instructions?.join(' ')]
          .filter(Boolean)
          .some(field => field.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFiltered(matches.slice(0, 5));
    } else {
      setFiltered([]);
    }
  }, [searchTerm, recipes]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/recipes/search?q=${encodeURIComponent(searchTerm)}`);
      setSearchTerm('');
      setIsOpen(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setTimeout(() => inputRef.current?.focus(), 100);
        }}
        className={styles.iconButton}
        aria-label="Search"
      >
        🔍
      </button>

      <form onSubmit={handleSubmit} className={`${styles.form} ${isOpen ? styles.visible : ''}`}>
        <input
          ref={inputRef}
          type="search"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.input}
          autoComplete="off"
        />

        {(filtered.length > 0 || (searchTerm.trim() && recipes.length > 0)) && (
          <ul className={styles.results}>
            {filtered.length > 0 ? (
              filtered.map((recipe) => (
                <li key={recipe.id} onClick={() => setSearchTerm('')}>
                  <Link href={`/recipes/${recipe.slug}`} className={styles.resultItem}>
                    <Image
                      src={recipe.image || '/placeholder.jpg'}
                      alt={recipe.title}
                      width={50}
                      height={50}
                      className={styles.image}
                    />
                    {recipe.title}
                  </Link>
                </li>
              ))
            ) : (
              <li className={styles.noResults}>No results found.</li>
            )}
          </ul>
        )}
      </form>

    </div>
  );
}
