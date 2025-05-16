import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './layout.module.scss';
import { useTheme } from '../../core/hooks/useTheme';
import burger from '../../assets/images/burger.svg'
import { OrganizationList } from './organizationsList';
import { useOrganizations } from '../../core/hooks/useOrganizations';

export const Layout: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const { organizations, loading, error } = useOrganizations();
  const [isOrganizationsCollapsed, setOrganizationsCollapsed] = useState(false);

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
      <div className={styles.operationalBar}>
        <div 
          className={styles.organizationsHeader}
          onClick={() => setOrganizationsCollapsed(!isOrganizationsCollapsed)}
        >
          <div className={styles.headerName}>Организации</div>
          <div className={styles.burger}>
            <img 
              src={burger} 
              alt="burger" 
              className={`${styles.collapseIcon} ${
                isOrganizationsCollapsed ? styles.collapsed : ''
              }`}
            />
          </div>
        </div>
        
        {!isOrganizationsCollapsed && (
          <OrganizationList 
            organizations={organizations} 
            loading={loading} 
            error={error}
          />
        )}
        <div className={styles.contactsHeader}>
          <div className={styles.headerName}>Контакты</div>
          <div className={styles.burger}>
            <img src={burger} alt="burger" />
          </div>
        </div>
      </div>
      <main className={styles.main}>
        <Outlet />
        <div className={styles.mainHeader}>

        </div>

      </main>

    </div>
  );
};