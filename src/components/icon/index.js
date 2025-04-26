// components/icon/index.js
import styles from './styles.module.scss';

export default function Icon({ src, icon, height = '60px', width = '60px' }) {
  return (
    <>
      {/* <div
       style={{
          height,
          width,
        }}>
        {icon}
        </div> */}
      <div
        className={styles.mask}
        style={{
          WebkitMaskImage: `url(${src})`,
          maskImage: `url(${src})`,
          height,
          width,
        }}
      />
    </>
  );
}
