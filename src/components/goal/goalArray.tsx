import { GoalFC } from "../../types/goalFC";
import mainIcon from '../../assets/images/iconHeader.svg';
import styles from './goal.module.scss'

export const GoalArray: React.FC<GoalFC> = ({
    goal,
    loading,
    error
}: GoalFC) => {
    if (loading) return <div><div className={styles.loading}><img src={mainIcon} alt="mainIcon" /></div><span className={styles.loadingSpan}>Загрузка</span></div>;
    if (error) return <div><div className={styles.loading}><img src={mainIcon} alt="mainIcon" /></div><span className={styles.loadingSpan}>Ошибка</span></div>;


    return (
        <div className={styles.goalTextInputBlock}>
            {goal?.content.length! > 0 ? goal?.content.map((block, index, array) => (

                <textarea className={styles.goalTextInput}>{block}</textarea>
            )) :
                <textarea className={styles.goalTextInput}></textarea>
            }
        </div>
    )
}