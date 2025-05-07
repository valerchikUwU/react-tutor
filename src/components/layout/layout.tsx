import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './layout.module.scss';
import { useTheme } from '../../core/hooks/useTheme';
import burger from '../../assets/images/burger.svg'

export const Layout: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className={`${styles.layout} ${isDark ? styles.dark : styles.light}`}>
      <aside className={styles.sidebar}>
        <button
          onClick={toggleTheme}
          className={styles.themeToggle}
          aria-label="Toggle theme"
        >
          {isDark ? '☀️' : '🌙'}
        </button>
      </aside>
      <div className={styles.contact}>

        <div className={styles.header}>
          <div className={styles.headerName}>контакты</div>
          <div className={styles.burger}>
            <img src={burger} alt="burger" />
          </div>
        </div>
      </div>
      <main className={styles.main}>
        <Outlet />

      </main>

    </div>
  );
};