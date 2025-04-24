import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import styles from './styles.module.scss';

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <button
      className={styles.themeToggle}
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      {resolvedTheme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
}