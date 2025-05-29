import styles from './goal.module.scss'
import { StarIcon } from '../ui/startIcon';
import { IconBackward } from '../ui/iconBackward';
import { useNavigate } from 'react-router-dom';
import { GoalArray } from './goalArray';
import { useGoal } from '../../hooks/goal/useGoal';
import { PlusIcon } from '../ui/plusIcon';
import { organizationStore } from '../../stores/organization.store';
import React from 'react';
import { observer } from 'mobx-react-lite';


export const Goals: React.FC = observer(() => {
    const organizationId = organizationStore.getSelectedOrganization() ?? localStorage.getItem('orgId');

    const { data: goal, isLoading, error } = useGoal(organizationId!);
    const navigate = useNavigate()
    console.log(isLoading)

    return (
        <div className={styles.main}>
            <div className={styles.mainHeader}>
                <div className={styles.headerIcon}>
                    <StarIcon></StarIcon>
                </div>
                <div className={styles.headerName}>Цели</div>
                <div className={styles.iconBackward} onClick={() => navigate(-1) ?? navigate('/main')}> <IconBackward></IconBackward></div>
            </div>
            <div>
                <GoalArray
                    goal={goal!}
                    isLoading={isLoading}
                    error={error}
                ></GoalArray>
            </div>
            {
                isLoading ? <div /> :
                    <button className={styles.goalAddButton}>
                        <div className={styles.plusIcon}>
                            <PlusIcon></PlusIcon>
                        </div>
                        Добавить еще одну часть цели
                    </button>
            }

        </div>
    )
});