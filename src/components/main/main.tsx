import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './main.module.scss';
import mainIcon from '../../assets/images/iconHeader.svg';
import { StarIcon } from '../ui/startIcon';
import { PolicyIcon } from '../ui/policyIcon';
import { StatsIcon } from '../ui/statsIcon';
import { StrategyIcon } from '../ui/strategyIcon';
import { PostIcon } from '../ui/postIcon';
import { ProjectIcon } from '../ui/projectIcon';
import { Link } from 'react-router-dom';



export const Main: React.FC = () => {

  const navigate = useNavigate();

  const organizationId = localStorage.getItem('orgId')


  return (

    <main className={styles.main}>
      <div className={styles.mainHeader}>
        <div className={styles.headerName}>Личный помощник</div>
      </div>
      <div className={styles.startMessageBlock}>
        <div className={styles.mainIconInChat}>
          <img src={mainIcon} alt='mainIcon'></img>
        </div>
        <div className={styles.staticMessage}>
          <div className={styles.staticMessageText}>С чем будем работать?</div>
        </div>
      </div>
      <div className={styles.modules}>
        {/* <div className={styles.module} onClick={() => navigate(`${organizationId}/goals`)}> */}
        <Link to={`${organizationId}/goals`} style={{ textDecoration: 'none' }}>
          <div className={styles.module}>
            <div className={styles.moduleImage}>
              <StarIcon></StarIcon>
            </div>
            <div className={styles.moduleText}>Цели</div>
          </div>
        </Link>

        <div className={styles.module} onClick={() => navigate('policies')}>
          <div className={`${styles.moduleImage} ${styles.specialModule}`}>
            <PolicyIcon></PolicyIcon>
          </div>
          <div className={styles.moduleText}>Политика</div>
        </div>
        <div className={styles.module} onClick={() => navigate('statistics')}>
          <div className={styles.moduleImage}>
            <StatsIcon></StatsIcon>
          </div>
          <div className={styles.moduleText}>Статистика</div>
        </div>
        <div className={styles.module} onClick={() => navigate('objectives')}>
          <div className={styles.moduleImage}>
            <StarIcon></StarIcon>
          </div>
          <div className={styles.moduleText}>Краткосрочная цель</div>
        </div>
        <div className={styles.module} onClick={() => navigate('strategies')}>
          <div className={styles.moduleImage}>
            <StrategyIcon></StrategyIcon>
          </div>
          <div className={styles.moduleText}>Стратегия</div>
        </div>
        <div className={styles.module} onClick={() => navigate('posts')}>
          <div className={styles.moduleImage}>
            <PostIcon></PostIcon>
          </div>
          <div className={styles.moduleText}>Посты</div>
        </div>
        <div className={styles.module} onClick={() => navigate('projects')}>
          <div className={styles.moduleImage}>
            <ProjectIcon></ProjectIcon>
          </div>
          <div className={styles.moduleText}>Проекты</div>
        </div>
      </div>
    </main>
  );
};