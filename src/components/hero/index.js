import styles from './styles.module.scss';
import Link from 'next/link';

export default function Hero({
  backgroundImage,
  title,
  description,
  buttonText,
  buttonLink,
}) {
  return (
    <section
      className={styles.hero}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className={styles.content}>
        <h1>{title}</h1>
        {description && <p>{description}</p>}
        {buttonText && buttonLink && (
          <Link className={`${styles.button} btn`} href={buttonLink}>
            {buttonText}
          </Link>
        )}
      </div>
    </section>
  );
}
