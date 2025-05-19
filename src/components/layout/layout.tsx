import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './layout.module.scss';
import { useTheme } from '../../core/hooks/useTheme';
import burger from '../../assets/images/burger.svg';
import dropdown from '../../assets/images/drop-down.svg';
import mainIcon from '../../assets/images/iconHeader.svg';
import star from '../../assets/images/star.svg';
import policy from '../../assets/images/icon _policy.svg';
import strategy from '../../assets/images/icon _ strategy.svg';
import stats from '../../assets/images/icon _ stats.svg';
import posts from '../../assets/images/icon _ post.svg';
import projects from '../../assets/images/icon _ list view.svg';
import { OrganizationList } from './organizationsList';
import { useOrganizations } from '../../core/hooks/useOrganizations';
import { StarIcon } from '../ui/startIcon';
import { PolicyIcon } from '../ui/policyIcon';
import { StatsIcon } from '../ui/statsIcon';
import { StrategyIcon } from '../ui/strategyIcon';
import { PostIcon } from '../ui/postIcon';
import { ProjectIcon } from '../ui/projectIcon';

export const Layout: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const { organizations, loading, error } = useOrganizations();
  const [isOrganizationsClosed, setOrganizationsClosed] = useState(false);

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
        >
          <div className={styles.headerName}>Организации</div>
          <div className={styles.dropdown}
            onClick={() => setOrganizationsClosed(!isOrganizationsClosed)}
          >
            <img
              src={dropdown}
              alt="dropdown"
              className={`${styles.collapseIcon} ${isOrganizationsClosed ? styles.collapsed : ''
                }`}
            />
          </div>
          <div className={styles.burger}>
            <img
              src={burger}
              alt="burger"
            />
          </div>
        </div>
        <OrganizationList
          isCollapsed={isOrganizationsClosed}
          organizations={organizations}
          loading={loading}
          error={error}
        />
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
          <div className={styles.headerName}>Личный помощник</div>
        </div>

        <div className={styles.startMessageBlock}>
          <div className={styles.mainIconInChat}>
            <img src={mainIcon}></img>
          </div>
          <div className={styles.staticMessage}>
            <div className={styles.staticMessageText}>С чем будем работать?</div>
          </div>
        </div>
        <div className={styles.modules}>
          <div className={styles.module}>
            <div className={styles.moduleImage}>
              <StarIcon></StarIcon>
            </div>
            <div className={styles.moduleText}>Цели</div>
          </div>
          <div className={styles.module}>
            <div className={styles.moduleImage}>
              <PolicyIcon></PolicyIcon>
            </div>
            <div className={styles.moduleText}>Политика</div>
          </div>
          <div className={styles.module}>
            <div className={styles.moduleImage}>
              <StatsIcon></StatsIcon>
            </div>
            <div className={styles.moduleText}>Статистика</div>
          </div>
          <div className={styles.module}>
            <div className={styles.moduleImage}>
              <StarIcon></StarIcon>
            </div>
            <div className={styles.moduleText}>Краткосрочная цель</div>
          </div>
          <div className={styles.module}>
            <div className={styles.moduleImage}>
              <StrategyIcon></StrategyIcon>
            </div>
            <div className={styles.moduleText}>Стратегия</div>
          </div>
          <div className={styles.module}>
            <div className={styles.moduleImage}>
              <PostIcon></PostIcon>
            </div>
            <div className={styles.moduleText}>Посты</div>
          </div>
          <div className={styles.module}>
            <div className={styles.moduleImage}>
              <ProjectIcon></ProjectIcon>
            </div>
            <div className={styles.moduleText}>Проекты</div>
          </div>
        </div>
      </main>

    </div>
  );
};