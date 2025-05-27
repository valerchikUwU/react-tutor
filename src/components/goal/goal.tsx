import styles from './goal.module.scss'
import { StarIcon } from '../ui/startIcon';
import { IconBackward } from '../ui/iconBackward';
import { useNavigate, useParams } from 'react-router-dom';
import { GoalArray } from './goalArray';
import { useGoal } from '../../hooks/goal/useGoal';
import { PlusIcon } from '../ui/plusIcon';
import { Goal } from '../../types/goal';


export const Goals: React.FC = () => {
    const organizationId = useParams().organizationId;
    const { goal, loading, error } = useGoal(organizationId!);
    const navigate = useNavigate()

    const handleAddButtonClick = (goal: Goal) => {
        try {

        }
        catch(err){
            
        }
    }

    return (
        <div className={styles.main}>
            <div className={styles.mainHeader}>
                <div className={styles.headerIcon}>
                    <StarIcon></StarIcon>
                </div>
                <div className={styles.headerName}>Цели</div>
                <div className={styles.iconBackward} onClick={() => navigate(-1) ?? navigate('/main')}> <IconBackward></IconBackward></div>
            </div>
            {
                goal ?
                    <div>
                        <GoalArray
                            goal={goal}
                            loading={loading}
                            error={error}
                        ></GoalArray>
                    </div> : <div />
            }
            <button className={styles.goalAddButton} onClick={}>
                <div className={styles.plusIcon}>
                    <PlusIcon></PlusIcon>
                </div>
                Добавить еще одну часть цели
            </button>

        </div>
    )
}