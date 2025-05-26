import React from 'react';
import styles from './sidebar.module.scss';
import { useTheme } from '../../../hooks/useTheme';


export const Sidebar: React.FC = () => {
    const { isDark, toggleTheme } = useTheme();

    return (
        <aside className={styles.sidebar}>
            <button
                onClick={toggleTheme}
                className={styles.themeToggle}
                aria-label="Toggle theme"
            >
                {isDark ? '☀️' : '🌙'}
            </button>
        </aside>
    );
};
