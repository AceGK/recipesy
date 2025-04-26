import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './styles.module.scss';
import ChevronRight from '@/assets/icons/chevron-right.svg';

export default function Breadcrumbs({ rootLabel = 'Home' }) {
  const router = useRouter();
  const pathParts = router.asPath.split('/').filter(Boolean); // removes empty string from leading slash

  const crumbs = pathParts.map((part, idx) => {
    const href = '/' + pathParts.slice(0, idx + 1).join('/');
    const label = decodeURIComponent(part.replace(/-/g, ' '));

    return {
      href,
      label: label.charAt(0).toUpperCase() + label.slice(1),
    };
  });

  return (
    <nav className={styles.breadcrumbs}>
      <ul>
        <li>
          <Link href="/">{rootLabel}</Link>
          {crumbs.length > 0 && <ChevronRight className={styles.separator} />}
        </li>
        {crumbs.map((crumb, index) => (
          <li key={crumb.href}>
            {index < crumbs.length - 1 ? (
              <>
                <Link href={crumb.href}>{crumb.label}</Link>
                <ChevronRight className={styles.separator} />
              </>
            ) : (
              <span className={styles.active}>{crumb.label}</span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
