import styles from './policies.module.scss'
import { IconBackward } from '../ui/iconBackward';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { PolicyIcon } from '../ui/policyIcon';


export const Policies: React.FC = () => {

    const navigate = useNavigate()
    return (
        <div className={styles.main}>
            <div className={styles.mainHeader}>
                <div className={styles.headerIcon}>
                    <PolicyIcon></PolicyIcon>
                </div>
                <div className={styles.headerName}>Политика</div>
                <div className={styles.iconBackward} onClick={() => navigate(-1)}> <IconBackward></IconBackward></div>
            </div>
            <div className={styles.secondHeader}>

            </div>
            <div className={styles.goalTextInput}>

            </div>
        </div>
    )
}